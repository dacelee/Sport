<template>
    <div class="news-container2">
        <div class="healthy-list-item" v-for="item in list" >
            <div class="share">
                <div class="news-left-img pull-left" @click="toDetails(item)">
                    <img :src="item.imgPath" alt="">
                </div>
                <div class="news-right-container pull-left">
                    <div class="title" @click="toDetails(item)">{{ item.name }} </div>
                    <div class="description" @click="toDetails(item)">{{ item.description }}</div>
                    <div class="status">
                        <div class="reply">
                            <div class="con">
                            {{item.reply}}
                            </div>
                            <div class="s">{{item.status}} </div>
                        </div>
                        <div class="del" @click="del(item.id)">删除</div>
                    </div>
                </div>
            </div>
        </div>
        <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
               <span slot="no-more">
                    暂无更多数据
               </span>
        </infinite-loading>
    </div>
</template>
<script>
    import InfiniteLoading from 'vue-infinite-loading'
    export default {
        name: 'news',
        components: {
            InfiniteLoading,
        },
        data() {
            return {
                page: 1,
                list: [],
                ref:true,
            }
        },
        methods: {
            editEvent() {
                this.$router.push('shareNews')
            },
            infiniteHandler($state){
                var _this = this;
                this.axios.post("/article/mylist", {'page': _this.page, 'pageSize': 10, 'type': 3},
                    function (json) {
                        if (_this.page == 1) {
                            _this.list = []
                        }
                        $(json.dataList).each(function (index, item) {
                            var reply = item.reply?('拒绝:'+item.reply):'';
                            _this.list.push({
                                id: item.id,
                                name: item.title,
                                imgPath: item.logo,
                                description: item.intro,
                                status:item.isverify==0?'未审核':'已审',
                                reply:reply
                            })
                        })
                        _this.appUtil.loadFinish(_this,json.pageCount,$state);
                    }, function (json) {
                        _this.$Message.error(json.msg)
                    })
            },
            del(id){
                var _this = this;
                App.confirm({"title":'警告',"content":'确定删除文章吗?'}).then(function() {
                    _this.axios.post("/article/article_del", {'id': id},
                        function (json) {
                            _this.page = 1
                            _this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                            _this.$Message.info(json.msg)
                        }, function (json) {
                            _this.$Message.error(json.msg)
                        }
                    );
                })
            },
            toDetails(item) {
                this.$router.push({name: 'newsDetails', params: {id: item.id}})
            },
            updateArticle(item) {
                return;
                this.$router.push({name: 'shareNews', query: {id:item.id}})
            }
        },
        mounted() {
            this.scrollHeight = $(window).height() - $('header').outerHeight(true)
            $(".news-container2").height(this.scrollHeight);
        },
        beforeRouteLeave(to, from, next) {
            // 进入详情
            if (to.name === "newsDetails") {
                // 获得滚动距离
                let scrollTop = $('.news-container2').scrollTop();
                // 设置缓存
                this.session.appCache("messageScrollTop", scrollTop);
            } else {
                // 如果去其他页移除缓存
                this.session.rmCache("messageScrollTop");
            }
            next();
        },
        activated() {
            let scrollTop = this.session.appCache("messageScrollTop");
            // 判断来源
            if (scrollTop != null) {
                // 需要缓存的页面,滚动
                $('.news-container2').scrollTop(scrollTop);
            }
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        }
    }
</script>
<style lang="scss">
    .news-container2 {
        padding-bottom: 0 !important;
        overflow-y: scroll;
        -webkit-overflow-scrolling:touch;
        .healthy-list-item {
            margin: 0 auto;
            overflow: hidden;
            background-color: #ffffff;

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
                    height: 40px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-wrap: normal;
                    color: #666666;
                }
                .status {
                    font-size: 26px;
                    line-height: 36px;
                    height: 80px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-wrap: normal;
                    color: #666666;

                    .reply{width: 85%;float: left;height: 80px;
                        .con{float: left;}
                        .s{color: #4d5669;text-align: right;height: 40px;float: right;}
                    }
                    .del{float: right;color: #ff3300;width: 15%;height: 40px;text-align: right;}
                }
            }
        }
        .healthy-list-item:nth-last-child(1) {
            border-bottom: none;
        }
    }
</style>
