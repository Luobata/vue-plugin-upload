import lib from './lib';
import { config } from './config';
import { validateConf, validateSize, validateType, validateCap } from './validate';
import ajax from './ajax';

const lint = function (file) {
    let result = {
        error: '',
        errorType: 0
    };
    const type = result.type = file.name.split('.').pop().toLowerCase();
    const name = result.name = lib.getRandomString(32) + '.' + type;

    if (!validateSize.call(this, file.size)) {
        result.error = '图片大小不符合要求!';
        result.errorType = 1;
    }

    if (!validateType.call(this, type)) {
        result.error = '图片类型错误!';
        result.errorType = result.errorType ? 3 : 2;
        return result;
    }

    return result;
};

const uploadAjax = (file, name, conf) => {
    let formData = new FormData();
    const uploadData = {
        name: conf.fileName,
        file: file
    };
    conf.file = file;
    formData.append(conf.fileName, file);
    conf.data = formData;
    ajax(conf);
};

export default {
    name: 'upload',
    props: {
        config: {
            type: Object,
        },
    },
    data () {
        return {
            isHtml5: true,
            conf: {},
        };
    },
    beforeMount () {
        this.isHtml5 = !!(window.File);
    },
    watcher: {
        config: function () {
            const globalConf = Object.assing({}, config);
            this.conf = Object.assign(globalConf, this.config);
        },
    },
    computed: {
        multiple: function () {
            return config.isMultiple;
        }
    },
    mounted () {
        const parent = this.$el.parentElement;

        if (lib.css(parent, 'position') === 'static' || lib.css(parent, 'position') === '') {
            lib.css(parent, 'position', 'relative');
        }
    },
    methods: {
        isImg () {
            return true;
        },
        upload (e) {
            const file = e.target.files;
            let i;
            let item;
            let errors = [];
            let error = '';

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
                this.conf.fn({error: error});
                return;
            }
            for (i = 0; i < file.length; i++) {
                item = file[i];
                const lintFile = lint.call(this, item);
                // hack onchange
                hack: {
                    var success = this.conf.fn;
                    this.conf.fn = (res, file) => {
                        this.uploadDom.value = '';
                        if (this.conf.cap && this.conf.cap.validate && this.isImg()) {
                            validateCap.call(this, this.conf.cap.validate(res))
                                .then(() => {
                                    success.call(this, res, file);
                                }, (error) => {
                                    success.call(this, error);
                                });
                        }
                    };
                }
                this.conf.beforeUpload && this.conf.beforeUpload(item);
                uploadAjax(item, lintFile.name, Object.assign({}, this.conf));
            }
        },
    }
};
