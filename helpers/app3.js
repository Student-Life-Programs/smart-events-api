// 
// SmartEvents - AttendanceTracker
//
// Student Life Programs
// Cedarville University
// author(s): Jake Allinson
//

// express server
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('dotenv').config();

// connect to twilio
const twilio = require('./handlers/twilio');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

// connect to google sheets
// const sheets = require('./config/sheets');

// make the mongoDB connection
const ObjectId = require('mongodb').ObjectID;
const mongo = require('./handlers/dbUtil');
mongo.connect(function(err) {
  if (err) throw err;
});

// start the server and connect to mongo
app.listen(port, function() {
  console.log('server listening on port ' + port);
});

// set the headers
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// GET
app.get('/api/tracker', function(req, res, next) {
  getAttendance()
    .then(function(results) {
      res.status(200).send(results.length.toString());
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).send({
        error: err
      });
    });
});

// GET
app.get('/api/tracker/attendees', function(req, res, next) {
  getAttendance()
    .then(function(results) {
      let tries = [];
      while (tries.length < results.length) {
        let rand = getRandomInt(results.length);
        if (tries.includes(rand)) continue;
        if (!results[rand].raffled) {
          raffleAttendee(results[rand]._id, function() {});
          return res.status(200).send(results[rand]);
        }
        tries.push(rand);
      }
      res.status(200).send(null);
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).send({
        error: err
      });
    });
});

// POST
app.post('/api/tracker/broadcast', function(req, res, next) {
  // console.log(req.body);
  if (req.body.password == process.env.BROADCAST_PASSWORD) {
    getAttendance()
      .then(function(results) {
        if (results && req.body.message && req.body.message != "") {
          results.forEach(attendee => {
            twilio.createMessage(attendee.phone, req.body.message, null, function(response) {
              console.log(response);
            });
          });
          res.status(200).send("success!");
        } else {
          res.status(200).send({err: "blank or bad message"});
        }
      })
      .catch(function(err) {
        console.log(err);
        res.status(200).send({
          error: err
        });
      });
  } else {
    res.status(200).send({err: "incorrect password"});
  }
});

// POST
// webhook for AttendanceTracker
app.post('/api/tracker', function(req, res, next)
{
  const twiml = new MessagingResponse();
  const message = twiml.message();
  let parsed = req.body.Body.replace(/\D/g,'');

  if (parsed.length == 7) {
    // send successful check-in response
    let returnMessage = `👋 Hey! Checking you in...\n(ID: ${req.body.Body})`;
    // let returnMessage = "Thank you for your interest in Campus Christmas on Saturday 11/21. Here is the schedule for the event, and make your reservations at cedar.to/queues";
    message.body(returnMessage);
    // message.media("http://drive.google.com/uc?export=view&id=1SbSyvfwOn24rIwSmFuObCf0fmQAxo7F5");
    // twiml.message(returnMessage);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
    // send follow up text with a message and/or image
    // previousCheckin(req.body.From, eventID)
    //  .then(function() {
      // check for event based on current time
      // let now = new Date();
      if (true) {
        let message = "Welcome to Campus Christmas! Enjoy the event. If you haven't already, make your reservations here: cedar.to/queues";
        //message += "Today, we have the opportunity to meet and learn more about SGA roles and responsibilities. If you have any questions, please go to https://sli.do & enter the code 1887. Thank you for being here!\n\n";
        //message += "With love,\nCampus Community Committee";
        let image = null;
        twilio.createMessage(req.body.From, message, image, function(response) {});
        createAttendance(parsed, "5f74d2ea90fc44b114573c4b", req.body.From);
      } else {
        // twiml.message('Sorry! No live events at the moment. Please try again later!');
        // res.writeHead(200, {'Content-Type': 'text/xml'});
        // return res.end(twiml.toString()); 
        let message = 'Sorry! No live events at the moment. Please try again later!';
        twilio.createMessage(req.body.From, message, null, function(response) {});
      }
        // let image = "http://drive.google.com/uc?export=view&id=1SbSyvfwOn24rIwSmFuObCf0fmQAxo7F5";
      // })
      // .catch(function(err) {
      //   console.log(err);
      //   twilio.createMessage(req.body.From, 'Sorry! There has been an error or you have already checked-in.', null, function(response) {});
      // });
  } else {
    twiml.message('Sorry! Invalid student ID, please confirm it is 7 digits and try again.');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString()); 
  }
});
// app.post('/api/tracker', function(req, res, next)
// {
//   const twiml = new MessagingResponse();
//   // parse the text message and create a response based on event
//   getLiveEvent()
//     .then(function(results) {
//       // console.log(results.eventID);
//       if (results && results.eventID) {
//         return getEventData(results.eventID);
//       } else {
//         twiml.message("Sorry! There are no live events at the moment. Please try again later");
//         res.writeHead(200, {'Content-Type': 'text/xml'});
//         res.end(twiml.toString());
//       }
//     })
//     .then(function(results) {
//       // check that message is an id number
//       let parsed = req.body.Body.replace(/\D/g,'');
//       if (parsed.length == 7) {
//         // send successful check-in response
//         twiml.message(`CHECK-IN SUCCESSFUL\n(${req.body.Body})\n\nWelcome to ${results.name}`);
//         res.writeHead(200, {'Content-Type': 'text/xml'});
//         res.end(twiml.toString());
//         // send follow up text with a message and/or image
//         if (results.message || results.imageURL) {
//           twilio.createMessage(req.body.From, results.message, results.imageURL, function(response) {});
//         }
//         createAttendance(parsed, results._id);
//       } else {
//         twiml.message('Sorry! Invalid student ID, please confirm it is 7 digits and try again.');
//         res.writeHead(200, {'Content-Type': 'text/xml'});
//         res.end(twiml.toString()); 
//       }
//     })
//     .catch(function(err) {
//       console.log(err);
//       twiml.message('Sorry! There has been an error. Please try again later.');
//       res.writeHead(200, {'Content-Type': 'text/xml'});
//       res.end(twiml.toString()); 
//     });
// });
// app.post('/api/tracker', function(req, res, next)
// {
//   const twiml = new MessagingResponse();
//   // parse the text message and create a response based on event
//   sheets.handleRequest(req)
//     .then(function(event) {
//       twiml.message(event.response);
//       res.writeHead(200, {'Content-Type': 'text/xml'});
//       res.end(twiml.toString());
//       // send follow up text with a message and/or image
//       if (event.message || event.image) {
//         twilio.createMessage(req.body.From, event.message, event.image, function(response) {});
//       }
//     })
//     .catch(function(err) {
//       console.log(err);
//       twiml.message("Sorry! There has been an error. Please try again later.");
//       res.writeHead(200, {'Content-Type': 'text/xml'});
//       res.end(twiml.toString()); 
//     });
// });


// GET
// all events (currently just one)
app.get('/api/queues/events', function(req, res, next)
{
  getAllEvents()
    .then(function(results) {
      res.status(200).send(results);
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).send({
        error: err
      });
    });
});

// POST
// all events (currently just one)
app.post('/api/queues/events', function(req, res, next)
{
  updateEvent(req.body.name)
    .then(function(results) {
      res.status(200).send(results);
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).send({
        error: err
      });
    });
});

// GET
// all attractions
app.get('/api/queues/attractions', function(req, res, next)
{
  getAllAttractions()
    .then(function(results) {
      res.status(200).send(results);
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).send({
        error: err
      });
    });
});

// GET
// an attraction by id
app.get('/api/queues/attractions/:id', function(req, res, next)
{
  getSingleAttraction(req.params.id)
    .then(function(results) {
      res.status(200).send(results);
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).send({
        error: err
      });
    });
});

// POST
// add an attraction
app.post('/api/queues/attractions', function(req, res, next)
{
  let obj = {
    name:         req.body.name,
    description:  req.body.description,
    imageURL:     req.body.image,
    minGroupSize: req.body.min,
    maxGroupSize: req.body.max
  };
  createAttraction(obj)
    .then(function(results) {
      if (results) {
        let attractionID = results.insertedId;
        return createSlots(attractionID, req.body.slots);
      }
    })
    .then(function(results) {
      res.status(200).send(results);
    })
    .catch(function(err) {
      res.status(200).send(err);
    })
  // TODO: add the slots
});

// GET
// get slots for an attraction by id
app.get('/api/queues/attractions/:id/slots', function(req, res, next)
{
  let slots;
  // get all slots for an attraction
  getAttractionSlots(req.params.id)
    .then(function(results) {
      slots = results;
      return getAllPasses();
    })
    .then(function(results) {
      for (i in slots) {
        // first get all passes with slot's id
        let slotPasses = results.filter(function(pass) {
          return pass.slotID.toString() === slots[i]._id.toString();
        });
        // add up the group sizes in the passes
        let waiting = 0;
        if (slotPasses.length) {
          waiting = slotPasses.reduce(function(acc, pass) {
            return acc + parseInt(pass.groupSize)
          }, 0);
        }
        // add new attribute 'waiting'
        slots[i].waiting = waiting;
      }
      res.status(200).send(slots);
    })
    .catch(function(err) {
      console.log(err);
      res.status(400).send({
        error: err
      });
    });
});

// POST
// add pass to slot
app.post('/api/queues/slots/:id/passes', function(req, res, next)
{
  let groupSize = typeof req.body.groupSize === 'string' ? parseInt(req.body.groupSize) : req.body.groupSize;
  let attraction;
  let slot;
  // 1. start with the slot so we can check capacity
  getSingleSlot(req.params.id)
    .then(function(results) {
      // 2. get the attraction associated with the slot
      slot = results;
      return getSingleAttraction(slot.attractionID);
    })
    .then(function(results) {
      // 3. check that group size is within bounds for the attraction and
      // that capacity isn't full for slot
      attraction = results;
      return checkSize(slot, attraction, groupSize);
    })
    .then(function() {
      // 4. confirm that phone number has not been used for slot already
      return checkUnusedPhone(slot._id, req.body.phone)
    })
    .then(function() {
      // 5. send text message to confirm phone number is valid
      return sendText(attraction, slot, groupSize, req.body.phone)
    })
    .then(function() {
      // 6. create the pass
      return createPass(req.params.id, groupSize, req.body.phone)
    })
    .then(function(results) {
      // send success status
      res.status(200).send(results);
    })
    .catch(function(err) {
      console.log(err);
      res.status(200).send({
        error: err
      });
    });
});

// FUNCTIONS

function getAttendance() {
  return new Promise(function(resolve, reject) {
    mongo.db
      .collection('TrackerAttendance')
      .find({})
      .toArray(function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
}

function createAttendance(studentID, eventID, phone) {
  mongo.db
    .collection('TrackerAttendance')
    .insertOne({eventID: new ObjectId(eventID), studentID: studentID, phone: phone, raffled: false}, function(err, results) {
      if (err) {
        console.log(err);
      }
    });
}

function raffleAttendee(id, callback) {
  mongo.db
    .collection('TrackerAttendance')
    .update({_id: new ObjectId(id)}, {$set: {raffled: true}},
      function(err, results) {
        callback(results);
      });
};

function getLiveEvent() {
  return new Promise(function(resolve, reject) {
    mongo.db
      .collection('TrackerLiveEvent')
      .findOne({}, function(err, results) {
        if (err) {
          reject(err);
        } else if (!results) {
          reject("Event not found");
        } else {
          resolve(results);
        }
      });
  })
}
function getEventData(id) {
  return new Promise(function(resolve, reject) {
    mongo.db
      .collection('TrackerEvents')
      .findOne({'_id': new ObjectId(id)}, function(err, results) {
        if (err) {
          reject(err);
        } else if (!results) {
          reject("Event not found");
        } else {
          resolve(results);
        }
      });
  })
}

function previousCheckin(phone, eventID) {
  return new Promise(function(resolve, reject) {
    mongo.db
      .collection('TrackerAttendance')
      .find({phone: phone, eventID: new ObjectId(eventID)})
      .toArray(function(err, results) {
        if (err) {
          reject(err);
        } else if (results.length > 0) {
          reject("already checked-in");
        } else {
          resolve();
        }
      });
  });
}

function getAllEvents() {
  return new Promise(function(resolve, reject) {
    mongo.db
      .collection('events')
      .find({})
      .toArray(function(err, results) {
        if (err) {
          reject(err);
        } else if (!results) {
          reject("Event not found");
        } else {
          resolve(results ? results : new Array());
        }
      });
  })
}

function updateEvent(name) {
  return new Promise(function(resolve, reject) {
    mongo.db
      .collection('events')
      .update({}, {$set: {name: name}},
        function(err, results) {
          if (err) {
            reject(err);
          } else if (!results) {
            reject("Event not found or more than one was found");
          } else {
            resolve(results);
          }
      });
  })
}

// get a slot by id
function getSingleSlot(id) {
  return new Promise(function(resolve, reject) {
    mongo.db
      .collection('slots')
      .findOne({'_id': new ObjectId(id)}, function(err, results) {
        if (err) {
          reject(err);
        } else if (!results) {
          reject("Slot not found");
        } else {
          resolve(results);
        }
    });
  });
}

// get an attraction by id
function getSingleAttraction(id) {
  return new Promise(function(resolve, reject) {
    mongo.db
      .collection('attractions')
      .findOne({'_id': new ObjectId(id)}, function(err, results) {
        if (err) {
          reject(err);
        } else if (!results) {
          reject("Attraction not found");
        } {
          resolve(results);
        }
    });
  });
}

function getAllAttractions() {
  return new Promise(function(resolve, reject) {
    mongo.db
      .collection('attractions')
      .find({})
      .toArray(function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results ? results : new Array());
        }
      });
  })
}

function getAttractionSlots(id) {
  return new Promise(function(resolve, reject) {
    mongo.db
      .collection('slots')
      .find({'attractionID': new ObjectId(id)})
      .toArray(function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results ? results : new Array());
        }
    });
  });
}

function getAllPasses() {
  return new Promise(function(resolve, reject) {
    mongo.db
      .collection('passes')
      .find({})
      .toArray(function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results ? results : new Array());
        }
    });
  });
}

// count group size for a slot to get how many are currently waiting
function checkSize(slot, attraction, groupSize) {
  return new Promise(function(resolve, reject) {
    // first check groupSize is within bounds for the attraction
    if (groupSize < attraction.minGroupSize || groupSize > attraction.maxGroupSize) {
      reject("Group size outside bounds for attraction");
    } else {
      mongo.db
        .collection("passes")
        .aggregate([
          { $match: { slotID: new ObjectId(slot._id)} },
          { $group: { _id: null, count: { $sum: "$groupSize" } } }])
        .toArray(function(err, results) {
          if (err) {
            reject(err);
          }
          // check for remaining capacity
          // either no passes were found or the group size fits in capacity
          else if (results.length == 0 || groupSize + results[0].count <= slot.capacity) {
            resolve();
          } else {
            reject("Capacity full for this slot");
          }
        });
    }
  });
}

// check that a phone hasn't been used in a slot
function checkUnusedPhone(id, phone) {
  return new Promise(function(resolve, reject) {
    mongo.db
      .collection('passes')
      .findOne({'slotID': new ObjectId(id), 'phone': phone}, function(err, results) {
        if (err) {
          reject(err);
        }
        // check group size
        if (results) {
          reject("Phone number already used for this slot");
        } else {
          resolve();
        }
    });
  });
}

// send the message alerting that pass has been created
function sendText(attraction, slot, groupSize, phone) {
  return new Promise(function(resolve, reject) {
    let message = "Present this pass upon arrival:\n\n";
    message += attraction.name.toUpperCase() + "\n";
    message += slot.label + "\n\n";
    // message += "Group Size: " + groupSize + "\n\n";
    // if (attraction.name.toUpperCase() == 'LASER TAG') {
    message += "Please arrive at this attraction 10 minutes before your time slot. Masks must be worn.";
    // } else {
    // message += "Enter through the main doors to the DMC (closest to the bridge). Please arrive 10 minutes prior to the movie start time.";
    // }
    // let fakeID = "VQ" + phone.split("").reverse().join("");
    // message += fakeID.substring(0, fakeID.length - 8);
    twilio.createMessage(phone, message, null, function(promise) {
      promise.then(function() {
        resolve();
      }).catch(function(err) {
        reject(err);
      });
    });
  });
}

// [{attractionID: ObjectId("5fadbe00d9abd01c4b821322"), label:"8:00PM", capacity:3},{attractionID: ObjectId("5fadbe00d9abd01c4b821322"), label:"8:20PM", capacity:3},{attractionID: ObjectId("5fadbe00d9abd01c4b821322"), label:"8:40PM", capacity:3}]

// insert new pass
function createPass(id, groupSize, phone) {
  return new Promise(function(resolve, reject) {
    mongo.db
      .collection('passes')
      .insertOne({slotID: new ObjectId(id), groupSize: groupSize, phone: phone}, function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
  });
}

function createAttraction(obj) {
  return new Promise(function(resolve, reject) {
    mongo.db
      .collection('attractions')
      .insertOne(obj, function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
  });
}

function createSlots(attractionID, slots) {
  return new Promise(function(resolve, reject) {
    let newSlots = slots.map(function(slot) {
      slot.attractionID = new ObjectId(attractionID);
      slot.capacity = parseInt(slot.capacity);
      return slot;
    })
    mongo.db
      .collection('slots')
      .update(newSlots, function(err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}