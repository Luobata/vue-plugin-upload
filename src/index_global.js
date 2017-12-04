import app from './upload/upload.vue';

const install = (Vue) => {
    Vue.component(app.name, app);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};

module.exports = {
    install
};
