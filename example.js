var expect = require('./');

function test() {
  throw new Error();
};

expect(test);
expect(function() { return; });