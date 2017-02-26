'use strict';

module.exports = {
  next: _next
};

var i = 0;

function _next() {
  i++;

  return i;
}
