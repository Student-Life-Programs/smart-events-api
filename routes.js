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
const engagementController = require('./controllers/engagementController');
const engageeController = require('./controllers/engageeController');

// EVENTS
router.route('/events')
  .get(eventController.index)
  .post(eventController.add);
router.route('/events/:id')
  .get(eventController.view)
  .put(eventController.update)
  // .delete(eventController.delete);
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

// ENGAGEMENTS
router.route('/engagements')
  .get(engagementController.index)
  .post(engagementController.add);
router.route('/engagements/:id')
  .get(engagementController.view)
  .put(engagementController.update)
  .delete(engagementController.delete);
router.route('/engagements/:id/engagees')
  .get(engageeController.viewByEngagement);

// ENGAGEES
router.route('/engagees')
  .get(engageeController.index)
  .post(engageeController.add)
  .delete(engageeController.deleteAll);
router.route('/engagees/:id')
  .get(engageeController.view)
  .put(engageeController.update)
  .delete(engageeController.delete);

module.exports = router;