// mongodb connection
const mongoClient = require("mongodb").MongoClient;
const connectionURL = "mongodb://localhost:27017";
const dbName = "virtual-queues";

module.exports.connect = function connect(callback) {
  mongoClient.connect(connectionURL, {useNewUrlParser: true}, function(err, client) {
    // export the connection
    module.exports.db = client.db(dbName);
    callback(err);
  });
};