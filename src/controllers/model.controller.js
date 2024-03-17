const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { modelService } = require('../services');

const createModel = catchAsync(async (req, res) => {
  const model = await modelService.createModel({ ...req.body, createdBy: req.user.id });
  res.status(httpStatus.CREATED).send(model);
});

module.exports = {
  createModel,
};
