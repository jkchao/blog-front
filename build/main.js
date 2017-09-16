require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

module.exports = {
  // cache: true,
  cache: {
    max: 1000,
    maxAge: 900000
  },
  build: {
    // 将重复引用的(第三方/自有)模块添加到vendor.bundle.js
    vendor: ['axios', 'particles.js', 'swiper', 'marked', 'highlight.js'],
    // postcss
    postcss: [__webpack_require__(5)(), __webpack_require__(6)(), __webpack_require__(4)()],
    // babel
    babel: {
      presets: ['es2015', 'stage-2'],
      plugins: ['transform-async-to-generator', 'transform-runtime']
    }
  },
  dev: "development" !== 'production',
  /*
  ** Headers of the page
  */
  head: {
    title: '民谣、读书、码农',
    titleTemplate: '%s | 三毛',
    meta: [{ charset: 'utf-8' }, { 'http-equiv': 'cleartype', content: 'on' }, { 'http-equiv': 'Cache-Control' }, { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' }, { hid: 'description', name: 'description', content: '民谣，读书，码农。' }, { hid: 'keywords', name: 'keywords', content: '前端开发，JavaScript, Node, Vue，nuxt' }, { name: 'author', content: 'jkchaom@gmail.com' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [],
    noscript: [{ innerHTML: 'This website requires JavaScript.' }]
  },
  // router
  router: {
    middleware: ['layout'],
    linkActiveClass: 'link-active'
    // scrollBehavior: (to, from, savedPosition) => {
    //   return { x: 0, y: 0 }
    // }
    // scrollBehavior (to, from, savedPosition) {
    //   return { x: 0, y: 0 }
    // }
  },
  // plugins
  plugins: [{ src: '~plugins/swiper.js', ssr: false }, { src: '~plugins/clickOutside.js', ssr: false }, { src: '~plugins/filter.js' }, { src: '~plugins/finally.js' }, { src: '~plugins/marked.js' }],
  /*
  ** Global CSS
  */
  css: ['swiper/dist/css/swiper.css', { src: '~assets/scss/index.scss', lang: 'scss' }, 'highlight.js/styles/atom-one-dark.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#24292e' }
};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("postcss-hexrgba");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("postcss-nested");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("postcss-responsive-type");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_guowenchao_html_myPritice_vue_nuxt_node_modules_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_guowenchao_html_myPritice_vue_nuxt_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Users_guowenchao_html_myPritice_vue_nuxt_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);


// Start nuxt.js
var start = function () {
  var _ref = _asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0__Users_guowenchao_html_myPritice_vue_nuxt_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2() {
    var _this = this;

    var config, nuxt;
    return __WEBPACK_IMPORTED_MODULE_0__Users_guowenchao_html_myPritice_vue_nuxt_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Import and Set Nuxt.js options
            config = __webpack_require__(0);

            config.dev = !(app.env === 'production');
            // Instanciate nuxt.js
            _context2.next = 4;
            return new __WEBPACK_IMPORTED_MODULE_2_nuxt___default.a(config);

          case 4:
            nuxt = _context2.sent;

            if (!config.dev) {
              _context2.next = 15;
              break;
            }

            _context2.prev = 6;
            _context2.next = 9;
            return nuxt.build();

          case 9:
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2['catch'](6);

            console.error(_context2.t0); // eslint-disable-line no-console
            process.exit(1);

          case 15:

            app.use(function () {
              var _ref2 = _asyncToGenerator(__WEBPACK_IMPORTED_MODULE_0__Users_guowenchao_html_myPritice_vue_nuxt_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
                return __WEBPACK_IMPORTED_MODULE_0__Users_guowenchao_html_myPritice_vue_nuxt_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        ctx.status = 200; // koa defaults to 404 when it sees that status is unset
                        _context.next = 3;
                        return nuxt.render(ctx.req, ctx.res);

                      case 3:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x, _x2) {
                return _ref2.apply(this, arguments);
              };
            }());

            app.listen(port, host);
            console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[6, 11]]);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




var app = new __WEBPACK_IMPORTED_MODULE_1_koa___default.a();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;

start();

/***/ }
/******/ ]);
//# sourceMappingURL=main.map