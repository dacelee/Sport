<template>
    <div class="user-guide">
        <div class="content">
            <Scroll :on-reach-bottom="handleReachBottom" :height="scrollHeight" >
                <div class="list-item" v-for="item in list"  @click="toDetails(item)">
                    <div class="news-right-container2 pull-left">
                        <div class="title">{{ item.name }}</div>
                        <div class="description">{{ item.description }}</div>
                        <!--<div class="time">{{ item.time }}</div>-->
                    </div>
                </div>
            </Scroll>
        </div>
    </div>
</template>

<script>
    let _this
    export default {
        name: 'user-guide',
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
                this.axios.post("/my/helplist", {"page":_this.page,"pageSize":10}, function (json) {
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
                this.$router.push({name: 'guide', params: {id: item.id}})
            },
            handleReachBottom () {
                return new Promise(function (resolve) {
                    loadData(resolve);
                });
            }
        },
        activated() {
            this.scrollHeight = $(window).height()-$("header").outerHeight(true)-10;
            this.loadData();
        }
    }
</script>
<style lang="scss">
    .user-guide {
        .content {
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
