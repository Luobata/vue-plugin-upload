(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var __vue_module__ = {
    name: 'upload',
    data: function data() {
        return {
            isHtml5: true
        };
    },
    beforeMount: function beforeMount() {
        this.isHtml5 = !!window.File;
    }
};

(function () {
    if (typeof document !== 'undefined') {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style'),
            css = "";style.type = 'text/css';if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }head.appendChild(style);
    }
})();


var __$__vue_module__ = Object.assign(__vue_module__, { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.isHtml5 ? _c('div', { staticClass: "upload-html" }, [_c('span', [_vm._v("123")])]) : _vm._e();
    }, staticRenderFns: [] });
__$__vue_module__.prototype = __vue_module__.prototype;

var install = function install(Vue) {
    Vue.component(__$__vue_module__.name, __$__vue_module__);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = {
    install: install
};

})));
//# sourceMappingURL=upload.js.map
