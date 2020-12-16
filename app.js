// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: main app file
// author(s): Jake Allinson
//

const app = require('./helpers/server');
const port = 3000;

// connect to mongoDB with mongoose
const mongoose = require('mongoose');
const dbPath = 'mongodb://localhost/smart-events-db';
const options = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(dbPath, options)
  .then(() => { console.log('connected to mongoDB successfully') })
  .catch((error) => { console.log(error, 'error connecting to mongoDB') })

app.listen(port, function () {
  console.log('Server running on port %d', port);
});