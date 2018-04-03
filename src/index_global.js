import app from './upload/upload.vue';
import { setConfig } from './upload/config';

const install = (Vue, config, name = '') => {
    setConfig(config);
    Vue.component(name || app.name, app);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default install;
// module.exports = {
//     install,
// };
