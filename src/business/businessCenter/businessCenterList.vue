<template>
    <div class="business-center-list">
        <div class="head-title text-center">
            商圈
            <l-icon name="gouwuche"/>
        </div>
        <div class="head-menu">
            <div class="head-menu-item text-center" v-for="item in menuList">
                <l-icon :name="item.icons"/>
                <div class="head-menu-label">{{ item.name }}</div>
            </div>
        </div>
        <div class="business-center-list-item" v-for="item in list">
            <div class="left-goods-img pull-left">
                <img :src="item.imgPath" alt="">
            </div>
            <div class="right-goods-info pull-left">
                <div class="goods-name">{{ item.name }}</div>
                <div class="goods-price">{{ '￥'+item.price }}</div>
                <div class="goods-equal">{{ '等值'+item.equal+'糖果' }}</div>
            </div>
        </div>
        <div class="recommend-goods-list">
            <div class="recommend-goods-item pull-left" v-for="item in recommendList">
                <div class="recommend-goods-img">
                    <img :src="item.imgPath" alt="">
                </div>
                <div class="recommend-goods-name">{{ item.name }}</div>
                <div class="recommend-goods-price">{{ '￥'+item.price }}</div>
            </div>
        </div>
        <l-footerMenu :currentRoute="route"/>
    </div>
</template>

<script>
    export default {
        name: 'business-center-list',
        data() {
            return {
                route: 'businessCenter',
                menuList: [
                    {
                        icons: 'paoxie',
                        name: '跑鞋'
                    },
                    {
                        icons: 'fuzhuang',
                        name: '服装'
                    },
                    {
                        icons: 'maozi',
                        name: '帽子'
                    },
                    {
                        icons: 'qicai',
                        name: '器材'
                    }
                ],
                list: [
                    {
                        imgPath: 'static/img/goods/1.jpg',
                        name: '雷霆战靴-王者归来',
                        price: '5231.00',
                        equal: '500'
                    },
                    {
                        imgPath: 'static/img/goods/2.jpg',
                        name: '抵抗之靴',
                        price: '760.00',
                        equal: '120'
                    },
                    {
                        imgPath: 'static/img/goods/3.jpg',
                        name: '冷静之靴',
                        price: '760.00',
                        equal: '120'
                    },
                    {
                        imgPath: 'static/img/goods/4.jpg',
                        name: '急速之靴',
                        price: '760.00',
                        equal: '120'
                    },
                    {
                        imgPath: 'static/img/goods/5.jpg',
                        name: '我也不知道是么子孩子',
                        price: '15231.00',
                        equal: '800'
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
        }
    }
</script>

<style lang="scss">
    .business-center-list {
        background-color: #F5F5F5;
        .head-title {
            height: 80px;
            line-height: 80px;
            font-size: 34px;
            background: #404049;
            position: relative;
            .icons {
                position: absolute;
                right: 20px;
                top: 25px;
                width: 30px;
                height: 30px;
            }
        }
        .head-menu {
            background-color: #ffffff;
            height: 200px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            padding: 10px 60px 36px 60px;
            .head-menu-item {
                width: 120px;
                .icons {
                    width: 120px;
                    height: 120px;
                    margin-bottom: 10px;
                }
                .head-menu-label {
                    font-size: 24px;
                    line-height: 24px;
                    color: #333333;
                }
            }
        }
        .business-center-list-item {
            margin-top: 20px;
            width: 750px;
            height: 260px;
            background-color: #ffffff;
            padding: 25px 25px 25px;
            color: #333333;
            .left-goods-img {
                width: 210px;
                height: 210px;
                img {
                    width: 210px;
                    height: 210px;
                }
            }
            .right-goods-info {
                margin-left: 20px;
                .goods-name {
                    font-size: 32px;
                    line-height: 32px;
                    margin-bottom: 68px;
                }
                .goods-price {
                    color: #ff0000;
                    font-size: 48px;
                    line-height: 48px;
                    margin-bottom: 20px;
                }
                .goods-equal {
                    font-size: 24px;
                    line-height: 24px;
                    color: #999999;
                }
            }
        }
        .recommend-goods-list {
            margin-top: 10px;
            overflow: hidden;
            .recommend-goods-item {
                width: 370px;
                background-color: #ffffff;
                margin-top: 10px;
                .recommend-goods-img {
                    width: 370px;
                    height: 370px;
                    img {
                        width: 370px;
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
        }
        .recommend-goods-item:nth-child(even) {
            margin-left: 10px;
        }
    }
</style>
