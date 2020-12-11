// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: express server providing routes entry
// author(s): Jake Allinson
//

// express server
const app = require('express')();
const port = 3000;

// use body parser for routes
const routes = require("./routes");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// connect to mongoDB
const mongoose = require('mongoose');
const dbPath = 'mongodb://localhost/smart-events-db';
const options = {useNewUrlParser: true, useUnifiedTopology: true};
const mongo = mongoose.connect(dbPath, options);
mongo
  .then(() => { console.log('connected to mongoDB successfully') })
  .catch((error) => { console.log(error, 'error connecting to mongoDB') })

// start the server
app.listen(port, function() {
  console.log('server listening on port ' + port);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// routes
app.use("/api", routes);