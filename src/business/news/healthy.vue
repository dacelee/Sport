<template>
    <div class="healthy-container">
        <Scroll :on-reach-Bottom="handleReachBottom" :height="scrollHeight" :distance-to-edge="[0,0]">
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
</template>
<script>
    export default {
        name: 'news-list',
        props: {
            type: 1
        },
        data() {
            return {
                scrollHeight: 300,
                page: 1,
                pageCount: 0,
                list: [
//                    {
//                        id: 1,
//                        name: '跑步后膝盖疼怎么恢复',
//                        imgPath: 'static/img/news/1.jpg',
//                        description: '跑步后膝盖疼怎么恢复?不规范的跑步姿势以及过度的跑步强度都可能引发膝盖疼。针对跑步膝盖疼的不同原因，小编整理了跑完步膝盖疼的恢复和缓解方案，对于许多喜欢跑步的朋友来说，知道这些预防和缓解跑步膝盖疼的方法是很有好处的。'
//                    }
                ]
            }
        },
        methods: {
            loadData(resolve) {
                var _this = this
                this.axios.post(this.session.articleList, {'page': _this.page, 'pageSize': 10, 'type': 1},
                    function (json) {
                        if (_this.page == 1) {
                            _this.list = []
                        }
                        _this.page++
                        if (resolve) {
                            resolve()
                        }
                        _this.pageCount = json.pageCount
                        $(json.dataList).each(function (index, item) {
                            _this.list.push({
                                id: item.id,
                                name: item.title,
                                imgPath: item.logo,
                                description: item.intro
                            })
                        })
                    }, function (json) {
                        if (resolve) {
                            resolve()
                        }
                        _this.$Message.error(json.msg)
                    })
            },
            toDetails(item) {
                this.$router.push({name: 'newsDetails', params: {id: item.id}})
            },
            handleReachBottom() {
                return new Promise(resolve => {
                    loadData(resolve)
                })
            }
        },
        updated() {
        
        }, mounted() {
            var type = this.$refs.currentId
            alert(type)
            this.loadData()
            this.scrollHeight = $(window).height() - -$('header').height() - $('.l-tabs').height() - 10
        }
    }
</script>

<style lang="scss">
    .healthy-container {
        height: 100%;
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
