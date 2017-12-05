import lib from './lib';
import format from './format';
import { config } from './config';
import { validateCap } from './validate';

let loading = false;
let initList = [];
// const SWFUpload = window.SWFUpload;

const setting = {
    prevent_swf_caching: false,
    file_size_limit: '1 MB',
    file_post_name: 'file',
    file_types: '*.jpg;*.png;*.gif;*.jpeg',
    button_text: '',
};

const fnInit = ($dom, conf) => {
    const height = lib.getHeight($dom);
    const width = lib.getWidth($dom);
    const SWFUpload = window.SWFUpload;

    const _setting = lib.extends(setting, {
        flash_url: `${config.resBase}swfupload.swf`,
        button_image_url: `${config.resBase}swfupload.js?button_image_url`,
        upload_url: conf.uploadUrl,
        button_placeholder_id: conf.id,
        button_width: width,
        button_height: height,
        button_cursor: SWFUpload.CURSOR.HAND,
        button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
        conf,
        upload_start_handler() {
            this.settings.conf.beforeUpload();
        },
        file_dialog_complete_handler() {
            this.startUpload();
        },
        file_queue_error_handler(a, b, c) {
            this.settings.conf.fn(b, c);
        },
        // upload_success_handler(a, b, c) {
        upload_success_handler(a, b) {
            this.settings.conf.fn(b, a);
        },
    });

    /* eslint-disable no-new */
    new SWFUpload(lib.clone(_setting));
    /* eslint-disable no-new */
};
const uploader = {
    create($dom, conf) {
        if (window.SWFUpload) {
            fnInit($dom, conf);
        } else {
            initList.push([$dom, conf]);

            if (loading) {
                return;
            }

            loading = true;
            lib.fnLoadScript(`${config.resBase}swfupload.js`, () => {
                loading = false;

                let i;
                let item;
                for (i = 0; i < initList.length; i++) {
                    item = initList[i];
                    fnInit(item[0], item[1]);
                }
                initList = [];
            });
        }
    },
    config(paramsConfig) {
        lib.extends(setting, paramsConfig);
    },
};

function upload(dom, conf) {
    if (dom) {
        uploader.config({
            // file_size_limit: format.sizeFormat(conf.max),
            file_size_limit: `${conf.max}B`,
            file_post_name: conf.fileName,
            file_types: format.typeFormat(conf.type),
            upload_progress_handler: conf.progress,
            button_placeholder_id: 'selectFiles4',
        });
        const fn = conf.fn;
        conf.fn = function finish(response, file) {
            // 校验大小
            if (typeof response === 'string') {
                response = JSON.parse(response);
            }
            if (response === -110) {
                response = {
                    error: '图片大小不符合要求',
                };
            }
            if (!lib.has(response, 'error') && conf.size && conf.size.validate && lib.isImg()) {
                validateCap.call(null, conf.size.validate(response), conf)
                    .then(() => {
                        fn.call(this, response, file);
                    }, (error) => {
                        fn.call(this, error);
                    });
            } else {
                fn.call(this, response, file);
            }
        };
        uploader.create(dom, conf);
    }
}
export default upload;
