<template>
    <div id="index">
        <div class="view-container">
            <l-headTitle :name="$route.meta.title"/>
            <router-view @change="changeRoute"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                needReset: false
            }
        },
        methods: {
            changeRoute() {
            
            }
        }
    }
</script>

<style>
    @import "./style/common.scss";
    
    .view-container {
        overflow: hidden;
    }
</style>
