// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: Engagement model for mongoose
// author(s): Jake Allinson
//

const mongoose = require('mongoose');

const schema = mongoose.Schema({
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
  start_time: {
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Engagement', schema);