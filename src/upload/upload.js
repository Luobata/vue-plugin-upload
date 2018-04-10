import lib from './lib';
import { config } from './config';
import { validateSize, validateType, validateCap } from './validate';
import ajax from './ajax';
import uploadSwf from './upload-swf';

const lint = function lint(file) {
    const result = {
        error: '',
        errorType: 0,
    };
    const type = file.name.split('.').pop().toLowerCase();
    result.type = type;
    result.name = `${lib.getRandomString(32)}.${type}`;

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

const uploadAjax = (file, name, conf, data) => {
    const formData = new FormData();
    // const uploadData = {
    //    name: conf.fileName,
    //    file,
    // };
    conf.file = file;
    formData.append(conf.fileName, file);
    for (let i = 0; i < data.length; i++) {
        formData.append(data[i].key, data[i].value);
    }
    conf.data = formData;
    ajax(conf);
};

export default {
    name: 'upload',
    props: {
        config: {
            type: Object,
        },
        // Array<object>
        // { key: keyName, value: valueName }
        data: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            isHtml5: true,
            conf: {},
            id: 0,
        };
    },
    beforeMount() {
        this.extendConf();
        this.isHtml5 = !!(window.File) && !config.forceFlash;
        this.conf.id = `id-${+new Date()}`;
    },
    watch: {
        config() {
            this.extendConf();
        },
    },
    computed: {
        multiple() {
            return config.isMultiple;
        },
    },
    mounted() {
        const parent = this.$el.parentElement;

        if (lib.css(parent, 'position') === 'static' || lib.css(parent, 'position') === '') {
            lib.css(parent, 'position', 'relative');
        }

        if (!this.isHtml5) {
            uploadSwf(this.$el, this.conf);
        }
    },
    methods: {
        extendConf() {
            const globalConf = Object.assign({}, config);
            this.conf = Object.assign(globalConf, this.config);
        },
        upload(e) {
            const file = e.target.files;
            let i;
            let item;
            const errors = [];
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
                this.conf.fn({ error });
                return;
            }
            for (i = 0; i < file.length; i++) {
                item = file[i];
                const lintFile = lint.call(this, item);
                // hack onchange
                {
                    const success = this.conf.fn;
                    this.conf.fn = (res, file) => {
                        this.$refs['upload-btn'].value = '';
                        if (this.conf.size && this.conf.size.validate && lib.isImg()) {
                            validateCap.call(null, this.conf.size.validate(res), this.conf)
                                .then(() => {
                                    success.call(this, res, file);
                                }, (error) => {
                                    success.call(this, error);
                                });
                        } else {
                            success.call(this, res, file);
                        }
                    };
                }
                if (typeof this.conf.beforeUpload === 'function') this.conf.beforeUpload(item);
                uploadAjax(item, lintFile.name, Object.assign({}, this.conf, this.data));
            }
        },
    },
};
