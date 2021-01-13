// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller gets Twilio account information, specifically the account balance
// author(s): Jake Allinson
//

const axios = require('axios');

require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

exports.getAccountBalance = function (req, res) {
  axios.get(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Balance.json`, {
    auth: {
      username: accountSid,
      password: authToken,
    }
  }).then(function (response) {
    res.json({
      status: "success",
      data: response.data       
    });
  }).catch(function (error) {
    res.json({
      status: "error",
      message: error       
    });
  });
};