<template>
    <div class="healthy-container">
        <div class="healthy-list-item" v-for="item in list">
            <div class="news-left-img pull-left">
                <img :src="item.imgPath" alt="">
            </div>
            <div class="news-right-container pull-left" @click="toDetails(item)">
                <div class="title">{{ item.name }}</div>
                <div class="description">{{ item.description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    let _this;
    export default {
        name: 'news-list',
        data() {
            return {
                list: [
                    {
                        id: 1,
                        name: '跑步后膝盖疼怎么恢复',
                        imgPath: 'static/img/news/1.jpg',
                        description: '跑步后膝盖疼怎么恢复?不规范的跑步姿势以及过度的跑步强度都可能引发膝盖疼。针对跑步膝盖疼的不同原因，小编整理了跑完步膝盖疼的恢复和缓解方案，对于许多喜欢跑步的朋友来说，知道这些预防和缓解跑步膝盖疼的方法是很有好处的。'
                    }
                ]
            }
        },
        methods: {
            loadData(page){
                this.axios.post(this.session.articleList, {"page":page,"pageSize":10,"type":1}, function (json) {
                    var data = [];
                    $(json.dataList).each(function(index,item){
                        data.push( {
                            id: item.id,
                            name: item.title,
                            imgPath:item.logo,
                            description: ''
                        });
                    });
                    _this.list = data;
                },function(json){
                    _this.$Message.error(json.msg)
                });
            },
            toDetails(item) {
                this.$router.push({name: 'newsDetails', params: {id: item.id}})
            }
        },
        updated(){

        },mounted(){
            this.loadData(1);
            _this = this;
        }
    }
</script>

<style lang="scss">
    .healthy-container {
        height: 100%;
        background-color: #ffffff;
        padding-bottom: 0 !important;
    .healthy-list-item {
        width: 690px;
        height: 180px;
        border-bottom: 2px solid #999999;
        margin: 0 auto;
        padding: 10px 0;
        overflow: hidden;
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
