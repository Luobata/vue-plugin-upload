const lint = (conf) => {
    const lintFile = {};
    if (conf.url) {
        lintFile.error = '缺少参数url';
    }
    return lintFile;
};

export default (conf) => {
    const lintFile = lint(conf);
    const xhr = new XMLHttpRequest();
    if (lint.error && conf.fn && typeof conf.fn === 'function') {
        conf.fn(lintFile);
        return;
    }
    if (xhr.upload) {
        if (conf.progress && typeof conf.progress === 'function') {
            (function progress(conf) {
                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = event.loaded / event.total;
                        conf.progress(conf.file, percentComplete);
                    }
                };
            }(conf));
        }


        // 开始上传
        xhr.open(conf.method, conf.uploadUrl, true);
        xhr.setRequestHeader('Accept', '*/*');
        xhr.withCredentials = conf.credentials;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (typeof conf.fn === 'function') conf.fn(JSON.parse(xhr.response), conf.file);
                } else {
                    conf.fn({
                        error: `上传失败${xhr.responseText}`,
                    });
                }
            }
        };
        xhr.send(conf.data);
    }
};
