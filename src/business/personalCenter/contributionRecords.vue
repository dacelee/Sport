<template>
    <div class="contribution-records">
        <div class="current-contribution text-center">
            <div class="num">{{ contributionNum }}</div>
            <div class="label">当前贡献值</div>
        </div>
        <div class="contribution-records-content">
            <div class="records-list-item" v-for="item in list">
                <div class="left-details">
                    <div class="name">{{ item.name }}</div>
                    <div class="date">{{ item.time }}</div>
                </div>
                <div class="right-num" >
                    +{{ item.num }}
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
    import users from '../../api/users.js'
    import InfiniteLoading from 'vue-infinite-loading'
    export default {
        name: 'contribution-records',
        components: {
            InfiniteLoading,
        },
        data() {
            return {
                page:1,
                scrollHeight:0,
                contributionNum: '0',
                list: [

                ]
            }
        },mounted(){
            var headerHeight = $("header").outerHeight(true);
            $(".contribution-records-content").height($(window).height()-headerHeight-$(".current-contribution").outerHeight(true));
        },
        activated(){
            var _this = this;
            users.getCacheMyInfo(this, function (myInfo) {
                _this.contributionNum = myInfo.contributionvalue;
            },true)
//            users.loadContributionvaluelog(this);
            this.page = 1;
            this.list = [];
            this.$nextTick(function () {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            });
        },
        methods: {
            infiniteHandler($state) {
                users.loadContributionvaluelog(this, $state);
            }
        }
    }
</script>

<style lang="scss">
    .contribution-records {
        width: 690px;
        margin: 0 auto;
    .contribution-records-content{overflow-y:scroll;-webkit-overflow-scrolling:touch;}
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
