// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller providing CRUD operations for the Event model
// author(s): Jake Allinson
//

const Event = require('../models/Event');
const Attraction = require('../models/Attraction');
const Attendee = require('../models/Attendee');

// index - get all events
exports.index = function (req, res) {
  Event.get(function (err, data) {
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
  event.name            = req.body.name;
  event.description     = req.body.description;
  event.start_time      = req.body.start_time ? req.body.start_time : event.start_time;
  event.checkin_message = req.body.checkin_message ? req.body.checkin_message : event.checkin_message;
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
      event.name            = req.body.name ? req.body.name : event.name;
      event.description     = req.body.description ? req.body.description : event.description;
      event.start_time      = req.body.start_time ? req.body.start_time : event.start_time;
      event.checkin_message = req.body.checkin_message ? req.body.checkin_message : event.checkin_message;
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

// delete - deletes a single event and all its attractions and attendees
exports.delete = function (req, res) {
  // delete the event
  Event.deleteOne({ _id: req.params.id})
    .then((data) => Attraction.deleteMany({ event_id: req.params.id }))
    .then((data) => Attendee.deleteMany({ event_id: req.params.id }))
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