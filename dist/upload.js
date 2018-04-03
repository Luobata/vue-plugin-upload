'use strict';

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

// 返回true 代表合法 false代表不合法
// 校验conf是否合法
// 通过call传递this 不能使用箭头函数

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

var lint$1 = function lint(conf) {
    var lintFile = {};
    if (conf.url) {
        lintFile.error = '缺少参数url';
    }
    return lintFile;
};

var ajax = (function (conf) {
    var lintFile = lint$1(conf);
    var xhr = new XMLHttpRequest();
    if (lint$1.error && conf.fn && typeof conf.fn === 'function') {
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

var format = {
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
};

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
    var height = lib.getHeight($dom);
    var width = lib.getWidth($dom);
    var SWFUpload = window.SWFUpload;

    var _setting = lib.extends(setting, {
        flash_url: config.resBase + 'swfupload.swf',
        button_image_url: config.resBase + 'swfupload.js?button_image_url',
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
    new SWFUpload(lib.clone(_setting));
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
            lib.fnLoadScript(config.resBase + 'swfupload.js', function () {
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
    config: function config$$1(paramsConfig) {
        lib.extends(setting, paramsConfig);
    }
};

function upload(dom, conf) {
    if (dom) {
        uploader.config({
            // file_size_limit: format.sizeFormat(conf.max),
            file_size_limit: conf.max + 'B',
            file_post_name: conf.fileName,
            file_types: format.typeFormat(conf.type),
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
            if (!lib.has(response, 'error') && conf.size && conf.size.validate && lib.isImg()) {
                validateCap.call(null, conf.size.validate(response), conf).then(function () {
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

var _this = undefined;

var lint = function lint(file) {
    var result = {
        error: '',
        errorType: 0
    };
    var type = file.name.split('.').pop().toLowerCase();
    result.type = type;
    result.name = lib.getRandomString(32) + '.' + type;

    if (!validateSize.call(_this, file.size)) {
        result.error = '图片大小不符合要求!';
        result.errorType = 1;
    }

    if (!validateType.call(_this, type)) {
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
    ajax(conf);
};

var __vue_module__ = {
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
        this.isHtml5 = !!window.File && !config.forceFlash;
        this.conf.id = 'id-' + +new Date();
    },

    watch: {
        config: function config$$1() {
            this.extendConf();
        }
    },
    computed: {
        multiple: function multiple() {
            return config.isMultiple;
        }
    },
    mounted: function mounted() {
        var parent = this.$el.parentElement;

        if (lib.css(parent, 'position') === 'static' || lib.css(parent, 'position') === '') {
            lib.css(parent, 'position', 'relative');
        }

        if (!this.isHtml5) {
            upload(this.$el, this.conf);
        }
    },

    methods: {
        extendConf: function extendConf() {
            var globalConf = Object.assign({}, config);
            this.conf = Object.assign(globalConf, this.config);
        },
        upload: function upload$$1(e) {
            var _this2 = this;

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
                        var success = _this2.conf.fn;
                        _this2.conf.fn = function (res, file) {
                            _this2.$refs['upload-btn'].value = '';
                            if (_this2.conf.size && _this2.conf.size.validate && lib.isImg()) {
                                validateCap.call(null, _this2.conf.size.validate(res), _this2.conf).then(function () {
                                    success.call(_this2, res, file);
                                }, function (error) {
                                    success.call(_this2, error);
                                });
                            } else {
                                success.call(_this2, res, file);
                            }
                        };
                    })();
                }
                if (typeof this.conf.beforeUpload === 'function') this.conf.beforeUpload(item);
                uploadAjax(item, lintFile.name, Object.assign({}, this.conf));
            }
        }
    }
};

(function () {
    if (typeof document !== 'undefined') {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style'),
            css = " .upload-html[data-v-f5e98974] { width: 100%; height: 100%; position: absolute; top: 0; left: 0; font-size: 0; } .upload-html .upload-btn[data-v-f5e98974] { width: 100%; height: 100%; opacity: 0; filter: alpha(opacity=0); cursor: pointer; z-index: 100; } .upload-swf[data-v-f5e98974] { width: 100%; height: 100%; position: absolute; top: 0; left: 0; overflow: hidden; opacity: 0; filter: alpha(opacity=0); z-index: 100; } ";style.type = 'text/css';if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }head.appendChild(style);
    }
})();


var __$__vue_module__ = Object.assign(__vue_module__, { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.isHtml5 ? _c('div', { staticClass: "upload-html" }, [_c('input', { ref: "upload-btn", staticClass: "upload-btn", attrs: { "type": "file", "multiple": _vm.multiple }, on: { "change": _vm.upload } })]) : _c('div', { staticClass: "upload-swf" }, [_c('span', { staticClass: "upload-btn-id", attrs: { "id": _vm.conf.id } })]);
    }, staticRenderFns: [], _scopeId: 'data-v-f5e98974' });
__$__vue_module__.prototype = __vue_module__.prototype;

var install = function install(Vue, config$$1) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    setConfig(config$$1);
    Vue.component(name || __$__vue_module__.name, __$__vue_module__);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = {
    install: install
};
//# sourceMappingURL=upload.js.map
