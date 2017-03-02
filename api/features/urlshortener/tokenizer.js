'use strict';
var base36shortener = require('../../lib/base36shortener');
var incrementer = require('../../lib/incrementer');
var redisClient = require('../../lib/redisClient').connect();


////////////////////////////////////////////////////////////
// Module Definition
////////////////////////////////////////////////////////////


/**
 * Manages tokens for url shortening.
 * @module tokenizer 
 */
module.exports = {
  /**
    * Generates (and persists) a token based on the target url.
    * @param {string} targetUrl - The target url to generate a token for.
    * @return {promise}
    */
  add: add,

  /**
    * Attempts to get the target url for the given token.
    * @param {string} token - The token associated with a target url.
    * @return {promise}
    */
  fetch: fetch
};





////////////////////////////////////////////////////////////
// Executors
////////////////////////////////////////////////////////////


function add(targetUrl) {
  var token;

  return new Promise(function(resolve, reject) {
    // Check the target url rules
    if (!isValidTargetUrl(targetUrl)) {
      reject("Invalid target url");
      return;
    }

    // Generate the token
    token = base36shortener.encode(incrementer.next());

    // Persist in the cache
    redisClient.set(token, targetUrl, function(err, reply) {
      if (err) {
        reject(err);
        return;
      }

      resolve(token);
    });
  });
}

function fetch(token) {
  return new Promise(function(resolve, reject) {

    if (!token) return reject("Invalid token");

    // Try to find the value in the cache
    redisClient.get(token, function(err, targetUrl) {
      if (!targetUrl) {
        return reject(err);
      }

      resolve(targetUrl);
    });


  });
}

function isValidTargetUrl(targetUrl) {
  if (!targetUrl) return false;
  if (typeof targetUrl !== 'string') return false;
  return true;
}
