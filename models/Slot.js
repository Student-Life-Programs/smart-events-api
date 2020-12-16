// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: Slot model for mongoose
// author(s): Jake Allinson
//

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  attraction_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attraction',
    required: true
  },
  label: {
    type: String,
    required: true
  },
  ticket_capacity: {
    type: Number,
    required: true
  },
  hide_time: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Slot', schema);