// Module dependencies.
var AssertionError = require('assert').AssertionError
  , callsite = require('callsite')
  , fs = require('fs')
  ;

// Custom `ExpectationError`, inheriting from `AssertionError`.
var ExpectationError = function() {
	AssertionError.prototype.constructor.apply(this, Array.prototype.slice.call(arguments, 0));
	this.name = "ExpectationError";
};

ExpectationError.prototype = AssertionError.prototype;

// Expects given `expr` to throw an `Error`. Additional parameters are
// supplied to the `expr` function.
var expect = function(expr) {
  try {
  	expr.apply(expr, Array.prototype.slice.call(arguments, 2));
  } catch(e) {
  	return e;
  	//if (e instanceof err) return;
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