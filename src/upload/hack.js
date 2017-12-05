export default (conf) => {
    const success = conf.fn;
    conf.fn = function hack(res, file) {
        if (res === -110) {
            res = {
                error: '图片大小不符合要求',
            };
        }
        success.call(this, res, file);
    };
};
