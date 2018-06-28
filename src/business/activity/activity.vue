<template>
    <div class="activity-list">
        <Scroll :on-reach-Bottom="handleReachBottom" :height="scrollHeight"  :distance-to-edge="[0,0]">
            <div class="activity-list-item" v-for="item in list">
                <div class="item-bg">
                    <img :src="item.imgPath" alt="">
                </div>
                <div class="item-container-bg" @click="detail(item.id)">
                    <div class="item-head">
                        <div class="item-type pull-left text-center" v-if="item.type === 2">
                            赛事
                        </div>
                        <div class="item-type-desc pull-left" v-if="item.type === 2">
                            {{ item.typeDesc }}
                        </div>
                    </div>
                    <div class="item-container text-center">
                        <div class="item-title">{{ item.name }}</div>
                        <div class="item-personal-num">{{ item.personNum }}人参与</div>
                    </div>
                    <div class="item-status text-center" :class="{'running':item.status === 1,'coming':item.status === 2}">
                        {{ item.status === 0 ? '已结束' : item.status === 1 ? '正在进行' : '即将开始' }}
                    </div>
                </div>
            </div>
        </Scroll>
    </div>
</template>

<script>
    let _this;
    export default {
        name: 'activity',
        data() {
            return {
                scrollHeight:'300',
                page:1,
                list: [
//                    {
//                        id: (Math.random() * 100).toFixed(0),
//                        type: 2,
//                        typeDesc: '线上马拉松',
//                        name: '北京线上马拉松，"全"看你怎么跑',
//                        personNum: 24213,
//                        status: 0,
//                        imgPath: 'static/img/doing/1.png'
//                    },
//                    {
//                        id: (Math.random() * 100).toFixed(0),
//                        type: 1,
//                        typeDesc: '',
//                        name: '乐跑步2.0，全新训练模块带你飞',
//                        personNum: 412131,
//                        status: 1,
//                        imgPath: 'static/img/doing/2.jpg'
//                    },
//                    {
//                        id: (Math.random() * 100).toFixed(0),
//                        type: 1,
//                        typeDesc: '',
//                        name: '北京线上马拉松，"全"看你怎么跑',
//                        personNum: 24213,
//                        status: 2,
//                        imgPath: 'static/img/doing/1.jpg'
//                    }
                ]
            }
        },mounted(){
            _this = this;
            this.loadData();
            this.scrollHeight = $(window).height() -$("header").height()-80;
        },methods:{
            handleReachBottom () {
                return new Promise(resolve => {
                            loadData(resolve);
                });
            },
            loadData(resolve){
                this.axios.post(this.session.articleList, {"page": _this.page,"pageSize":10,"type":2}, function (json) {
                    if(resolve){
                        resolve();
                    }

                    if(_this.page==1){
                        _this.list = [];
                    }
                    _this.page++;
                    $(json.dataList).each(function(index,item){
                        _this.list.push( {
                            id: item.id,
                            type: 1,
                            typeDesc: '',
                            name: item.title,
                            personNum: 24213,
                            imgPath:item.logo,
                            status: 2
                        });
                    });
                },function(json){
                    if(resolve){
                        resolve();
                    }
                });
            },
            detail(id){
                this.$router.push({name: 'newsDetails', params: {id: id}})
            }

        }
    }
</script>

<style lang="scss">
    .activity-list {
        .activity-list-item {
            width: 750px;
            height: 365px;
            position: relative;
            .item-bg {
                position: absolute;
                z-index: -1;
                width: 750px;
                height: 365px;
                top: 0;
                left: 0;
                img {
                    width: 750px;
                    height: 365px;
                }
            }
            .item-container-bg {
                background-color: rgba(0, 0, 0, 0.5);
                width: 750px;
                height: 365px;
                position: absolute;
                top: 0;
                left: 0;
                .item-head {
                    padding: 25px 0 0 25px;
                    font-size: 24px;
                    line-height: 24px;
                    display: inline-block;
                    width: 750px;
                    .item-type {
                        padding: 10px 0;
                        width: 80px;
                        background-color: #00d2ff;
                        -webkit-border-radius: 8px;
                        -moz-border-radius: 8px;
                        border-radius: 8px;
                    }
                    .item-type-desc {
                        padding: 10px 0;
                        margin-left: 20px;
                    }
                }
                .item-container {
                    margin-top: 80px;
                    .item-title {
                        font-size: 36px;
                    }
                    .item-personal-num {
                        font-size: 30px;
                        margin-top: 10px;
                    }
                }
                .item-status {
                    position: absolute;
                    right: 20px;
                    bottom: 20px;
                    padding: 15px 0;
                    width: 120px;
                    border: 2px solid #ffffff;
                    -webkit-border-radius: 8px;
                    -moz-border-radius: 8px;
                    border-radius: 8px;
                    background-color: rgba(0, 0, 0, 0.5);
                    &.running {
                        border-color: #f8c513;
                        color: #f8c513;
                    }
                    &.coming {
                        border-color: #3673ff;
                        color: #3673ff;
                    }
                }
            }
        }
    }
</style>
