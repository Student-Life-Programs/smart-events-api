// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: Engagement model for mongoose
// author(s): Jake Allinson
//

const mongoose = require('mongoose');

const EngagementSchema = mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  keyword: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  image_url: {
    type: String
  },
  is_checkin: {
    type: Boolean,
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
const Engagement = module.exports = mongoose.model('Engagement', EngagementSchema);

module.exports.get = function (callback, limit) {
  Engagement.find(callback).limit(limit); 
}