<template>
    <div id="app">
        <div class="upload-1">
            <div class="dom"></div>
            <upload :config="config">
            </upload>
        </div>
    </div>
</template>
<style scoped>
    #app {
        height: 100%;
    }
    .upload-1 {
        width: 100px;
        height: 100px;
        background: red;
    }
    .upload-1 .dom {
        width: 100%;
        height: 100%;
    }
</style>
<script>
    export default {
        data () {
            return {
                config: {
                    fn: function (res) {
                        console.log(res);
                    }
                },
            };
        },
        methods: {
            changeCity (city) {
                console.log(city);
            }
        }
    };
</script>
