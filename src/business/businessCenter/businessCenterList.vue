<template>
    <div>
        商圈
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

<style scoped>

</style>
