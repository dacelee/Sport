<template>
    <div class="trading-center-list">
        <div class="head-title text-center">
            交易中心
        </div>
        <l-footerMenu :currentRoute.sync="route"/>
    </div>
</template>

<script>
    export default {
        name: 'trading-center-list',
        data() {
            return {
                route: 'tradingCenter'
            }
        }
    }
</script>

<style lang="scss">
    .trading-center-list {
        .head-title {
            height: 80px;
            line-height: 80px;
            font-size: 34px;
            background: #404049;
            position: relative;
            .icons {
                position: absolute;
                width: 30px;
                height: 30px;
                z-index: 2;
                margin: 25px 0;
            }
        }
    }
</style>
