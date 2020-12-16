// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: Ticket model for mongoose
// author(s): Jake Allinson
//

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  slot_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: true
  },
  student_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Ticket', schema);