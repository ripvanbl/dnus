'use strict';

module.exports = {
  close: close,
  connect: connect
};

var redis = require('redis');
var logger = require('./logger');
var client = null;

function close() {
  if (client) {
    client.quit();
  }
}

function connect() {
  if (client) return client;

  client = redis.createClient({
    host: 'dnus_cache'
  });

  client.on('connect', function() {
    logger.log('Connected to Redis');
  });

  client.on('error', function(err) {
    logger.log('Error with Redis: ' + err);
  });

  return client;
}
