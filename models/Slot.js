// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: Slot model for mongoose
// author(s): Jake Allinson
//

const mongoose = require('mongoose');

const SlotSchema = mongoose.Schema({
  attraction_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attraction',
    required: true
  },
  label: {
    type: String,
    required: true
  },
  tickets_capacity: {
    type: Number,
    required: true
  },
  hide_time: {
    type: Date,
    required: true
  }
});

// export the model
const Slot = module.exports = mongoose.model('Slot', SlotSchema);

module.exports.get = function (callback, limit) {
  Slot.find(callback).limit(limit); 
}