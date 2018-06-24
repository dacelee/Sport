<template>
    <div class="feedback">
        <div class="feedback-type-select">
            <div class="left-label">
                问题类型
            </div>
            <div class="current-type" @click="showTypeList = true">
                {{ type.name }}
                <l-icon name="fanhui"/>
            </div>
        </div>
        <div class="feedback-container">
            <div class="label">内容</div>
            <div class="input-container">
                <textarea placeholder="在此输入内容"/>
                <div class="btn">提交</div>
            </div>
        </div>
        <l-selectOption @change="changeSelect" v-if="showTypeList" @click="showTypeList = false" :list="typeList"
                        :selected="type"/>
    </div>
</template>

<script>
    let _this
    export default {
        name: 'feedback',
        data() {
            return {
                type: {
                    id: '',
                    name: '请选择问题类型'
                },
                showTypeList: false,
                typeList: [
                    {
                        id: 'trading',
                        name: '交易中心'
                    },
                    {
                        id: 'business',
                        name: '商圈'
                    },
                    {
                        id: 'other',
                        name: '其他'
                    }
                ],
                changeSelect(data) {
                    _this.type = data
                    _this.showTypeList = false
                }
            }
        },
        mounted() {
            _this = this
            this.$nextTick(function () {
                let height = $('.view-container').height()
                $(_this.$el).css('height', height)
                $('.feedback-container').css('min-height', height - 90)
            })
        }
    }
</script>

<style lang="scss">
    .feedback {
        height: 100%;
        background-color: #25252B;
        .feedback-type-select {
            font-size: 30px;
            line-height: 30px;
            padding: 30px 30px 30px;
            background-color: #333339;
            color: #999999;
            display: flex;
            justify-content: space-between;
            .current-type {
                color: #ffffff;
                .icons {
                    color: #666666;
                    transform: rotate(180deg);
                }
            }
        }
        .feedback-container {
            margin-top: 20px;
            background-color: #333339;
            position: relative;
            padding: 30px 30px 0 30px;
            .label {
                font-size: 30px;
                line-height: 30px;
                color: #999999;
                margin-bottom: 32px;
            }
            textarea {
                background-color: #25252B;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
                height: 400px;
                padding: 30px 30px 30px;
                font-size: 30px;
                line-height: 30px;
                width: 100%;
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
        .feedback-type-container {
            height: 100%;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.4);
            .feedback-type-list {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                .type-list-item {
                    font-size: 30px;
                    line-height: 30px;
                    padding: 30px 30px 30px;
                    border-top: 1px solid #25252B;
                    background-color: #404049;
                    width: 100%;
                    .icons {
                        position: absolute;
                        right: 30px;
                    }
                }
            }
        }
    }
</style>
