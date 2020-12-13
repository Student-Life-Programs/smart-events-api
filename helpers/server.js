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

// use body parser for POST requests
const bodyParser = require('body-parser');
const compression = require('compression');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression()); // use compression on routes

// connect to mongoDB
const mongoose = require('mongoose');
const dbPath = 'mongodb://localhost/smart-events-db';
const options = {useNewUrlParser: true, useUnifiedTopology: true};
const mongo = mongoose.connect(dbPath, options);
mongo
  .then(() => { console.log('connected to mongoDB successfully') })
  .catch((error) => { console.log(error, 'error connecting to mongoDB') })

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// routes
const routes = require("./routes");
app.use("/api", routes);

module.exports = app;