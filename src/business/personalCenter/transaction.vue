<template>
    <div class="order-list">
        <l-tabs :list="statusList" :current="status" @change="changeRoute"/>
        <Scroll :on-reach-bottom="handleReachBottom" :height="scrollHeight" :distance-to-edge="10">
            <div class="order-list-item" v-for="item in list" @click="showDetails(item)">
                <div class="photo">
                    <img :src="item.imgPath" alt="">
                </div>
                <div class="details">
                    <div class="name">{{ item.name }}</div>
                    <div class="user-name">&nbsp;</div>
                    <div class="time">{{ item.time }}</div>
                </div>
                <div class="status">
                    {{ item.status }}
                </div>
            </div>
        </Scroll>
    </div>
</template>

<script>
    import coin from '../../api/coin.js'
    export default {
        name: 'order-list',
        data() {
            return {
                status: '1',
                page:1,
                scrollHeight:0,
                statusList: [
                    {
                        id: '1',
                        name: '待付款'
                    },
                    {
                        id: '2',
                        name: '已付款'
                    },
                    {
                        id: '3',
                        name: '已付币'
                    },
                    {
                        id: '4',
                        name: '已取消'
                    }
                ],
                list: [
//                    {
//                        id: 1,
//                        imgPath: '/static/img/personal/default.jpg',
//                        name: '买入活力币',
//                        userName: 'Faker',
//                        time: '2018.06.24 18:29',
//                        status: '待付款'
//                    },
//                    {
//                        id: 2,
//                        imgPath: '/static/img/personal/default.jpg',
//                        name: '买入活力币',
//                        userName: 'Faker',
//                        time: '2018.06.24 18:29',
//                        status: '待付款'
//                    },
//                    {
//                        id: 3,
//                        imgPath: '/static/img/personal/default.jpg',
//                        name: '买入活力币',
//                        userName: 'Faker',
//                        time: '2018.06.24 18:29',
//                        status: '待付款'
//                    },
//                    {
//                        id: 4,
//                        imgPath: '/static/img/personal/default.jpg',
//                        name: '买入活力币',
//                        userName: 'Faker',
//                        time: '2018.06.24 18:29',
//                        status: '待付款'
//                    }
                ]
            }
        },
        methods: {
            changeRoute(res) {
                this.status = res;
                this.page=1;
                coin.loadOrderList(this,this.status);
            },
            showDetails(data) {
                this.$router.push({name: 'transactionDetails', params: {id: data.id}})
            },
            handleReachBottom () {
                var _this = this;
                return new Promise(function(resolve) {
                    coin.loadOrderList(_this,_this.status,resolve);
                 });
            }
        },
        activated () {
            coin.loadOrderList(this,this.status);
        },
        mounted() {
            this.$nextTick(function () {
                var headerHeight = this.appUtil.getHeaderHeight();
                this.scrollHeight = $(window).height()-headerHeight-$(".l-tabs").height();
            })
        }
    }
</script>

<style lang="scss">
    .view-container .order-list {
        padding-bottom: 0 !important;
    }
    .order-list {
        width: 100%;
        height: 100%;
        background-color: #F5F5F5;
        .order-list-item {
            width: 100%;
            padding: 30px 30px 30px;
            background-color: #ffffff;
            color: #333333;
            display: flex;
            justify-content: flex-start;
            margin-bottom: 20px;
            .photo {
                width: 120px;
                height: 120px;
                margin-right: 30px;
                img {
                    width: 120px;
                    height: 120px;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    border-radius: 100%;
                }
            }
            .details {
                width: calc(100% - 270px);
                .name {
                    font-size: 30px;
                    line-height: 30px;
                    margin-bottom: 20px;
                    margin-top: 6px;
                }
                .userName {
                    font-size: 24px;
                    line-height: 24px;
                    margin-bottom: 10px;
                }
                .time {
                    font-size: 24px;
                    line-height: 24px;
                    color: #666666;
                }
            }
            .status {
                font-size: 30px;
                line-height: 120px;
                color: #F5A623;
            }
        }
    }
</style>
