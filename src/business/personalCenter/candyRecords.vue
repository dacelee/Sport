<template>
    <div class="candy-records">
        <div class="current-candy text-center">
            <div class="num">{{ candyNum }}</div>
            <div class="label">当前糖果</div>
        </div>
        <div class="candy-records-content">
            <div class="records-list-item" v-for="item in list">
                <div class="left-details">
                    <div class="name">{{ item.name }}</div>
                    <div class="date">{{ item.time }}</div>
                </div>
                <div class="right-num" :class="{'payOut':item.num < 0}">{{ item.num }}
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
    import users from '../../api/users.js'
    import InfiniteLoading from 'vue-infinite-loading'
    export default {
        name: 'candy-records',
        components: {
            InfiniteLoading,
        },
        data() {
            return {
                page:1,
                candyNum: '0',
                list: [

                ]
            }
        },
        mounted(){
            var headerHeight = $("header").outerHeight(true);
            $(".candy-records-content").height($(window).height()-headerHeight-$(".current-candy").outerHeight(true));
        },
        activated(){
            this.page = 1;
            this.list = [];
            this.$nextTick(function () {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            });
            var _this = this;
            users.getCacheMyInfo(this, function (myInfo) {
                _this.candyNum = myInfo.cointotal;
            },true)
        },
        methods: {
            infiniteHandler ($state) {
                coin.loadCoinlog(this,$state);
            }
        }
    }
</script>

<style lang="scss">
    .candy-records {
        width: 690px;
        margin: 0 auto;
        .candy-records-content{overflow-y:scroll;-webkit-overflow-scrolling:touch;}
        .current-candy {
            background-color: #333339;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            padding: 50px 30px 60px 30px;
            margin: 20px 0px;
            .num {
                color: #F8C513;
                font-size: 48px;
                line-height: 48px;
                margin-bottom: 20px;
            }
            .label {
                font-size: 24px;
                line-height: 24px;
                color: #999999;
            }
        }
        .records-list-item {
            background-color: #333339;
            margin-bottom: 20px;
            padding: 30px 30px 30px;
            display: flex;
            justify-content: space-between;
            .left-details {
                .name {
                    color: #ffffff;
                    font-size: 30px;
                    line-height: 30px;
                    margin-bottom: 10px;
                }
                .date {
                    color: #999999;
                    font-size: 24px;
                    line-height: 24px;
                }
            }
            .right-num {
                line-height: 64px;
                font-size: 30px;
                color: #7ED321;
                &.payOut {
                    color: #999999;
                }
            }
        }
    }
</style>
