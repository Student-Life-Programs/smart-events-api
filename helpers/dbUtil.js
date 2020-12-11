
// connect to mongoDB
const MongoClient = require("mongodb").MongoClient;
const connectionURL = "mongodb://localhost:27017";
const dbName = "virtual-queues";

var db;

module.exports = {
  // connection made in app.js
  initDB: function(callback) {
    MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
      db = client.db(dbName);
      db.collection('events')
        .find({})
        .toArray(function(err, results) {
          console.log(results)
        })
      return callback(err);
    });
  },
  // db to be used by helpers
  getDB: function() {
    return db;
  }
};