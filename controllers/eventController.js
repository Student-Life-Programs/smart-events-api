// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller providing CRUD operations for the Event model
// author(s): Jake Allinson
//

const Event = require('../models/Event');

// index - get all events
exports.index = function (req, res) {
  Event.find({}, function (err, data) {
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

// add - create a single event
exports.add = function (req, res) {
  var event = new Event();
  event.name        = req.body.name;
  event.description = req.body.description;
  // save and check
  event.save(function (err) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success",
        data: event
      });
    }
  });
};

// view - find a single event
exports.view = function (req, res) {
  Event.findById(req.params.id, function (err, data) {
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

// update - update a single event
exports.update = function (req, res) {
  Event.findById(req.params.id, function (err, event) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else if (!event) {
      res.json({
        status: "error",
        message: "No event found."
      });
    } else {
      // update if attribute was sent
      event.name        = req.body.name !== undefined ? req.body.name : event.name;
      event.description = req.body.description !== undefined ? req.body.description : event.description;
      // save and check
      event.save(function (err) {
        if (err) {
          res.json({
            status: "error",
            message: err
          });
        } else {
          res.json({
            status: "success",
            data: event
          });
        }
      });
    }
  });
};

// delete - delete event
exports.delete = function (req, res) {
  Event.findOne({_id: req.params.id}, function(err, event) {
    event.deleteOne(function (err, data) {
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
  });
};