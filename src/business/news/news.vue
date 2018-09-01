<template>
    <div class="news-container">
        <l-tabs :list="listTab" :current="type" @change="changeRoute"/>
        <div class="news-container">
            <div class="healthy-container">
                <div class="healthy-list-item" v-for="item in list" @click="toDetails(item)">
                    <div :class="type==1||type==4?'activity':'share'">
                        <div class="news-left-img pull-left">
                            <img :src="item.imgPath" alt="">
                            <div class="bg"></div>
                        </div>
                        <div class="news-right-container pull-left">
                            <div class="title">{{ item.name }}</div>
                            <div class="description" v-if="type==3">{{ item.description }}</div>
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
    </div>
</template>
<script>
    import InfiniteLoading from 'vue-infinite-loading';
    export default {
        name: 'news',
        components: {
            InfiniteLoading,
        },
        data() {
            return {
                listTab: [
                    {
                        id: '1',
                        name: '健康学堂'
                    },
                    {
                        id: '3',
                        name: '玩家分享'
                    },
                    {
                        id: '4',
                        name: '行业快讯'
                    }
                ],
                scrollHeight: 900,
                page: 1,
                list: [],
                currentRoute: 'healthy',
                type: '1'
            }
        },
        watch: {
            type: function (nVal) {
                if (nVal === '3') {
                    this.$emit('changeRightTitle', '我来分享')
                    this.$emit('changeRightIcon', 'woxiangfenxiang')
                }else {
                    this.$emit('changeRightTitle', '')
                    this.$emit('changeRightIcon', '')
                }
            }
        },
        methods: {
            editEvent() {
                this.$router.push('shareNews')
            },
            changeRoute(route) {
                this.type = route
                this.page = 1
                this.list= [];
                var _this = this;
                setTimeout(function(){
                    _this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                },300);

            },
            loadData($state) {
                var _this = this;
                this.axios.post(this.session.articleList, {'page': _this.page, 'pageSize': 10, 'type': this.type},
                    function (json) {
                        if (_this.page == 1) {
                            _this.list = []
                        }
                        $(json.dataList).each(function (index, item) {
                            _this.list.push({
                                id: item.id,
                                name: item.title,
                                imgPath: item.logo,
                                description: item.intro
                            })
                        })
                        _this.appUtil.loadFinish(_this,json.pageCount,$state);
                    }, function (json) {
                        _this.$Message.error(json.msg)
                    })
            },
            toDetails(item) {
                this.$router.push({name: 'newsDetails', params: {id: item.id}})
            },
            infiniteHandler($state) {
                this.loadData($state)
            }
        },
        mounted() {
            this.page = 1
            var height = $(window).height() - $('header').outerHeight(true) - $('.l-tabs').outerHeight(true)-5
            $(".healthy-container").height(height);
        },
        beforeRouteLeave(to, from, next) {
            // 进入详情
            if (to.name === "newsDetails") {
                // 获得滚动距离

                let scrollTop = $('.healthy-container').scrollTop();
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
            if (this.type == 3) {
                setTimeout(function () {
                    _this.$emit('changeRightTitle', '我来分享')
                    _this.$emit('changeRightIcon', 'woxiangfenxiang')
                }, 10)
            }
            let scrollTop = this.session.appCache("messageScrollTop");
            // 判断来源
            if (scrollTop != null) {
                // 需要缓存的页面,滚动
                $('.healthy-container').scrollTop(scrollTop);
            }
        }
    }
</script>
<style lang="scss">
    .news-container {
        padding-bottom: 0 !important;
    }
    .healthy-container {
        padding-bottom: 0 !important;
        overflow-y:scroll;
        -webkit-overflow-scrolling:touch;
        .healthy-list-item {
            margin: 0 auto;
            overflow: hidden;
            background-color: #ffffff;
            .activity{
                 height: 300px;
                 position:relative;
                text-align:center;
                .news-left-img {
                    width: 100%;
                    height:100%;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    .bg{width: 100%;height:100%;background-color: rgba(0,0,0,0.5);position: absolute;top:0px;left: 0px;}
                }
                .news-right-container  {position: absolute;left: 10px;bottom: 20px;width: 100%;z-index:10;
                 .title {width: 95%;color:#FFF;margin: 0px auto;}
                }
            }
            .share{ height: 180px; padding: 10px 20px;}
            .news-left-img {
                width: 160px;
                height: 160px;
                margin: 0 10px 0 0;
                img {
                    width: 160px;
                    height: 160px;
                }

            }
            .news-right-container {
                width: 510px;
                height: 160px;
                .title {
                    font-size: 35px;
                    line-height: 40px;
                    height: 40px;
                    overflow: hidden;
                    word-wrap: normal;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: #000000;
                }
                .description {
                    font-size: 26px;
                    line-height: 36px;
                    height: 110px;
                    margin-top: 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-wrap: normal;
                    color: #666666;
                }
            }
        }
        .healthy-list-item:nth-last-child(1) {
            border-bottom: none;
        }
    }
</style>
