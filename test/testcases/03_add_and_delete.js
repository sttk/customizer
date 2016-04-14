const path = require('path');

var logs = [];
var enumFn = function(key, val) { logs.push(key + ' = ' + val); };

var errs = [];
var errFn = function(e) {
  errs.push({ notfound: e.notfound, readerror: e.readerror, file: e.file });
};

module.exports = {
  name: 'should end with no failure when keys are added or deleted.',
  testdata: {
    customized: {
      aaa: {},
      bbb: {
        ccc: {
          ddd: {
            eee: 123,
            fff: true,
            ggg: 'GGG',
          },
        },
        hhh: {
          iii: 'III',
          jjj: 'JJJ',
        },
      },
    },
    filepaths: [
      path.resolve(__dirname, '../fixtures/add.cfg'),
      path.resolve(__dirname, '../fixtures/del.cfg'),
    ],
    enumerated: {
      aaa: enumFn,
      bbb: enumFn,
    },
    errorCb: errFn,
  },
  expected: {
    errors: [],
    customized: {
      aaa: {
        abc: 999,
        xxx: { yyy: { zzz: 'XYZ' }},
      },
      bbb: {
        ccc: {
          ddd: {
            eee: 123,
            fff: true,
            ggg: 'GGG',
          },
        },
      },
    },
    outputs: [
      'aaa.abc = 999',
      'aaa.xxx.yyy.zzz = XYZ',
      'bbb.ccc.ddd.eee = 123',
      'bbb.ccc.ddd.fff = true',
      'bbb.ccc.ddd.ggg = GGG',
    ],
  },
  outputs: logs,
  errors: errs,
};
