import vue from 'vue';
import vueResource from 'vue-resource';
import app from './app.vue';
import upload from 'src/index_global';

vue.config.devtools = true;
vue.use(vueResource);
vue.use(upload);

new vue({
    el: '#app',
    render (fn) {
        return fn(app);
    }
});