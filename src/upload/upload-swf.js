import lib from './lib';
import format from './format';
import { config } from './config';
let loading = false;
let initList = [];
// const resBase = 'http://changyan.itc.cn/mdevp/extensions/cui/002/swfupload.v2.2.0/';
const resBase = config.resBase || '//t.focus-res.cn/front-end/upload/';

var setting = {
    prevent_swf_caching: false,
    file_size_limit: '1 MB',
    file_post_name: 'file',
    file_types: '*.jpg;*.png;*.gif;*.jpeg',
    button_text: '',
};

function upload(dom, conf) {
    if (dom) {
        uploader.config({
            file_size_limit: format.sizeFormat(conf.max),
            file_size_limit: conf.max + 'B',
            file_post_name: conf.fileName,
            file_types: format.typeFormat(conf.type),
            upload_progress_handler: conf.progress,
            button_placeholder_id: 'selectFiles4'
        });
        var fn = conf.fn;
        conf.fn = function (response, file) {
            // 校验大小
            if (typeof response === 'string') {
                response = JSON.parse(response);
            }
            fn.call(this, response, file);
        }
        uploader.create(dom, conf);
    }
};
var fnLoadScript = function (src, fun) {
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
};
var fnInit = function ($dom, conf) {
    var height = lib.getHeight($dom);
    var width = lib.getWidth($dom);

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
        upload_start_handler: function () {
            this.settings.conf.beforeUpload()
        },
        file_dialog_complete_handler: function () {
            this.startUpload();
        },
        file_queue_error_handler: function (a, b, c) {
            this.settings.conf.fn(b, c);
        },
        upload_success_handler: function (a, b, c) {
            this.settings.conf.fn(b, a);
        }
    });

    var tmp = new SWFUpload(lib.clone(_setting));
};
var uploader = {
    create: function ($dom, conf) {
        if (window.SWFUpload) {
            fnInit($dom, conf);
        } else {
            initList.push([$dom, conf]);

            if (loading) {
                return;
            }

            loading = true;
            fnLoadScript(config.resBase + 'swfupload.js', function () {
                loading = false;

                var i, item;
                for (i = 0; i < initList.length; i++) {
                    item = initList[i];
                    fnInit(item[0], item[1]);
                }
                initList = [];
            });
        }
    },
    config: function (paramsConfig) {
        lib.extends(setting, paramsConfig);
    }
};
export default upload;
