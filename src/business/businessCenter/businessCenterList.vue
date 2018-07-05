<template>
    <div class="business-center-list">
        <div class="head-menu">
            <div class="head-menu-item text-center" v-for="item in menuList" @click="businessProduct(item.id)">
                <img :src="item.logo"/>
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
            <div class="recommend-goods-item pull-left" v-for="item in recommendList" @click="businessDetail(item.id)" >
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
    import goods from '../../api/goods.js'
    export default {
        name: 'business-center-list',
        data() {
            return {
                page:1,
                route: 'businessCenter',
                menuList: [
                    {
                        id:1,
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
                        imgPath: '',
                        name: '雷霆战靴-王者归来',
                        price: '5231.00',
                        equal: '500'
                    },
//                    {
//                        imgPath: '',
//                        name: '雷霆战靴-王者归来',
//                        price: '5231.00',
//                        equal: '500'
//                    },
//                    {
//                        imgPath: '',
//                        name: '雷霆战靴-王者归来',
//                        price: '5231.00',
//                        equal: '500'
//                    },
//                    {
//                        imgPath: '',
//                        name: '雷霆战靴-王者归来',
//                        price: '5231.00',
//                        equal: '500'
//                    },
//                    {
//                        imgPath: '',
//                        name: '雷霆战靴-王者归来',
//                        price: '5231.00',
//                        equal: '500'
//                    },

                ],
                recommendList: [
                    {
                        imgPath: '',
                        name: '我也不知道是么子孩子',
                        price: '760.00'
                    }
                ]
            }
        },mounted(){
            goods.loadCateList(this);
            //热门
            goods.loadGoods(this,"list",0,2,"addtime","desc",null,5);
            //推荐
            goods.loadGoods(this,"recommendList",0,1,"addtime","desc",null,4);
        }, methods: {
            businessProduct(id) {
                this.$router.push({name:'businessProduct',params:{id:id}});
            },
            businessDetail(id) {
                this.$router.push({name:'businessDetail',params:{id:id}})
            },
            editEvent(){
                this.$router.push("businessSettlement")
            },
        }
    }
</script>

<style lang="scss">
    .business-center-list {
        padding-bottom:120px;
        background-color: #F5F5F5;
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
    img {
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
        width: 100%;
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
    }
    .recommend-goods-item:nth-child(even) {
        margin-left: 10px;
    }
    }
</style>
