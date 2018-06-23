<template>
    <div class="candy-records">
        <div class="current-candy text-center">
            <div class="num">{{ candyNum }}</div>
            <div class="label">当前糖果</div>
        </div>
        <div class="records-list-item" v-for="item in list">
            <div class="left-details">
                <div class="name">{{ item.name }}</div>
                <div class="date">{{ item.time }}</div>
            </div>
            <div class="right-num" :class="{'payOut':item.type === -1}">
                {{ item.type === -1 ? '-' : '+' }}{{ item.num }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'candy-records',
        data() {
            return {
                candyNum: '150.1321315124',
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
