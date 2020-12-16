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

// use body parser for POST requests, compression for routes
const bodyParser = require('body-parser');
const compression = require('compression');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// routes
const routes = require("./routes");
app.use("/api", routes);

// export the server to be used by app (and for testing)
module.exports = app;