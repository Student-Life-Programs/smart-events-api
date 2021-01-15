// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller providing CRUD operations for the Engagement model
// author(s): Jake Allinson
//

const Engagement = require('../models/Engagement');

// index - get all engagements
exports.index = function (req, res) {
  Engagement.find({}, function (err, data) {
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
  engagement.image_url  = req.body.image_url !== undefined ? req.body.image_url : engagement.image_url;
  engagement.start_time = new Date(req.body.start_time + " GMT-0500");
  engagement.end_time   = new Date(req.body.end_time + " GMT-0500");
  // check for appropriate start/end times
  if (engagement.start_time >= engagement.end_time) {
    res.json({
      status: "error",
      message: "Engagement start_time must be before end_time."
    });
  } else {
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
      engagement.event_id   = req.body.event_id !== undefined ? req.body.event_id : engagement.event_id;
      engagement.keyword    = req.body.keyword !== undefined ? req.body.keyword : engagement.keyword;
      engagement.message    = req.body.message !== undefined ? req.body.message : engagement.message;
      engagement.image_url  = req.body.image_url !== undefined ? req.body.image_url : engagement.image_url;
      engagement.start_time = req.body.start_time !== undefined ? new Date(req.body.start_time + " GMT-0500") : engagement.start_time;
      engagement.end_time   = req.body.end_time !== undefined ? new Date(req.body.end_time + " GMT-0500") : engagement.end_time;
      // check for appropriate start/end times
      if (engagement.start_time >= engagement.end_time) {
        res.json({
          status: "error",
          message: "Engagement start_time must be before end_time."
        });
      } else {
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
    }
  });
};

// delete - delete engagement
exports.delete = async function (req, res) {
  const engagement = await Engagement.findOne({_id: req.params.id});
  engagement.deleteOne(function (err, data) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success"
      });
    }
  });
};