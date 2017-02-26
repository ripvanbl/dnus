'use strict';

module.exports = {
  log: log
};

function log(msg) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.log(msg);
  }
}
