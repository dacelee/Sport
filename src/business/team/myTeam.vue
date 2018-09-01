<template>
    <div class="my-team">
        <div class="my-team-introduction" v-if="myTeamInfo!=null">
            <div class="my-team-head-info">
                <div class="team-logo"><img :src="myTeamInfo.logo"/></div>
                <div class="my-team-name text-white">{{ myTeamInfo.name }}</div>
                <div class="my-team-dateTime">{{ myTeamInfo.dateTime }}</div>
            </div>
            <div class="team-info">
                <div class="address">地点:{{ myTeamInfo.address }}</div>
            </div>
            <div class="team-description">{{ myTeamInfo.description }}</div>
        </div>
        <div class="my-team-introduction text-center noTeam" v-if="myTeamInfo==null">
            <l-icon name="cry"/>
            你当前不在队伍中，邀请好友组队，享受活跃度加成，赚取更多糖果
        </div>
        <div class="my-team-info" v-if="myTeamInfo!=null">
            <div class="basic-info">
                <div class="left-label">{{ '队伍成员 ('+teamMembers.length+')' }}</div>
                <div v-if="isManage && teamMembers.length==1"  @click="delTeam(myTeamInfo.teamid)">解散队伍  <l-icon name="bianji" class="right-icons"/></div>
            </div>
            <div class="personal-list">
                <div class="personal-list-item" v-for="item in teamMembers">
                    <div class="personal-head-way pull-left">
                        <img :src="item.imgPath" alt="">
                    </div>
                    <div class="left-personal-info pull-left">
                        <div class="personal-name">
                            {{ item.name }}
                            <l-icon :name="item.sex === '男' ? 'chengyuan-nan' : 'chengyuan-nv'"/>
                        </div>
                        <div class="activity-info">
                            活跃度:{{ item.activity }}
                        </div>
                        <div class="steps-info">
                            今日步数:{{ item.steps }}
                        </div>
                        <div class="signature-info">{{ item.signature }}</div>
                    </div>
                    <div class="personal-operation pull-left captain" v-if="item.status===1">
                        <l-icon name="duichang" class="pull-left"/>
                        <div class="label">队长</div>

                    </div>
                    <div class="personal-operation pull-left" v-if="isManage && item.id !== personalId"
                         @click="delMember(item.teamid,item.id,1)">请出队伍
                    </div>
                    <div class="personal-operation pull-left" v-if="!isManage && item.id === memberid"
                         @click="delMember(item.teamid,item.id,2)">退出队伍
                    </div>
                </div>
                <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
                     <span slot="no-more">
                          暂无更多数据
                     </span>
                </infinite-loading>
            </div>
        </div>
    </div>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading';
    export default {
        name: 'my-team',
        components: {
            InfiniteLoading,
        },
        data() {
            return {
                inited:false,
                bottomStatus:'wait',
                page:1,
                scrollHeight:400,
                myTeamInfo: null,
                personalId: 0, // 个人信息ID，用来判断是不是当前用户，做退出按钮判断
                isManage: false, // 用来判断是否拥有踢人权限
                memberid:0,
                teamid:0,
                teamMembers: [
//                    {
//                        id: 0,
//                        imgPath: 'static/img/club/1.jpg',
//                        name: 'Louis',
//                        status: 1,
//                        sex: 1,
//                        activity: 50,
//                        steps: 14123,
//                        signature: '没什么比什么更重要'
//                    },
//                    {
//                        id: 1,
//                        imgPath: 'static/img/personal/default.jpg',
//                        name: 'Judy',
//                        status: 0,
//                        sex: 1,
//                        activity: 50,
//                        steps: 14123,
//                        signature: '没什么比什么更重要'
//                    },
//                    {
//                        id: 2,
//                        imgPath: 'static/img/personal/default.jpg',
//                        name: 'Hansen',
//                        status: 0,
//                        sex: 1,
//                        activity: 50,
//                        steps: 14123,
//                        signature: '没什么比什么更重要'
//                    },
//                    {
//                        imgPath: 'static/img/personal/default.jpg',
//                        name: 'Merry',
//                        status: 0,
//                        sex: 1,
//                        activity: 50,
//                        steps: 14123,
//                        signature: '没什么比什么更重要'
//                    },
//                    {
//                        imgPath: 'static/img/personal/default.jpg',
//                        name: 'Hill',
//                        status: 0,
//                        sex: 1,
//                        activity: 50,
//                        steps: 14123,
//                        signature: '没什么比什么更重要'
//                    },
//                    {
//                        imgPath: 'static/img/personal/default.jpg',
//                        name: 'Mountain',
//                        status: 0,
//                        sex: 1,
//                        activity: 50,
//                        steps: 14123,
//                        signature: '没什么比什么更重要'
//                    },
//                    {
//                        imgPath: 'static/img/personal/default.jpg',
//                        name: 'Fish',
//                        status: 0,
//                        sex: 1,
//                        activity: 50,
//                        steps: 14123,
//                        signature: '没什么比什么更重要'
//                    },
//                    {
//                        imgPath: 'static/img/personal/default.jpg',
//                        name: 'Roi',
//                        status: 0,
//                        sex: 0,
//                        activity: 50,
//                        steps: 14123,
//                        signature: '没什么比什么更重要'
//                    }
                ]
            }
        },mounted() {
            this.inited = true;
            this.session.rmCache("nearByUserTeamId");
            this.getMyTeam();
        },
        activated() {
            if(!this.inited){
                this.inited = true;
                this.page=1;
                this.getMyTeam();
            }
        },
        deactivated(){
            this.inited = false;
        },
        methods: {
//            nearByUser(){
//                this.$router.push({name:'nearbyUser',query:{id:this.myTeamInfo.teamid,type:1}});
//            },
            infiniteHandler($state) {
                if(this.teamid!=0){
                    this.loadTeamMember(this.myTeamInfo.teamid,$state);
                }

            },
            getMyTeam() {
                var  _this = this;
                this.session.getMemberID(function (memberid) {
                    _this.memberid = memberid;
                    _this.axios.post(_this.session.teamDetail, {'memberid': memberid}, function (json) {
                        var team = json.data

                        _this.myTeamInfo = {
                            teamid: team.teamid,
                            name: team.name,
                            dateTime: _this.appUtil.dateFormat(team.addtime, 'yyyy/MM/dd hh:mm'),
                            address: team.address,
                            description: team.intro,
                            logo: team.logo
                        };
                        setTimeout(function(){
                            var headerHeight = $("header").outerHeight(true);
                            $(".personal-list").height($(window).height()-headerHeight-120);
                            _this.session.appCache("nearByUserTeamId",team.teamid);
                            _this.teamid = team.teamid;
//                            _this.loadTeamMember(team.teamid);
                            _this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                        },200);
//                        _this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                    }, function (json) {
                        _this.session.rmCache("nearByUserTeamId");
                        _this.$emit('changeData', 0,true);
                        _this.teamMembers = []
                        _this.myTeamInfo = null;
                    })
                })
            },
            loadTeamMember(teamid,$state) {
                var _this = this;
                _this.personalId = 0 ;
                this.session.getMemberID(function (memberid) {
                    _this.axios.post(_this.session.teamMember, {'teamid': teamid, 'page': _this.page, 'pageSize': 10},
                        function (json) {
                            var teamList = json.dataList
                            if (_this.page == 1) {
                                _this.teamMembers = []
                            }
                            $(teamList).each(function (index, item) {
                                var h = item.sex=="男"||item.sex==null?'./static/img/man.png':'./static/img/woman.png';
                                item.logo = item.logo==null||item.logo=="null"?h: item.logo;
                                _this.teamMembers.push(
                                        {
                                            teamid: teamid,
                                            id: item.teammemberid,
                                            imgPath: item.logo,
                                            name: item.nikename,
                                            sex: item.sex,
                                            activity: item.activity,
                                            steps: item.steps == null ? 0 : item.steps,
                                            signature: item.personality,
                                            status: item.level
                                        }
                                )
                                if (item.level == 1) {
                                    _this.personalId = item.teammemberid;
                                    if (memberid == item.teammemberid) {
                                        _this.isManage = true;
                                    }else{
                                        _this.isManage = false;
                                    }
                                }
                            })
                            _this.appUtil.loadFinish(_this,json.pageCount,$state);
                            _this.$emit('changeData', teamid, _this.isManage);
                        }, function (json) {
                            _this.teamMembers = []
                            _this.$Message.error(json.msg)
                        });
                });
            },
            /**
             * @description 退出队伍
             */
            delTeam(teamid){
                var _this = this;
                App.confirm({"title":'警告',"content":'确定解散队伍吗?'}).then(function() {
                    _this.axios.post('/team/del', {
                        'teamid': teamid,
                    }, function (json) {
                        _this.$Message.info(json.msg);
                        _this.page = 1;
                        _this.getMyTeam();
                    }, function (json) {
                        _this.$Message.info(json.msg)
                    })
                });
            },
            delMember(teamid, memberid,type) {
                var _this = this;
                var msg = type==1?'确定要请TA退出组队吗?':'确定要退出组队吗?'
                App.confirm({"title":'警告',"content":msg}).then(function() {
                    _this.axios.post(_this.session.teamDelMember, {
                        'teamid': teamid,
                        memberid: memberid
                    }, function (json) {
                        _this.$Message.info(json.msg);
                        _this.page = 1;
                        _this.getMyTeam();
                    }, function (json) {
                        _this.$Message.info(json.msg)
                    })
                });
            },
            bottomStatusChange(status){
                this.bottomStatus=status;
            },
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
            &.noTeam {
                font-size: 32px;
                line-height: 42px;
                .icons {
                    width: 32px;
                    height: 32px;
                    color: #ffffff;
                }
            }
            .my-team-head-info {
                display: flex;
                justify-content: space-between;
                .team-logo{
                    flex: 0.2;
                    height: 44px;
                }
                .team-logo img{height: 44px;width: 44px;}
                .my-team-name {
                    flex:1;
                    font-size: 34px;
                    line-height: 34px;
                }
                .my-team-dateTime {
                    flex:1;
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
            .nearByUser{padding: 20px 0px;background-color: #33333A;margin: 20px 0px;padding-left: 20px}
            .link-icons{right: 0.4rem;
                -webkit-transform: rotate(180deg);
                transform: rotate(180deg);float: right;margin-right: 30px;margin-top: 10px}
            .personal-list {
                margin: 30px auto;
                .personal-list-item {
                    background-color: #33333a;
                    padding: 30px 30px 30px;
                    overflow: hidden;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    .personal-head-way {
                        width: 140px;
                        height: 140px;
                        img {
                            width: 120px;
                            height: 120px;
                            margin: 10px;
                            -webkit-border-radius: 100%;
                            -moz-border-radius: 100%;
                            border-radius: 100%;
                        }
                    }
                    .left-personal-info {
                        width: calc(100% - 300px);
                        margin-left: 20px;
                        float: left;
                        font-size: 30px;
                        line-height: 30px;
                        .personal-name {
                            margin-bottom: 10px;
                        }
                        .activity-info {
                            font-size: 24px;
                            line-height: 24px;
                            color: #f8c513;
                            margin-bottom: 10px;
                        }
                        .steps-info {
                            font-size: 24px;
                            line-height: 24px;
                            color: #f8c513;
                        }
                        .signature-info {
                            font-size: 24px;
                            line-height: 24px;
                            margin-top: 10px;
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            word-wrap: normal;
                        }
                    }
                    .personal-operation {
                        font-size: 30px;
                        line-height: 30px;
                        margin: 51px 0 51px 0;
                        width: 140px;
                        color: #929292;
                        .icons {
                            width: 30px;
                            height: 30px;
                            margin-right: 40px;
                        }
                        &.captain {
                            color: #f8c513;
                        }
                    }
                }
            }
        }
    }
</style>
