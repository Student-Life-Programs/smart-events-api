// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: Slot model for mongoose
// author(s): Jake Allinson
//

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  attraction_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attraction',
    required: true
  },
  label: {
    type: String,
    required: true
  },
  ticket_capacity: {
    type: Number,
    required: true
  },
  hide_time: {
    type: Date,
    required: true
  }
});

// these functions fires before deleteOne is called
// https://mongoosejs.com/docs/middleware.html
schema.pre('deleteOne', {document:true, query:false}, function(next) {
  this.model('Ticket').find({slot_id: this._id}, function(err, data) {
    data.forEach(ticket => {
      ticket.deleteOne(function (err, data) {
        if (!err) { next() }
      });
    });
  })
});

module.exports = mongoose.model('Slot', schema);