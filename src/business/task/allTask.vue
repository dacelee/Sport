<template>
    <div class="all-task">
        <div class="task-info-list">
            <div class="task-list-item task-list-piece" v-for="item in list">
                <div class="task-head-info">
                    <div class="task-list-name">{{ item.name }}</div>
                    <div class="task-list-activity">活跃度：{{ item.activity }}</div>
                </div>
                <div class="task-details-container">
                    <div class="task-details-info">
                        <div class="task-details-info-item">兑换所需：{{ item.needSugar }}枚</div>
                        <div class="task-details-info-item">奖励糖果：{{ item.rewardSugar }}枚</div>
                        <div class="task-details-info-item">所需步数：{{ item.steps }}</div>
                    </div>
                    <div class="task-details-btn">兑换</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'all-task',
        data() {
            return {
                list: [
                    {
                        name: '试炼任务',
                        needSugar: 10,
                        rewardSugar: 11,
                        steps: 3000,
                        activity: 1
                    },
                    {
                        name: '初级任务',
                        needSugar: 10,
                        rewardSugar: 11,
                        steps: 3000,
                        activity: 2
                    },
                    {
                        name: '中级任务',
                        needSugar: 10,
                        rewardSugar: 11,
                        steps: 3000,
                        activity: 3
                    },
                    {
                        name: '高级任务',
                        needSugar: 10,
                        rewardSugar: 11,
                        steps: 3000,
                        activity: 4
                    },
                    {
                        name: '超级任务',
                        needSugar: 10,
                        rewardSugar: 11,
                        steps: 3000,
                        activity: 5
                    },
                    {
                        name: '挑战任务',
                        needSugar: 10,
                        rewardSugar: 11,
                        steps: 3000,
                        activity: 6
                    },
                    {
                        name: '终极任务',
                        needSugar: 10,
                        rewardSugar: 11,
                        steps: 3000,
                        activity: 7
                    }
                ]
            }
        }
    }
</script>

<style lang="scss">
    .all-task {
        width: 690px;
        margin: 0 auto 20px;
        .task-info-list {
            width: 690px;
            .task-list-item {
                height: 245px;
                margin-top: 20px;
                .task-head-info {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 40px;
                    .task-list-name {
                        font-size: 32px;
                        line-height: 32px;
                    }
                    .task-list-activity {
                        font-size: 24px;
                        line-height: 24px;
                        padding: 4px 0;
                    }
                }
                .task-details-container {
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    .task-details-info {
                        width: 400px;
                        .task-details-info-item {
                            margin-bottom: 20px;
                            font-size: 24px;
                            line-height: 24px;
                        }
                    }
                    .task-details-btn {
                        font-size: 30px;
                        line-height: 28px;
                        height: 74px;
                        display: inline-block;
                        padding: 22px 30px 22px;
                        border: 2px solid #ffffff;
                        position: absolute;
                        right: 0;
                        bottom: 20px;
                        -webkit-border-radius: 8px;
                        -moz-border-radius: 8px;
                        border-radius: 8px;
                    }
                }
            }
            
        }
    }
</style>
