<template>
    <div class="transaction-details">
        <div class="transaction-details-item" v-for="item in list">
            <div class="title">
                <div class="title-item">{{ item.title }}</div>
                <div class="label" v-if="item.label">{{ item.label }}</div>
            </div>
            <div class="container-list">
                <div class="container-list-item" v-for="el in item.details"
                     :class="{'hasImg':el.imgPath,'bigImg':el.isBigImg}">
                    <div class="left-label" v-if="el.title">{{ el.title }}</div>
                    <div class="left-img" v-if="el.imgPath">
                        <img :src="el.imgPath" alt="">
                    </div>
                    <div class="right-info" v-if="el.value">{{ el.value }}</div>
                </div>
            </div>
        </div>
        <div class="footer-operation">
            <div class="btn-area pull-right">
                <div class="btn" @click="appeal">申诉</div>
                <div class="btn btn-confirm" @click="paySuccess">确认收款</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'transaction-details',
        data() {
            return {
                list: [
                    {
                        title: '订单信息',
                        label: '待付款',
                        details: [
                            {
                                title: '订单号',
                                value: '12312321312321321'
                            },
                            {
                                title: '交易数量',
                                value: '200糖果'
                            },
                            {
                                title: '单价',
                                value: '2美元'
                            },
                            {
                                title: '总金额',
                                value: '400人民币'
                            },
                            {
                                title: '交易时间',
                                value: '2018.06.24 19:01'
                            }
                        ]
                    },
                    {
                        title: '卖家信息',
                        details: [
                            {
                                imgPath: '/static/img/personal/default.jpg',
                                value: '金色的鱼'
                            },
                            {
                                title: '姓名',
                                value: 'Faker'
                            },
                            {
                                title: '电话',
                                value: '133-1234-5678'
                            }
                        ]
                    },
                    {
                        title: '银行卡信息',
                        details: [
                            {
                                title: '银行',
                                value: '浦发银行'
                            },
                            {
                                title: '卡号',
                                value: '6674432389965667'
                            }
                        ]
                    },
                    {
                        title: '支付信息',
                        details: [
                            {
                                title: '支付宝',
                                value: '15855678093'
                            },
                            {
                                title: '微信',
                                value: '15855678093'
                            }
                        ]
                    },
                    {
                        title: '支付截图',
                        details: [
                            {
                                imgPath: '/static/img/goods/1.jpg',
                                isBigImg: true
                            }
                        ]
                    }
                ]
            }
        },
        methods: {
            appeal() {
                this.$router.push('/appeal')
            },
            paySuccess() {
                this.$router.push('/paySuccess')
            }
        }
    }
</script>

<style lang="scss">
    .view-container .transaction-details {
        padding-bottom: 0 !important;
    }
    
    .transaction-details {
        position: relative;
        .footer-operation {
            overflow: hidden;
            margin-top: 120px;
            background-color: #333339;
            padding: 20px 30px;
            .btn-area {
                display: flex;
                justify-content: flex-start;
                .btn {
                    font-size: 30px;
                    line-height: 30px;
                    padding: 9px 0;
                    width: 200px;
                    text-align: center;
                    margin: 0 0 0 30px;
                    color: #F8C513;
                    -webkit-border-radius: 34px;
                    -moz-border-radius: 34px;
                    border-radius: 34px;
                    border: 2px solid #F8C513;
                    &.btn-confirm {
                        background-color: #F8C513;
                        color: #25252B;
                    }
                }
            }
        }
        .transaction-details-item {
            width: calc(100% - 60px);
            background-color: #333339;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            margin: 20px auto 0;
            position: relative;
            overflow: hidden;
            .title {
                padding: 0 30px;
                margin: 25px 0 25px;
                font-size: 42px;
                line-height: 42px;
                display: flex;
                justify-content: space-between;
                border-left: 6px solid #F8C513;
                .label {
                    color: #F8C513;
                }
            }
            .container-list {
                width: calc(100% - 60px);
                padding: 30px 0;
                margin: 0 auto;
                border-top: 1px solid #25252B;
                .container-list-item {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    font-size: 30px;
                    line-height: 30px;
                    margin-bottom: 30px;
                    .left-label {
                        color: #999999;
                    }
                    .left-img {
                        width: 60px;
                        height: 60px;
                        img {
                            width: 60px;
                            height: 60px;
                            -webkit-border-radius: 100%;
                            -moz-border-radius: 100%;
                            border-radius: 100%;
                        }
                    }
                    &.hasImg {
                        line-height: 60px;
                        &.bigImg {
                            width: 210px;
                            height: 210px;
                            img {
                                width: 210px;
                                height: 210px;
                                -webkit-border-radius: 8px;
                                -moz-border-radius: 8px;
                                border-radius: 8px;
                            }
                        }
                    }
                    &:nth-last-child(1) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
</style>
