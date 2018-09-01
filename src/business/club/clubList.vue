<template>
    <div class="club-list">
        <div class="search-area">
            <l-search placeholder="搜索" v-model="filterName"  @change="change"/>
        </div>
        <div class="club-list-container">
            <div class="club-list-item" v-for="item in list"  @click="toDetails(item)">
                <div class="left-img pull-left">
                    <img :src="item.imgPath" alt="">
                </div>
                <div class="right-container pull-left">
                    <div class="left-basic-info text-white pull-left">
                        <div class="name">{{ item.name }}
                            <l-icon
                                    :name="item.status === 0 ? 'wochuangjian' : item.status === 1 ? 'yijiaru' : item.status === 2 ? 'renzheng' : ''"
                                    v-if="item.status !== 3"/>
                        </div>
                        <div class="club-num-info">
                            <div class="people-count pull-left">人数:{{ item.peopleCount }}</div>
                            <div class="activity-count pull-left">活跃度:{{ item.activity }}</div>
                        </div>
                    </div>
                    <div class="right-distance text-center pull-left">
                        <l-icon name="juli1"/>
                        <div class="distance-num">{{ item.distance }}</div>
                    </div>
                </div>
            </div>
            <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
                 <span slot="no-more">
                      暂无更多数据
                 </span>
            </infinite-loading>
        </div>
        <l-footerMenu :currentRoute="route"/>
    </div>
</template>
<script>
    import citys from '../../api/citys.js'
    import club from '../../api/club.js'
    import InfiniteLoading from 'vue-infinite-loading';
    export default {
        name: 'club-list',
        components: {
            InfiniteLoading,
        },
        data() {
            return {
                route: 'club',
                filterName: '',
                x:0,
                y:0,
                page:1,
                list: []
            }
        },
        methods: {
            change(){
                this.page = 1;
                this.list = [];
                this.$nextTick(function() {
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                });
            },
            editEvent() {
                this.$router.push('createClub')
            },
            toDetails(item) {
                this.$router.push({name: 'clubDetails', query: {id: item.id}})
            },
            infiniteHandler ($state) {
                var _this = this;
                if(this.x!=0||this.y!=0) {
                    club.loadClub(_this, _this.filterName, _this.x, _this.y, $state);
                }
            }
        },
        beforeRouteLeave(to, from, next) {
            // 进入详情
            if (to.name === "clubDetails") {
                // 获得滚动距离
                let scrollTop =   $(".club-list-container").scrollTop();
                // 设置缓存
                this.session.appCache("messageScrollTop", scrollTop);
            } else {
                // 如果去其他页移除缓存
                this.session.rmCache("messageScrollTop");
            }
            next();
        },
        activated() {
            var _this = this;
//            return;
            //获取位置
            this.amap.getLocation(this,function (ret) {
                if (ret.status) {
                    if(_this.x!=ret.lon||_this.y!=ret.lat){
                        _this.x = ret.lon;
                        _this.y = ret.lat;
                    }
                } else {
                    _this.$Message.error("定位失败");
                }
                let scrollTop = _this.session.appCache("messageScrollTop");
                // 判断来源
                if (scrollTop) {
                    // 需要缓存的页面,滚动
                    $(".club-list-container").scrollTop(scrollTop);
                }else{
                    _this.page = 1;
                    _this.list = [];
                    _this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                }
            }, false);
        },
        mounted() {
            var headerHeight = $("header").outerHeight(true);
            $(".club-list-container").height($(window).height()-headerHeight-$(".search-area").outerHeight(true)-50);
        }
    }
</script>

<style lang="scss">
    .club-list {
        padding-bottom:120px;
    .head-title {
        height: 80px;
        line-height: 80px;
        font-size: 34px;
        background: #404049;
        position: relative;
    .btn {
        position: absolute;
        height: 30px;
        line-height: 30px;
        font-size: 30px;
        z-index: 2;
        top: 25px;
        right: 30px;
    }
    }
    .search-area {
        margin: 20px auto;
    }
    .club-list-container {
        width: calc(100% - 60px);
        margin: 0 auto;
       overflow-y:scroll;
    .club-list-item {
        width: 100%;
        height: 159px;
        background: #333339;
        margin: 0 auto 20px;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        padding: 30px 25px 30px 30px;
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
        width: calc(100% - 175px);
    .left-basic-info {
        width: calc(100% - 120px);
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
        margin-left: 20px;
    }
    }
    }
    .right-distance {
        width: 100px;
        margin-left: 15px;
    .icons {
        width: 30px;
        height: 30px;
        color: #ffffff;
        margin-top: 18px;
    }
    .distance-num {
        font-size: 24px;
        line-height: 24px;
        margin-top: 10px;
    }
    }
    }
    }
    }
    }
</style>
