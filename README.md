# Customizer [![NPM version][npm-image]][npm-url] [![Build Status][travis-image][travis-url]

Load customizing files in which chain style options are written.

## Install

Install `customizer` with npm:

```bash
$ npm install --save customizer
```

### Usage

#### Construct a customizer instance.

```js
var Customizer = require('customizer');
var customizer = new Customizer();
```

#### Set default customizable options.

```js
customizer.customized.colors = {
  help: {
    title: black,
    command: {
      name: 'blue',
      description: 'black',
      option: {
        name: 'magenta',
        description: 'black',
      },
    },
  },
};
```

#### Make customizable.

```js
customizer.makeCustomizable();
```

#### Prepare a customizing file

```js
(~/.apprc file)
colors.help.title = 'cyan';
colors.help.command.description = 'white';
colors.help.command.option.description = 'gray';
```

#### Load customizing files

```js
var filepath = path.resolve(os.homedir(), '.apprc';

customizer.customize(filepath, function(e) {
  if (e.notfound) {
    console.error('File not found: ' + e.file));
  } else if (e.readerror) {
    console.error('Error in file: ' + e.file + ' : ' + e.cause.message));
  }
});
```

#### Print customizable option list.

```js
customizer.enumerated.colors = function(key, color) {
  console.log(key + ' = "' + color + '"');
};
customizer.enumerated._before = function() {
  console.log('// App customizable option list');
};
customizer.enumerated[optname]._before = function() {
  console.log('\n// Color mapping');
};
customizer.enumerated[optname]._after = function() {
  console.log('\n// Color mapping');
};

customizer.enumerate();
```

```bash
(console output)
// App customizable option list

// Color mapping
colors.help.command.description = "gray"
colors.help.command.name = "blue"
colors.help.command.option.description = "gray"
colors.help.command.option.name = "blue"

```

## APIs

### Variables

#### customizer.customized[optname] : object

A customizable option tree.

#### customizer.enumerated[optname] : function(key : string, value : any)

A user defined function which lists a pair of a option key and a option value. 

#### customizer.enumerated._before : function(optnames : [string])

A user defined function which outputs something before all options.

#### customizer.enumerated._after : function(optnames : [string])

A user defined function which outputs something after all options.

#### customizer.enumerated[optname]._before : function(key)

A user defined function which outputs something before a option.

#### customizer.enumerated[optname]._after : function(key)

A user defined function which outputs something after a option.

### Functions

#### customizer.makeCustomizable() : void

Makes user specified options customizable. This function is needed to execute before using `customizer.customize` function.

#### customizer.customize(filepath, errCb) : void

Loads a customizing file.

* **filepath** : string  -- a customizing file path.
* **errCb** : function(e : object) --- a callback function for errors.

If `filepath` was not found, `e.notfound` is `true`. If loading `filepath` was failed, `e.readerror` is `true`. You can get `filepath` with `e.file`. And you can get the error object with `e.cause`.

#### customizer.enumerate() : void

Lists customizable options. To set the format of the list, define `customizer.enumerated._before/_after` and `customizer.enumerate[optname]._before/_after`.


## License

Copyright (C) 2016 Takayuki Sato

This program is free software under [MIT](http://opensource.org/licenses/MIT) License.
See the file LICENSE in this distribution for mode details.


[npm-image]: http://img.shields.io/badge/npm-v0.1.0-blue.svg
[npm-url]: https://www.npmjs.org/package/customizer
[travis-image]: https://travis-ci.org/sttk/customizer.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/customizer
