'use strict';

var fs = require('fs');
var path = require('path');
var lab = exports.lab = require('lab').script();
var assert = require('assert');

var Customizer = require('../');

var testdir = path.resolve(__dirname, 'testcases');
var testfiles = fs.readdirSync(testdir)
  .filter(function(filename) { return path.extname(filename) === '.js'; })
  .map(function(filename) { return path.join(testdir, filename); });

lab.experiment('Customizer', function() {

  testfiles.forEach(function(testfile) {
    var testcase = require(testfile);

    lab.test(testcase.name, function(done) {
      var testdata = testcase.testdata;
      var expected = testcase.expected;

      var customizer = new Customizer();
      customizer.customized = testdata.customized;
      customizer.makeCustomizable();

      testdata.filepaths.forEach(function(filepath) {
        customizer.customize(filepath, testdata.errorCb);
      });

      Object.keys(expected.customized).forEach(function(optname) {
        assert.deepEqual(
          customizer.customized[optname], expected.customized[optname]);
      });

      customizer.enumerated = testdata.enumerated;
      customizer.enumerate();
      assert.deepEqual(testcase.outputs, expected.outputs);
      assert.deepEqual(testcase.errors, expected.errors);

      done();
    });
  });
});
