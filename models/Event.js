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
schema.pre('deleteOne', {document:true, query:false}, function(next) {
  Promise.all([
    this.model('Attraction').find({event_id: this._id}, function(err, data) {
      data.forEach(attraction => {
        attraction.deleteOne();
      });
    }),
    this.model('Engagement').find({event_id: this._id}, function(err, data) {
      data.forEach(engagement => {
        engagement.deleteOne();
      });
    })
  ]).then(next)
});

module.exports = mongoose.model('Event', schema);