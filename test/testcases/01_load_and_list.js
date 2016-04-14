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
  name: 'should load a customizing file and reflect its content.',
  testdata: {
    customized: {
      colors: {
        help: {
          title: 'black',
          command: {
            name: 'blue',
            description: 'black',
            option: {
              name: 'magenta',
              description: 'black',
            },
          },
        },
      },
      cliOptions: {
        verbose: false,
        silent: false,
        cwd: null,
        configfile: null,
        help: null,
        version: null,
      },
    },
    filepaths: [ path.resolve(__dirname, '../fixtures/apprc') ],
    enumerated: {
      colors: enumFn,
      cliOptions: enumFn,
    },
    errorCb: errFn,
  },
  expected: {
    errors: [],
    customized: {
      colors: {
        help: {
          title: 'cyan',
          command: {
            name: 'blue',
            description: 'white',
            option: {
              name: 'magenta',
              description: 'gray',
            },
          },
        },
      },
    },
    outputs: [
      'Before: cliOptions',
      'cliOptions.configfile = null',
      'cliOptions.cwd = null',
      'cliOptions.help = null',
      'cliOptions.silent = false',
      'cliOptions.verbose = false',
      'cliOptions.version = null',
      'After: cliOptions',
      'Before: colors',
      'colors.help.command.description = white',
      'colors.help.command.name = blue',
      'colors.help.command.option.description = gray',
      'colors.help.command.option.name = magenta',
      'colors.help.title = cyan',
      'After: colors',
    ],
  },
  outputs: logs,
  errors: errs,
};
