'use strict';
var logger = require('../../lib/logger');
var tokenizer = require('./tokenizer');


////////////////////////////////////////////////////////////
// Module Definition
////////////////////////////////////////////////////////////


/**
 * Gets a target url based on a token.
 * @module getByToken
 * @param {object} req - The node request which should have a token 
 * @param {object} res - The node response
 */
module.exports = getByToken;





////////////////////////////////////////////////////////////
// Executors
////////////////////////////////////////////////////////////


function getByToken(req, res) {
  tokenizer.fetch(req.param.token)
    .then(_onSuccess)
    .catch(_onFailure);

  /////

  function _onSuccess(targetUrl) {
    if (!targetUrl) {
      onFailure("No token found");
      return;
    }

    res.json({
      "status": "OK",
      "targetUrl": targetUrl
    });
  }

  function _onFailure(err) {
    logger.log("GetToken Error: " + err);
    res.status(404);
    res.json({ "status": "Not found" });
    return;
  }

}
