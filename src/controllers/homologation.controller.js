const { homologationService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const getRegulations = catchAsync(async (req, res) => {
  const credentials = await homologationService.getCredentials();

  if (!credentials) {
    return res.status(502).json({
      message: 'Bad Gateway. Cannot retrieve credentials from Homologation service',
    });
  }

  const { vehicleApis } = req.query;
  const regulations = await homologationService.getRegulations(credentials.access_token, vehicleApis);
  if (!regulations) {
    return res.status(502).json({
      message: 'Bad Gateway. Cannot retrieve regulations from Homologation service',
    });
  }
  res.send(regulations);
});

module.exports = {
  getRegulations,
};
