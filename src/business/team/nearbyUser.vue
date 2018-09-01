<template>
    <div class="clubTeams2">
        <div class="club-list-container">
            <div class="club-list-item" v-for="item in list">
                <div class="left-img pull-left">
                    <img :src="item.imgPath" alt="">
                </div>
                <div class="right-container pull-left">
                    <div class="left-basic-info text-white pull-left">
                        <div class="name">{{ item.name }}
                            <l-icon :name="item.level === 1 ? 'chuangjianren' : ''"/>
                        </div>
                        <div class="club-num-info">
                            <div class="chengyuan-people pull-left">
                                <l-icon :name="item.chengyuanIcon" class="text-center"/>
                            </div>
                            <div class="activity-count pull-left">活跃度:{{ item.activity }}</div>
                            <div class="already pull-left">{{ item.already }}</div>
                        </div>
                    </div>
                    <div class="nearby-join" @click="join(item.memberid)">
                        邀请
                    </div>
                </div>
            </div>
            <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
                 <span slot="no-more">
                      暂无更多数据
                 </span>
            </infinite-loading>
        </div>
    </div>
</template>
<script>
    import team from '../../api/team.js'
    import InfiniteLoading from 'vue-infinite-loading';
    export default {
        name: 'nearbyUser',
        components: {
            InfiniteLoading
        },
        data() {
            return {
                page: 1,
                x:0,
                y:0,
                list: [ ]
            }
        },
        methods: {
            init(){
                this.page = 1;
                this.x=0;
                this.list = [];
            },
            infiniteHandler($state) {
                this.loadData($state)
            },
            loadData($state){
                var _this = this
                if(this.x ==0|| this.y==0){
                    this.amap.getLocation(this,function(ret){
                        if(!ret.status){
                            _this.$Message.error("定位失败");
                            return;
                        }
                        _this.x = ret.lon;
                        _this.y = ret.lat;
                        _this.page = 1;
                        team.nearbyMemberList(_this,_this.x,_this.y,$state);
                    },false);
                }else{
                    team.nearbyMemberList(this,this.x,this.y,$state);
                }
            },
            join(memberid){
                var id =  this.$route.query.id;
                var type =  this.$route.query.type;
                if(!id){
                    id = this.session.appCache("nearByUserTeamId");
                    if(!id){
                        this.$Message.error("请先创建您的队伍");
                        return;
                    }else{
                        type=1;
                    }
                }
                team.joinAction(this,memberid,type,id);
            }
        },
        activated() {

        },
        mounted() {
            this.init();
            var headerHeight = $("header").outerHeight(true);
            if($('.l-short-menu').length>0){
                headerHeight+= $(".l-short-menu").outerHeight(true)+10;
            }
            $(".club-list-container").height( $(window).height()-headerHeight);
        }
    }
</script>

<style lang="scss">
    .clubTeams2 {
        padding-top:20px;
        .club-list-container {
            width: calc(100% - 60px);
            margin: 0 auto;
            overflow: scroll;
            -webkit-overflow-scrolling:touch;
            .club-list-item {
                width: 100%;
                height: 159px;
                background: #333339;
                margin: 0 auto 20px;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
                padding: 30px 25px 30px 30px;
                position: relative;
                .left-img {
                    width: 100px;
                    height: 100px;
                    img {
                        width: 100px;
                        height: 100px;
                        -webkit-border-radius: 100%;
                        -moz-border-radius: 100%;
                        border-radius: 100%;
                    }
                }
                .right-container {
                    margin-left: 20px;
                    width: calc(100% - 160px);
                    .left-basic-info {
                        
                        .name {
                            font-size: 32px;
                            line-height: 32px;
                            margin-top: 12px;
                            .icons {
                                width: 100px;
                                height: 32px;
                                margin-left: 10px;
                            }
                        }
                        .club-num-info {
                            font-size: 24px;
                            line-height: 24px;
                            color: #999999;
                            margin-top: 20px;
                            .activity-count {
                                margin-left: 30px;
                            }
                            .chengyuan-people{margin-right:30px;}
                            .already{margin-left: 40px;color:#F8C513}
                        }
                    }
                    .nearby-join {
                        position: absolute;
                        right: 40px;
                        top: 60px;
                        width: 80px;
                        height: 80px;
                        border: 2px solid #ffd554;
                        -webkit-border-radius: 100%;
                        -moz-border-radius: 100%;
                        border-radius: 100%;
                        line-height: 80px;
                        text-align: center;
                        margin-top: -20px;
                    }
                }
            }
        }
    }
</style>
