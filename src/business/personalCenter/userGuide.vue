<template>
    <div class="user-guide">
        <div class="content" id="guideContent">
            <div class="list-item" v-for="item in list"  @click="toDetails(item)">
                <div class="news-right-container2 pull-left">
                    <div class="title">{{ item.name }}</div>
                    <div class="description">{{ item.description }}</div>
                    <!--<div class="time">{{ item.time }}</div>-->
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
    import InfiniteLoading from 'vue-infinite-loading'
    export default {
        name: 'user-guide',
        components: {
            InfiniteLoading,
        },
        data() {
            return {
                page:1,
                pageCount:0,
                list: [],
                ref:true,
            }
        },
        methods: {
            infiniteHandler($state){
                var _this = this;
                this.axios.post("/my/helplist", {"page":_this.page,"pageSize":10}, function (json) {
                    if(_this.page==1){
                        _this.list = [];
                    }
                    $(json.dataList).each(function(index,item){
                        _this.list.push( {
                            id: item.id,
                            name: item.title,
                            imgPath:item.logo,
                            description: item.intro,
                            time:_this.appUtil.dateFormat(item.addtime,"yyyy/MM/dd hh:mm")
                        });
                    });
                    _this.appUtil.loadFinish(_this,json.pageCount,$state);
                },function(json){
                    _this.$Message.error(json.msg);
                });
            },
            toDetails(item) {
                this.$router.push({name: 'guide', params: {id: item.id}})
            }
        },
        beforeRouteLeave(to, from, next) {
            // 进入详情
            if (to.name === "guide") {
                // 获得滚动距离
                let scrollTop = $("#guideContent").scrollTop();
                // 设置缓存
                this.session.appCache("messageScrollTop", scrollTop);
            } else {
                // 如果去其他页移除缓存
                this.session.rmCache("messageScrollTop");
            }
            next();
        },
        mounted() {
            $("#guideContent").height($(window).height()-$("header").outerHeight(true));
        },
        activated() {
            let scrollTop = this.session.appCache("messageScrollTop");
            // 判断来源
            if (scrollTop != null) {
                $("#guideContent").scrollTop(scrollTop);
            }
        }
    }
</script>
<style lang="scss">
    .user-guide {
        .content {
            overflow-y: scroll;
            -webkit-overflow-scrolling:touch;
            .list-item{
                padding: 10px 30px;
                height: 228px;
                line-height: 68px;
                background-color: #333339;
                color: #999999;
                font-size: 30px;
                border-bottom: 2px solid #25252B;
            }
        }
    }
</style>
