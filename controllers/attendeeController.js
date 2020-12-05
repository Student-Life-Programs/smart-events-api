// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller providing CRUD operations for the Attendee model
// author(s): Jake Allinson
//

const Attendee = require('../models/Attendee');

// index - get all attendees
exports.index = function (req, res) {
  Attendee.get(function (err, data) {
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

// add - create a single attendee
exports.add = function (req, res) {
  var attendee = new Attendee();
  attendee.event_id      = req.body.event_id;
  attendee.student_id    = req.body.student_id ? req.body.student_id : attendee.student_id;
  attendee.student_phone = req.body.student_phone ? req.body.student_phone : attendee.student_phone;
  // save and check
  attendee.save(function (err) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success",
        data: attendee
      });
    }
  });
};

// view - find a single attendee
exports.view = function (req, res) {
  Attendee.findById(req.params.id, function (err, data) {
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

// update - update a single attendee
exports.update = function (req, res) {
  Attendee.findById(req.params.id, function (err, attendee) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else if (!attendee) {
      res.json({
        status: "error",
        message: "No attendee found."
      });
    } else {
      // update if attribute was sent
      attendee.event_id      = req.body.event_id ? req.body.event_id : attendee.event_id;
      attendee.student_id    = req.body.student_id ? req.body.student_id : attendee.student_id;
      attendee.student_phone = req.body.student_phone ? req.body.student_phone : attendee.student_phone;
      // save and check
      attendee.save(function (err) {
        if (err) {
          res.json({
            status: "error",
            message: err
          });
        } else {
          res.json({
            status: "success",
            data: attendee
          });
        }
      });
    }
  });
};

// delete - delete a single attendee
exports.delete = function (req, res) {
  // delete the event
  Attendee.deleteOne({
    _id: req.params.id
  }, function (err, data) {
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