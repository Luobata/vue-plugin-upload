import app from './upload/upload.vue';
import { setConfig } from './upload/config';

const install = (Vue, config) => {
    setConfig(config);
    Vue.component(app.name, app);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = {
    install,
};
