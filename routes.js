// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: API routing for all controllers
// author(s): Jake Allinson
//

// initialize the express router
let router = require('express').Router();

// default API response
router.get('/', function(req, res) {
  res.json({
    status: 'success',
    message: 'Welcome to the SLP SmartEvents API (v0.1).'
  });
});

// controllers
const eventController = require('./controllers/eventController');
const attractionController = require('./controllers/attractionController');
const attendeeController = require('./controllers/attendeeController')

// EVENTS
router.route('/events')
  .get(eventController.index)
  .post(eventController.add);
router.route('/events/:id')
  .get(eventController.view)
  .put(eventController.update)
  .delete(eventController.delete);
router.route('/events/:id/attractions')
  .get(attractionController.viewByEvent)

// ATTRACTIONS
router.route('/attractions')
  .get(attractionController.index)
  .post(attractionController.add);
router.route('/attractions/:id')
  .get(attractionController.view)
  .put(attractionController.update)
  .delete(attractionController.delete);

// ATTENDEES
router.route('/attendees')
  .get(attendeeController.index)
  .post(attendeeController.add)
router.route('/attendees/:id')
  .get(attendeeController.view)
  .put(attendeeController.update)
  .delete(attendeeController.delete);

module.exports = router;