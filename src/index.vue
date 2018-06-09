<template>
    <div id="index">
        <div class="view-container">
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
        },
        mounted() {
            let clientHeight = document.documentElement.clientHeight
            $('.view-container').css('min-height', clientHeight)
        }
    }

</script>

<style lang="scss">
    @import "./style/common.scss";
    
    .view-container {
        overflow: hidden;
        > div:nth-child(1) {
            padding-bottom: 110px;;
        }
    }
</style>
