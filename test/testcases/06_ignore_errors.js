const path = require('path');

var logs = [];

var enumFn = function(key, val) { logs.push(key + ' = ' + val); };
enumFn.before = function(key) { logs.push('Before: ' + key); };
enumFn.after = function(key) { logs.push('After: ' + key); };


module.exports = {
  name: 'should ignore an error when a callback is null',
  testdata: {
    customized: {
      aaa: {
        bbb: 123,
        ccc: true,
      },
    },
    filepaths: [ path.resolve(__dirname, '../fixtures/xxx') ],
    enumerated: {
      aaa: enumFn,
    },
  },
  expected: {
    errors: [],
    customized: {
      aaa: {
        bbb: 123,
        ccc: true,
      },
    },
    outputs: [
      'Before: aaa',
      'aaa.bbb = 123',
      'aaa.ccc = true',
      'After: aaa',
    ],
  },
  outputs: logs,
  errors: [],
};
