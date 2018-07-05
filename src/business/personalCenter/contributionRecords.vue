<template>
    <div class="contribution-records">
        <div class="current-contribution text-center">
            <div class="num">{{ contributionNum }}</div>
            <div class="label">当前贡献值</div>
        </div>
        <Scroll :on-reach-bottom="handleReachBottom" :height="scrollHeight"  :distance-to-edge="10">
            <div class="records-list-item" v-for="item in list">
                <div class="left-details">
                    <div class="name">{{ item.name }}</div>
                    <div class="date">{{ item.time }}</div>
                </div>
                <div class="right-num" >
                    +{{ item.num }}
                </div>
            </div>
        </Scroll>
    </div>
</template>

<script>
    import users from '../../api/users.js'
    export default {
        name: 'contribution-records',
        data() {
            return {
                page:1,
                scrollHeight:0,
                contributionNum: '150.1321315124',
                list: [
                    {
                        name: '兑换初级任务',
                        time: '2018-06-23 12:22',
                        num: '10',
                        type: -1
                    },
                    {
                        name: '活跃奖励',
                        time: '2018-06-22 12:22',
                        num: '10',
                        type: 1
                    },
                    {
                        name: '活跃奖励',
                        time: '2018-06-22 12:22',
                        num: '10',
                        type: 1
                    },
                    {
                        name: '活跃奖励',
                        time: '2018-06-22 12:22',
                        num: '10',
                        type: 1
                    },
                    {
                        name: '活跃奖励',
                        time: '2018-06-22 12:22',
                        num: '10',
                        type: 1
                    }
                ]
            }
        },mounted(){
            var headerHeight = this.appUtil.getHeaderHeight();
            this.scrollHeight = $(window).height()-headerHeight-$(".current-contribution").height()-80;
            var _this = this;
            users.getCacheMyInfo(this, function (myInfo) {
                _this.contributionNum = myInfo.contributionvalue;
            })
        },
        activated(){
            users.loadContributionvaluelog(this);
        },
        methods: {
            handleReachBottom () {
                var _this = this;
                return new Promise(function(resolve){
                    users.loadContributionvaluelog(_this,resolve);
                });
            }
        }
    }
</script>

<style lang="scss">
    .contribution-records {
        width: 690px;
        margin: 0 auto;
        .current-contribution {
            background-color: #333339;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            padding: 50px 30px 60px 30px;
            margin-top: 20px;
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
            margin-top: 20px;
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
