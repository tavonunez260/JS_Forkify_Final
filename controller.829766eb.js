// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"577f68edd944528ca8ba01102fd1ca3d":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "829766ebc5729cd3b357d50cc8d9d90b";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

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
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
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
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
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

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
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
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"82e15b0fd0ba970f839fe38d0b391b38":[function(require,module,exports) {
require('./bundle-manifest').register(JSON.parse("{\"b357d50cc8d9d90b\":\"controller.829766eb.js\",\"4167fa27629ce031\":\"icons.f12f217a.svg\"}"));
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"ba8df6b71e73837c465d69bebde6e64d":[function(require,module,exports) {
"use strict";

var mapping = {};

function register(pairs) {
  var keys = Object.keys(pairs);

  for (var i = 0; i < keys.length; i++) {
    mapping[keys[i]] = pairs[keys[i]];
  }
}

function resolve(id) {
  var resolved = mapping[id];

  if (resolved == null) {
    throw new Error('Could not resolve bundle with id ' + id);
  }

  return resolved;
}

module.exports.register = register;
module.exports.resolve = resolve;
},{}],"175e469a7ea7db1c8c0744d04372621f":[function(require,module,exports) {
"use strict";

require("core-js/modules/web.immediate.js");

var model = _interopRequireWildcard(require("./model.js"));

var _config = require("./config.js");

var _recipeView = _interopRequireDefault(require("./views/recipeView.js"));

var _searchView = _interopRequireDefault(require("./views/searchView.js"));

var _resultsView = _interopRequireDefault(require("./views/resultsView.js"));

var _paginationView = _interopRequireDefault(require("./views/paginationView.js"));

var _bookmarksView = _interopRequireDefault(require("./views/bookmarksView.js"));

var _addRecipeView = _interopRequireDefault(require("./views/addRecipeView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); //To avoid not having any ID to load - guard clause

    if (!id) return; //0. Update results view to selected search result

    _resultsView.default.update(model.getSearchResultsPage()); //1. Update bookmarks


    _bookmarksView.default.update(model.state.bookmarks); //2. Loading recipe


    await model.loadRecipe(id); //3. Rendering recipe

    _recipeView.default.render(model.state.recipe);
  } catch (err) {
    _recipeView.default.renderError();

    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    //1. Get query from from
    const query = _searchView.default.getQuery();

    if (!query) return; //2. Load results

    await model.loadSearchResults(query); //3. Render results

    _resultsView.default.render(model.getSearchResultsPage()); //4. Render initial pagination buttons


    _paginationView.default.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  //1. Render new results
  _resultsView.default.render(model.getSearchResultsPage(goToPage)); //2. Render new pagination buttons


  _paginationView.default.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update recipe servings (in state)
  model.updateServings(newServings); //Update the view
  //recipeView.render(model.state.recipe);

  _recipeView.default.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1. Add/delete bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);else model.deleteBookmark(model.state.recipe.id); //2. Update recipe view

  _recipeView.default.update(model.state.recipe); //3. Render bookmarks


  _bookmarksView.default.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  _bookmarksView.default.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    //1. Upload the new recipe data
    await model.uploadRecipe(newRecipe); //2. Render recipe

    _recipeView.default.render(model.state.recipe); //3. Success message


    _addRecipeView.default.renderMessage(); //4. Render bookmarks view;


    _bookmarksView.default.render(model.state.bookmarks); //5. Change ID in the URL


    window.history.pushState(null, '', `#${model.state.recipe.id}`); //5. Close form window

    setTimeout(function () {
      _addRecipeView.default._toggleWindow();
    }, _config.MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);

    _addRecipeView.default.renderError(err.message);
  }
};

const init = function () {
  _bookmarksView.default.addHandlerRender(controlBookmarks);

  _recipeView.default.addHandlerRender(controlRecipes);

  _recipeView.default.addHandlerUpdateServings(controlServings);

  _recipeView.default.addHandlerAddBookmark(controlAddBookmark);

  _searchView.default.addHandlerSearch(controlSearchResults);

  _paginationView.default.addHandlerClick(controlPagination);

  _addRecipeView.default.addHandlerUpload(controlAddRecipe);
};

init();
},{"core-js/modules/web.immediate.js":"140df4f8e97a45c53c66fead1f5a9e92","./model.js":"aabf248f40f7693ef84a0cb99f385d1f","./config.js":"09212d541c5c40ff2bd93475a904f8de","./views/recipeView.js":"bcae1aced0301b01ccacb3e6f7dfede8","./views/searchView.js":"c5d792f7cac03ef65de30cc0fbb2cae7","./views/resultsView.js":"eacdbc0d50ee3d2819f3ee59366c2773","./views/paginationView.js":"d2063f3e7de2e4cdacfcb5eb6479db05","./views/bookmarksView.js":"7ed9311e216aa789713f70ebeec3ed40","./views/addRecipeView.js":"4dd83c2a08c1751220d223c54dc70016"}],"140df4f8e97a45c53c66fead1f5a9e92":[function(require,module,exports) {
var $ = require('../internals/export');

var global = require('../internals/global');

var task = require('../internals/task');

var FORCED = !global.setImmediate || !global.clearImmediate; // http://w3c.github.io/setImmediate/

$({
  global: true,
  bind: true,
  enumerable: true,
  forced: FORCED
}, {
  // `setImmediate` method
  // http://w3c.github.io/setImmediate/#si-setImmediate
  setImmediate: task.set,
  // `clearImmediate` method
  // http://w3c.github.io/setImmediate/#si-clearImmediate
  clearImmediate: task.clear
});
},{"../internals/export":"10044f24ecae4059b4af184e71d3fba2","../internals/global":"7e78823454e7f795898745d93279f917","../internals/task":"dd47ece3e1296f193ccefcf3056d1754"}],"10044f24ecae4059b4af184e71d3fba2":[function(require,module,exports) {
var global = require('../internals/global');

var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var redefine = require('../internals/redefine');

var setGlobal = require('../internals/set-global');

var copyConstructorProperties = require('../internals/copy-constructor-properties');

var isForced = require('../internals/is-forced');
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/redefine":"b8f156ba0e16ecf7371c0d9dbd0a7d60","../internals/set-global":"7e47fd3b4d01808069dad42c38d45146","../internals/copy-constructor-properties":"df952df9fa85293fe01bbdf9f7116b1b","../internals/is-forced":"700278f8e2cb4c21784f4e50866ce0e4"}],"7e78823454e7f795898745d93279f917":[function(require,module,exports) {
var global = arguments[3];

var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();
},{}],"5e181b7e7dcb1bb2de0a726b7af1e93d":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPrimitive = require('../internals/to-primitive');
var has = require('../internals/has');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/object-property-is-enumerable":"6d666488e852af6845747bbd2705cc05","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/to-primitive":"2a7f05f0f9119d3b88a770acfa30cc7b","../internals/has":"ce850695ec64cefd211ef6863461b802","../internals/ie8-dom-define":"e03ae13f7b17b2e21331d728bd059d1a"}],"7e006cebe93fc4773e87d3146a8fa81b":[function(require,module,exports) {
var fails = require('../internals/fails');

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"e16fc2ec92bf0d6254ffef14ea12ad77":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],"6d666488e852af6845747bbd2705cc05":[function(require,module,exports) {
'use strict';
var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

},{}],"8c5551ce5a79ddcd7162c3e3c8f33c9a":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"debf68affb1e9f1283fa252d49c32ceb":[function(require,module,exports) {
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":"35ae890303b620d792cd5faa73776178","../internals/require-object-coercible":"5617d8f084e26c58afcbde9a0982cf37"}],"35ae890303b620d792cd5faa73776178":[function(require,module,exports) {
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/classof-raw":"901e5a25291bac244011feea921975b2"}],"901e5a25291bac244011feea921975b2":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"5617d8f084e26c58afcbde9a0982cf37":[function(require,module,exports) {
// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

},{}],"2a7f05f0f9119d3b88a770acfa30cc7b":[function(require,module,exports) {
var isObject = require('../internals/is-object');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"../internals/is-object":"03244e745134af366d66b74456891052"}],"03244e745134af366d66b74456891052":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"ce850695ec64cefd211ef6863461b802":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"e03ae13f7b17b2e21331d728bd059d1a":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/document-create-element":"cbe47a0c6cb67b97db834ad53049114a"}],"cbe47a0c6cb67b97db834ad53049114a":[function(require,module,exports) {
var global = require('../internals/global');

var isObject = require('../internals/is-object');

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-object":"03244e745134af366d66b74456891052"}],"b52adb17d2cebacfac251681882f0a33":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f","../internals/create-property-descriptor":"8c5551ce5a79ddcd7162c3e3c8f33c9a"}],"645ef963c1e312a12b44589911036a7f":[function(require,module,exports) {
var DESCRIPTORS = require('../internals/descriptors');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');
var anObject = require('../internals/an-object');
var toPrimitive = require('../internals/to-primitive');

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"../internals/descriptors":"7e006cebe93fc4773e87d3146a8fa81b","../internals/ie8-dom-define":"e03ae13f7b17b2e21331d728bd059d1a","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd","../internals/to-primitive":"2a7f05f0f9119d3b88a770acfa30cc7b"}],"4f20fc1a2160760f9e7961d272520cbd":[function(require,module,exports) {
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

},{"../internals/is-object":"03244e745134af366d66b74456891052"}],"b8f156ba0e16ecf7371c0d9dbd0a7d60":[function(require,module,exports) {
var global = require('../internals/global');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var has = require('../internals/has');

var setGlobal = require('../internals/set-global');

var inspectSource = require('../internals/inspect-source');

var InternalStateModule = require('../internals/internal-state');

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;

  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }

    state = enforceInternalState(value);

    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }

  if (O === global) {
    if (simple) O[key] = value;else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/has":"ce850695ec64cefd211ef6863461b802","../internals/set-global":"7e47fd3b4d01808069dad42c38d45146","../internals/inspect-source":"2632e39e653b5d5a3bae68e9954b90e4","../internals/internal-state":"8b9f5ed7c6f8b05b4cd6ee1eefa801c1"}],"7e47fd3b4d01808069dad42c38d45146":[function(require,module,exports) {
var global = require('../internals/global');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  }

  return value;
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33"}],"2632e39e653b5d5a3bae68e9954b90e4":[function(require,module,exports) {
var store = require('../internals/shared-store');

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;

},{"../internals/shared-store":"050f18cf9a95404c13e77ce244078f47"}],"050f18cf9a95404c13e77ce244078f47":[function(require,module,exports) {
var global = require('../internals/global');

var setGlobal = require('../internals/set-global');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/set-global":"7e47fd3b4d01808069dad42c38d45146"}],"8b9f5ed7c6f8b05b4cd6ee1eefa801c1":[function(require,module,exports) {
var NATIVE_WEAK_MAP = require('../internals/native-weak-map');

var global = require('../internals/global');

var isObject = require('../internals/is-object');

var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var objectHas = require('../internals/has');

var shared = require('../internals/shared-store');

var sharedKey = require('../internals/shared-key');

var hiddenKeys = require('../internals/hidden-keys');

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;

  set = function (it, metadata) {
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget.call(store, it) || {};
  };

  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function (it, metadata) {
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };

  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};
},{"../internals/native-weak-map":"3633a06fd667b2a3966200ce5e2edda9","../internals/global":"7e78823454e7f795898745d93279f917","../internals/is-object":"03244e745134af366d66b74456891052","../internals/create-non-enumerable-property":"b52adb17d2cebacfac251681882f0a33","../internals/has":"ce850695ec64cefd211ef6863461b802","../internals/shared-store":"050f18cf9a95404c13e77ce244078f47","../internals/shared-key":"18fb64363b0383efc58d7addc88469cd","../internals/hidden-keys":"7cf9eee6c00d9cc7018f7817cf84e3d6"}],"3633a06fd667b2a3966200ce5e2edda9":[function(require,module,exports) {
var global = require('../internals/global');

var inspectSource = require('../internals/inspect-source');

var WeakMap = global.WeakMap;
module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/inspect-source":"2632e39e653b5d5a3bae68e9954b90e4"}],"18fb64363b0383efc58d7addc88469cd":[function(require,module,exports) {
var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":"1950ed6cf8f0dece2a998d60590e9098","../internals/uid":"d5b7e7679d9dac163ab327cbf9508501"}],"1950ed6cf8f0dece2a998d60590e9098":[function(require,module,exports) {
var IS_PURE = require('../internals/is-pure');
var store = require('../internals/shared-store');

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.10.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});

},{"../internals/is-pure":"f767c4b71b5cfe3ee6c1a7e54bdcafa0","../internals/shared-store":"050f18cf9a95404c13e77ce244078f47"}],"f767c4b71b5cfe3ee6c1a7e54bdcafa0":[function(require,module,exports) {
module.exports = false;

},{}],"d5b7e7679d9dac163ab327cbf9508501":[function(require,module,exports) {
var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

},{}],"7cf9eee6c00d9cc7018f7817cf84e3d6":[function(require,module,exports) {
module.exports = {};

},{}],"df952df9fa85293fe01bbdf9f7116b1b":[function(require,module,exports) {
var has = require('../internals/has');
var ownKeys = require('../internals/own-keys');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

},{"../internals/has":"ce850695ec64cefd211ef6863461b802","../internals/own-keys":"a99313addb30af59e8e5785ab390671c","../internals/object-get-own-property-descriptor":"5e181b7e7dcb1bb2de0a726b7af1e93d","../internals/object-define-property":"645ef963c1e312a12b44589911036a7f"}],"a99313addb30af59e8e5785ab390671c":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var anObject = require('../internals/an-object');

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164","../internals/object-get-own-property-names":"b422be4dea2e1243d9a0803066cc2d3d","../internals/object-get-own-property-symbols":"f759fc76793903b9cadc1e3a84780ff9","../internals/an-object":"4f20fc1a2160760f9e7961d272520cbd"}],"a8e7e15d3af5a0a555019aebcf7ed164":[function(require,module,exports) {
var path = require('../internals/path');

var global = require('../internals/global');

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};
},{"../internals/path":"da95d5e8f7bf2e6702061407876f0910","../internals/global":"7e78823454e7f795898745d93279f917"}],"da95d5e8f7bf2e6702061407876f0910":[function(require,module,exports) {
var global = require('../internals/global');

module.exports = global;
},{"../internals/global":"7e78823454e7f795898745d93279f917"}],"b422be4dea2e1243d9a0803066cc2d3d":[function(require,module,exports) {
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/object-keys-internal":"87cfa515865c83e03f632cbb3fb5fffb","../internals/enum-bug-keys":"f973a6d08ba70476eedabcaf4b58c5fb"}],"87cfa515865c83e03f632cbb3fb5fffb":[function(require,module,exports) {
var has = require('../internals/has');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

},{"../internals/has":"ce850695ec64cefd211ef6863461b802","../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/array-includes":"8d0989f06759b3b2c526a5860656b2fc","../internals/hidden-keys":"7cf9eee6c00d9cc7018f7817cf84e3d6"}],"8d0989f06759b3b2c526a5860656b2fc":[function(require,module,exports) {
var toIndexedObject = require('../internals/to-indexed-object');
var toLength = require('../internals/to-length');
var toAbsoluteIndex = require('../internals/to-absolute-index');

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

},{"../internals/to-indexed-object":"debf68affb1e9f1283fa252d49c32ceb","../internals/to-length":"68c0420762f5f4704115d4fb34e0ae7f","../internals/to-absolute-index":"ff996ac5a229620b351a78c404035460"}],"68c0420762f5f4704115d4fb34e0ae7f":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer":"c0972d049bc20bd69592e8a28601d5ad"}],"c0972d049bc20bd69592e8a28601d5ad":[function(require,module,exports) {
var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

},{}],"ff996ac5a229620b351a78c404035460":[function(require,module,exports) {
var toInteger = require('../internals/to-integer');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer":"c0972d049bc20bd69592e8a28601d5ad"}],"f973a6d08ba70476eedabcaf4b58c5fb":[function(require,module,exports) {
// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

},{}],"f759fc76793903b9cadc1e3a84780ff9":[function(require,module,exports) {
// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

},{}],"700278f8e2cb4c21784f4e50866ce0e4":[function(require,module,exports) {
var fails = require('../internals/fails');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;

},{"../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77"}],"dd47ece3e1296f193ccefcf3056d1754":[function(require,module,exports) {
var global = require('../internals/global');

var fails = require('../internals/fails');

var bind = require('../internals/function-bind-context');

var html = require('../internals/html');

var createElement = require('../internals/document-create-element');

var IS_IOS = require('../internals/engine-is-ios');

var IS_NODE = require('../internals/engine-is-node');

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;

    while (arguments.length > i) args.push(arguments[i++]);

    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };

    defer(counter);
    return counter;
  };

  clear = function clearImmediate(id) {
    delete queue[id];
  }; // Node.js 0.8-


  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    }; // Sphere (JS game engine) Dispatch API

  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    }; // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624

  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && location && location.protocol !== 'file:' && !fails(post)) {
    defer = post;
    global.addEventListener('message', listener, false); // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    }; // Rest old browsers

  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};
},{"../internals/global":"7e78823454e7f795898745d93279f917","../internals/fails":"e16fc2ec92bf0d6254ffef14ea12ad77","../internals/function-bind-context":"f9e6dc73b4a152f549e8299150ac260e","../internals/html":"1918dab06b404ee3e52f081d798c1688","../internals/document-create-element":"cbe47a0c6cb67b97db834ad53049114a","../internals/engine-is-ios":"3156eb661c8c8e66a6d95c3b2d979fb4","../internals/engine-is-node":"42c67226e3ca045b9c35647f16133bfa"}],"f9e6dc73b4a152f549e8299150ac260e":[function(require,module,exports) {
var aFunction = require('../internals/a-function');

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"../internals/a-function":"89591e5698008ce996ea07a1e38aa687"}],"89591e5698008ce996ea07a1e38aa687":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

},{}],"1918dab06b404ee3e52f081d798c1688":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164"}],"3156eb661c8c8e66a6d95c3b2d979fb4":[function(require,module,exports) {
var userAgent = require('../internals/engine-user-agent');

module.exports = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent);

},{"../internals/engine-user-agent":"143c26fec04440461ecc4dae3ad13828"}],"143c26fec04440461ecc4dae3ad13828":[function(require,module,exports) {
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('navigator', 'userAgent') || '';

},{"../internals/get-built-in":"a8e7e15d3af5a0a555019aebcf7ed164"}],"42c67226e3ca045b9c35647f16133bfa":[function(require,module,exports) {
var classof = require('../internals/classof-raw');

var global = require('../internals/global');

module.exports = classof(global.process) == 'process';
},{"../internals/classof-raw":"901e5a25291bac244011feea921975b2","../internals/global":"7e78823454e7f795898745d93279f917"}],"aabf248f40f7693ef84a0cb99f385d1f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadRecipe = exports.deleteBookmark = exports.addBookmark = exports.updateServings = exports.getSearchResultsPage = exports.loadSearchResults = exports.loadRecipe = exports.state = void 0;

var _config = require("./config.js");

var _helpers = require("./helpers.js");

const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: _config.RES_PER_PAGE
  },
  bookmarks: []
};
exports.state = state;

const createRecipeObject = function (data) {
  const {
    recipe
  } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceURL: recipe.source_url,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    time: recipe.cooking_time,
    ...(recipe.key && {
      key: recipe.key
    })
  };
};

const loadRecipe = async function (id) {
  try {
    const data = await (0, _helpers.AJAX)(`${_config.API_URL}${id}?key=${_config.KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.loadRecipe = loadRecipe;

const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await (0, _helpers.AJAX)(`${_config.API_URL}?search=${query}&key=${_config.KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && {
          key: rec.key
        })
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.loadSearchResults = loadSearchResults;

const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

exports.getSearchResultsPage = getSearchResultsPage;

const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity = ingredient.quantity * newServings / state.recipe.servings; //newQt = oldQt * newServings / oldServings
  });
  state.recipe.servings = newServings;
};

exports.updateServings = updateServings;

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const addBookmark = function (recipe) {
  //Add bookmark
  state.bookmarks.push(recipe); //Mark current recipe as bookmark

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

exports.addBookmark = addBookmark;

const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(value => value.id === id);
  state.bookmarks.splice(index, 1); //Mark current recipe as bookmark

  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

exports.deleteBookmark = deleteBookmark;

const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '').map(ingredient => {
      const ingArr = ingredient[1].split(',').map(element => element.trim()); //const ingArr = ingredient[1].replaceAll(' ', '').split(',');

      const [quantity, unit, description] = ingArr;
      if (ingArr.length !== 3) throw new Error('Wrong ingredient format. Please use correct format');
      return {
        quantity: quantity ? Number(quantity) : null,
        unit,
        description
      };
    });
    const recipe = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceURL,
      image_url: newRecipe.image,
      servings: Number(newRecipe.servings),
      cooking_time: Number(newRecipe.time),
      ingredients
    };
    const data = await (0, _helpers.AJAX)(`${_config.API_URL}?key=${_config.KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

exports.uploadRecipe = uploadRecipe;

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

init();
},{"./config.js":"09212d541c5c40ff2bd93475a904f8de","./helpers.js":"0e8dcd8a4e1c61cf18f78e1c2563655d"}],"09212d541c5c40ff2bd93475a904f8de":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MODAL_CLOSE_SEC = exports.KEY = exports.RES_PER_PAGE = exports.TIMEOUT_SEC = exports.API_URL = void 0;
const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
exports.API_URL = API_URL;
const TIMEOUT_SEC = 10;
exports.TIMEOUT_SEC = TIMEOUT_SEC;
const RES_PER_PAGE = 10;
exports.RES_PER_PAGE = RES_PER_PAGE;
const KEY = '5fec3847-88f2-41b9-b07c-8f37c08fd875';
exports.KEY = KEY;
const MODAL_CLOSE_SEC = 2.5;
exports.MODAL_CLOSE_SEC = MODAL_CLOSE_SEC;
},{}],"0e8dcd8a4e1c61cf18f78e1c2563655d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendJSON = exports.getJSON = exports.AJAX = void 0;

var _config = require("./config.js");

const timeout = function (s) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second(s)`));
    }, s * 1000);
  });
};

const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData ? fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadData)
    }) : fetch(url);
    const res = await Promise.race([fetchPro, timeout(_config.TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}, ${data.error} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

exports.AJAX = AJAX;

const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(_config.TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}, ${data.error} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

exports.getJSON = getJSON;

const sendJSON = async function (url, uploadData) {
  try {
    const fetchURL = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadData)
    });
    const res = await Promise.race([fetchURL, timeout(_config.TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message}, ${data.error} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

exports.sendJSON = sendJSON;
},{"./config.js":"09212d541c5c40ff2bd93475a904f8de"}],"bcae1aced0301b01ccacb3e6f7dfede8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _View = _interopRequireDefault(require("./View.js"));

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

var _fractional = require("fractional");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RecipeView extends _View.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_parentElement", document.querySelector('.recipe'));

    _defineProperty(this, "_errorMessage", 'We could not find that recipe. Please try another one!');

    _defineProperty(this, "_message", '');
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(e => window.addEventListener(e, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return; //console.log(btn);

      const updateTo = Number(btn.dataset.updateTo);
      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
        <figure class="recipe__fig">
            <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
            <h1 class="recipe__title">
            <span>${this._data.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">

            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${_icons.default}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${this._data.time}</span>
                <span class="recipe__info-text">minutes</span>
            </div>

            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="${_icons.default}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings - 1}">
                        <svg>
                            <use href="${_icons.default}#icon-minus-circle"></use>
                        </svg>
                    </button>
                    <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings + 1}">
                        <svg>
                            <use href="${_icons.default}#icon-plus-circle"></use>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
                <svg>
                    <use href="${_icons.default}#icon-user"></use>
                </svg>
            </div>

            <button class="btn--round btn--bookmark">
                <svg class="">
                    <use href="${_icons.default}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
            </ul>
        </div>

        <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
            directions at their website.
            </p>
            <a 
            class="btn--small recipe__btn"
            href="${this._data.sourceURL}"
            target="_blank"
            >
            <span>Directions</span>
            <svg class="search__icon">
                <use href="${_icons.default}#icon-arrow-right"></use>
            </svg>
            </a>
        </div>`;
  }

  _generateMarkupIngredient(ing) {
    return `
            <li class="recipe__ingredient">
            <svg class="recipe__icon">
                <use href="src/img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity ? new _fractional.Fraction(ing.quantity).toString() : ''}</div>
            <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
            </div>
            </li>`;
  }

}

var _default = new RecipeView();

exports.default = _default;
},{"./View.js":"61b7a1b097e16436be3d54c2f1828c73","url:../../img/icons.svg":"a01cd4d35e7cf70dfcb844be7b8f1743","fractional":"ddbc156a7c16e105c8df04e9fdec967d"}],"61b7a1b097e16436be3d54c2f1828c73":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class View {
  constructor() {
    _defineProperty(this, "_data", void 0);
  }

  render(data, render = true) {
    if (!data || Array.isArray(data) && data.length === 0) return this.renderError();
    this._data = data;

    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    console.log(this._data);

    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newElement, index) => {
      var _newElement$firstChil;

      const curElement = curElements[index]; //Text updated

      if (!newElement.isEqualNode(curElement) && ((_newElement$firstChil = newElement.firstChild) === null || _newElement$firstChil === void 0 ? void 0 : _newElement$firstChil.nodeValue.trim()) !== '') {
        curElement.textContent = newElement.textContent;
      } //Attributes updated


      if (!newElement.isEqualNode(curElement)) {
        Array.from(newElement.attributes).forEach(attribute => {
          curElement.setAttribute(attribute.name, attribute.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${_icons.default}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>`;

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
            <div>
            <svg>
                <use href="${_icons.default}#icon-smile"></use>
            </svg>
            <p>${message}</p>
        </div>`;

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

}

exports.default = View;
},{"url:../../img/icons.svg":"a01cd4d35e7cf70dfcb844be7b8f1743"}],"a01cd4d35e7cf70dfcb844be7b8f1743":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("b357d50cc8d9d90b", "4167fa27629ce031");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"2146da1905b95151ed14d455c784e7b7":[function(require,module,exports) {
"use strict";

/* globals document:readonly */
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.


function getOrigin(url) {
  let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);

  if (!matches) {
    throw new Error('Origin not found');
  }

  return matches[0];
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;
},{}],"1b9943ef25c7bbdf0dd1b9fa91880a6c":[function(require,module,exports) {
"use strict";

var resolve = require('./bundle-manifest').resolve;

module.exports = function (fromId, toId) {
  return relative(dirname(resolve(fromId)), resolve(toId));
};

function dirname(_filePath) {
  if (_filePath === '') {
    return '.';
  }

  var filePath = _filePath[_filePath.length - 1] === '/' ? _filePath.slice(0, _filePath.length - 1) : _filePath;
  var slashIndex = filePath.lastIndexOf('/');
  return slashIndex === -1 ? '.' : filePath.slice(0, slashIndex);
}

function relative(from, to) {
  if (from === to) {
    return '';
  }

  var fromParts = from.split('/');

  if (fromParts[0] === '.') {
    fromParts.shift();
  }

  var toParts = to.split('/');

  if (toParts[0] === '.') {
    toParts.shift();
  } // Find where path segments diverge.


  var i;
  var divergeIndex;

  for (i = 0; (i < toParts.length || i < fromParts.length) && divergeIndex == null; i++) {
    if (fromParts[i] !== toParts[i]) {
      divergeIndex = i;
    }
  } // If there are segments from "from" beyond the point of divergence,
  // return back up the path to that point using "..".


  var parts = [];

  for (i = 0; i < fromParts.length - divergeIndex; i++) {
    parts.push('..');
  } // If there are segments from "to" beyond the point of divergence,
  // continue using the remaining segments.


  if (toParts.length > divergeIndex) {
    parts.push.apply(parts, toParts.slice(divergeIndex));
  }

  return parts.join('/');
}

module.exports._dirname = dirname;
module.exports._relative = relative;
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"ddbc156a7c16e105c8df04e9fdec967d":[function(require,module,exports) {
/*
fraction.js
A Javascript fraction library.

Copyright (c) 2009  Erik Garrison <erik@hypervolu.me>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/


/* Fractions */
/* 
 *
 * Fraction objects are comprised of a numerator and a denomenator.  These
 * values can be accessed at fraction.numerator and fraction.denomenator.
 *
 * Fractions are always returned and stored in lowest-form normalized format.
 * This is accomplished via Fraction.normalize.
 *
 * The following mathematical operations on fractions are supported:
 *
 * Fraction.equals
 * Fraction.add
 * Fraction.subtract
 * Fraction.multiply
 * Fraction.divide
 *
 * These operations accept both numbers and fraction objects.  (Best results
 * are guaranteed when the input is a fraction object.)  They all return a new
 * Fraction object.
 *
 * Usage:
 *
 * TODO
 *
 */

/*
 * The Fraction constructor takes one of:
 *   an explicit numerator (integer) and denominator (integer),
 *   a string representation of the fraction (string),
 *   or a floating-point number (float)
 *
 * These initialization methods are provided for convenience.  Because of
 * rounding issues the best results will be given when the fraction is
 * constructed from an explicit integer numerator and denomenator, and not a
 * decimal number.
 *
 *
 * e.g. new Fraction(1, 2) --> 1/2
 *      new Fraction('1/2') --> 1/2
 *      new Fraction('2 3/4') --> 11/4  (prints as 2 3/4)
 *
 */
Fraction = function(numerator, denominator)
{
    /* double argument invocation */
    if (typeof numerator !== 'undefined' && denominator) {
        if (typeof(numerator) === 'number' && typeof(denominator) === 'number') {
            this.numerator = numerator;
            this.denominator = denominator;
        } else if (typeof(numerator) === 'string' && typeof(denominator) === 'string') {
            // what are they?
            // hmm....
            // assume they are ints?
            this.numerator = parseInt(numerator);
            this.denominator = parseInt(denominator);
        }
    /* single-argument invocation */
    } else if (typeof denominator === 'undefined') {
        num = numerator; // swap variable names for legibility
        if (typeof(num) === 'number') {  // just a straight number init
            this.numerator = num;
            this.denominator = 1;
        } else if (typeof(num) === 'string') {
            var a, b;  // hold the first and second part of the fraction, e.g. a = '1' and b = '2/3' in 1 2/3
                       // or a = '2/3' and b = undefined if we are just passed a single-part number
            var arr = num.split(' ')
            if (arr[0]) a = arr[0]
            if (arr[1]) b = arr[1]
            /* compound fraction e.g. 'A B/C' */
            //  if a is an integer ...
            if (a % 1 === 0 && b && b.match('/')) {
                return (new Fraction(a)).add(new Fraction(b));
            } else if (a && !b) {
                /* simple fraction e.g. 'A/B' */
                if (typeof(a) === 'string' && a.match('/')) {
                    // it's not a whole number... it's actually a fraction without a whole part written
                    var f = a.split('/');
                    this.numerator = f[0]; this.denominator = f[1];
                /* string floating point */
                } else if (typeof(a) === 'string' && a.match('\.')) {
                    return new Fraction(parseFloat(a));
                /* whole number e.g. 'A' */
                } else { // just passed a whole number as a string
                    this.numerator = parseInt(a);
                    this.denominator = 1;
                }
            } else {
                return undefined; // could not parse
            }
        }
    }
    this.normalize();
}


Fraction.prototype.clone = function()
{
    return new Fraction(this.numerator, this.denominator);
}


/* pretty-printer, converts fractions into whole numbers and fractions */
Fraction.prototype.toString = function()
{
    if (this.denominator==='NaN') return 'NaN'
    var wholepart = (this.numerator/this.denominator>0) ?
      Math.floor(this.numerator / this.denominator) :
      Math.ceil(this.numerator / this.denominator)
    var numerator = this.numerator % this.denominator 
    var denominator = this.denominator;
    var result = []; 
    if (wholepart != 0)  
        result.push(wholepart);
    if (numerator != 0)  
        result.push(((wholepart===0) ? numerator : Math.abs(numerator)) + '/' + denominator);
    return result.length > 0 ? result.join(' ') : 0;
}


/* destructively rescale the fraction by some integral factor */
Fraction.prototype.rescale = function(factor)
{
    this.numerator *= factor;
    this.denominator *= factor;
    return this;
}


Fraction.prototype.add = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction) {
        b = b.clone();
    } else {
        b = new Fraction(b);
    }
    td = a.denominator;
    a.rescale(b.denominator);
    b.rescale(td);

    a.numerator += b.numerator;

    return a.normalize();
}


Fraction.prototype.subtract = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction) {
        b = b.clone();  // we scale our argument destructively, so clone
    } else {
        b = new Fraction(b);
    }
    td = a.denominator;
    a.rescale(b.denominator);
    b.rescale(td);

    a.numerator -= b.numerator;

    return a.normalize();
}


Fraction.prototype.multiply = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction)
    {
        a.numerator *= b.numerator;
        a.denominator *= b.denominator;
    } else if (typeof b === 'number') {
        a.numerator *= b;
    } else {
        return a.multiply(new Fraction(b));
    }
    return a.normalize();
}

Fraction.prototype.divide = function(b)
{
    var a = this.clone();
    if (b instanceof Fraction)
    {
        a.numerator *= b.denominator;
        a.denominator *= b.numerator;
    } else if (typeof b === 'number') {
        a.denominator *= b;
    } else {
        return a.divide(new Fraction(b));
    }
    return a.normalize();
}

Fraction.prototype.equals = function(b)
{
    if (!(b instanceof Fraction)) {
        b = new Fraction(b);
    }
    // fractions that are equal should have equal normalized forms
    var a = this.clone().normalize();
    var b = b.clone().normalize();
    return (a.numerator === b.numerator && a.denominator === b.denominator);
}


/* Utility functions */

/* Destructively normalize the fraction to its smallest representation. 
 * e.g. 4/16 -> 1/4, 14/28 -> 1/2, etc.
 * This is called after all math ops.
 */
Fraction.prototype.normalize = (function()
{

    var isFloat = function(n)
    {
        return (typeof(n) === 'number' && 
                ((n > 0 && n % 1 > 0 && n % 1 < 1) || 
                 (n < 0 && n % -1 < 0 && n % -1 > -1))
               );
    }

    var roundToPlaces = function(n, places) 
    {
        if (!places) {
            return Math.round(n);
        } else {
            var scalar = Math.pow(10, places);
            return Math.round(n*scalar)/scalar;
        }
    }
        
    return (function() {

        // XXX hackish.  Is there a better way to address this issue?
        //
        /* first check if we have decimals, and if we do eliminate them
         * multiply by the 10 ^ number of decimal places in the number
         * round the number to nine decimal places
         * to avoid js floating point funnies
         */
        if (isFloat(this.denominator)) {
            var rounded = roundToPlaces(this.denominator, 9);
            var scaleup = Math.pow(10, rounded.toString().split('.')[1].length);
            this.denominator = Math.round(this.denominator * scaleup); // this !!! should be a whole number
            //this.numerator *= scaleup;
            this.numerator *= scaleup;
        } 
        if (isFloat(this.numerator)) {
            var rounded = roundToPlaces(this.numerator, 9);
            var scaleup = Math.pow(10, rounded.toString().split('.')[1].length);
            this.numerator = Math.round(this.numerator * scaleup); // this !!! should be a whole number
            //this.numerator *= scaleup;
            this.denominator *= scaleup;
        }
        var gcf = Fraction.gcf(this.numerator, this.denominator);
        this.numerator /= gcf;
        this.denominator /= gcf;
        if ((this.numerator < 0 && this.denominator < 0) || (this.numerator > 0 && this.denominator < 0)) {
            this.numerator *= -1;
            this.denominator *= -1;
        }
        return this;
    });

})();


/* Takes two numbers and returns their greatest common factor.
 */
Fraction.gcf = function(a, b)
{

    var common_factors = [];
    var fa = Fraction.primeFactors(a);
    var fb = Fraction.primeFactors(b);
    // for each factor in fa
    // if it's also in fb
    // put it into the common factors
    fa.forEach(function (factor) 
    { 
        var i = fb.indexOf(factor);
        if (i >= 0) {
            common_factors.push(factor);
            fb.splice(i,1); // remove from fb
        }
    });

    if (common_factors.length === 0)
        return 1;

    var gcf = (function() {
        var r = common_factors[0];
        var i;
        for (i=1;i<common_factors.length;i++)
        {
            r = r * common_factors[i];
        }
        return r;
    })();

    return gcf;

};


// Adapted from: 
// http://www.btinternet.com/~se16/js/factor.htm
Fraction.primeFactors = function(n) 
{

    var num = Math.abs(n);
    var factors = [];
    var _factor = 2;  // first potential prime factor

    while (_factor * _factor <= num)  // should we keep looking for factors?
    {      
      if (num % _factor === 0)  // this is a factor
        { 
            factors.push(_factor);  // so keep it
            num = num/_factor;  // and divide our search point by it
        }
        else
        {
            _factor++;  // and increment
        }
    }

    if (num != 1)                    // If there is anything left at the end...
    {                                // ...this must be the last prime factor
        factors.push(num);           //    so it too should be recorded
    }

    return factors;                  // Return the prime factors
}

module.exports.Fraction = Fraction

},{}],"c5d792f7cac03ef65de30cc0fbb2cae7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SearchView {
  constructor() {
    _defineProperty(this, "_parentElement", document.querySelector('.search'));
  }

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;

    this._clearInput();

    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

}

var _default = new SearchView();

exports.default = _default;
},{}],"eacdbc0d50ee3d2819f3ee59366c2773":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _View = _interopRequireDefault(require("./View.js"));

var _previewView = _interopRequireDefault(require("./previewView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ResultsView extends _View.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_parentElement", document.querySelector('.results'));

    _defineProperty(this, "_errorMessage", 'No recipes found for your query! Please try again');

    _defineProperty(this, "_message", '');
  }

  _generateMarkup() {
    return this._data.map(result => _previewView.default.render(result, false)).join('');
  }

}

var _default = new ResultsView();

exports.default = _default;
},{"./View.js":"61b7a1b097e16436be3d54c2f1828c73","./previewView.js":"e4d6583325a8b6c9380670c4f233bf07"}],"e4d6583325a8b6c9380670c4f233bf07":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _View = _interopRequireDefault(require("./View.js"));

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PreviewView extends _View.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_parentElement", '');
  }

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
        <li class="preview">
            <a class="preview__link ${this._data.id === id ? 'preview__link--active' : ''}" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
                <div class="preview__user-generated ${this._data.key ? '' : 'hidden'}">
                  <svg>
                      <use href="${_icons.default}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
        </li>`;
  }

}

var _default = new PreviewView();

exports.default = _default;
},{"./View.js":"61b7a1b097e16436be3d54c2f1828c73","url:../../img/icons.svg":"a01cd4d35e7cf70dfcb844be7b8f1743"}],"d2063f3e7de2e4cdacfcb5eb6479db05":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _View = _interopRequireDefault(require("./View.js"));

var _icons = _interopRequireDefault(require("url:../../img/icons.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PaginationView extends _View.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_parentElement", document.querySelector('.pagination'));
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    const prevButton = () => {
      return `
            <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${_icons.default}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>`;
    };

    const nextButton = () => {
      return `
            <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                <use href="${_icons.default}#icon-arrow-right"></use>
                </svg>
            </button>`;
    }; //More than 1 page


    if (curPage === 1 && numPages > 1) {
      return nextButton();
    } //Last page


    if (curPage === numPages && numPages > 1) {
      return prevButton();
    } //Other page


    if (curPage < numPages) {
      return prevButton() + nextButton();
    } //Only one page


    return '';
  }

}

var _default = new PaginationView();

exports.default = _default;
},{"./View.js":"61b7a1b097e16436be3d54c2f1828c73","url:../../img/icons.svg":"a01cd4d35e7cf70dfcb844be7b8f1743"}],"7ed9311e216aa789713f70ebeec3ed40":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _View = _interopRequireDefault(require("./View.js"));

var _previewView = _interopRequireDefault(require("./previewView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class BookmarksView extends _View.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "_parentElement", document.querySelector('.bookmarks__list'));

    _defineProperty(this, "_errorMessage", 'No bookmarks yet. Find a nice recipe and bookmark it');

    _defineProperty(this, "_message", '');
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(bookmark => _previewView.default.render(bookmark, false)).join('');
  }

}

var _default = new BookmarksView();

exports.default = _default;
},{"./View.js":"61b7a1b097e16436be3d54c2f1828c73","./previewView.js":"e4d6583325a8b6c9380670c4f233bf07"}],"4dd83c2a08c1751220d223c54dc70016":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _View = _interopRequireDefault(require("./View.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AddRecipeView extends _View.default {
  constructor() {
    super();

    _defineProperty(this, "_parentElement", document.querySelector('.upload'));

    _defineProperty(this, "_windowElement", document.querySelector('.add-recipe-window'));

    _defineProperty(this, "_overlayElement", document.querySelector('.overlay'));

    _defineProperty(this, "_btnOpen", document.querySelector('.nav__btn--add-recipe'));

    _defineProperty(this, "_btnClose", document.querySelector('.btn--close-modal'));

    _defineProperty(this, "_message", 'Recipe was successfully uploaded');

    this._addHandlerShowWindow();

    this._addHandlerHideWindow();
  }

  _toggleWindow() {
    this._overlayElement.classList.toggle('hidden');

    this._windowElement.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this._toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this._toggleWindow.bind(this));

    this._overlayElement.addEventListener('click', this._toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}

}

var _default = new AddRecipeView();

exports.default = _default;
},{"./View.js":"61b7a1b097e16436be3d54c2f1828c73"}]},{},["577f68edd944528ca8ba01102fd1ca3d","82e15b0fd0ba970f839fe38d0b391b38","175e469a7ea7db1c8c0744d04372621f"], null)

//# sourceMappingURL=controller.829766eb.js.map
