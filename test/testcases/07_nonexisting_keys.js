
var logs = [];

var enumFn = function(key, value) {
  logs.push(key + ' = ' + value);
};

function fn() {}

module.exports = {
  name: 'should support various enumeration patterns.',
  testdata: {
    customized: {
      aaa: {
        bbb: {
          ccc: 'CCC',
        },
      },
    },
    filepaths: [],
    enumerated: {
      'aaa.bbb': enumFn,
      'aaa.bbb.ddd': enumFn,
      'aaa.ccc': enumFn,
      'aaa.eee.fff': enumFn,
    },
  },
  expected: {
    errors: [],
    customized: {
      aaa: {
        bbb: {
          ccc: 'CCC',
        },
      },
    },
    outputs: [
      'aaa.bbb.ccc = CCC',
    ],
  },
  outputs: logs,
  errors: [],
};
