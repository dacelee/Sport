<template>
    <div class="my-team">
        <div class="my-team-introduction">
            <div class="my-team-head-info">
                <div class="my-team-name text-white">{{ myTeamInfo.name }}</div>
                <div class="my-team-dateTime">{{ myTeamInfo.dateTime }}</div>
            </div>
            <div class="team-info">
                <div class="address">地点:{{ myTeamInfo.address }}</div>
            </div>
            <div class="team-description">{{ myTeamInfo.description }}</div>
        </div>
        <div class="my-team-info">
            <div class="basic-info">
                <div class="left-label">{{ '队伍成员 ('+teamInfo.personalCount+')' }}</div>
                <l-icon name="bianji" class="right-icons"/>
            </div>
            <div class="personal-list">
                <div class="personal-list-item" v-for="item in teamMembers">
                    <div class="personal-head-way pull-left">
                        <img :src="item.imgPath" alt="">
                    </div>
                    <div class="personal-name pull-left">{{ item.name }}</div>
                    <div class="personal-operation pull-left captain" v-if="item.status===1">
                        <l-icon name="duichang" class="pull-left"/>
                        <div class="label">队长</div>
                    </div>
                    <div class="personal-operation pull-left" v-if="item.status === 0" @click="delMember(item.teamid,item.id)">请出队伍</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let _this;
    export default {
        name: 'my-team',
        data() {
            return {
                myTeamInfo: {
                    teamid:0,
                    name: '骚骚跑跑步',
                    dateTime: '2018/06/03 19:30',
                    address: '沿江风光带',
                    description: '今晚8点，不见不散。今晚8点，不见不散。'
                },
                teamInfo: {
                    personalCount: 8
                },
                teamMembers: [
//                    {
//                        id:0,
//                        imgPath: 'static/img/club/1.jpg',
//                        name: 'Louis',
//                        status: 1
//                    },
//                    {
//                        id:1,
//                        imgPath: 'static/img/personal/default.jpg',
//                        name: 'Judy',
//                        status: 0
//                    },
//                    {
//                        id:2,
//                        imgPath: 'static/img/personal/default.jpg',
//                        name: 'Hansen',
//                        status: 0
//                    },
//                    {
//                        imgPath: 'static/img/personal/default.jpg',
//                        name: 'Merry',
//                        status: 0
//                    },
//                    {
//                        imgPath: 'static/img/personal/default.jpg',
//                        name: 'Hill',
//                        status: 0
//                    },
//                    {
//                        imgPath: 'static/img/personal/default.jpg',
//                        name: 'Mountain',
//                        status: 0
//                    },
//                    {
//                        imgPath: 'static/img/personal/default.jpg',
//                        name: 'Fish',
//                        status: 0
//                    },
//                    {
//                        imgPath: 'static/img/personal/default.jpg',
//                        name: 'Roi',
//                        status: 0
//                    }
                ]
            }
        }, mounted() {
            _this = this
            this.getMyTeam();
        },
        methods: {
            getMyTeam(){
                this.session.getMemberID(function(memberid){
                    _this.axios.post(_this.session.teamDetail, {"memberid":memberid}, function (json) {
                        var team = json.data;
                        _this.myTeamInfo.teamid = team.teamid;
                        _this.myTeamInfo.name = team.name;
                        _this.myTeamInfo.dateTime = _this.appUtil.dateFormat(team.addtime,"yyyy/MM/dd hh:mm");
                        _this.myTeamInfo.address = team.areaname;
                        _this.myTeamInfo.description = team.intro;
                        _this.loadTeamMember(team.teamid,1);
                    },function(json){
                        _this.teamInfo.personalCount = 0;
                        _this.teamMembers = [];
                        _this.myTeamInfo = {name:"暂无组队"};
//                    _this.$Message.error(json.msg);
                    });
                });

            },
            loadTeamMember(teamid,page){
                this.axios.post(this.session.teamMember, {"teamid":teamid,"page":page,'pageSize':10}, function (json) {
                    var teamList = json.dataList;
                    _this.teamInfo.personalCount = teamList?teamList.length:0;
                    var teamMembers = [];
                    $(teamList).each(function(index,item){
                        teamMembers.push(
                                {
                                    teamid:teamid,
                                    id:item.teammemberid,
                                    imgPath: item.logo,
                                    name: item.nikename,
                                    status: item.level
                                }
                        );
                    });
                    _this.teamMembers = teamMembers;
                },function(json){
                    _this.teamMembers = [];
                    _this.$Message.error(json.msg);
                });
            },
            delMember(teamid,memberid){
                this.axios.post(this.session.teamDelMember, {"teamid":teamid,memberid:memberid}, function (json) {
                    _this.$Message.info(json.msg);
                    if(json.code==1){
                        $(_this.teamMembers).each(function(index,item){
                            if(item.id==id){
                                _this.teamMembers.splice(index, 1);
                                return;
                            }
                        });
                    }
                }, function (json) {
                    _this.$Message.info(json.msg);
                });
            }
        }
    }
</script>

<style lang="scss">
    .my-team {
    .my-team-introduction {
        width: 690px;
        margin: 20px auto;
        background-color: #33333a;
        padding: 30px 30px 30px;
        color: #929292;
    .my-team-head-info {
        display: flex;
        justify-content: space-between;
    .my-team-name {
        font-size: 34px;
        line-height: 34px;
    }
    .my-team-dateTime {
        font-size: 24px;
        line-height: 24px;
        margin-top: 5px;
    }
    }
    .team-info {
        margin: 30px auto;
        font-size: 24px;
        line-height: 24px;
    .address {
        margin-bottom: 10px;
    }
    }
    }
    .my-team-info {
        width: 690px;
        margin: 0 auto;
    .basic-info {
        font-size: 24px;
        line-height: 24px;
        display: flex;
        justify-content: space-between;
    .left-label {
        color: #929292;
        margin-top: 4px;
        padding-left: 30px;
    }
    .right-icons {
        width: 32px;
        height: 32px;
        color: #ffd554;
    }
    }
    .personal-list {
        margin: 30px auto;
    .personal-list-item {
        background-color: #33333a;
        height: 140px;
        padding: 30px 30px 30px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        margin-bottom: 20px;
    .personal-head-way {
        width: 80px;
        height: 80px;
    img {
        width: 80px;
        height: 80px;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
    }
    }
    .personal-name {
        font-size: 30px;
        line-height: 30px;
        margin: 25px 0 25px 30px;
        width: 360px;
    }
    .personal-operation {
        font-size: 30px;
        line-height: 30px;
        margin: 25px 0 25px 0;
        width: 140px;
        color: #929292;
    .icons {
        width: 30px;
        height: 30px;
        margin-right: 40px;
    }
    &.captain {
         color: #ffffff;
     }
    }
    }
    }
    }
    }
</style>
