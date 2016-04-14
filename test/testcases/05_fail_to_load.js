
const path = require('path');

var logs = [];

function fff() {}

var enumFn = function(key, val) {
  var s = key + ' = ';
  switch (typeof val) {
  case 'number': s += 'number:' + val; break;
  case 'string': s += 'string:' + val; break;
  case 'function': s += 'function:' + val.name; break;
  case 'boolean': s += 'boolean:' + val; break;
  }
  logs.push(s);
};

var errs = [];
var errFn = function(e) {
  errs.push({ notfound: e.notfound, readerror: e.readerror, file: e.file });
};

module.exports = {
  name: 'should get an error when failing to read a file',
  testdata: {
    customized: {
      aaa: {
        bbb: {
          ccc: 123,
          ddd: true,
          eee: fff,
        },
      },
    },
    filepaths: [
      path.resolve(__dirname, '../fixtures/invalid.js'),
    ],
    enumerated: {
      aaa: enumFn,
    },
    errorCb: errFn,
  },
  expected: {
    errors: [{
      notfound: undefined,
      readerror: true,
      file: path.resolve(__dirname, '../fixtures/invalid.js'),
    }],
    customized: {
      aaa: {
        bbb: {
          ccc: 123,
          ddd: true,
          eee: fff,
        },
      },
    },
    outputs: [
      'aaa.bbb.ccc = number:123',
      'aaa.bbb.ddd = boolean:true',
      'aaa.bbb.eee = function:fff',
    ],
  },
  outputs: logs,
  errors: errs,
};
