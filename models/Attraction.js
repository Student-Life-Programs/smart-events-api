// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: Attraction model for mongoose
// author(s): Jake Allinson
//

const mongoose = require('mongoose');

const AttractionSchema = mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  }
});

// export the model
const Attraction = module.exports = mongoose.model('Attraction', AttractionSchema);

module.exports.get = function (callback, limit) {
  Attraction.find(callback).limit(limit); 
}