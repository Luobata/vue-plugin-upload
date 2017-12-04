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
};

export const setConfig = (obj: Object) => {
    Object.assign(config, obj);
};
