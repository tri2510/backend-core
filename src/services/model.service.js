const httpStatus = require('http-status');
const { Model } = require('../models');
const ApiError = require('../utils/ApiError');

const createModel = async (modelBody) => {
  return Model.create(modelBody);
};

module.exports = {
  createModel,
};
