// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: main entry file, run server
// author(s): Jake Allinson
//

const app = require('./helpers/server');
const port = 3000;

app.listen(port, function () {
  console.log('Server running on port %d', port);
});