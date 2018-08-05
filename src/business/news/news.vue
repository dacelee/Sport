<template>
    <div class="news-container">
        <l-tabs :list="listTab" :current="type" @change="changeRoute"/>
        <div class="news-container">
            <div class="healthy-container">
                <Scroll :on-reach-bottom="handleReachBottom" :height="scrollHeight">
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
                </Scroll>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'news',
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
                }
                else {
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
                this.loadData()
            },
            loadData(resolve) {
                var _this = this
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
                        if (_this.page < json.pageCount) {
                            _this.page++
                        }
                    }, function (json) {
                        _this.$Message.error(json.msg)
                    }, resolve)
            },
            toDetails(item) {
                this.$router.push({name: 'newsDetails', params: {id: item.id}})
            },
            handleReachBottom() {
                var _this = this
                return new Promise(function (resolve) {
                    _this.loadData(resolve)
                })
            }
        },
        mounted() {
            this.page = 1
            this.loadData();
            this.scrollHeight = $(window).height() - $('header').outerHeight(true) - $('.l-tabs').outerHeight(true) - 5
            $(".healthy-container").height( this.scrollHeight);
        },
        activated() {
            var _this = this;
           if(this.type==3){
               setTimeout(function(){
                   _this.$emit('changeRightTitle', '我来分享')
                   _this.$emit('changeRightIcon', 'woxiangfenxiang')
               },10)
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
        .healthy-list-item {
            border-bottom: 2px solid #999999;
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
                        height: auto;
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
