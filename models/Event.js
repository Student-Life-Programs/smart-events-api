// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: Event model for mongoose
// author(s): Jake Allinson
//

const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  start_time: {
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  }
});

// export the model
const Event = module.exports = mongoose.model('Event', EventSchema);

module.exports.get = function (callback, limit) {
  Event.find(callback).limit(limit); 
}