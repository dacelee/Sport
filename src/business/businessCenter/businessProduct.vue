<template>
    <div class="businessProduct">
        <l-tabs :list="menuList" :current="status" @change="changeRoute"/>
       
        <div class="recommend-goods-list">
            <div class="recommend-goods-item pull-left" v-for="item in recommendList" @click="showDetails(item)">
                <div class="recommend-goods-img">
                    <img :src="item.imgPath" alt="">
                </div>
                <div class="recommend-goods-name">{{ item.name }}</div>
                <div class="recommend-goods-price">{{ '￥'+item.price }}</div>
            </div>
        </div>
    </div>
</template>

<script>
let _this
    export default {
        name: 'businessProduct',
        data() {
            return {
                router: 'businessProduct',
                status: 'all',
                menuList: [
                    {
                        id: 'all',
                        name: '综合排序'
                    },
                    {
                        id: 'new',
                        name: '最新商品'
                    },
                    {
                       id: 'priceLow',
                        name: '价格最低'
                    },
                    {
                        id: 'priceHigh',
                        name: '价格最高'
                    }
                ],
                recommendList: [
                    {
                        imgPath: 'static/img/goods/1.jpg',
                        name: '我也不知道是么子孩子',
                        price: '760.00'
                    },
                    {
                        imgPath: 'static/img/goods/2.jpg',
                        name: '我也不知道是么子孩子',
                        price: '760.00'
                    },
                    {
                        imgPath: 'static/img/goods/3.jpg',
                        name: '我也不知道是么子孩子',
                        price: '760.00'
                    },
                    {
                        imgPath: 'static/img/goods/4.jpg',
                        name: '我也不知道是么子孩子',
                        price: '760.00'
                    }
                ]
            }
        },
        methods: {
            showDetails(data) {
                this.$router.push({name: 'businessProduct', params: {id: data.id}})
            },
            changeRoute(res) {
                this.status = res
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
    .businessProduct {
        background-color: #F5F5F5;
        .head-menu {
            background-color: #404140;
            height: 100px;
            color:#999;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            padding: 10px 60px 36px 60px;
            .head-menu-item {
                width: 120px;
                .head-menu-label {
                    font-size: 24px;
                    line-height: 100px;
                    color: #999;
                }
            }
        }
        
        .recommend-goods-list {
            margin-top: 10px;
            overflow: hidden;
            .recommend-goods-item {
                width: calc(50% - 5px);
                background-color: #ffffff;
                margin-top: 10px;
                .recommend-goods-img {
                    width: 100%;
                    height: 370px;
                    img {
                        width: 100%;
                        height: 370px;
                    }
                }
                .recommend-goods-name {
                    font-size: 30px;
                    line-height: 30px;
                    color: #333333;
                    padding: 20px 20px 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .recommend-goods-price {
                    font-size: 34px;
                    line-height: 34px;
                    padding: 0 20px 20px 20px;
                    color: #ff0000;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
             .status {
                font-size: 30px;
                line-height: 120px;
                color: #F5A623;
            }
        }
        .recommend-goods-item:nth-child(even) {
            margin-left: 10px;
        }
    }
</style>
