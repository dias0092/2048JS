// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Grid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var GRID_SIZE = 4;
var CELL_SIZE = 15;
var CELL_GAP = 1;
var _cells = /*#__PURE__*/new WeakMap();
var _score = /*#__PURE__*/new WeakMap();
var _emptyCells = /*#__PURE__*/new WeakMap();
var Grid = /*#__PURE__*/function () {
  function Grid(gridElement) {
    var _this = this;
    _classCallCheck(this, Grid);
    _classPrivateFieldInitSpec(this, _emptyCells, {
      get: _get_emptyCells,
      set: void 0
    });
    _classPrivateFieldInitSpec(this, _cells, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _score, {
      writable: true,
      value: void 0
    });
    gridElement.style.setProperty("--grid-size", GRID_SIZE);
    gridElement.style.setProperty("--cell-size", "".concat(CELL_SIZE, "vmin"));
    gridElement.style.setProperty("--cell-gap", "".concat(CELL_GAP, "vmin"));
    _classPrivateFieldSet(this, _cells, createCellElements(gridElement).map(function (cellElement, index) {
      return new Cell(cellElement, index % GRID_SIZE, Math.floor(index / GRID_SIZE), _this);
    }));
    _classPrivateFieldSet(this, _score, 0);
  }
  _createClass(Grid, [{
    key: "cells",
    get: function get() {
      return _classPrivateFieldGet(this, _cells);
    }
  }, {
    key: "score",
    get: function get() {
      return _classPrivateFieldGet(this, _score);
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _score, value);
    }
  }, {
    key: "cellsByRow",
    get: function get() {
      return _classPrivateFieldGet(this, _cells).reduce(function (cellGrid, cell) {
        cellGrid[cell.y] = cellGrid[cell.y] || [];
        cellGrid[cell.y][cell.x] = cell;
        return cellGrid;
      }, []);
    }
  }, {
    key: "cellsByColumn",
    get: function get() {
      return _classPrivateFieldGet(this, _cells).reduce(function (cellGrid, cell) {
        cellGrid[cell.x] = cellGrid[cell.x] || [];
        cellGrid[cell.x][cell.y] = cell;
        return cellGrid;
      }, []);
    }
  }, {
    key: "randomEmptyCell",
    value: function randomEmptyCell() {
      var randomIndex = Math.floor(Math.random() * _classPrivateFieldGet(this, _emptyCells).length);
      return _classPrivateFieldGet(this, _emptyCells)[randomIndex];
    }
  }, {
    key: "updateScore",
    value: function updateScore(mergedValue) {
      _classPrivateFieldSet(this, _score, _classPrivateFieldGet(this, _score) + mergedValue);
    }
  }]);
  return Grid;
}();
exports.default = Grid;
function _get_emptyCells() {
  return _classPrivateFieldGet(this, _cells).filter(function (cell) {
    return cell.tile == null;
  });
}
var _cellElement = /*#__PURE__*/new WeakMap();
var _x = /*#__PURE__*/new WeakMap();
var _y = /*#__PURE__*/new WeakMap();
var _tile = /*#__PURE__*/new WeakMap();
var _mergeTile = /*#__PURE__*/new WeakMap();
var Cell = /*#__PURE__*/function () {
  function Cell(cellElement, x, y, grid) {
    _classCallCheck(this, Cell);
    _classPrivateFieldInitSpec(this, _cellElement, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _x, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _y, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _tile, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _mergeTile, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _cellElement, cellElement);
    _classPrivateFieldSet(this, _x, x);
    _classPrivateFieldSet(this, _y, y);
    this.grid = grid;
  }
  _createClass(Cell, [{
    key: "x",
    get: function get() {
      return _classPrivateFieldGet(this, _x);
    }
  }, {
    key: "y",
    get: function get() {
      return _classPrivateFieldGet(this, _y);
    }
  }, {
    key: "tile",
    get: function get() {
      return _classPrivateFieldGet(this, _tile);
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _tile, value);
      if (value == null) return;
      _classPrivateFieldGet(this, _tile).x = _classPrivateFieldGet(this, _x);
      _classPrivateFieldGet(this, _tile).y = _classPrivateFieldGet(this, _y);
    }
  }, {
    key: "mergeTile",
    get: function get() {
      return _classPrivateFieldGet(this, _mergeTile);
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _mergeTile, value);
      if (value == null) return;
      _classPrivateFieldGet(this, _mergeTile).x = _classPrivateFieldGet(this, _x);
      _classPrivateFieldGet(this, _mergeTile).y = _classPrivateFieldGet(this, _y);
    }
  }, {
    key: "tileValue",
    get: function get() {
      return this.tile ? this.tile.value : 0;
    }
  }, {
    key: "canAccept",
    value: function canAccept(tile) {
      return this.tile == null || this.mergeTile == null && this.tile.value === tile.value;
    }
  }, {
    key: "mergeTiles",
    value: function mergeTiles() {
      if (this.tile == null || this.mergeTile == null) return;
      var originalValue = this.tile.value;
      var mergedValue = this.tile.value + this.mergeTile.value;
      this.tile.value = mergedValue;
      this.mergeTile.remove();
      this.mergeTile = null;
      this.grid.updateScore(originalValue);
    }
  }]);
  return Cell;
}();
function createCellElements(gridElement) {
  var cells = [];
  for (var i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    var cell = document.createElement("div");
    cell.classList.add("cell");
    cells.push(cell);
    gridElement.append(cell);
  }
  return cells;
}
},{}],"src/Tile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _tileElement = /*#__PURE__*/new WeakMap();
var _x = /*#__PURE__*/new WeakMap();
var _y = /*#__PURE__*/new WeakMap();
var _value = /*#__PURE__*/new WeakMap();
var Tile = /*#__PURE__*/function () {
  function Tile(tileContainer, fourProbability) {
    _classCallCheck(this, Tile);
    _classPrivateFieldInitSpec(this, _tileElement, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _x, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _y, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _value, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _tileElement, document.createElement("div"));
    _classPrivateFieldGet(this, _tileElement).classList.add("tile");
    tileContainer.append(_classPrivateFieldGet(this, _tileElement));
    this.value = Math.random() > fourProbability ? 2 : 4;
  }
  _createClass(Tile, [{
    key: "value",
    get: function get() {
      return _classPrivateFieldGet(this, _value);
    },
    set: function set(v) {
      _classPrivateFieldSet(this, _value, v);
      _classPrivateFieldGet(this, _tileElement).textContent = v;
      var power = Math.log2(v);
      var backgroundLightness = 100 - power * 9;
      _classPrivateFieldGet(this, _tileElement).style.setProperty("--background-lightness", "".concat(backgroundLightness, "%"));
      _classPrivateFieldGet(this, _tileElement).style.setProperty("--text-lightness", "".concat(backgroundLightness <= 50 ? 90 : 10, "%"));
    }
  }, {
    key: "x",
    set: function set(value) {
      _classPrivateFieldSet(this, _x, value);
      _classPrivateFieldGet(this, _tileElement).style.setProperty("--x", value);
    }
  }, {
    key: "y",
    set: function set(value) {
      _classPrivateFieldSet(this, _y, value);
      _classPrivateFieldGet(this, _tileElement).style.setProperty("--y", value);
    }
  }, {
    key: "remove",
    value: function remove() {
      _classPrivateFieldGet(this, _tileElement).remove();
    }
  }, {
    key: "waitForTransition",
    value: function waitForTransition() {
      var _this = this;
      var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return new Promise(function (resolve) {
        _classPrivateFieldGet(_this, _tileElement).addEventListener(animation ? "animationend" : "transitionend", resolve, {
          once: true
        });
      });
    }
  }]);
  return Tile;
}();
exports.default = Tile;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

var _Grid = _interopRequireDefault(require("./Grid.js"));
var _Tile = _interopRequireDefault(require("./Tile.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var gameBoard = document.getElementById("game-board");
var scoreValue = document.getElementById("score");
var grid = new _Grid.default(gameBoard);
var gameOverModal = document.getElementById("game-over-modal");
var finalScoreSpan = document.getElementById("final-score");
var closeModalBtn = document.getElementById("close-modal-btn");
var highScore = localStorage.getItem('highScore') || 0;
var highScoreTime = localStorage.getItem('highScoreTime') || 0;
var startTime = Date.now();
var endTime;
var totalTime;
var difficulty = 'easy';
var fourProbability = 0.2;
document.getElementById('difficulty').addEventListener('change', function (e) {
  difficulty = e.target.value;
  if (difficulty === 'easy') {
    fourProbability = 0.2;
  } else if (difficulty === 'medium') {
    fourProbability = 0.3;
  } else if (difficulty === 'hard') {
    fourProbability = 0.5;
  }
});
document.getElementById("new-game").addEventListener("click", newGame);
grid.randomEmptyCell().tile = new _Tile.default(gameBoard, fourProbability);
grid.randomEmptyCell().tile = new _Tile.default(gameBoard, fourProbability);
setupInput();
closeModalBtn.onclick = function () {
  gameOverModal.style.display = "none";
};
function gameOver() {
  endTime = Date.now();
  finalScoreSpan.textContent = grid.score;
  gameOverModal.style.display = "block";
  totalTime = (endTime - startTime) / 1000;
  if (grid.score > highScore || grid.score === highScore && totalTime < highScoreTime) {
    highScore = grid.score;
    highScoreTime = totalTime;
    localStorage.setItem('highScore', highScore);
    localStorage.setItem('highScoreTime', highScoreTime);
    document.getElementById('high-score').textContent = "High Score: ".concat(highScore);
    document.getElementById('high-score-time').textContent = "Time: ".concat(highScoreTime, "s");
  }
}
function setupInput() {
  window.addEventListener("keydown", handleInput, {
    once: true
  });
}
function handleInput(_x) {
  return _handleInput.apply(this, arguments);
}
function _handleInput() {
  _handleInput = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
    var newTile;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = e.key;
          _context.next = _context.t0 === "ArrowUp" ? 3 : _context.t0 === "ArrowDown" ? 9 : _context.t0 === "ArrowLeft" ? 15 : _context.t0 === "ArrowRight" ? 21 : 27;
          break;
        case 3:
          if (canMoveUp()) {
            _context.next = 6;
            break;
          }
          setupInput();
          return _context.abrupt("return");
        case 6:
          _context.next = 8;
          return moveUp();
        case 8:
          return _context.abrupt("break", 29);
        case 9:
          if (canMoveDown()) {
            _context.next = 12;
            break;
          }
          setupInput();
          return _context.abrupt("return");
        case 12:
          _context.next = 14;
          return moveDown();
        case 14:
          return _context.abrupt("break", 29);
        case 15:
          if (canMoveLeft()) {
            _context.next = 18;
            break;
          }
          setupInput();
          return _context.abrupt("return");
        case 18:
          _context.next = 20;
          return moveLeft();
        case 20:
          return _context.abrupt("break", 29);
        case 21:
          if (canMoveRight()) {
            _context.next = 24;
            break;
          }
          setupInput();
          return _context.abrupt("return");
        case 24:
          _context.next = 26;
          return moveRight();
        case 26:
          return _context.abrupt("break", 29);
        case 27:
          setupInput();
          return _context.abrupt("return");
        case 29:
          grid.cells.forEach(function (cell) {
            return cell.mergeTiles();
          });
          scoreValue.textContent = "Score: ".concat(grid.score);
          newTile = new _Tile.default(gameBoard, fourProbability);
          grid.randomEmptyCell().tile = newTile;
          if (!(!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight())) {
            _context.next = 36;
            break;
          }
          newTile.waitForTransition(true).then(function () {
            clearInterval(botInterval);
            gameOver();
          });
          return _context.abrupt("return");
        case 36:
          setupInput();
        case 37:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _handleInput.apply(this, arguments);
}
var botButton = document.createElement("button");
botButton.textContent = "Bot";
botButton.classList.add("btn");
botButton.addEventListener("click", runBot);
document.body.appendChild(botButton);
var botInterval;
function runBot() {
  botButton.disabled = true;
  botInterval = setInterval(function () {
    var directions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    var randomDirection = directions[Math.floor(Math.random() * directions.length)];
    var event = new KeyboardEvent("keydown", {
      key: randomDirection
    });
    handleInput(event);
    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
      clearInterval(botInterval);
      botButton.disabled = false;
      gameOver();
    }
  }, 500);
}
function moveUp() {
  return slideTiles(grid.cellsByColumn);
}
function moveDown() {
  return slideTiles(grid.cellsByColumn.map(function (column) {
    return _toConsumableArray(column).reverse();
  }));
}
function moveLeft() {
  return slideTiles(grid.cellsByRow);
}
function moveRight() {
  return slideTiles(grid.cellsByRow.map(function (row) {
    return _toConsumableArray(row).reverse();
  }));
}
function slideTiles(cells) {
  return Promise.all(cells.flatMap(function (group) {
    var promises = [];
    for (var i = 1; i < group.length; i++) {
      var cell = group[i];
      if (cell.tile == null) continue;
      var lastValidCell = void 0;
      for (var j = i - 1; j >= 0; j--) {
        var moveToCell = group[j];
        if (!moveToCell.canAccept(cell.tile)) break;
        lastValidCell = moveToCell;
      }
      if (lastValidCell != null) {
        promises.push(cell.tile.waitForTransition());
        if (lastValidCell.tile != null) {
          lastValidCell.mergeTile = cell.tile;
        } else {
          lastValidCell.tile = cell.tile;
        }
        cell.tile = null;
      }
    }
    return promises;
  }));
}
function canMoveUp() {
  return canMove(grid.cellsByColumn);
}
function canMoveDown() {
  return canMove(grid.cellsByColumn.map(function (column) {
    return _toConsumableArray(column).reverse();
  }));
}
function canMoveLeft() {
  return canMove(grid.cellsByRow);
}
function canMoveRight() {
  return canMove(grid.cellsByRow.map(function (row) {
    return _toConsumableArray(row).reverse();
  }));
}
function canMove(cells) {
  return cells.some(function (group) {
    return group.some(function (cell, index) {
      if (index === 0) return false;
      if (cell.tile == null) return false;
      var moveToCell = group[index - 1];
      return moveToCell.canAccept(cell.tile);
    });
  });
}
function newGame() {
  startTime = Date.now();
  grid.cells.forEach(function (cell) {
    if (cell.tile) {
      cell.tile.remove();
      cell.tile = null;
    }
  });
  document.getElementById('high-score').textContent = "High Score: ".concat(highScore);
  document.getElementById('high-score-time').textContent = "Time: ".concat(highScoreTime, "ms");
  grid.randomEmptyCell().tile = new _Tile.default(gameBoard);
  grid.randomEmptyCell().tile = new _Tile.default(gameBoard);
  grid.score = 0;
  scoreValue.textContent = "Score: ".concat(grid.score);
  clearInterval(botInterval);
  botButton.disabled = false;
  setupInput();
}
},{"./Grid.js":"src/Grid.js","./Tile.js":"src/Tile.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45327" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map