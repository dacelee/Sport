<template>
    <div class="team-recruitment">
        <div class="team-recruitment-ad">
            <a :href="adUrl">
                <img :src="adImgUrl" alt="">
            </a>
        </div>
        <div class="team-recruitment-container">
            <div class="recruitment-container" v-html="content"></div>
            <div class="code-info">
                <div class="left-words">
                    除了行情<br/>
                    更有<span class="text-yellow">资金流向、大单监控、短线精灵</span>
                </div>
                <div class="right-img">
                    <img :src="codeUrl" alt="">
                </div>
            </div>
        </div>
        <div class="other-info">
            <div class="other-info-item">
                我的推广链接：{{ shareLink }}
            </div>
            <div class="other-info-item">
                我的推广码：{{ shareCode }}
            </div>
            <div class="other-info-item text-right text-yellow">
                保存图片
            </div>
        </div>
        <div class="track-share-container">
            <div class="track-share">
                <div v-for="item in shareList" class="track-share-item text-center">
                    <l-icon :name="item.icon"/>
                    <div class="share-label">{{ item.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'team-recruitment',
        data() {
            return {
                adImgUrl: '/static/img/personal/default.jpg',
                adUrl: 'https://sport.xmxmui.com',
                content: '【BTC铁坡6300美元 跌幅2.35%】7月12日讯，据行情显示，BTC短时间快速下跌，跌破6300美元，现价6218美元，跌幅2.35%',
                codeUrl: 'http://cuc.fjnu.edu.cn/tsg/upload/images/2017/4/1918278745.gif',
                shareLink: 'https://sport.xmxui.com',
                shareCode: 'SDJADASDSP',
                shareList: [
                    {
                        icon: 'weixin',
                        name: '微信'
                    },
                    {
                        icon: 'pengyouquan',
                        name: '朋友圈'
                    },
                    {
                        icon: 'QQ',
                        name: 'QQ'
                    },
                    {
                        icon: 'weibo',
                        name: '微博'
                    }
                ]
            }
        }
    }
</script>

<style lang="scss">
    .team-recruitment {
        .text-yellow {
            color: #f8c513;
        }
        .team-recruitment-ad {
            width: 100%;
            img {
                width: 100%;
                height: 300px;
            }
        }
        .team-recruitment-container {
            width: 100%;
            .recruitment-container {
                padding: 30px 30px 30px;
                border-bottom: 2px solid #d7dce6;
            }
            .code-info {
                padding: 40px 30px;
                display: flex;
                justify-content: space-between;
                .left-words {
                    width: 400px;
                    font-size: 24px;
                    line-height: 40px;
                    padding: 50px 0;
                }
                .right-img {
                    width: 200px;
                    height: 200px;
                    img {
                        width: 200px;
                        height: 200px;
                    }
                }
            }
        }
        .other-info {
            width: 690px;
            margin: 30px auto;
            font-size: 30px;
            line-height: 40px;
        }
        .track-share-container {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            .track-share {
                position: fixed;
                display: flex;
                flex-wrap: nowrap;
                bottom: 0;
                left: 0;
                width: 750px;
                z-index: 3;
                background-color: #33333a;
                justify-content: space-between;
                padding: 40px 80px;
                .track-share-item {
                    width: 100px;
                    .icons {
                        width: 100px;
                        height: 100px;
                    }
                    .share-label {
                        color: #ffd554;
                        margin-top: 20px;
                        font-size: 30px;
                        line-height: 30px;
                    }
                }
            }
        }
    }
</style>
