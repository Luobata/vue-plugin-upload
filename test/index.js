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
    // min: 100 * 1024,
    max: null,
    isMultiple: true,
    cap: {
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
});

new vue({
    el: '#app',
    render (fn) {
        return fn(app);
    }
});
