// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller providing CRUD operations for the Attraction model
// author(s): Jake Allinson
//

const Attraction = require('../models/Attraction');

// index - get all attractions
exports.index = function (req, res) {
  Attraction.find({}, function (err, data) {
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

// add - create a single attraction
exports.add = function (req, res) {
  var attraction = new Attraction();
  attraction.event_id    = req.body.event_id;
  attraction.name        = req.body.name;
  attraction.description = req.body.description;
  attraction.about       = req.body.about;
  attraction.image_url   = req.body.image_url;
  attraction.start_time  = new Date(req.body.start_time);
  attraction.end_time    = new Date(req.body.end_time);
  // check for appropriate start/end times
  if (attraction.start_time >= attraction.end_time) {
    res.json({
      status: "error",
      message: "Attraction start_time must be before end_time."
    });
  } else {
    // save and check
    attraction.save(function (err) {
      if (err) {
        res.json({
          status: "error",
          message: err
        });
      } else {
        res.json({
          status: "success",
          data: attraction
        });
      }
    });
  }
};

// view - find a single attraction
exports.view = function (req, res) {
  Attraction.findById(req.params.id, function (err, data) {
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

// update - update a single attraction
exports.update = function (req, res) {
  Attraction.findById(req.params.id, function (err, attraction) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else if (!attraction) {
      res.json({
        status: "error",
        message: "No attraction found."
      });
    } else {
      // update if attribute was sent
      attraction.event_id    = req.body.event_id ? req.body.event_id : attraction.event_id;
      attraction.name        = req.body.name ? req.body.name : attraction.name;
      attraction.description = req.body.description ? req.body.description : attraction.description;
      attraction.about       = req.body.about ? req.body.about : attraction.about;
      attraction.image_url   = req.body.image_url ? req.body.image_url : attraction.image_url;
      attraction.start_time  = req.body.start_time ? new Date(req.body.start_time) : attraction.start_time;
      attraction.end_time    = req.body.end_time ? new Date(req.body.end_time) : attraction.end_time;
      // check for appropriate start/end times
      if (attraction.start_time >= attraction.end_time) {
        res.json({
          status: "error",
          message: "Attraction start_time must be before end_time."
        });
      } else {
        // save and check
        attraction.save(function (err) {
          if (err) {
            res.json({
              status: "error",
              message: err
            });
          } else {
            res.json({
              status: "success",
              data: attraction
            });
          }
        });
      }
    }
  });
};

// delete - delete a single attraction
exports.delete = function (req, res) {
  Attraction.deleteOne({
    _id: req.params.id
  }, function (err, data) {
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