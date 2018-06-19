<template>
    <div class="news-container">
        <l-tabs :list="list" :current="currentRoute" @change="changeRoute"/>
        <div class="news-container">
            <component :is="currentRoute"/>
        </div>
    </div>
</template>

<script>
    let _this
    import healthy from './healthy'
    import industry from './industry'
    import share from './share'
    
    export default {
        name: 'news',
        components: {
            healthy,
            industry,
            share
        },
        data() {
            return {
                list: [
                    {
                        id: 'healthy',
                        name: '健康学堂'
                    },
                    {
                        id: 'industry',
                        name: '行业快讯'
                    },
                    {
                        id: 'share',
                        name: '玩家分享'
                    }
                ],
                currentRoute: 'healthy'
            }
        },
        methods: {
            changeRoute(route) {
                _this.currentRoute = route
            }
        },
        mounted() {
            _this = this
        }
    }
</script>

<style lang="scss">
    .news-container {
        padding-bottom: 0 !important;
        background-color: #ffffff;
        height: 100%;
    }
</style>
