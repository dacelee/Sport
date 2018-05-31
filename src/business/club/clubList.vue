<template>
    <div>俱乐部
        <l-footerMenu :currentRoute="route"/>
    </div>
</template>

<script>
    export default {
        name: 'club-list',
        data() {
            return {
                route: 'club'
            }
        }
    }
</script>

<style scoped>

</style>
