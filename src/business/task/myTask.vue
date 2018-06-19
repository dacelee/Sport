<template>
    <div class="my-task">
        <div class="task-item task-list-piece" v-for="item in list">
            <div class="head-info">
                <div class="name">{{ item.name }}</div>
                <div class="step-info">{{ item.currentStep+'步 / ' +item.targetStep + '步' }}</div>
            </div>
            <div class="task-item-container">
                <div class="task-container-item">活跃度：{{ item.activity }}<span class="hansel">{{ '+'+item.hanselActivity }}</span></div>
                <div class="task-container-item">兑换所需：{{ item.needSugar }}</div>
                <div class="task-container-item">奖励糖果：{{ item.rewardSugar }}<span
                    class="hansel">{{ '+'+item.hanselSugar }}</span>
                </div>
                <div class="task-container-item">任务周期：{{ item.dateTime }}</div>
                <div class="task-container-item">任务编号：{{ item.code }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    var _this;
    export default {
        name: 'my-task',
        data() {
            return {
                list: [
                    {
                        name: '试炼任务',
                        currentStep: 1000,
                        targetStep: 3000,
                        activity: 1,
                        hanselActivity: 2,
                        needSugar: 10,
                        rewardSugar: 11,
                        hanselSugar: 2,
                        dateTime: '2018.06.10-2018.06.10',
                        code: 'xddsdh324354657'
                    },
                    {
                        name: '试炼任务',
                        currentStep: 1000,
                        targetStep: 3000,
                        activity: 1,
                        hanselActivity: 2,
                        needSugar: 10,
                        rewardSugar: 11,
                        hanselSugar: 2,
                        dateTime: '2018.06.10-2018.06.10',
                        code: 'xddsdh324354657'
                    },
                    {
                        name: '试炼任务',
                        currentStep: 1000,
                        targetStep: 3000,
                        activity: 1,
                        hanselActivity: 2,
                        needSugar: 10,
                        rewardSugar: 11,
                        hanselSugar: 2,
                        dateTime: '2018.06.10-2018.06.10',
                        code: 'xddsdh324354657'
                    }
                ]
            }
        },mounted(){
            _this = this;
            this.loadTask();
        },methods:{
            loadTask(){
                var memberid= this.session.getMemberID();
                this.axios.post(this.session.myTask, {"memberid":memberid}, function (json) {
                    var data = [];
                    $(list).each(function(index,item){
                        data.push(
                                {
                                    id:item.id,
                                    name: item.name,
                                    currentStep:  item.name,
                                    targetStep: item.steps,
                                    activity: item.activity,
                                    hanselActivity: item.activityadd,
                                    needSugar: item.coinprice,
                                    rewardSugar: item.coinget,
                                    hanselSugar: 0,
                                    dateTime: _this.appUtil.dateFormat(itme.begintime,"yyyy.MM.dd")+"-"+
                                    _this.appUtil.dateFormat(itme.endtime,"yyyy.MM.dd"),
                                    code: '—'
                                }
                        );
                    })
                    _this.list = data;
                },function(json){
                    mui.toast(json.msg)
                });
            }

        }
    }
</script>

<style lang="scss">
    .my-task {
        width: 690px;
        margin: 0 auto;
        .task-item {
            margin-top: 20px;
            .head-info {
                display: flex;
                justify-content: space-between;
                .name {
                    font-size: 32px;
                    line-height: 32px;
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
