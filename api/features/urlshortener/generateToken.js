'use strict';
var logger = require('../../lib/logger');
var tokenizer = require('./tokenizer');
var url = require('url');


////////////////////////////////////////////////////////////
// Module Definition
////////////////////////////////////////////////////////////


/**
 * Generates (and persists) a token based on the target url
 * @module generateToken
 * @param {object} req - The node request which should have a targetUrl 
 * @param {object} res - The node response
 */
module.exports = generateToken;





////////////////////////////////////////////////////////////
// Executors
////////////////////////////////////////////////////////////


function generateToken(req, res) {
  tokenizer.add(req.body.targetUrl)
    .then(_onSuccess)
    .catch(_onFailure);

  /////

  function _onSuccess(token) {
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
  }

  function _onFailure(err) {
    logger.log("AddToken Error: " + err);
    res.status(400);
    res.json({ "status": "Invalid targetUrl" });
    return;
  }

}
