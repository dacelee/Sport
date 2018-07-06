<template>
    <div class="history-task">
        <div class="history-task-item task-list-piece" v-for="item in list">
            <div class="head-info">
                <div class="name">
                    <img :src="item.imgPath">{{ item.name }}
                </div>
                <div class="status">{{ item.statusDesc }}</div>
            </div>
            <div class="task-item-container">
                <div class="task-container-item">活跃度：{{ item.activity }}</div>
                <div class="task-container-item">兑换所需：{{ item.needSugar }}</div>
                <div class="task-container-item">奖励糖果：{{ item.rewardSugar }}</div>
                <div class="task-container-item">任务周期：{{ item.dateTime }}</div>
                <div class="task-container-item">任务编号：{{ item.code }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    let _this
    export default {
        name: 'history-task',
        data() {
            return {
                list: [
//                    {
//                        name: '试炼任务',
//                        statusDesc: '已过期',
//                        activity: 1,
//                        hanselActivity: 2,
//                        needSugar: 10,
//                        rewardSugar: 11,
//                        hanselSugar: 2,
//                        dateTime: '2018.06.10-2018.06.10',
//                        code: 'xddsdh324354657'
//                    },
//                    {
//                        name: '试炼任务',
//                        statusDesc: '已完成',
//                        activity: 1,
//                        hanselActivity: 2,
//                        needSugar: 10,
//                        rewardSugar: 11,
//                        hanselSugar: 2,
//                        dateTime: '2018.06.10-2018.06.10',
//                        code: 'xddsdh324354657'
//                    },
//                    {
//                        name: '试炼任务',
//                        statusDesc: '已完成',
//                        activity: 1,
//                        hanselActivity: 2,
//                        needSugar: 10,
//                        rewardSugar: 11,
//                        hanselSugar: 2,
//                        dateTime: '2018.06.10-2018.06.10',
//                        code: 'xddsdh324354657'
//                    }
                ]
            }
        }, mounted() {
            _this = this
            this.loadTask()
        }, methods: {
            loadTask() {
                this.session.getMemberID(function (memberid) {
                    _this.axios.post(_this.session.historyTask, {'memberid': memberid}, function (json) {
                        var data = []
                        $(json.dataList).each(function (index, item) {
                            data.push(
                                {
                                    id: item.id,
                                    name: item.name,
                                    currentStep: item.name,
                                    targetStep: item.steps,
                                    activity: item.activity,
                                    hanselActivity: item.activityadd,
                                    needSugar: item.coinprice,
                                    rewardSugar: item.coinget,
                                    hanselSugar: 0,
                                    dateTime: _this.appUtil.dateFormat(item.begintime, 'yyyy.MM.dd') + '-' +
                                    _this.appUtil.dateFormat(item.endtime, 'yyyy.MM.dd'),
                                    code: item.no
                                }
                            )
                        })
                        _this.list = data
                    }, function (json) {
                        _this.$Message.error(json.msg)
                    })
                })
            }
        }
    }
</script>

<style lang="scss">
    .history-task {
        width: 690px;
        margin: 0 auto;
        .history-task-item {
            margin-top: 20px;
            .head-info {
                display: flex;
                justify-content: space-between;
                .name {
                    font-size: 32px;
                    line-height: 32px;
                    img {
                        width: 32px;
                        height: 32px;
                    }
                }
                .step-info {
                    font-size: 30px;
                    line-height: 30px;
                    margin-top: 1px;
                }
            }
            .task-item-container {
                margin-top: 40px;
                .task-container-item {
                    margin-bottom: 20px;
                    font-size: 24px;
                    line-height: 24px;
                    &:nth-last-child(1) {
                        margin-bottom: 0;
                    }
                    .hansel {
                        display: inline-block;
                        color: #62c627;
                    }
                }
            }
        }
    }
</style>
