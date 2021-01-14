// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller providing CRUD operations for the Slot model
// author(s): Jake Allinson
//

const Slot = require('../models/Slot');

// index - get all slots
exports.index = function (req, res) {
  Slot.find({}, function (err, data) {
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

// add - create a single slot
exports.add = function (req, res) {
  var slot = new Slot();
  slot.attraction_id   = req.body.attraction_id;
  slot.label           = req.body.label;
  slot.ticket_capacity = req.body.ticket_capacity;
  slot.hide_time       = new Date(req.body.hide_time + " GMT-0500");
  // save and check
  slot.save(function (err) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success",
        data: slot
      });
    }
  });
};

// view - find a single slot
exports.view = function (req, res) {
  Slot.findById(req.params.id, function (err, data) {
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

// update - update a single slot
exports.update = function (req, res) {
  Slot.findById(req.params.id, function (err, slot) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else if (!slot) {
      res.json({
        status: "error",
        message: "No slot found."
      });
    } else {
      // update if attribute was sent
      slot.attraction_id   = req.body.attraction_id !== undefined ? req.body.attraction_id : slot.attraction_id;
      slot.label           = req.body.label !== undefined ? req.body.label : slot.label;
      slot.ticket_capacity = req.body.ticket_capacity !== undefined ? req.body.ticket_capacity : slot.ticket_capacity;
      slot.hide_time       = req.body.hide_time !== undefined ? new Date(req.body.hide_time + " GMT-0500") : slot.hide_time;
      // save and check
      slot.save(function (err) {
        if (err) {
          res.json({
            status: "error",
            message: err
          });
        } else {
          res.json({
            status: "success",
            data: slot
          });
        }
      });
    }
  });
};

// delete - delete slot
exports.delete = function (req, res) {
  Slot.findOne({_id: req.params.id}, function(err, slot) {
    slot.deleteOne(function (err, data) {
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