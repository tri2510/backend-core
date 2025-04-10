const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createInstance = {
  body: Joi.object().keys({
    schema: Joi.string().custom(objectId).required(),
    data: Joi.object(),
  }),
};

const getInstances = {
  query: Joi.object().keys({
    schema: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getInstance = {
  params: Joi.object().keys({
    instanceId: Joi.string().custom(objectId).required(),
  }),
};

const updateInstance = {
  params: Joi.object().keys({
    instanceId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      data: Joi.object(),
    })
    .min(1), // Require at least 'data' to be updated
};

const deleteInstance = {
  params: Joi.object().keys({
    instanceId: Joi.string().custom(objectId).required(),
  }),
};

module.exports.createInstance = createInstance;
module.exports.getInstances = getInstances;
module.exports.getInstance = getInstance;
module.exports.updateInstance = updateInstance;
module.exports.deleteInstance = deleteInstance;
