var sinon = require('sinon');

describe('first test', function() {
  it('should do something', function() {
    var result = "whatever";

    sinon.assert.match(result, "whatever");
  });
});