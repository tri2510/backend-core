const axios = require('axios');

const BREVO_API_KEY = '';
const BREVO_API_HOST = 'https://api.brevo.com/v3/smtp/email';

const sendEmailByBrevo = async (to, subject, htmlContent) => {
  const { data } = await axios.post(
    BREVO_API_HOST,
    {
      sender: {
        name: 'digital.auto',
        email: 'playground@digital.auto',
      },
      to,
      subject,
      htmlContent,
    },
    {
      headers: {
        'api-key': BREVO_API_KEY,
      },
    }
  );

  return data;
};

module.exports = {
  sendEmailByBrevo,
};
