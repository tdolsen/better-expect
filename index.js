// Module dependencies.
var callsite = require('callsite')
  , fs = require('fs')
  , AssertionError = require('assert').AssertionError
  , util = require('util')
  ;

// Custom `ExpectationError`, inheriting from `AssertionError`.
var ExpectationError = function(options) {
  if (typeof options === 'string') {
    options = { message: options };
  }
  options = options || {};
  if (!options.message) options.message = "ExpectationError";
  ExpectationError.super_.call(this, options);
  this.name = "ExpectationError";
};
util.inherits(ExpectationError, AssertionError);

// Expects given `expr` to throw an `Error`. Additional parameters are
// supplied to the `expr` function.
var expect = function(err, expr) {
  try {
  	expr.apply(expr, Array.prototype.slice.call(arguments, 2));
  } catch(e) {
    if (err instanceof RegExp) {
      if (err.test(e.message)) return e;
    }

    if (err.constructor === Array) {
      for (var i = 0, j = err.length; i <j; i++) {
        if (e instanceof err[i]) return e;
      }
    } else {
  	  if (e instanceof err) return e;
    }
  }

  var stack = callsite()
    , call = stack[1]
    , file = call.getFileName()
    , lineno = call.getLineNumber()	
    , src = fs.readFileSync(file, 'utf8')
    , line = src.split('\n')[lineno-1]
    , src = line.match(/expect\((.*)\)/)[1]
    ;

  var err = new ExpectationError({
    message: src,
    stackStartFunction: stack[0].fun
  });

  throw err;
}

// Attach `ExpectationError` to `expect`.
expect.ExpectationError = ExpectationError;

// Expose `expect`.
module.exports = process.env.NO_ASSERT
  ? function(){}
  : expect;