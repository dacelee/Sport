<template>
    <div class="news-container2">
        <div class="healthy-container">
            <Scroll :on-reach-bottom="handleReachBottom" :height="scrollHeight" >
                <div class="healthy-list-item" v-for="item in list">
                    <div class="news-right-container2 pull-left" @click="toDetails(item)">
                        <div class="title">{{ item.name }}</div>
                        <div class="description">{{ item.description }}</div>
                        <div class="time">{{ item.time }}</div>
                    </div>
                </div>
            </Scroll>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'news',
        data() {
            return {
                scrollHeight:300,
                page:1,
                pageCount:0,
                list: [],
                currentRoute: 'healthy',
                type:"1"
            }
        },
        methods: {
            loadData(resolve){
                var _this = this;
                var action = ['','/msg/notice'];
                var title = ['','消息列表'];
                var type = this.$route.query.type;
                this.$emit('changeTitle',title[type]);
                this.axios.post(action[type], {"page":_this.page,"pageSize":10}, function (json) {
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
                            description: item.intro,
                            time:_this.appUtil.dateFormat(item.addtime,"yyyy/MM/dd hh:mm")
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
                this.$router.push({name: 'articleDetails', params: {id: item.id}})
            },
            handleReachBottom () {
                var _this = this;
                return new Promise(function(resolve){
                    _this.loadData(resolve);
                });
            }
        },
        activated() {
            this.scrollHeight = $(window).height()-$("header").outerHeight(true)-10;
            this.page = 1;
            this.loadData();
        }
    }
</script>

<style lang="scss">
    .news-container2 {
        padding-bottom: 0 !important;
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
    .news-right-container2 {
        width: 100%;
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
        height: 60px;
        margin-top: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: normal;
        color: #666666;
    }
    .time{color: #666666;text-align: right;}
    }
    }
    .healthy-list-item:nth-last-child(1) {
        border-bottom: none;
    }
    }
    }
</style>
