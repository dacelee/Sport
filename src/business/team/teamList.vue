<template>
    <div class="team-list">
        <div class="head-title text-center">
            <l-icon name="fanhui" @click.native="$router.push('/')" class="left-icons"/>
            组队
            <div class="create-team" @click="createTeam">创建</div>
        </div>
        <l-menuTabs :currentMenu="currentMenu" :list="menuList" @change="changeTabs"/>
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
        .create-team {
            position: absolute;
            top: 28px;
            right: 20px;
            font-size: 24px;
            line-height: 24px;
        }
    }
</style>
