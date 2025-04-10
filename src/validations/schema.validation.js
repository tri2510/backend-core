const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    description: Joi.string().trim().allow(''),
    schema_definition: Joi.object().required(),
  }),
};

const getSchemas = {
  query: Joi.object().keys({
    name: Joi.string(),
    created_by: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSchema = {
  params: Joi.object().keys({
    schemaId: Joi.string().custom(objectId).required(),
  }),
};

const updateSchema = {
  params: Joi.object().keys({
    schemaId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().trim(),
      description: Joi.string().trim().allow(''),
      schema_definition: Joi.object(),
    })
    .min(1), // Require at least one field to update
};

const deleteSchema = {
  params: Joi.object().keys({
    schemaId: Joi.string().custom(objectId).required(),
  }),
};

module.exports.createSchema = createSchema;
module.exports.getSchemas = getSchemas;
module.exports.getSchema = getSchema;
module.exports.updateSchema = updateSchema;
module.exports.deleteSchema = deleteSchema;
