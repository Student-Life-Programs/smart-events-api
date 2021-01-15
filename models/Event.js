// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: Event model for mongoose
// author(s): Jake Allinson
//

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

// these functions fires before deleteOne is called
// https://mongoosejs.com/docs/middleware.html
schema.pre('deleteOne', {document:true, query:false}, async function(next) {
  await this.model('Attraction').deleteMany({event_id: this._id});
  await this.model('Engagement').deleteMany({event_id: this._id});
  next();
});

module.exports = mongoose.model('Event', schema);