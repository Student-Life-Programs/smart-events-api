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

// this function fires before deleteOne is called
// https://mongoosejs.com/docs/middleware.html
schema.pre('deleteOne', {document:true, query:false}, async function(next) {
  await this.model('Engagee').deleteMany({engagement_id: this._id});
  next();
});

module.exports = mongoose.model('Engagement', schema);