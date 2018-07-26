<template>
    <div class="candy-records">
        <div class="current-candy text-center">
            <div class="num">{{ candyNum }}</div>
            <div class="label">当前糖果</div>
        </div>
        <Scroll :on-reach-bottom="handleReachBottom" :height="scrollHeight"  :distance-to-edge="10">
            <div class="records-list-item" v-for="item in list">
                <div class="left-details">
                    <div class="name">{{ item.name }}</div>
                    <div class="date">{{ item.time }}</div>
                </div>
                <div class="right-num" :class="{'payOut':item.num < 0}">{{ item.num }}
                </div>
            </div>
       </Scroll>
    </div>
</template>

<script>
    import coin from '../../api/coin.js'
    import users from '../../api/users.js'
    export default {
        name: 'candy-records',
        data() {
            return {
                page:1,
                candyNum: '0',
                scrollHeight:0,
                list: [

                ]
            }
        },mounted(){
            var headerHeight = $("header").outerHeight();
            this.scrollHeight = $(window).height()-headerHeight-$(".current-candy").height()-80;
            var _this = this;
            users.getCacheMyInfo(this, function (myInfo) {
                _this.candyNum = myInfo.cointotal;
            })
        },
        activated(){
            coin.loadCoinlog(this);
        },
        methods: {
            handleReachBottom () {
                var _this = this;
                return new Promise(function(resolve){
                    coin.loadCoinlog(_this,resolve);
                });
            }
        }
    }
</script>

<style lang="scss">
    .candy-records {
        width: 690px;
        margin: 0 auto;
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
