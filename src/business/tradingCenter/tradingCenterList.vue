<template>
    <div>交易中心
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

<style scoped>

</style>
