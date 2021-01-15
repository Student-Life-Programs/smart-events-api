// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: Attraction model for mongoose
// author(s): Jake Allinson
//

const mongoose = require('mongoose');

// const Attraction = require('../models/Attraction');

const schema = mongoose.Schema({
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
  await this.model('Slot').deleteMany({attraction_id: this._id});
  next();
});

module.exports = mongoose.model('Attraction', schema);