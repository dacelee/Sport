<template>
    <div class="order-list">
        <l-tabs :list="statusList" :current="status" @change="changeRoute"/>
        <div class="order-list-content">
            <div class="order-list-item" v-for="item in list" v-if="status<3">
                <div class="details details2">
                    <div class="base-info-name">{{ item.name }}</div>
                    <div class="base-info-price-info">
                        <div class="unit-price pull-left">{{ '单价:'+item.unitPrice }}</div>
                        <div class="less-count pull-left">{{ '数量:' +item.lessCount}}</div>
                    </div>
                    <div class="trading-info">{{ '最近30日成交:'+item.tradingNum }}</div>
                </div>
                <div class="right-business-btn pull-right text-center clear" @click="clear(item.id)" v-if="item.lessCount>0&&item.status!=0">取消</div>
            </div>
            <div class="order-list-item" v-for="item in list" @click="showDetails(item)"  v-if="status>3">
                <div class="photo">
                    <img :src="item.imgPath" alt="">
                </div>
                <div class="details">
                    <div class="name">{{ item.name }}</div>
                    <div class="user-name">&nbsp;</div>
                    <div class="time">{{ item.time }}</div>
                </div>
                <div class="status" >
                    {{ item.status }}
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
    import coin from '../../api/coin.js'
    import InfiniteLoading from 'vue-infinite-loading'
    export default {
        name: 'order-list',
        components: {
            InfiniteLoading,
        },
        data() {
            return {
                status: '1',
                page:1,
                statusList: [
                    {
                        id: '1',
                        name: '买'
                    },
                    {
                        id: '2',
                        name: '卖'
                    },
                    {
                        id: '10',
                        name: '交易中'
                    },
                    {
                        id: '20',
                        name: '已完成'
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
                this.list = [];
                this.$nextTick(function() {
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                });
//                coin.loadOrderList(this,this.status);
            },
            showDetails(data) {
                this.$router.push({name: 'transactionDetails', params: {id: data.id}})
            },
            infiniteHandler ($state) {
                var _this = this;
                coin.loadOrderList(_this,_this.status,$state);
            },
            clear(id){
                coin.mySaleCancelAction(this,id,true);
            }
        },
        activated () {
            this.page=1;
//            coin.loadOrderList(this,this.status);
        },
        mounted() {
            this.$nextTick(function () {
                var headerHeight = $("header").outerHeight();
                $(".order-list-content").height($(window).height()-headerHeight-$(".l-tabs").height());
            })
        }
    }
</script>

<style lang="scss">
    .order-list .order-list-content{overflow-y:scroll;-webkit-overflow-scrolling:touch;}
    .order-list-content .order-list-item:nth-last-child(2){margin-bottom: 0px}
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
            .details2 {
                width: calc(100% - 120px);
            }
            .status {
                font-size: 30px;
                line-height: 120px;
                color: #F5A623;
            }
            .base-info-name {
                font-size: 30px;
                line-height: 30px;
                margin-bottom: 25px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .base-info-price-info {
                font-size: 24px;
                line-height: 24px;
                margin-bottom: 17px;
                overflow: hidden;
            .unit-price {
                width: 45%;
            }
            .less-count {
                width: 45%;
                margin-left: 10%;
            }
            }
            .trading-info {
                color: #999999;
                font-size: 24px;
                line-height: 24px;

            }
            .right-business-btn {
                width: 116px;
                height: 116px;
                border: 2px solid #F8C513;
                color: #F8C513;
                font-size: 30px;
                line-height: 116px;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
            }
        }
    }

</style>
