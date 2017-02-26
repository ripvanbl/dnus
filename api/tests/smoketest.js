var sinon = require("sinon");
var sinonStubPromise = require("sinon-stub-promise")(sinon);
var generateToken = require("../features/urlshortener/generateToken");
var getByToken = require("../features/urlshortener/getByToken");
var tokenizer = require("../features/urlshortener/tokenizer");

describe("Routes", function() {

  describe("GET", function() {
    var tokenizerFetchStub;

    before(function() {
      tokenizerFetchStub = sinon.stub(tokenizer, "fetch").returnsPromise();
    });

    after(function() {
      sinon.restore(tokenizerFetchStub.fetch);
    });


    it("should return a url shortener JSON object", function() {
      var req, res, spy;

      req = { param: { token: "asdf" } };
      res = {};
      spy = res.json = res.status = sinon.spy();
      tokenizerFetchStub.resolves("http://test");

      // Act
      getByToken(req, res);

      // Assert
      sinon.assert.calledWith(spy, { "status": "OK", "targetUrl": "http://test" });
    });


    it("should return a 404 if the token cannot be found", function() {
      var req, res, spy;

      tokenizerFetchStub.rejects("Test token not found");
      spy = sinon.spy();
      req = { param: { token: "asdf" } };
      res = {
        json: sinon.spy(),
        status: sinon.spy()
      };


      // Act
      getByToken(req, res);

      // Assert
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, { "status": "Not found" });
    });

  });



  describe("POST", function() {
    var tokenizerAddStub;

    before(function() {
      tokenizerAddStub = sinon.stub(tokenizer, "add").returnsPromise();
    });

    after(function() {
      sinon.restore(tokenizerAddStub.fetch);
    });


    it("should generate a token and shortened url returned as a JSON object", function() {
      var req, res, spy;

      req = {
        body: {
          targetUrl: "http://test"
        },
        protocol: "http",
        get: sinon.stub().returns("localhost")
      };
      res = {};
      spy = res.json = res.status = sinon.spy();
      tokenizerAddStub.resolves("A19C");

      // Act
      generateToken(req, res);

      // Assert
      sinon.assert.calledWith(spy, { "status": "OK", "shortUrl": "http://localhost/A19C", "token": "A19C" });
    });


    it("should return a 400 if the target url isn't valid", function() {
      var req, res, spy;

      tokenizerAddStub.rejects("Test target url not valid");
      spy = sinon.spy();
      req = { body: { targetUrl: 1234 } };
      res = {
        json: sinon.spy(),
        status: sinon.spy()
      };


      // Act
      generateToken(req, res);

      // Assert
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { "status": "Invalid targetUrl" });
    });
    
  });

});
