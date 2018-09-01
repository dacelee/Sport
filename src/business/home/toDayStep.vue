<template>
    <div class="toDayStep" id="toDayStep">
        <!-- 步数数据 -->
        <div class="item-list text-center">
            <div class="left-photo pull-left">
                <img :src="userPhoto" alt="">
            </div>
            <div class="step">
                {{ steps }}<span>步</span>
            </div>
        </div>
        <!-- 今日步数 -->
        <div class="item-list text-center step-num">今日步数</div>
        <!-- 分类数据 -->
        <div class="item-list column-info">
            <div class="item">
                <div class="title text-left">总步数</div>
                <div class="num">{{totalSteps}}</div>
            </div>
            <div class="item">
                <div class="title">消耗卡路里</div>
                <div class="num">{{stepHeat}}</div>
            </div>
            <div class="item">
                <div class="title">公里数</div>
                <div class="num">{{distance}}</div>
            </div>
        </div>
        <div class="item-list text-center tips-info">跑步，是一场自我对抗的旅程</div>
        <div class="item-list text-center details-tips">汗水肆意流淌，看自己精疲力竭<br/>就是收获，在这个盛夏</div>
        <div class="item-list share-info">
            <div class="pull-left ccode">
                <qrcode-vue :value="shareLink" :size="size" level="H" className="code"></qrcode-vue>
                <img :src="userPhoto" alt="" class="header">
            </div>
            <div class="pull-left share-words">
                <div class="share-title">趣步IWC糖果收益：{{ myCoin }}</div>
                <div class="share-desc">扫码下载趣步APP，和我们一起动起来</div>
            </div>
        </div>
        <div class="track-share-container" v-if="show">
            <div class="track-share">
                <div v-for="item in shareList" class="track-share-item text-center" @click="share(item.icon)">
                    <l-icon :name="item.icon"/>
                    <div class="share-label">{{ item.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import users from '../../api/users.js'
    import QrcodeVue from 'qrcode.vue'
    export default {
        name: 'to-day-step',
        components: {
            QrcodeVue
        },
        data() {
            return {
                size: 80,
                distance:0,
                totalSteps:0,
                myCoin:0,
                steps:0,
                stepHeat:'0',
                userPhoto: '',
                shareLink:'',
                codeUrl: '',
                show:false,
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
//                    {
//                        icon: 'weibo',
//                        name: '微博'
//                    }
                ]
            }
        },
        methods: {
            shareLoad(){
                var _this = this;
                users.shareAction(this,function(json,memberid){
                    _this.steps = _this.db.loadTodaySteps(memberid,_this);
                    _this.totalSteps = _this.db.loadTotalSteps(memberid,_this);
                    _this.distance = (_this.totalSteps*0.3/1000).toFixed(2);
                    _this.stepHeat = (_this.totalSteps *0.03175).toFixed(2);
                    users.getCacheMyInfo(_this,function(myInfo){
                        _this.myCoin = parseFloat(myInfo.cointotal).toFixed(4)
                        _this.imgPath = json.article_sharetopimg;
                        if(_this.session.isAPPRuntime()){
                            _this.appUtil.getCacheImg( myInfo.logo,function(base64Str){
                                _this.userPhoto = base64Str;
                            });
                        }else{
                            _this.userPhoto = myInfo.logo
                        }
                        _this.shareLink = json.reg_shareurl+"?onlineid="+ myInfo.inviter;
                    },true)
                });
            },
            editEvent() {
                this.show = true;
            },
            share(type) {
                this.show =false;
                var _this = this;
                setTimeout(function(){
                    users.shareStart(type,$("#toDayStep").get(0),_this);
                },300);
                return;
//                users.shareImg(this, 0, $('header').outerHeight(true), api.winWidth, $('.view-container').height(), type)
            }
        },
        mounted() {
            this.$nextTick(function(){
                $(this.$el).css('min-height', window.screen.height -  $("header").outerHeight(true))
            })
        },
        activated() {
            this.shareLoad();
        },
        deactivated(){
            this.show = false;
        }
    }
</script>

<style lang="scss">
    .toDayStep {
        background: url("../../../static/img/home/todaStep.jpg") no-repeat;
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
                margin-top: 160px;
                padding: 10px 0px;
                float:left;
                .ccode {
                    margin-left: 1px;

                    position: relative;
                    margin-right: 20px;
                }
                .header {
                    width: 40px;
                    height: 40px;
                    position: absolute;
                    left: 50%;
                    top:50%;
                    margin-left: -20px;
                    margin-top: -20px;
                }
                .code{border: 4px solid #FFFFFF;
                    display:block;
                    overflow:hidden;}
                .code canvas{display: block; }
                .share-words {
                    width: calc(100% - 230px);
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
            padding: 80px 80px;
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
