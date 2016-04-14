'use strict';

var vm = require('vm');
var fs = require('fs');

var isPlainObject = require('lodash.isplainobject');
var isArray = require('lodash.isarray');
var isFunction = require('lodash.isfunction');
var isUndefined = require('lodash.isundefined');

var semver = require('semver');

var Customizer = function() {
  Constructor.prototype = Customizer.prototype;
  return new Constructor();

  /* $lab:coverage:off$ */
  function Constructor() {
    /* $lab:coverage:on$ */
    this.customized = {};
    this.enumerated = {};
  }
};

Customizer.prototype.makeCustomizable = function() {
  this.customized.require = require;
  this.customized.console = console;
  vm.createContext(this.customized);
};

function noop() {}

Customizer.prototype.customize = function(filepath, err) {
  err = err || noop;
  if (fs.existsSync(filepath)) {
    try {
      var js = fs.readFileSync(filepath, { encoding: 'utf-8' });
      /* $lab:coverage:off$ */
      if (semver.lt(process.version, '0.12.0')) {
        vm.runInNewContext(js, this.customized);
        /* $lab:coverage:on$ */
      } else {
        vm.runInContext(js, this.customized);
      }
    } catch (e) {
      err({ readerror: true, cause: e, file: filepath });
    }
  } else {
    err({ notfound: true, file: filepath });
  }
};

Customizer.prototype.enumerate = function() {
  var keys = Object.keys(this.enumerated).sort();

  for (var i = 0, n = keys.length; i < n; i++) {
    var key = keys[i];
    var each = this.enumerated[key];

    if (isFunction(each.before)) {
      each.before(key);
    }

    enumerateRcr(getNode(this.customized, key), key, each);

    if (isFunction(each.after)) {
      each.after(key);
    }
  }
};

function getNode(node, key) {
  key = isArray(key) ? key : key.split('.');
  if (key.length === 0) {
    return node;
  }
  if (!isPlainObject(node)) {
    return undefined;
  }
  return getNode(node[key[0]], key.slice(1));
}

function enumerateRcr(baseNode, baseKey, collector) {
  if (isUndefined(baseNode)) { // only undefined because null can be a value.
    return;
  }

  if (!isPlainObject(baseNode)) {
    collector(baseKey, baseNode);
    return;
  }

  var keys = Object.keys(baseNode).sort();
  for (var i = 0, n = keys.length; i < n; i++) {
    enumerateRcr(baseNode[keys[i]], baseKey + '.' + keys[i], collector);
  }
}

module.exports = Customizer;
