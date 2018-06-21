<template>
    <div class="feedback-list">
        <div class="feedback-list-item" v-for="item in list">
            <div class="questions item-container">
                <div class="time">{{ item.questions.time}}</div>
                <div class="content">问：{{ item.questions.content }}</div>
            </div>
            <div class="reply item-container" v-if="item.reply.content">
                <div class="time">{{ item.reply.time}}</div>
                <div class="content">答：{{ item.reply.content }}</div>
            </div>
        </div>
        <div class="btn" @click="$router.push('feedback')">提问</div>
    </div>
</template>

<script>
    export default {
        name: 'feedback-list',
        data() {
            return {
                list: [
                    {
                        questions: {
                            time: '2018/06/21 23:57',
                            content: '为什么你们的物流这么慢'
                        },
                        reply: {
                            time: '2018/06/21 23:58',
                            content: '那你到是别买啊，怪我咯？'
                        }
                    }
                ]
            }
        }
    }
</script>

<style lang="scss">
    .feedback-list {
        width: 100%;
        .feedback-list-item {
            width: 100%;
            padding: 0 30px;
            margin: 20px 0 0 0;
            .item-container {
                background-color: #333339;
                padding: 30px 30px 30px;
                &.questions {
                    -webkit-border-radius: 8px 8px 0 0;
                    -moz-border-radius: 8px 8px 0 0;
                    border-radius: 8px 8px 0 0;
                }
                &.reply {
                    -webkit-border-radius: 0 0 8px 8px;
                    -moz-border-radius: 0 0 8px 8px;
                    border-radius: 0 0 8px 8px;
                    margin-top: 2px;
                }
                .time {
                    color: #999999;
                    margin-bottom: 20px;
                    font-size: 24px;
                    line-height: 24px;
                }
                .content {
                    font-size: 32px;
                    line-height: 32px;
                }
            }
        }
        .btn {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center;
            background-color: #F8C513;
            color: #25252B;
            font-size: 34px;
            line-height: 34px;
            padding: 35px 0;
        }
    }
</style>
