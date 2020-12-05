
// google sheets
const { GoogleSpreadsheet } = require('google-spreadsheet');
const clientSecret = require('../secrets/client_secret.json');
const { response } = require('express');
const sheetID = '1GzfyMdpMgDt1QF9Bs1QyNuDtnZSMY7RyLFVCrrWeVP0';
const sheet = new GoogleSpreadsheet(sheetID);

module.exports.handleRequest = async function(req) {
  // get the message from the text
  let message = req.body.Body;
  let event = {};
  // check that message is a valid ID
  let parsed = message.replace(/\D/g,'');
  if (parsed.length == 7) {
    try {
      // authenticate using the JSON file
      await sheet.useServiceAccountAuth(clientSecret);
      await sheet.loadInfo();
  
      // get the tabs
      let trackerTab = sheet.sheetsById['0'];
      let eventsTab = sheet.sheetsById['1740486447'];
      let dashboardTab = sheet.sheetsById['774675098'];
  
      // find the live event
      let rows = await eventsTab.getRows();
      if (rows.length) {
        rows.forEach(function(row) {
          if (row['Live?'] == 'TRUE') {
            // get all the event info from the row
            event.name = row['Event Name'];
            event.message = row['Event Message'];
            if (row['Event Image ID'] != '') {
              event.image = 'http://drive.google.com/uc?export=view&id=' + row['Event Image ID'];
            }
          }
        });
      }
      // confirm that there is a live event and create response
      if (event.name) {
        trackerTab.addRow({ 'Time': new Date(), 'Student ID': parsed, 'Event Name': event.name });
        event.response = `CHECK-IN SUCCESSFUL\n(${parsed})\n\nWelcome to ${event.name}!`;
      } else {
        event.response = 'We do not have any events at the moment. Please try again later.';
      }
      return event;
    } catch(err) {
      // error connecting to google sheets
      throw new Error(err);
    }
  } else {
    event.response = "Sorry! Invalid student ID, please confirm it is 7 digits and try again.";
    return event;
  }
}