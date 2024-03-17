const Joi = require('joi');
const { visibilityTypes } = require('../config/visibility');

const createModel = {
  body: Joi.object().keys({
    custom_apis: Joi.object().allow(null),
    cvi: Joi.string().required(),
    main_api: Joi.string().required(),
    model_home_image_file: Joi.string().allow(''),
    model_files: Joi.object().required(),
    name: Joi.string().required(),
    visibility: Joi.string()
      .valid(...Object.values(visibilityTypes))
      .required(),
    tenant_id: Joi.string().required(),
    vehicle_category: Joi.string().required(),
    property: Joi.string().allow(null, ''),
    skeleton: Joi.string().allow(null, ''),
    tags: Joi.array().items(Joi.string()).allow(null),
  }),
};

module.exports = {
  createModel,
};
