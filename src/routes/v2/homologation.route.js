const express = require('express');
const validate = require('../../middlewares/validate');
const { homologationValidation } = require('../../validations');
const { homologationController } = require('../../controllers');
const config = require('../../config/config');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/regulations').get(
  auth({
    optional: !config.strictAuth,
  }),
  validate(homologationValidation.getRegulations),
  homologationController.getRegulations
);

module.exports = router;
