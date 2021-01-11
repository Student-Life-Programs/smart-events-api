// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller providing CRUD operations for the Ticket model
// author(s): Jake Allinson
//

const Ticket = require('../models/Ticket');

// index - get all tickets
exports.index = function (req, res) {
  Ticket.find({}, function (err, data) {
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

// add - create a single ticket
exports.add = function (req, res) {
  var ticket = new Ticket();
  ticket.slot_id    = req.body.slot_id;
  ticket.student_id = req.body.student_id;
  // save and check
  ticket.save(function (err) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success",
        data: ticket
      });
    }
  });
};

// view - find a single ticket
exports.view = function (req, res) {
  Ticket.findById(req.params.id, function (err, data) {
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

// update - update a single ticket
exports.update = function (req, res) {
  Ticket.findById(req.params.id, function (err, ticket) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else if (!ticket) {
      res.json({
        status: "error",
        message: "No ticket found."
      });
    } else {
      // update if attribute was sent
      ticket.slot_id    = req.body.slot_id !== undefined ? req.body.slot_id : ticket.slot_id;
      ticket.student_id = req.body.student_id !== undefined ? req.body.student_id : ticket.student_id;
      // save and check
      ticket.save(function (err) {
        if (err) {
          res.json({
            status: "error",
            message: err
          });
        } else {
          res.json({
            status: "success",
            data: ticket
          });
        }
      });
    }
  });
};

// delete - delete a single ticket
exports.delete = function (req, res) {
  Ticket.deleteOne({
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

// viewBySlot - get all tickets for a slot
exports.viewBySlot = function (req, res) {
  Ticket.find({slot_id: req.params.id}, function(err, data) {
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
}