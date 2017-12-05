const noop = () => {};

export const config = {
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
        validate: null,
    },
    forceFlash: false,
};

export const setConfig = (obj: Object) => {
    Object.assign(config, obj);
};
