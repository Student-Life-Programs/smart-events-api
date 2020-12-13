
const supertest = require("supertest");
const assert = require('assert');
const app = require("../helpers/server");

describe("GET /api", function() {
  it("it should has status code 200", function(done) {
    supertest(app)
      .get("/api")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});