<template>
    <div class="team-recruitment">
        <div class="share-info">
            <div class="pull-left share-container">
                <div class="user-info">
                    <div class="user-photo pull-left">
                        <img :src="userPhoto" alt="">
                    </div>
                    <div class="tips-words pull-left">
                        我是{{ userName }}<br/>
                        我为趣步代言
                    </div>
                </div>
                <div class="code-info">
                    推广码：{{ shareCode }}
                </div>
            </div>
            <div class="pull-left code-area">
                <img :src="codePath" alt="">
            </div>
        </div>
        <div class="share-btn text-center">
            分享
        </div>
    </div>
</template>

<script>
    import users from '../../api/users.js'
    import QrcodeVue from 'qrcode.vue'
    
    export default {
        name: 'team-recruitment',
        data() {
            return {
                codePath: '/static/img/personal/code.png',
                userPhoto: '/static/img/personal/default.jpg',
                shareCode: 'Kar 98',
                userName: '一杆98K爆你狗头'
            }
        },
        mounted() {
            this.$nextTick(() => {
                $(this.$el).css('min-height', window.screen.height - $('.head-title').height())
            })
        }
    }
</script>

<style lang="scss">
    .team-recruitment {
        background: url("/static/img/personal/teamRecruitment.jpg") no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        width: 100%;
        .share-info {
            display: inline-block;
            width: calc(100% - 120px);
            margin: 750px 60px 160px 60px;
            .code-area {
                width: 160px;
                height: 160px;
                img {
                    width: 160px;
                    height: 160px;
                }
            }
            .share-container {
                width: calc(100% - 160px);
                .user-info {
                    width: 100%;
                    display: inline-block;
                    margin-bottom: 28px;
                    .user-photo {
                        width: 80px;
                        height: 80px;
                        img {
                            width: 80px;
                            height: 80px;
                            -webkit-border-radius: 100%;
                            -moz-border-radius: 100%;
                            border-radius: 100%;
                        }
                    }
                    .tips-words {
                        width: calc(100% - 100px);
                        font-size: 28px;
                        line-height: 34px;
                        margin: 8px 0 8px 20px;
                    }
                }
                .code-info {
                    width: 100%;
                    font-size: 32px;
                    line-height: 32px;
                }
            }
        }
        .share-btn {
            display: inline-block;
            margin: 0 75px;
            width: calc(100% - 150px);
            font-size: 40px;
            line-height: 40px;
            background-color: #F8C513;
            color: #210936;
            padding: 30px 0;
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
        }
    }
</style>
