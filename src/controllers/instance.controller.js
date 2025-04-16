const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { instanceService } = require('../services');
const ParsedJsonPropertyMongooseDecorator = require('../decorators/ParsedJsonPropertyMongooseDecorator');
const ParsedJsonPropertyMongooseListDecorator = require('../decorators/ParsedJsonPropertyMongooseListDecorator');

const createInstance = catchAsync(async (req, res) => {
  const instance = await instanceService.createInstance(req.body, req.user.id);
  res.status(httpStatus.CREATED).send(new ParsedJsonPropertyMongooseDecorator(instance, 'data').getParsedJsonPropertyData());
});

const getInstances = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['schema']); // Filter by schema ObjectId
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await instanceService.queryInstances(filter, options);
  result.results = new ParsedJsonPropertyMongooseListDecorator(result.results, 'data').getParsedJsonPropertyDataList();
  res.send(result);
});

const getInstance = catchAsync(async (req, res) => {
  const instance = await instanceService.getInstanceById(req.params.instanceId);
  res.send(new ParsedJsonPropertyMongooseDecorator(instance, 'data').getParsedJsonPropertyData());
});

const updateInstance = catchAsync(async (req, res) => {
  if (!(await instanceService.isOwner(req.params.instanceId, req.user.id))) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to update this instance');
  }
  const instance = await instanceService.updateInstanceById(req.params.instanceId, req.body);
  res.send(instance);
});

const deleteInstance = catchAsync(async (req, res) => {
  if (!(await instanceService.isOwner(req.params.instanceId, req.user.id))) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to delete this instance');
  }
  await instanceService.deleteInstanceById(req.params.instanceId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports.createInstance = createInstance;
module.exports.getInstances = getInstances;
module.exports.getInstance = getInstance;
module.exports.updateInstance = updateInstance;
module.exports.deleteInstance = deleteInstance;
