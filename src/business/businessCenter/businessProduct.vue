<template>
    <div class="businessProduct">
        <l-tabs :list="menuList" :current="status" @change="changeRoute"/>
        <div class="recommend-goods-list">
                <div class="recommend-goods-item pull-left" v-for="item in recommendList"
                     @click="showDetails(item)">
                    <div class="recommend-goods-img">
                        <img :src="item.imgPath" alt="">
                    </div>
                    <div class="recommend-goods-name">{{ item.name }}</div>
                    <div class="recommend-goods-price">{{ '￥'+item.price }}</div>
                </div>
                <div style="clear: both"></div>
                <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
                     <span slot="no-more">
                          暂无更多数据
                     </span>
                </infinite-loading>
        </div>
    </div>
</template>

<script>
    import goods from '../../api/goods.js'
    import InfiniteLoading from 'vue-infinite-loading';
    export default {
        name: 'businessProduct',
        components: {
            InfiniteLoading,
        },
        data() {
            return {
                bottomStatus:'wait',
                page:1,
                catid:0,
                attr:"0",
                sort:"addtime",
                sorttype:"desc",
                router: 'businessProduct',
                status: 'all',
                scrollHeight:"0px",
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
//                    {
//                        id:1,
//                        imgPath: 'static/img/goods/1.jpg',
//                        name: '我也不知道是么子孩子',
//                        price: '761.00'
//                    },
//                    {
//                        id:1,
//                        imgPath: 'static/img/goods/2.jpg',
//                        name: '我也不知道是么子孩子',
//                        price: '760.00'
//                    },
//                    {
//                        id:1,
//                        imgPath: 'static/img/goods/3.jpg',
//                        name: '我也不知道是么子孩子',
//                        price: '760.00'
//                    },
//                    {
//                        id:1,
//                        imgPath: 'static/img/goods/4.jpg',
//                        name: '我也不知道是么子孩子',
//                        price: '760.00'
//                    }
                ]
            }
        },
        methods: {
            showDetails(data) {
                this.$router.push({name: 'businessDetail', params: {id: data.id}})
            },
            changeRoute(res) {
//                $(".ivu-scroll-container")[0].scrollTop = 0;
                if(this.status==res){
                    return;
                }
                this.status = res
                this.page = 1;
                switch (res){
                    case "all":
                        this.attr="0";
                        this.sort="addtime";
                        this.sorttype="desc";
                        break;
                    case "new":
                        this.attr="0";
                        this.sort="addtime";
                        this.sorttype="desc";
                        break;
                    case "priceLow":
                        this.attr="0";
                        this.sort="price";
                        this.sorttype="asc";
                        break;
                    case "priceHigh":
                        this.attr="0";
                        this.sort="price";
                        this.sorttype="desc";
                        break;
                }
                $(".recommend-goods-list").scrollTop(0);
                this.recommendList = [];
                var _this = this;
                setTimeout(function(){
                    _this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                },300);
//                goods.loadGoods(this,"recommendList",this.catid,this.attr,this.sort,this.sorttype);
            },
            infiniteHandler ($state) {
                var _this = this;
                goods.loadGoods(_this,"recommendList", _this.catid ,_this.attr,_this.sort,_this.sorttype,$state);
            }
        },
        beforeRouteLeave(to, from, next) {
            // 进入详情
            if (to.name === "businessDetail") {
                // 获得滚动距离
                let scrollTop =   $(".recommend-goods-list").scrollTop();
                // 设置缓存
                this.session.appCache("messageScrollTop", scrollTop);
            } else {
                // 如果去其他页移除缓存
                this.session.rmCache("messageScrollTop");
            }
            next();
        },activated () {
            if(this.catid!= this.$route.params.id){
                this.catid = this.$route.params.id;
                this.status='all';
                this.attr="0";
                this.page=1;
                this.sort="addtime";
                this.sorttype="desc";
                this.recommendList = [];
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');


//                goods.loadGoods(this,"recommendList", this.catid ,this.attr,this.sort,this.sorttype);
            }else{
                let scrollTop =this.session.appCache("messageScrollTop");
                // 判断来源
                if (scrollTop != null) {
                    // 需要缓存的页面,滚动
                    $(".recommend-goods-list").scrollTop(scrollTop);
                }
            }
        },
        mounted() {
            this.$nextTick(function () {
                var headerHeight = $("header").outerHeight();
                $(".recommend-goods-list").height($(window).height()-headerHeight-$(".l-tabs").height());

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
            overflow-y: scroll;
            -webkit-overflow-scrolling:touch;
            .recommend-goods-item {
                width: calc(50% - 5px);
                background-color: #ffffff;
                margin-bottom: 10px;
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
