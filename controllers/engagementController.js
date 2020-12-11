// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller providing CRUD operations for the Engagement model
// author(s): Jake Allinson
//

const Engagement = require('../models/Engagement');
const Engagee = require('../models/Engagee');

// index - get all engagements
exports.index = function (req, res) {
  Engagement.get(function (err, data) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success",
        data: data       
      });
    }
  });
};

// add - create a single engagement
exports.add = function (req, res) {
  var engagement = new Engagement();
  engagement.event_id   = req.body.event_id;
  engagement.keyword    = req.body.keyword;
  engagement.message    = req.body.message;
  engagement.image_url  = req.body.image_url ? req.body.image_url : engagement.image_url;
  engagement.start_time = new Date(req.body.start_time);
  engagement.end_time   = new Date(req.body.end_time);
  // save and check
  engagement.save(function (err) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success",
        data: engagement
      });
    }
  });
};

// view - find a single engagement
exports.view = function (req, res) {
  Engagement.findById(req.params.id, function (err, data) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success",
        data: data
      });
    }
  });
};

// update - update a single engagement
exports.update = function (req, res) {
  Engagement.findById(req.params.id, function (err, engagement) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else if (!engagement) {
      res.json({
        status: "error",
        message: "No engagement found."
      });
    } else {
      // update if attribute was sent
      engagement.event_id   = req.body.event_id ? req.body.event_id : engagement.event_id;
      engagement.keyword    = req.body.keyword ? req.body.keyword : engagement.keyword;
      engagement.message    = req.body.message ? req.body.message : engagement.message;
      engagement.image_url  = req.body.image_url ? req.body.image_url : engagement.image_url;
      engagement.start_time = req.body.start_time ? new Date(req.body.start_time) : engagement.start_time;
      engagement.end_time   = req.body.end_time ? new Date(req.body.end_time) : engagement.end_time;
      // save and check
      engagement.save(function (err) {
        if (err) {
          res.json({
            status: "error",
            message: err
          });
        } else {
          res.json({
            status: "success",
            data: engagement
          });
        }
      });
    }
  });
};

// delete - deletes a single engagement and all its engagees
exports.delete = function (req, res) {
  // delete the engagement
  Engagement.deleteOne({ _id: req.params.id})
    .then((data) => Engagee.deleteMany({ engagement_id: req.params.id }))
    .then((data) => {
      res.json({
        status: "success"
      })})
    .catch((err) => {
      res.json({
        status: "error",
        message: err
      });
    })
};