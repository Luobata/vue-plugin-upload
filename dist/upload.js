(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return config; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return setConfig; });
var noop = function noop() {};

var config = {
    uploadUrl: '',
    min: 0,
    max: null,
    method: 'POST',
    type: '*',
    isMultiple: false,
    fileName: 'file',
    beforeUpload: noop,
    fn: noop,
    progress: noop,
    resBase: '//t.focus-res.cn/front-end/upload/',
    size: {
        minWid: null,
        minHei: null,
        maxWid: null,
        maxHei: null,
        validate: null
    },
    forceFlash: false
};

var setConfig = function setConfig(obj) {
    Object.assign(config, obj);
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var lib = {
    extends: function _extends(source, target) {
        for (var k in target) {
            if (lib.isObject(target[k]) && lib.isObject(source[k])) {
                lib.extends(source[k], target[k]);
            } else {
                source[k] = target[k];
            }
        }
        return source;
    },
    clone: function clone(obj) {
        var o = void 0;
        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
            if (obj === null) {
                o = null;
            } else if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(this.clone(obj[i]));
                }
            } else {
                o = {};
                for (var j in obj) {
                    if (!lib.has(obj, j)) continue;
                    o[j] = this.clone(obj[j]);
                }
            }
        } else {
            o = obj;
        }
        return o;
    },
    isObject: function isObject(obj) {
        return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !(obj instanceof Array);
    },
    queryString: function queryString(object) {
        var data = [];
        var key = void 0;
        var val = void 0;

        for (key in object) {
            // if (object.hasOwnProperty(key)) {
            if (lib.has(object, key)) {
                val = object[key];
                data.push(key + '=' + encodeURIComponent(val));
            }
        }
        return data.join('&');
    },
    getRandomString: function getRandomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    getWidth: function getWidth(dom) {
        return dom.offsetWidth;
    },
    getHeight: function getHeight(dom) {
        return dom.offsetHeight;
    },
    prepend: function prepend(dom, html) {
        dom.innerHTML = html + dom.innerHTML;
    },
    css: function css(dom, sty, newSty) {
        if (!newSty) {
            return dom.style[sty];
        }
        dom.style[sty] = newSty;
        return dom;
    },

    fnLoadScript: function fnLoadScript(src, fun) {
        var head = document.getElementsByTagName('head')[0] || document.head || document.documentElement;

        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('charset', 'UTF-8');
        script.setAttribute('src', src);

        if (typeof fun === 'function') {
            if (window.attachEvent) {
                script.onreadystatechange = function () {
                    var r = script.readyState;
                    if (r === 'loaded' || r === 'complete') {
                        script.onreadystatechange = null;
                        fun();
                    }
                };
            } else {
                script.onload = fun;
            }
        }

        head.appendChild(script);
    },
    isImg: function isImg() {
        return true;
    },
    has: function has(obj, key) {
        return {}.hasOwnProperty.call(obj, key);
    }
};

/* harmony default export */ __webpack_exports__["a"] = (lib);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export validateConf */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return validateType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return validateSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return validateCap; });
// 返回true 代表合法 false代表不合法
// 校验conf是否合法
// 通过call传递this 不能使用箭头函数
var validateConf = function validateConf() {
    if (!this.conf.uploadUrl || !this.conf.selecter || !this.conf.fn) {
        return false;
    }

    return true;
};
// 校验类型
var validateType = function validateType(type) {
    if (this.conf.type === '*') {
        return true;
    }

    return !!(this.conf.type.indexOf(type) !== -1);
};
// 校验尺寸
var validateSize = function validateSize(size) {
    return (!this.conf.min || size >= this.conf.min) && (!this.conf.max || size <= this.conf.max);
};
// 校验文件大小
var validateCap = function validateCap(img, conf) {
    return new Promise(function (resolve, reject) {
        var val = function val(img) {
            var width = img.width;
            var height = img.height;
            var size = conf.size;
            if (size.minWid && width < size.minWid || size.maxWid && width > size.maxWid || size.minHei && height < size.minHei || size.maxHei && height > size.maxHei) {
                /* eslint-disable prefer-promise-reject-errors */
                reject({
                    error: '图片尺寸不符合要求!'
                });
                /* eslint-disable prefer-promise-reject-errors */
            } else {
                resolve();
            }
        };
        if (img.complete) {
            return val(img);
        }
        img.onload = function () {
            return val(img);
        };

        return true;
    });
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__upload_upload_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__upload_upload_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__upload_upload_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__upload_config__ = __webpack_require__(0);



var install = function install(Vue, config) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    Object(__WEBPACK_IMPORTED_MODULE_1__upload_config__["b" /* setConfig */])(config);
    Vue.component(name || __WEBPACK_IMPORTED_MODULE_0__upload_upload_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__upload_upload_vue___default.a);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

/* harmony default export */ __webpack_exports__["default"] = (install);
// module.exports = {
//     install,
// };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(5)

/* script */
__vue_exports__ = __webpack_require__(9)

/* template */
var __vue_template__ = __webpack_require__(13)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/chenghaoyao/luobata/libs/vue-plugin-upload/src/upload/upload.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-d1a47e7c"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d1a47e7c", __vue_options__)
  } else {
    hotAPI.reload("data-v-d1a47e7c", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] upload.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(8)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-d1a47e7c&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./upload.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-d1a47e7c&scoped=true!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./upload.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, "\n.upload-html[data-v-d1a47e7c] {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    font-size: 0;\n}\n.upload-html .upload-btn[data-v-d1a47e7c] {\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    filter: alpha(opacity=0);\n    cursor: pointer;\n    z-index: 100;\n}\n.upload-swf[data-v-d1a47e7c] {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    overflow: hidden;\n    opacity: 0;\n    filter: alpha(opacity=0);\n    z-index: 100;\n}\n", "", {"version":3,"sources":["/./src/upload/upload.vue?9d097f1c"],"names":[],"mappings":";AAOA;IACA,YAAA;IACA,aAAA;IACA,mBAAA;IACA,OAAA;IACA,QAAA;IACA,aAAA;CACA;AACA;IACA,YAAA;IACA,aAAA;IACA,WAAA;IACA,yBAAA;IACA,gBAAA;IACA,aAAA;CACA;AACA;IACA,YAAA;IACA,aAAA;IACA,mBAAA;IACA,OAAA;IACA,QAAA;IACA,iBAAA;IACA,WAAA;IACA,yBAAA;IACA,aAAA;CACA","file":"upload.vue","sourcesContent":["<template lang=\"pug\">\n    div.upload-html(v-if=\"isHtml5\")\n        input.upload-btn(ref=\"upload-btn\" type=\"file\" :multiple=\"multiple\" @change=\"upload\")\n    div.upload-swf(v-else)\n        span.upload-btn-id(:id=\"conf.id\")\n</template>\n<style scoped>\n    .upload-html {\n        width: 100%;\n        height: 100%;\n        position: absolute;\n        top: 0;\n        left: 0;\n        font-size: 0;\n    }\n    .upload-html .upload-btn {\n        width: 100%;\n        height: 100%;\n        opacity: 0;\n        filter: alpha(opacity=0);\n        cursor: pointer;\n        z-index: 100;\n    }\n    .upload-swf {\n        width: 100%;\n        height: 100%;\n        position: absolute;\n        top: 0;\n        left: 0;\n        overflow: hidden;\n        opacity: 0;\n        filter: alpha(opacity=0);\n        z-index: 100;\n    }\n</style>\n<script src=\"./upload.js\">\n</script>\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function () {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for (var i = 0; i < this.length; i++) {
			var item = this[i];
			if (item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;
	var sourceMap = obj.sourceMap;

	if (media) {
		styleElement.setAttribute("media", media);
	}

	if (sourceMap) {
		// https://developer.chrome.com/devtools/docs/javascript-debugging
		// this makes source maps inside style tags work properly in Chrome
		css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validate__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ajax__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__upload_swf__ = __webpack_require__(11);






var lint = function lint(file) {
    var result = {
        error: '',
        errorType: 0
    };
    var type = file.name.split('.').pop().toLowerCase();
    result.type = type;
    result.name = __WEBPACK_IMPORTED_MODULE_0__lib__["a" /* default */].getRandomString(32) + '.' + type;

    if (!__WEBPACK_IMPORTED_MODULE_2__validate__["b" /* validateSize */].call(this, file.size)) {
        result.error = '图片大小不符合要求!';
        result.errorType = 1;
    }

    if (!__WEBPACK_IMPORTED_MODULE_2__validate__["c" /* validateType */].call(this, type)) {
        result.error = '图片类型错误!';
        result.errorType = result.errorType ? 3 : 2;
        return result;
    }

    return result;
};

var uploadAjax = function uploadAjax(file, name, conf) {
    var formData = new FormData();
    // const uploadData = {
    //    name: conf.fileName,
    //    file,
    // };
    conf.file = file;
    formData.append(conf.fileName, file);
    conf.data = formData;
    Object(__WEBPACK_IMPORTED_MODULE_3__ajax__["a" /* default */])(conf);
};

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'upload',
    props: {
        config: {
            type: Object
        }
    },
    data: function data() {
        return {
            isHtml5: true,
            conf: {},
            id: 0
        };
    },
    beforeMount: function beforeMount() {
        this.extendConf();
        this.isHtml5 = !!window.File && !__WEBPACK_IMPORTED_MODULE_1__config__["a" /* config */].forceFlash;
        this.conf.id = 'id-' + +new Date();
    },

    watch: {
        config: function config() {
            this.extendConf();
        }
    },
    computed: {
        multiple: function multiple() {
            return __WEBPACK_IMPORTED_MODULE_1__config__["a" /* config */].isMultiple;
        }
    },
    mounted: function mounted() {
        var parent = this.$el.parentElement;

        if (__WEBPACK_IMPORTED_MODULE_0__lib__["a" /* default */].css(parent, 'position') === 'static' || __WEBPACK_IMPORTED_MODULE_0__lib__["a" /* default */].css(parent, 'position') === '') {
            __WEBPACK_IMPORTED_MODULE_0__lib__["a" /* default */].css(parent, 'position', 'relative');
        }

        if (!this.isHtml5) {
            Object(__WEBPACK_IMPORTED_MODULE_4__upload_swf__["a" /* default */])(this.$el, this.conf);
        }
    },

    methods: {
        extendConf: function extendConf() {
            var globalConf = Object.assign({}, __WEBPACK_IMPORTED_MODULE_1__config__["a" /* config */]);
            this.conf = Object.assign(globalConf, this.config);
        },
        upload: function upload(e) {
            var _this = this;

            var file = e.target.files;
            var i = void 0;
            var item = void 0;
            var errors = [];
            var error = '';

            for (i = 0; i < file.length; i++) {
                item = file[i];
                errors[i] = lint.call(this, item).errorType;
            }
            if (errors.indexOf(1) !== -1 || errors.indexOf(3) !== -1) {
                error += '图片大小不符合要求';
            }
            if (errors.indexOf(2) !== -1 || errors.indexOf(3) !== -1) {
                if (error) error += '、';
                error += '图片格式不符合要求';
            }
            if (error) {
                this.conf.fn({ error: error });
                return;
            }
            for (i = 0; i < file.length; i++) {
                item = file[i];
                var lintFile = lint.call(this, item);
                // hack onchange
                {
                    (function () {
                        var success = _this.conf.fn;
                        _this.conf.fn = function (res, file) {
                            _this.$refs['upload-btn'].value = '';
                            if (_this.conf.size && _this.conf.size.validate && __WEBPACK_IMPORTED_MODULE_0__lib__["a" /* default */].isImg()) {
                                __WEBPACK_IMPORTED_MODULE_2__validate__["a" /* validateCap */].call(null, _this.conf.size.validate(res), _this.conf).then(function () {
                                    success.call(_this, res, file);
                                }, function (error) {
                                    success.call(_this, error);
                                });
                            } else {
                                success.call(_this, res, file);
                            }
                        };
                    })();
                }
                if (typeof this.conf.beforeUpload === 'function') this.conf.beforeUpload(item);
                uploadAjax(item, lintFile.name, Object.assign({}, this.conf));
            }
        }
    }
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var lint = function lint(conf) {
    var lintFile = {};
    if (conf.url) {
        lintFile.error = '缺少参数url';
    }
    return lintFile;
};

/* harmony default export */ __webpack_exports__["a"] = (function (conf) {
    var lintFile = lint(conf);
    var xhr = new XMLHttpRequest();
    if (lint.error && conf.fn && typeof conf.fn === 'function') {
        conf.fn(lintFile);
        return;
    }
    if (xhr.upload) {
        if (conf.progress && typeof conf.progress === 'function') {
            (function progress(conf) {
                xhr.upload.onprogress = function (event) {
                    if (event.lengthComputable) {
                        var percentComplete = event.loaded / event.total;
                        conf.progress(conf.file, percentComplete);
                    }
                };
            })(conf);
        }

        // 开始上传
        xhr.open(conf.method, conf.uploadUrl, true);
        xhr.setRequestHeader('Accept', '*/*');
        xhr.withCredentials = conf.credentials;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (typeof conf.fn === 'function') conf.fn(JSON.parse(xhr.response), conf.file);
                } else {
                    conf.fn({
                        error: '\u4E0A\u4F20\u5931\u8D25' + xhr.responseText
                    });
                }
            }
        };
        xhr.send(conf.data);
    }
});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__format__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validate__ = __webpack_require__(2);





var loading = false;
var initList = [];
// const SWFUpload = window.SWFUpload;

var setting = {
    prevent_swf_caching: false,
    file_size_limit: '1 MB',
    file_post_name: 'file',
    file_types: '*.jpg;*.png;*.gif;*.jpeg',
    button_text: ''
};

var fnInit = function fnInit($dom, conf) {
    var height = __WEBPACK_IMPORTED_MODULE_0__lib__["a" /* default */].getHeight($dom);
    var width = __WEBPACK_IMPORTED_MODULE_0__lib__["a" /* default */].getWidth($dom);
    var SWFUpload = window.SWFUpload;

    var _setting = __WEBPACK_IMPORTED_MODULE_0__lib__["a" /* default */].extends(setting, {
        flash_url: __WEBPACK_IMPORTED_MODULE_2__config__["a" /* config */].resBase + 'swfupload.swf',
        button_image_url: __WEBPACK_IMPORTED_MODULE_2__config__["a" /* config */].resBase + 'swfupload.js?button_image_url',
        upload_url: conf.uploadUrl,
        button_placeholder_id: conf.id,
        button_width: width,
        button_height: height,
        button_cursor: SWFUpload.CURSOR.HAND,
        button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
        conf: conf,
        upload_start_handler: function upload_start_handler() {
            this.settings.conf.beforeUpload();
        },
        file_dialog_complete_handler: function file_dialog_complete_handler() {
            this.startUpload();
        },
        file_queue_error_handler: function file_queue_error_handler(a, b, c) {
            this.settings.conf.fn(b, c);
        },

        // upload_success_handler(a, b, c) {
        upload_success_handler: function upload_success_handler(a, b) {
            this.settings.conf.fn(b, a);
        }
    });

    /* eslint-disable no-new */
    new SWFUpload(__WEBPACK_IMPORTED_MODULE_0__lib__["a" /* default */].clone(_setting));
    /* eslint-disable no-new */
};
var uploader = {
    create: function create($dom, conf) {
        if (window.SWFUpload) {
            fnInit($dom, conf);
        } else {
            initList.push([$dom, conf]);

            if (loading) {
                return;
            }

            loading = true;
            __WEBPACK_IMPORTED_MODULE_0__lib__["a" /* default */].fnLoadScript(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* config */].resBase + 'swfupload.js', function () {
                loading = false;

                var i = void 0;
                var item = void 0;
                for (i = 0; i < initList.length; i++) {
                    item = initList[i];
                    fnInit(item[0], item[1]);
                }
                initList = [];
            });
        }
    },
    config: function config(paramsConfig) {
        __WEBPACK_IMPORTED_MODULE_0__lib__["a" /* default */].extends(setting, paramsConfig);
    }
};

function upload(dom, conf) {
    if (dom) {
        uploader.config({
            // file_size_limit: format.sizeFormat(conf.max),
            file_size_limit: conf.max + 'B',
            file_post_name: conf.fileName,
            file_types: __WEBPACK_IMPORTED_MODULE_1__format__["a" /* default */].typeFormat(conf.type),
            upload_progress_handler: conf.progress,
            button_placeholder_id: 'selectFiles4'
        });
        var fn = conf.fn;
        conf.fn = function finish(response, file) {
            var _this = this;

            // 校验大小
            if (typeof response === 'string') {
                response = JSON.parse(response);
            }
            if (response === -110) {
                response = {
                    error: '图片大小不符合要求'
                };
            }
            if (!__WEBPACK_IMPORTED_MODULE_0__lib__["a" /* default */].has(response, 'error') && conf.size && conf.size.validate && __WEBPACK_IMPORTED_MODULE_0__lib__["a" /* default */].isImg()) {
                __WEBPACK_IMPORTED_MODULE_3__validate__["a" /* validateCap */].call(null, conf.size.validate(response), conf).then(function () {
                    fn.call(_this, response, file);
                }, function (error) {
                    fn.call(_this, error);
                });
            } else {
                fn.call(this, response, file);
            }
        };
        uploader.create(dom, conf);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (upload);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    typeFormat: function typeFormat(typeArray) {
        if (typeArray === '*') return '*';
        if (!typeArray || !typeArray.length) return '';
        typeArray.forEach(function (item, index) {
            typeArray[index] = '*.' + item;
        });
        return typeArray.join(';');
    },
    sizeFormat: function sizeFormat(size) {
        if (!size || !parseFloat(size, 10)) return '0B';
        var unit = 'B';
        var hihgUnit = function hihgUnit(unit) {
            var unitUp = 'B';
            switch (unit) {
                case 'B':
                    unitUp = 'KB';
                    break;
                case 'KB':
                    unitUp = 'MB';
                    break;
                case 'MB':
                    unitUp = 'GB';
                    break;
                case 'GB':
                    unitUp = 'TB';
                    break;
                default:
                    break;
            }
            return unitUp;
        };
        var sizes = parseInt(size, 10);
        while (sizes > 1024) {
            unit = hihgUnit(unit);
            sizes = parseFloat(sizes / 1024, 10);
        }

        return sizes + ' ' + unit;
    }
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.isHtml5) ? _c('div', {
    staticClass: "upload-html"
  }, [_c('input', {
    ref: "upload-btn",
    staticClass: "upload-btn",
    attrs: {
      "type": "file",
      "multiple": _vm.multiple
    },
    on: {
      "change": _vm.upload
    }
  })]) : _c('div', {
    staticClass: "upload-swf"
  }, [_c('span', {
    staticClass: "upload-btn-id",
    attrs: {
      "id": _vm.conf.id
    }
  })])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d1a47e7c", module.exports)
  }
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=upload.js.map