better-expect
=============

Assert-style handling of exceptions, modeled after
[better-assert](https://github.com/visionmedia/better-assert) for
self-documenting failure messages.

Basically does the opposit of `assert`, by expecting an error to be thrown.

Installation
------------

    $ npm install better-expect

Example
-------

As with better-assert, expectations can be deactivated with the __NO_ASSERT__
environmental variable.

```js
var expect = require('better-expect');

function test() {
  throw new Error();
};

expect(Error, test);
// (passes)

expect(Error, function() { return; });
// ExpectationError: Error, function() { return; }
//    at Object.<anonymous> (~/better-expect/example.js:8:1)
//    at Module._compile (module.js:449:26)
//    at Object.Module._extensions..js (module.js:467:10)
//    at Module.load (module.js:356:32)
//    at Function.Module._load (module.js:312:12)
//    at Module.runMain (module.js:492:10)
//    at process.startup.processNextTick.process._tickCallback (node.js:244:9)
```

See the tests for more examples.

License
-------

(The MIT License)

Copyright (c) 2013 Torkild Dyvik Olsen <torkild@tdolsen.net>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.