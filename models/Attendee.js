// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: Attendee model for mongoose
// author(s): Jake Allinson
//

const mongoose = require('mongoose');

const AttendeeSchema = mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  student_id: {
    type: String,
    default: null
  },
  student_phone: {
    type: String,
    default: null
  }
});

// export the model
const Attendee = module.exports = mongoose.model('Attendee', AttendeeSchema);

module.exports.get = function (callback, limit) {
  Attendee.find(callback).limit(limit); 
}