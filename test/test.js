// var twidget = require('../public/scripts/app.js')
var expect = require("chai").expect
var assert = require("chai").assert

testFunction = function(a, b) {
  return a + b
}

describe('this is a test of a test: ', function() {
  it('should test the test function', function() {
    expect(testFunction(1, 3)).to.equal(4)
  })
})
