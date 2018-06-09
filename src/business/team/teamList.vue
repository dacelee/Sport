<template>
    <div class="team-list">
        <l-head>
            <l-icon name="fanhui" @click.native="$router.push('/')" slot="left-item"/>
            组队
            <div class="text-white" @click="createTeam" slot="right-item">创建</div>
        </l-head>
        <l-menuTabs class="team-menu" :currentMenu="currentMenu" :list="menuList" @change="changeTabs"/>
        <div class="team-container">
            <component :is="currentMenu"/>
        </div>
    </div>
</template>

<script>
    let _this
    import myTeam from './myTeam'
    import nearbyTeam from './nearbyTeam'
    
    export default {
        name: 'team-list',
        components: {
            myTeam,
            nearbyTeam
        },
        data() {
            return {
                currentMenu: 'myTeam',
                menuList: [
                    {
                        id: 'myTeam',
                        name: '我的队伍'
                    },
                    {
                        id: 'nearbyTeam',
                        name: '附近队伍'
                    }
                ]
            }
        },
        methods: {
            changeTabs(res) {
                _this.currentMenu = res
            },
            createTeam() {
                _this.$router.push('createTeam')
            }
        },
        mounted() {
            _this = this
        }
    }
</script>

<style lang="scss">
    .team-list {
        padding-bottom: 10px !important;
        .team-menu {
            margin-top: 20px;
        }
    }
</style>
