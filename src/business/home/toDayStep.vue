<template>
    <div class="toDayStep">
        <!-- 步数数据 -->
        <div class="item-list text-center">
            <div class="left-photo pull-left">
                <img src="/static/img/personal/default.jpg" alt="">
            </div>
            <div class="step">
                {{ step }}<span>步</span>
            </div>
        </div>
        <!-- 今日步数 -->
        <div class="item-list text-center step-num">今日步数</div>
        <!-- 分类数据 -->
        <div class="item-list column-info">
            <div class="item">
                <div class="title text-left">总步数</div>
                <div class="num">2968</div>
            </div>
            <div class="item">
                <div class="title">消耗卡路里</div>
                <div class="num">103</div>
            </div>
            <div class="item">
                <div class="title">公里数</div>
                <div class="num">2.5</div>
            </div>
        </div>
        <div class="item-list text-center tips-info">跑步，是一场自我对抗的旅程</div>
        <div class="item-list text-center details-tips">汗水肆意流淌，看自己精疲力竭<br/>就是收获，在这个盛夏</div>
        <div class="item-list share-info">
            <div class="pull-left code">
                <img :src="codeUrl" alt="">
            </div>
            <div class="pull-left share-words">
                <div class="share-title">趣步IWC糖果收益：{{ receipt }}</div>
                <div class="share-desc">扫码下载趣步APP，和我们一起动起来</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'to-day-step',
        data() {
            return {
                step: 6000,
                codeUrl: '/static/img/personal/code.png'
            }
        },
        methods: {},
        mounted() {
            this.$nextTick(() => {
                $(this.$el).css('min-height', window.screen.height - $('.head-title').height())
            })
        }
    }
</script>

<style lang="scss">
    .toDayStep {
        background: url("/static/img/home/todaStep.jpg") no-repeat;
        background-size: 100% 100%;
        padding: 60px 60px 60px;
        .item-list {
            .left-photo {
                width: 120px;
                height: 120px;
                -webkit-border-radius: 100%;
                -moz-border-radius: 100%;
                border-radius: 100%;
                border: 10px solid #ffffff;
                img {
                    width: 100px;
                    height: 100px;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    border-radius: 100%;
                }
            }
            .step {
                font-size: 100px;
                line-height: 120px;
                font-weight: bold;
                text-indent: -60px;
                span {
                    font-size: 24px;
                    line-height: 24px;
                    margin-top: 76px;
                    font-weight: normal;
                }
            }
            &.step-num {
                margin: 5px auto 70px auto;
                font-size: 24px;
                line-height: 24px;
            }
            &.column-info {
                padding: 0 70px;
                display: flex;
                justify-content: space-between;
                text-align: center;
                .title {
                    font-size: 30px;
                    line-height: 30px;
                    color: #ffffff;
                }
                .num {
                    font-family: DINAlternate, serif;
                    margin-top: 20px;
                    color: #F8C513;
                    font-size: 48px;
                    line-height: 48px;
                    font-weight: bold;
                }
            }
            &.tips-info {
                font-size: 44px;
                line-height: 44px;
                font-weight: bold;
                margin-top: 235px;
            }
            &.details-tips {
                font-size: 28px;
                line-height: 40px;
                margin-top: 40px;
            }
            &.share-info {
                margin-top: 270px;
                .code {
                    width: 100px;
                    height: 100px;
                    margin-right: 20px;
                    img {
                        width: 100px;
                        height: 100px;
                    }
                }
                .share-words {
                    width: calc(100% - 120px);
                    .share-title {
                        font-size: 28px;
                        line-height: 28px;
                        color: #F8C513;
                        margin-top: 22px;
                        margin-bottom: 17px;
                    }
                    .share-desc {
                        font-size: 24px;
                        line-height: 33px;
                    }
                }
            }
        }
    }
</style>
