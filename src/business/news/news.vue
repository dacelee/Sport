<template>
    <div class="news">
        <div class="head-title text-center">
            <l-icon name="fanhui" class="left-icons" @click.native="$router.push('/')"/>
            资讯
        </div>
        <div class="short-menu-tabs">
            <div class="short-menu-item" v-for="item in list" :class="{'active':item.route === currentRoute}"
                 @click="changeRoute(item.route)">{{ item.name }}
            </div>
        </div>
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
                        route: 'healthy',
                        name: '健康学堂'
                    },
                    {
                        route: 'industry',
                        name: '行业快讯'
                    },
                    {
                        route: 'share',
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

<style scoped>

</style>
