var assert = require('better-assert');

var expect = require('./'),
	ExpectationError = expect.ExpectationError,
	AssertionError = require('assert').AssertionError;

var TestError = function() {};

describe('expect()', function() {
	describe('suppression', function() {
		it("should suppress and return expected errors", function() {
			var err = new AssertionError('foo');
			var e = expect(AssertionError, function() { throw err; });
			assert(e === err)
		})

		it("should accept multiple errors to suppress", function() {
			expect([Error, AssertionError], function() { throw new Error('foo'); })
			expect([Error, AssertionError], function() { throw new AssertionError('bar'); })
		})
	})

	describe('throw', function() {
		it("should throw an ExpectationError on undefined error", function() {
			try {
				expect(AssertionError, function() { throw new Error('foo'); })
				assert(false)
			} catch(e) {
				assert(e instanceof ExpectationError)
			}
		})

		it("should throw an ExpectationError when no error was thrown", function() {
			try {
				expect(Error, function() { return; })
				assert(false)
			} catch(e) {
				assert(e instanceof ExpectationError)
			}
		})

		it("should have a message matching the parameters added to expect", function() {
			var test = function() { return; };
			try {
				expect(Error, test)
				assert(false)
			} catch(e) {
				assert(e.message === 'Error, test');
			}
		})
	})

	describe('callback', function() {
		it("should pass additional parameters to the callback function", function() {
			var e = expect(Error, function(a, b) {
				throw new Error(a + b);
			}, 'foo', 'bar');
			assert(e.message == 'foobar')
		})
	})

	describe('regexp', function() {
		it("should accept a regexp as first argument to be tested on the message", function() {
			expect(/foo/, function() { throw new Error('foo'); })
		})
	})
})

describe('ExpectationError', function() {
	var err = new ExpectationError('foo');

	it("should inherit from AssertionError and Error", function() {
		assert(err instanceof AssertionError)
		assert(err instanceof Error)
	})

	it("should have the name ExpectationError", function() {
		assert(err.name === 'ExpectationError')
	})

	it("should be possible to throw as an error", function() {
		try {
			throw err;
		} catch(e) {
			assert(e instanceof ExpectationError)
		}
	})
})

describe.skip('NO_ASSERT', function() {
	it("should replace expect with a blank function", function() {
		var e = expect(Error);
		assert(e === undefined)
	})
})