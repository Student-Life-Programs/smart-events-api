// 
// SmartEvents
// Student Life Programs
// Cedarville University
//
// purpose: basic testing of express routes and mongoose
// author(s): Jake Allinson
//

const supertest = require('supertest')
const app = require('../helpers/server')
const request = supertest(app)

// connect to mongoose
const mongoose = require('mongoose')
beforeAll(async () => {
  const dbPath = 'mongodb://localhost/smart-events-db';
  const options = {useNewUrlParser: true, useUnifiedTopology: true};
  await mongoose.connect(dbPath, options);
})
afterAll(async () => {
  await mongoose.connection.close()
})

//
// ROUTES
//

it('GET /api', async done => {
  const response = await request.get('/api')
  expect(response.status).toBe(200)
  expect(response.body.status).toBe('success')
  done()
});

it('GET /api/events', async done => {
  const response = await request.get('/api/events')
  expect(response.status).toBe(200)
  expect(response.body.status).toBe('success')
  done()
});

it('GET /api/attractions', async done => {
  const response = await request.get('/api/attractions')
  expect(response.status).toBe(200)
  expect(response.body.status).toBe('success')
  done()
});

it('GET /api/engagees', async done => {
  const response = await request.get('/api/engagees')
  expect(response.status).toBe(200)
  expect(response.body.status).toBe('success')
  done()
});

it('GET /api/engagements', async done => {
  const response = await request.get('/api/engagements')
  expect(response.status).toBe(200)
  expect(response.body.status).toBe('success')
  done()
});

it('GET /api/slots', async done => {
  const response = await request.get('/api/slots')
  expect(response.status).toBe(200)
  expect(response.body.status).toBe('success')
  done()
});

it('GET /api/tickets', async done => {
  const response = await request.get('/api/tickets')
  expect(response.status).toBe(200)
  expect(response.body.status).toBe('success')
  done()
});