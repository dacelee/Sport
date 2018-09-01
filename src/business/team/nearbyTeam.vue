<template>
    <div class="nearby-team">
            <div class="nearby-team-item" v-for="item in list">
                <div class="nearby-name"> <div class="team-logo"><img :src="item.logo"/></div>{{ item.name }}</div>
                <div class="nearby-info pull-left">
                    <div class="nearby-address">
                        <l-icon name="juli"/>
                        {{ item.address }}
                    </div>
                    <div class="nearby-personal">
                        <l-icon name="zudui"/>
                        {{ item.personalCount }}
                    </div>
                </div>
                <div class="nearby-join pull-left" @click="join(item.id)">加入</div>
            </div>
            <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
                 <span slot="no-more">
                      暂无更多数据
                 </span>
            </infinite-loading>
    </div>
</template>
<script>
    let _this;
    import citys from '../../api/citys.js'
    import InfiniteLoading from 'vue-infinite-loading';
    export default {
        name: 'nearby-team',
        components: {
            InfiniteLoading
        },
        data() {
            return {
                scrollHeight:400,
                page:1,
                list: [
//                    {
//                        name: '一起去跑步',
//                        address: '长沙市岳麓区',
//                        personalCount: 15
//                    },
//                    {
//                        name: '减肥俱乐部',
//                        address: '长沙市天心区',
//                        personalCount: 24
//                    }
                ],
                param:{
                    x:0,
                    y:0,
                    page:1,
                    pageSize:10
                }
            }
        }, mounted() {
            _this = this
            var headerHeight = $("header").outerHeight(true);
            $(".nearby-team").height( $(window).height()-headerHeight-$(".l-short-menu").outerHeight(true)-10);
//            this.nearbyTeam();
        }, methods: {
            infiniteHandler($state) {
                var _this = this
                _this.nearbyTeam($state);
            },
            nearbyTeam($state){
                //附近组队
                var _this = this
                if(_this.param.x ==0|| _this.param.y==0){
                    this.amap.getLocation(this,function(ret){
                        if(!ret.status){
                            _this.$Message.error("定位失败");
                            return;
                        }
                        _this.param.x = ret.lon;
                        _this.param.y = ret.lat;
                        _this.loadData($state);
                    },false);
                }else{
                    this.loadData($state);
                }
            },
            loadData($state){
                var _this = this
                this.param.page = this.page;
                this.axios.post(this.session.nearReam, this.param, function (json) {
                    if(_this.page==1){
                        _this.list = [];
                    }
                    $(json.dataList).each(function(index,item){
                        _this.list.push(  {
                            id:item.id,
                            name:item.name,
                            logo:item.logo,
                            address: item.address,
                            personalCount: item.memberCount
                        });
                    });
                    _this.appUtil.loadFinish(_this,json.pageCount,$state);
                }, function (json) {
                    _this.list = []
                    _this.$Message.error(json.msg)
                });
            },
            join(id){
               this.session.getMemberID(function(memberid){
                   _this.axios.post("/team/jointeam", {"memberid":memberid,"teamid":id}, function (json) {
                       _this.$Message.info(json.msg);

                   },function(json){
                       _this.$Message.error(json.msg);
                   });
               });
            }
        }
    }
</script>

<style lang="scss">
    .nearby-team {
        width: 690px;
        margin: 0 auto;
    .nearby-team-item {
        margin-top: 20px;
        height: 190px;
        background-color: #33333a;
        padding: 30px 30px 30px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    .team-logo{display: inline-block;width: 44px;vertical-align: middle;margin-right: 10px}
    .team-logo img{width: 44px;height: 44px;}
    .nearby-name {
        font-size: 32px;
        line-height: 32px;
    }
    .nearby-info {
        width: 500px;
    .nearby-address {
        margin-top: 15px;
        font-size: 24px;
        line-height: 24px;
        margin-bottom: 10px;
    }
    }
    .nearby-join {
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
</style>
