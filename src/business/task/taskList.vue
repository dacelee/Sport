<template>
    <div class="news-list">
        <l-head>
            <l-icon name="fanhui" @click.native="$router.push('/')" slot="left-item"/>
            任务
        </l-head>
        <l-shortMenu :list="list" :currentRoute="currentRoute" @change="changeRoute"/>
        <div class="task-container">
            <component :is="currentRoute"/>
        </div>
    </div>
</template>

<script>
    let _this
    export default {
        name: 'task-list',
        data() {
            return {
                currentRoute: 'allTask',
                list: [
                    {
                        id: 'allTask',
                        name: '所有任务'
                    },
                    {
                        id: 'myTask',
                        name: '我的任务'
                    },
                    {
                        route: 'historyTask',
                        name: '历史任务'
                    }
                ]
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
