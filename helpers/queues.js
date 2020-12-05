

const dbUtil = require("./dbUtil")
const db = dbUtil.getDB();

exports.getEvents = function(req, res) {
  console.log(db);
  db.collection('events')
    .find({})
    .toArray(function(err, results) {
      return results
    })
    .then((results) => {
      return res.status(200).json({ message: results });
    })
}