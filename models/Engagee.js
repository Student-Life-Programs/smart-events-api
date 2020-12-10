// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: Engagee model for mongoose
// author(s): Jake Allinson
//

const mongoose = require('mongoose');

const EngageeSchema = mongoose.Schema({
  engagement_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Engagement',
    required: true
  },
  message_received: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  }
});

// export the model
const Engagee = module.exports = mongoose.model('Engagee', EngageeSchema);

module.exports.get = function (callback, limit) {
  Engagee.find(callback).limit(limit); 
}