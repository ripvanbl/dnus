var base36shortener = require('../lib/base36shortener');
var express = require('express');
var incrementer = require('../lib/incrementer');
var logger = require('../lib/logger');
var router = express.Router();
var redisClient = require('../lib/redisClient').connect();
var url = require('url');

/* GET full url from an short id */
router.get('/:token', function(req, res, next) {
  try {
    // Try to find the value in the cache
    redisClient.get(req.params.token, _cb);

    // Cache callback handler
    function _cb(err, targetUrl) {
      if (!targetUrl) {
        res.status(404).json({ "status": "Not found" });
        return;
      }

      res.json({
        "status": "OK",
        "targetUrl": targetUrl
      });
    }

  } catch (e) {
    res.status(500).json({ "status": "Error processing token" });
    logger.log(e);
  }
});




/* Create a short url and store the target url */
router.post('/', function(req, res, next) {
  var targetUrl, token;

  try {
    targetUrl = req.body.targetUrl;

    // Ensure a target url was supplied
    if (!targetUrl) {
      res.status(400).json({ "status": "Invalid targetUrl" });
      return;
    }

    // Generate the token
    token = base36shortener.encode(incrementer.next());
    
    // Persist in the cache
    redisClient.set(token, targetUrl, _cb);

    // Cache callback handler
    function _cb(err, reply) {
      var shortUrl = url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: token
      });

      res.json({
        "status": "OK",
        "shortUrl": shortUrl,
        "token": token
      });
    };

  } catch (e) {
    res.status(400).json({ "status": "Invalid JSON" });
    logger.log(e);
  }
});

module.exports = router;
