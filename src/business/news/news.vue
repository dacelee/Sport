<template>
    <div class="news-container">
        <l-tabs :list="listTab" :current="type"  @change="changeRoute"/>
        <div class="news-container">
            <div class="healthy-container">
                <Scroll :on-reach-bottom="handleReachBottom" :height="scrollHeight" >
                    <div class="healthy-list-item" v-for="item in list">
                        <div class="news-left-img pull-left">
                            <img :src="item.imgPath" alt="">
                        </div>
                        <div class="news-right-container pull-left" @click="toDetails(item)">
                            <div class="title">{{ item.name }}</div>
                            <div class="description">{{ item.description }}</div>
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
                        id: '4',
                        name: '行业快讯'
                    },
                    {
                        id: '3',
                        name: '玩家分享'
                    }
                ],
                scrollHeight:300,
                page:1,
                pageCount:0,
                list: [],
                currentRoute: 'healthy',
                type:"1"
            }
        },
        methods: {
            changeRoute(route) {
                this.type = route;
                this.page =1;
                this.loadData();
            },
            loadData(resolve){
                var _this = this;
                this.axios.post(this.session.articleList, {"page":_this.page,"pageSize":10,"type":this.type}, function (json) {
                    if(_this.page==1){
                        _this.list = [];
                    }
                    _this.page++;
                    if(resolve){
                        resolve();
                    }
                    _this.pageCount = json.pageCount;
                    $(json.dataList).each(function(index,item){
                        _this.list.push( {
                            id: item.id,
                            name: item.title,
                            imgPath:item.logo,
                            description: item.intro
                        });
                    });
                },function(json){
                    if(resolve){
                        resolve();
                    }
                    _this.$Message.error(json.msg);
                });
            },
            toDetails(item) {
                this.$router.push({name: 'newsDetails', params: {id: item.id}})
            },
            handleReachBottom () {
                return new Promise(resolve => {
                       loadData(resolve);
                });
            }
        },
        mounted() {
            this.scrollHeight = $(window).height()-$("header").height()-$(".l-tabs").height()-10;
            this.loadData();
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
        height: 180px;
        border-bottom: 2px solid #999999;
        margin: 0 auto;
        padding: 10px 20px;
        overflow: hidden;
        background-color: #ffffff;
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
        font-size: 40px;
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
