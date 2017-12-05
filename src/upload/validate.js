// 返回true 代表合法 false代表不合法
// 校验conf是否合法
// 通过call传递this 不能使用箭头函数
export const validateConf = function validateConf() {
    if (!this.conf.uploadUrl || !this.conf.selecter || !this.conf.fn) {
        return false;
    }

    return true;
};
// 校验类型
export const validateType = function validateType(type) {
    if (this.conf.type === '*') {
        return true;
    }

    return !!(this.conf.type.indexOf(type) !== -1);
};
// 校验尺寸
export const validateSize = function validateSize(size) {
    return (!this.conf.min || size >= this.conf.min) && (!this.conf.max || size <= this.conf.max);
};
// 校验文件大小
export const validateCap = function validateCap(img, conf) {
    return new Promise((resolve, reject) => {
        const val = (img) => {
            const width = img.width;
            const height = img.height;
            const size = conf.size;
            if ((size.minWid && width < size.minWid) ||
                (size.maxWid && width > size.maxWid) ||
                (size.minHei && height < size.minHei) ||
                (size.maxHei && height > size.maxHei)
            ) {
                /* eslint-disable prefer-promise-reject-errors */
                reject({
                    error: '图片尺寸不符合要求!',
                });
                /* eslint-disable prefer-promise-reject-errors */
            } else {
                resolve();
            }
        };
        if (img.complete) {
            return val(img);
        }
        img.onload = () => val(img);

        return true;
    });
};
