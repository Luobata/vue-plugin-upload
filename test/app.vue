<template>
    <div>
    </div>
</template>
<style scoped>
    #app {
        height: 100%;
    }
</style>
<script>
    import upload from '../dist/upload';
    export default {
        components: {
           upload
        },
        methods: {
            changeCity (city) {
                console.log(city);
            }
        }
    };
</script>
