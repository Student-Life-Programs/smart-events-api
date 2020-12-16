// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: CURRENTLY NOT BEING USED
// author(s): Jake Allinson
//

const MessagingResponse = require('twilio').twiml.MessagingResponse;
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID, 
  process.env.TWILIO_AUTH_TOKEN
);
const twilioNumber = "+12058830991";

module.exports.createMessage = function(to, message, imageURL, callback) {
  let config = {
    from: twilioNumber,
    to:   to,
    body: message,
    //mediaUrl: IMAGE_LINK
  };
  if (message) {
    config.body = message;
  }
  if (imageURL) {
    config.mediaUrl = imageURL
  }
  // create a promise, and send it in the callback
  let promise = client.messages.create(config);
  callback(promise);
};