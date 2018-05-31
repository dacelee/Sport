<template>
    <div class="business-center-list">
        <div class="head-title text-center">
            商圈
        </div>
        <l-footerMenu :currentRoute="route"/>
    </div>
</template>

<script>
    export default {
        name: 'business-center-list',
        data() {
            return {
                route: 'businessCenter'
            }
        }
    }
</script>

<style lang="scss">
    .business-center-list {
        .head-title {
            height: 80px;
            line-height: 80px;
            font-size: 34px;
            background: #404049;
            position: relative;
        }
    }
</style>
