// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: controller providing CRUD operations for the Engagee model
// author(s): Jake Allinson
//

const Engagee = require('../models/Engagee');

// index - get all engagees
exports.index = function (req, res) {
  Engagee.find({}, function (err, data) {
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

// add - create a single engagee
exports.add = function (req, res) {
  var engagee = new Engagee();
  engagee.engagement_id    = req.body.engagement_id;
  engagee.message_received = req.body.message_received !== undefined ? req.body.message_received : engagee.message_received;
  engagee.phone            = req.body.phone !== undefined ? req.body.phone : engagee.phone;
  // save and check
  engagee.save(function (err) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else {
      res.json({
        status: "success",
        data: engagee
      });
    }
  });
};

// view - find a single engagee
exports.view = function (req, res) {
  Engagee.findById(req.params.id, function (err, data) {
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

// update - update a single engagee
exports.update = function (req, res) {
  Engagee.findById(req.params.id, function (err, engagee) {
    if (err) {
      res.json({
        status: "error",
        message: err
      });
    } else if (!engagee) {
      res.json({
        status: "error",
        message: "No engagee found."
      });
    } else {
      // update if attribute was sent
      engagee.engagement_id    = req.body.engagement_id !== undefined ? req.body.engagement_id : engagee.engagement_id;
      engagee.message_received = req.body.message_received !== undefined ? req.body.message_received : engagee.message_received;
      engagee.phone            = req.body.phone !== undefined ? req.body.phone : engagee.phone;
      // save and check
      engagee.save(function (err) {
        if (err) {
          res.json({
            status: "error",
            message: err
          });
        } else {
          res.json({
            status: "success",
            data: engagee
          });
        }
      });
    }
  });
};

// delete - delete engagee
exports.delete = async function (req, res) {
  const engagee = await Engagee.findOne({_id: req.params.id});
  engagee.deleteOne(function (err, data) {
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

// viewByEngagement - get all engagees by engagement
exports.viewByEngagement = function (req, res) {
  Engagee.find({engagement_id: req.params.id}, function(err, data) {
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