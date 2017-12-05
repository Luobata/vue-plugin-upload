const lib = {
    extends(source, target) {
        for (const k in target) {
            if (lib.isObject(target[k]) && lib.isObject(source[k])) {
                lib.extends(source[k], target[k]);
            } else {
                source[k] = target[k];
            }
        }
        return source;
    },
    clone(obj) {
        let o;
        if (typeof obj === 'object') {
            if (obj === null) {
                o = null;
            } else if (obj instanceof Array) {
                o = [];
                for (let i = 0, len = obj.length; i < len; i++) {
                    o.push(this.clone(obj[i]));
                }
            } else {
                o = {};
                for (const j in obj) {
                    if (!lib.has(obj, j)) continue;
                    o[j] = this.clone(obj[j]);
                }
            }
        } else {
            o = obj;
        }
        return o;
    },
    isObject(obj) {
        return typeof obj === 'object' && !(obj instanceof Array);
    },
    queryString(object) {
        const data = [];
        let key;
        let val;

        for (key in object) {
            // if (object.hasOwnProperty(key)) {
            if (lib.has(object, key)) {
                val = object[key];
                data.push(`${key}=${encodeURIComponent(val)}`);
            }
        }
        return data.join('&');
    },
    getRandomString(len) {
        len = len || 32;
        const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        const maxPos = $chars.length;
        let pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    getWidth(dom) {
        return dom.offsetWidth;
    },
    getHeight(dom) {
        return dom.offsetHeight;
    },
    prepend(dom, html) {
        dom.innerHTML = html + dom.innerHTML;
    },
    css(dom, sty, newSty) {
        if (!newSty) {
            return dom.style[sty];
        }
        dom.style[sty] = newSty;
        return dom;
    },
    fnLoadScript: (src, fun) => {
        const head = document.getElementsByTagName('head')[0] || document.head || document.documentElement;

        const script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('charset', 'UTF-8');
        script.setAttribute('src', src);

        if (typeof fun === 'function') {
            if (window.attachEvent) {
                script.onreadystatechange = () => {
                    const r = script.readyState;
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
    },
    isImg() {
        return true;
    },
    has(obj, key) {
        return {}.hasOwnProperty.call(obj, key);
    },
};

export default lib;
