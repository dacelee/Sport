<template>
    <div class="team-list">
        <l-shortMenu class="team-menu" :currentRoute="currentMenu" :list="menuList" @change="changeTabs"/>
        <div class="team-container">
            <component :is="currentMenu"/>
        </div>
    </div>
</template>
<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.4.0&key=15934dbe4d83af9637f6fd067e86a2df"></script>
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
                _this.currentMenu = res;
            },
            editEvent() {
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
