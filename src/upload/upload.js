export default {
    name: 'upload',
    data () {
        return {
            isHtml5: true,
        };
    },
    beforeMount () {
        this.isHtml5 = !!(window.File);
    }
};
