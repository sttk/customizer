const path = require('path');

var logs = [];

var enumFn = function(key, val) { logs.push(key + ' = ' + val); };
enumFn.before = function(key) { logs.push('Before: ' + key); };
enumFn.after = function(key) { logs.push('After: ' + key); };

var errs = [];
var errFn = function(e) {
  errs.push({ notfound: e.notfound, readerror: e.readerror, file: e.file });
};

module.exports = {
  name: 'should get an error when a file is not found',
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
    errorCb: errFn,
  },
  expected: {
    errors: [{
      notfound: true,
      readerror: undefined,
      file: path.resolve(__dirname, '../fixtures/xxx'),
    }],
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
  errors: errs,
};
