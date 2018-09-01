<template>
    <div class="share-new">
        <div  id="shareNew">
            <div class="top">
                <img :src="imgPath" alt="" >
            </div>
            <div class="container">
                <div class="news-item title">
                    {{ title }}
                </div>
                <div class="news-item time">
                    {{ time }}
                </div>
                <div class="news-item" v-html="shareContainer">
                </div>
            </div>
            <div class="share-container">
                <div class="left-words">
                    快扫描二维码下载APP吧
                </div>
                <div class="right-code">
                    <qrcode-vue :value="shareLink" :size="size" level="H" className="code"></qrcode-vue>
                    <img :src="header" class="header">
                </div>
            </div>
        </div>
        <div class="shareBtn" @click="showShare()" v-if="shareBtnShow">分享</div>
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
        name: 'articleShare',
        components: {
            QrcodeVue
        },
        data() {
            return {
                size: 85,
                title: '',
                time: '',
                imgPath: '',
                shareLink: '',
                header: '',
                show: false,
                shareBtnShow: true,
                shareContainer: '',
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
                    }
//                    ,
//                    {
//                        icon: 'weibo',
//                        name: '微博'
//                    }
                ]
            }
        },
        methods: {
            shareLoad() {
                var _this = this
                var articleid = this.$route.query.id
                this.axios.post(this.session.articleDetail, {'id': articleid}, function (json) {
                    var data = json.data
                    _this.title = data.title
                    _this.time = _this.appUtil.dateFormat(data.addtime, 'yyyy/MM/dd hh:mm')
                    _this.shareContainer = data.intro
                })
                users.shareAction(this, function (json, memberid) {
                    users.getCacheMyInfo(_this, function (myInfo) {
                        if(_this.session.isAPPRuntime()){
                            _this.appUtil.getCacheImg(json.article_sharetopimg,function(base64Str){
                                _this.imgPath = base64Str;
                            });
                            _this.appUtil.getCacheImg(myInfo.logo,function(base64Str){
                                _this.header  = base64Str;
//                                setTimeout(function(){
//                                    $(".share-new").height($(".share-new").height());
//                                },1000)
                            });
                        }else{
                            _this.imgPath = json.article_sharetopimg
                            _this.header = myInfo.logo
                        }
                        _this.shareLink = json.reg_shareurl + '?onlineid=' + myInfo.inviter;

                    }, true)
                })
            },
            showShare(){
                this.show =true;
                this.shareBtnShow = false;
//                users.shareImg(this, 0, $('header').outerHeight(true), api.winWidth, $('#shareNew').height(), '111')
            },
            share(type) {
                this.show =false;
                var _this = this;
                setTimeout(function(){
                    users.shareStart(type,$("#shareNew").get(0),_this);
                },300);
                return;
//                users.shareImg(this, 0, $('header').outerHeight(true), api.winWidth, $('#shareNew').height(), type)
            }
        },
        mounted() {

        },
        activated() {
            this.shareLoad()
        },
        deactivated(){
            this.show = false;
            this.shareBtnShow = true;
        }
    }
</script>
<style lang="scss">
    .share-new {
        width: 100%;
        #shareNew{ background-color: #1E1E22;
            width: 100%;overflow: hidden;height: 100%; }
        .track-share-container {
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
        
        .top {
            width: 100%;
        }
        .top img {
            width: 100%;
            display: block;
        }
        .container {
            padding-top: 10px;
        }
        .news-item {
            padding: 80px 20px 80px;
            font-size: 30px;
            line-height: 40px;
            &.title {
                font-size: 40px;
                line-height: 40px;
                padding: 5px 20px;
            }
            &.time {
                font-size: 24px;
                line-height: 34px;
                padding: 5px 20px;
            }
        }
        .share-container {
            height: 260px;
            width: 100%;
            position: relative;
            overflow: hidden;
            background-color: #1E1E22;
        }
        .share-container .left-words {
            position: absolute;
            line-height: 50px;
            font-size: 35px;
            width: 60%;
            bottom: 30px;
            left: 30px;
        }
        .share-container .right-code {
            position: absolute;
            right: 40px;
            bottom: 30px;
            .code{
                border: 4px solid #FFFFFF;
                display:block;
                overflow:hidden;
                canvas{display: block;}
            }
        }

        .share-container .right-code .header {
            width: 40px;
            height: 40px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -20px;
            margin-left: -20px;
            display: block;
        }
        .shareBtn {
            text-align: center;
            line-height: 34px;
            padding: 33px 0;
            background-color: #F8C513;
            color: #000;
            width: 750px;
            position: fixed;
            bottom: 0px;
            left: 0px;
        }
    }
</style>
