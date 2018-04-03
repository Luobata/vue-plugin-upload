import vue from 'vue';
import vueResource from 'vue-resource';
import app from './app.vue';
import upload from 'src/index_global';

vue.config.devtools = true;
vue.use(vueResource);
vue.use(upload, {
    uploadUrl: 'http://10.16.39.69:3000/demo/upload',
    fileName: 'file',
    type: '*',
    //min: 20 * 1024,
    max: 10 * 1024,
    max: null,
    isMultiple: true,
    resBase: '//t.focus-res.cn/front-end/upload/',
    size: {
        minWid: 50,
        maxWid: 800,
        minHei: 60,
        maxHei: 900,
        validate (res) {
            const url = '//t-img.51f.com/' + res.data.url;
            const img = new Image();
            img.src = url;
            return img;
        }
    },
    forceFlash: true,
    forceFlash: false,
}, 'vue-upload');

window.onload = () => {
    new vue({
        el: '#app',
        render (fn) {
            return fn(app);
        }
    });
}
