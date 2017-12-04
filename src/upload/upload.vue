<template lang="pug">
    div.upload-html(v-if="isHtml5")
        input.upload-btn(ref="upload-btn" type="file" :multiple="multiple" @change="upload")
    div.upload-swf(v-else)
        span.upload-btn-id(:id="conf.id")
</template>
<style scoped>
    .upload-html {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .upload-html .upload-btn {
        width: 100%;
        height: 100%;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer;
        z-index: 100;
    }
    .upload-swf {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        opacity: 0;
        filter: alpha(opacity=0);
        z-index: 100;
    }
    .upload-swf .upload-btn {
        width: 100%;
        height: 100%;
    }
</style>
<script src="./upload.js">
</script>
