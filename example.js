var expect = require('./');

function test() {
  throw new Error();
};

expect(Error, test);
expect(Error, function() { return; });