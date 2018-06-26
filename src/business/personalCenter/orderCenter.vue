<template>
    <div class="order-center">
        <l-tabs :list="statusList" :current="status" @change="changeRoute"/>
        <div class="order-list-item" v-for="item in list">
            <div class="order-goods-info">
                <div class="order-goods-details">
                    <div class="goods-img">
                        <img :src="item.imgPath" alt="">
                    </div>
                    <div class="goods-info">
                        <div class="goods-title">{{ item.name }}</div>
                        <div class="goods-price">￥{{ item.unitPrice }}</div>
                        <div class="goods-extend" v-if="item.extendData">还需要支付<span>{{ item.extendData+'糖果' }}</span>
                        </div>
                        <div class="class-amount">{{ '数量：'+item.amount }}</div>
                    </div>
                </div>
                <div class="goods-details">
                    <div class="goods-num">{{ '共'+item.amount+'件商品' }}</div>
                    <div class="goods-total">{{ '合计：'+item.totalPrice }}<span v-if="item.extendData">+{{ item.extendData+'糖果' }}</span>
                    </div>
                </div>
                <div class="operation-btn">
                    <div class="status">{{ item.status }}</div>
                    <div class="btn-area">
                        <div class="btn">查看物流</div>
                        <div class="btn btn-confirm">确认收货</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let _this
    export default {
        name: 'order-center',
        data() {
            return {
                status: 'all',
                statusList: [
                    {
                        id: 'all',
                        name: '全部'
                    },
                    {
                        id: 'pending',
                        name: '待付款'
                    },
                    {
                        id: 'appeal',
                        name: '申诉中'
                    },
                    {
                        id: 'canceled',
                        name: '已取消'
                    }
                ],
                list: [
                    {
                        imgPath: '/static/img/goods/1.jpg',
                        name: '夏季鸳鸯4音速驭帅运动鞋',
                        unitPrice: '100',
                        extendData: 50,
                        amount: 1,
                        totalPrice: '100',
                        status: '待收货'
                    },
                    {
                        imgPath: '/static/img/goods/1.jpg',
                        name: '夏季鸳鸯4音速驭帅运动鞋',
                        unitPrice: '100',
                        extendData: 50,
                        amount: 2,
                        totalPrice: '100',
                        status: '待收货'
                    }
                ]
            }
        },
        methods: {
            changeRoute(res) {
                _this.status = res
            }
        },
        mounted() {
            _this = this
            this.$nextTick(function () {
                let height = $('.view-container').height()
                $(_this.$el).css('min-height', height)
            })
        }
    }
</script>

<style lang="scss">
    .view-container .order-center {
        padding-bottom: 0 !important;
        background-color: #f5f5f5;
    }
    
    .order-center {
        .order-list-item {
            width: 100%;
            margin-top: 20px;
            background-color: #ffffff;
            .order-goods-info {
                color: #333333;
                .order-goods-details {
                    display: flex;
                    justify-content: space-between;
                    padding: 25px 25px 25px;
                    border-bottom: 1px solid #666666;
                    .goods-img {
                        width: 210px;
                        height: 210px;
                        img {
                            width: 210px;
                            height: 210px;
                        }
                    }
                    .goods-info {
                        width: calc(100% - 230px);
                        margin-left: 20px;
                        .goods-title {
                            font-size: 32px;
                            line-height: 32px;
                            margin-bottom: 20px;
                        }
                        .goods-price {
                            color: #E93A0E;
                            font-size: 34px;
                            line-height: 34px;
                            margin-bottom: 30px;
                        }
                        .goods-extend {
                            color: #666666;
                            font-size: 24px;
                            line-height: 24px;
                            margin-bottom: 20px;
                            > span {
                                color: #F8C513;
                            }
                        }
                        .class-amount {
                            font-size: 24px;
                            line-height: 24px;
                        }
                    }
                }
            }
            .goods-details {
                font-size: 28px;
                line-height: 28px;
                padding: 30px 25px 30px;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #666666;
            }
            .operation-btn {
                display: flex;
                justify-content: space-between;
                padding: 15px 25px 15px;
                font-size: 28px;
                line-height: 40px;
                .status {
                    color: #F8C513;
                    line-height: 60px;
                }
                .btn-area {
                    display: flex;
                    justify-content: space-around;
                    .btn {
                        padding: 10px 25px;
                        border: 1px solid #999999;
                        background-color: #ffffff;
                        color: #999999;
                        -webkit-border-radius: 28px;
                        -moz-border-radius: 28px;
                        border-radius: 28px;
                        margin-left: 20px;
                        &.btn-confirm {
                            color: #25252b;
                            border-color: #F8C513;
                            background-color: #F8C513;
                        }
                    }
                }
            }
        }
    }
</style>
