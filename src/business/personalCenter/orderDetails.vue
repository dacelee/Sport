<template>
    <div class="order-details">
        <div class="order-info">
            <div class="order-info-item" v-for="item in orderInfo">
                <div class="left-label">{{ item.label }}</div>
                <div class="right-info">{{ item.value }}</div>
            </div>
        </div>
        <div class="address-info">
            <l-icon name="juli1" class="pull-left"/>
            <div class="address-details">
                <div class="address-item" v-for="item in addressList">
                    <div class="left-label pull-left text-right">{{ item.label }}</div>
                    <div class="right-info pull-left">{{ item.value }}</div>
                </div>
            </div>
        </div>
        <div class="goods-list">
            <div class="goods-list-item" v-for="item in goodsList">
                <div class="goods-img">
                    <img :src="item.imgPath" alt="">
                </div>
                <div class="goods-details">
                    <div class="goods-name">{{ item.name }}</div>
                    <div class="unit-price">￥{{ item.unitPrice }}</div>
                    <div class="other">还需要支付<span class="price">{{ item.candy }}糖果</span></div>
                    <div class="goods-num">数量：{{ item.num }}</div>
                </div>
            </div>
        </div>
        <div class="total-info">
            <div class="total-num">共{{ totalNum }}件商品</div>
            <div class="total-price">合计：￥{{ totalPrice }} + {{totalCoin}} 糖果</div>
        </div>
        <div class="footer-btn" v-if="status!=4">
            <div class="btn" @click="clearOrder" v-if="status==1"><div>取消订单</div></div>
            <div class="btn" @click="toLogistics" v-if="status==3||status==5"><div>查看物流</div></div>
            <div class="btn btn-confirm"><div v-if="status==3" @click="confirmOrder">确认收货</div><div v-if="status==1" @click="toPay">立即支付</div></div>
        </div>
    </div>
</template>

<script>
    import goods from '../../api/goods.js'
    export default {
        name: 'order-details',
        data() {
            return {
                orderId: '',
                status:'0',
                orderno:'',

                addressList: [
//                    {
//                        label: '收货人',
//                        value: '李大嘴'
//                    },
//                    {
//                        label: '联系电话',
//                        value: '188-0878-9438'
//                    },
//                    {
//                        label: '收货地址',
//                        value: '湖南省长沙市岳麓区中电软件园C1-1029'
//                    }
                ],
                orderInfo: [
//                    {
//                        label: '订单状态',
//                        value: '待收货'
//                    },
//                    {
//                        label: '订单号',
//                        value: '473289101244578'
//                    },
//                    {
//                        label: '交易金额',
//                        value: '100人民币+50糖果'
//                    },
//                    {
//                        label: '交易时间',
//                        value: '2018.5.12 12:00'
//                    }
                ],
                goodsList: [
//                    {
//                        imgPath: '/static/img/goods/2.jpg',
//                        name: '夏季鸳鸯4音速驭帅运动鞋',
//                        unitPrice: '255',
//                        candy: 40,
//                        num: 1
//                    },
//                    {
//                        imgPath: '/static/img/goods/1.jpg',
//                        name: '夏季鸳鸯4音速驭帅运动鞋',
//                        unitPrice: '255',
//                        candy: 40,
//                        num: 1
//                    }
                ],
                totalNum: 0,
                totalPrice: '',
                totalCoin:'',
            }
        },
        methods: {
            toLogistics() {
                this.$router.push({name: 'logistics', params: {id: this.orderId}})
            },
            clearOrder(){
                this.orderId = this.$route.params.id
                var _this = this;
                App.confirm({"title":'警告',"content":"确定取消订单吗?"}).then(function(){
                    goods.orderStatusAction(_this,orderId,"cancel");
                });
            },
            confirmOrder(){
                this.orderId = this.$route.params.id
                var _this = this;
                App.confirm({"title":'警告',"content":"确定收货吗?"}).then(function(){
                    goods.orderStatusAction(_this,orderId,"confirm");
                });
            },toPay(){
                this.$router.push({path:'/orderPay', query: {id: this.orderId}});
            }
        },
        activated () {
            this.orderId = this.$route.params.id
            goods.loadOrderDetail(this,this.$route.params.id);
        },
        mounted() {
            this.$nextTick(function () {
                var headerHeight = $("header").outerHeight(true);
                var height = $(window).height()-headerHeight;
                $(".order-details").css({"min-height":height});
            })
        }
    }
</script>

<style lang="scss">
    .order-details {
        background-color: #F5F5F5;
        color: #333333;
        .order-info {
            width: 100%;
            background-color: #ffffff;
            padding: 30px 30px 30px;
            .order-info-item {
                width: 100%;
                display: flex;
                justify-content: space-between;
                font-size: 30px;
                line-height: 30px;
                margin-bottom: 30px;
                .left-label {
                    color: #999999;
                }
                &:nth-child(1) {
                    .right-info {
                        color: #F5A623;
                    }
                }
                &:nth-last-child(1) {
                    margin-bottom: 0;
                }
            }
        }
        .address-info {
            background-color: #ffffff;
            padding: 40px 35px 40px 35px;
            margin-top: 20px;
            display: inline-block;
            width: 100%;
            position: relative;
            .icons {
                width: 35px;
                height: 35px;
                position: absolute;
                top: 50%;
                margin-top: -17.5px;
            }
            .address-details {
                float: left;
                margin-left: 30px;
                width: calc(100% - 65px);
                .address-item {
                    width: 100%;
                    margin-bottom: 20px;
                    display: inline-block;
                    font-size: 24px;
                    line-height: 24px;
                    .left-label {
                        width: 120px;
                    }
                    .right-info {
                        width: calc(100% - 130px);
                        margin-left: 10px;
                    }
                    &:nth-last-child(1) {
                        margin-bottom: 0;
                    }
                }
            }
        }
        .goods-list {
            margin-top: 20px;
            background-color: #ffffff;
            .goods-list-item {
                margin-bottom: 2px;
                padding: 30px 30px 30px;
                display: flex;
                justify-content: flex-start;
                .goods-img {
                    width: 200px;
                    height: 200px;
                    img {
                        width: 200px;
                        height: 200px;
                    }
                }
                .goods-details {
                    width: calc(100% - 220px);
                    margin-left: 20px;
                    .goods-name {
                        font-size: 28px;
                        line-height: 28px;
                        color: #333333;
                        margin-bottom: 20px;
                        margin-top: 10px;
                    }
                    .unit-price {
                        color: #E93A0E;
                        font-size: 34px;
                        line-height: 34px;
                        margin-bottom: 30px;
                    }
                    .other {
                        color: #666666;
                        font-size: 24px;
                        line-height: 24px;
                        margin-bottom: 20px;
                        .price {
                            color: #f8c513;
                        }
                    }
                    .goods-num {
                        color: #666666;
                        font-size: 24px;
                        line-height: 24px;
                    }
                }
                &:nth-last-child(1) {
                    margin-bottom: 0;
                }
            }
        }
        .total-info {
            margin-top: 2px;
            background-color: #ffffff;
            display: flex;
            justify-content: space-between;
            font-size: 28px;
            line-height: 28px;
            padding: 30px 30px 30px;
        }
        .footer-btn {
            width: 100%;
            display: flex;
            justify-content: space-between;
            position: fixed;
            bottom: 0;
            left: 0;
            .btn {
                font-size: 34px;
                width: 50%;
                line-height: 34px;
                padding: 30px 0;
                background-color: #404148;
                color: #ffffff;
                text-align: center;
            }
            .btn-confirm {
                background-color: #f8c513;
                color: #25252b;
            }
        }
    }
</style>
