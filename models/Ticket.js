// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: Ticket model for mongoose
// author(s): Jake Allinson
//

const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
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

// export the model
const Ticket = module.exports = mongoose.model('Ticket', TicketSchema);

module.exports.get = function (callback, limit) {
  Ticket.find(callback).limit(limit); 
}