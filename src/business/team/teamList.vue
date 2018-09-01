<template>
    <div class="team-list">
        <l-shortMenu class="team-menu" :currentRoute="currentMenu" :list="menuList" @change="changeTabs"/>
        <div class="team-container">
            <component :is="currentMenu" @changeData="changeData"/>
        </div>
    </div>
</template>
<script>
    import myTeam from './myTeam'
    import nearbyTeam from './nearbyTeam'
    import nearbyUser from './nearbyUser'
    export default {
        name: 'team-list',
        components: {
            myTeam,
            nearbyTeam,
            nearbyUser
        },
        data() {
            return {
                currentMenu: 'myTeam',
                teamId:0,
                menuList: [
                    {
                        id: 'myTeam',
                        name: '我的队伍'
                    },
                    {
                        id: 'nearbyTeam',
                        name: '附近队伍'
                    },
                    {
                        id: 'nearbyUser',
                        name: '附近的人'
                    }
                ]
            }
        },
        methods: {
            changeTabs(res) {
                var   _this = this;
                _this.currentMenu = res;
                if(res!='myTeam'){
                    _this.$emit('changeRightTitle',"");
                }
            },
            changeData(teamId,manager){
                if(!manager){
                    this.$emit('changeRightTitle',"");
                }else{
                    if(teamId>0){
                        this.teamId = teamId;
                        this.$emit('changeRightTitle',"修改");
                    }else{
                        this.teamId = 0;
                        this.$emit('changeRightTitle',"创建");
                    }
                }
            },
            editEvent() {
                this.$router.push({name:'createTeam',query:{teamid:this.teamId}})
            }
        },
        mounted() {

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
