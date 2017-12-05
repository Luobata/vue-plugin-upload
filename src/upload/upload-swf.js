import lib from './lib';
import format from './format';
import { config } from './config';
import { validateCap } from './validate';
let loading = false;
let initList = [];

const setting = {
    prevent_swf_caching: false,
    file_size_limit: '1 MB',
    file_post_name: 'file',
    file_types: '*.jpg;*.png;*.gif;*.jpeg',
    button_text: '',
};

const fnInit = function ($dom, conf) {
    const height = lib.getHeight($dom);
    const width = lib.getWidth($dom);

    const _setting = lib.extends(setting, {
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

    new SWFUpload(lib.clone(_setting));
};
const uploader = {
    create: function ($dom, conf) {
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
        const fn = conf.fn;
        conf.fn = function (response, file) {
            // 校验大小
            if (typeof response === 'string') {
                response = JSON.parse(response);
            }
            if (conf.size && conf.size.validate && lib.isImg()) {
                validateCap.call(null, conf.size.validate(response), conf)
                    .then(() => {
                        fn.call(this, response, file);
                    }, (error) => {
                        fn.call(this, error);
                    });
            } else {
                fn.call(this, response, file);
            }
        }
        uploader.create(dom, conf);
    }
};
export default upload;
