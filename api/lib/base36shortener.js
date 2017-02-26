'use strict';

module.exports = {
  decode: decode,
  encode: encode
};

var alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
var base = alphabet.length;

function decode(str) {
  var decoded = 0;

  if (!str || (typeof str !== 'string')) throw new Error('The input to decode must be a string');

  while (str) {
    var index = alphabet.indexOf(str[0]);
    var power = str.length - 1;
    decoded += index * (Math.pow(base, power));
    str = str.substring(1);
  }

  return decoded;
}

function encode(num) {
  var encoded = '';
  var base10Num;

  if (isNaN(num)) throw new Error('The input to encode must be a base 10 number');

  base10Num = parseInt(num, 10);

  while (base10Num) {
    var remainder = base10Num % base;
    base10Num = Math.floor(base10Num / base);
    encoded = alphabet[remainder].toString() + encoded;
  }

  return encoded;
}
