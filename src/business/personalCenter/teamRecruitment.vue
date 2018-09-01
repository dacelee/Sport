<template>
    <div class="team-recruitment-root">
        <div class="link">
           <div class="tit"> 推广链接：</div><div class="address">{{ shareLink }}</div> <div class="copy" @click="copy">复制</div>
        </div>
        <div class="team-recruitment" id="team-recruitment">
            <img  class="back" src="../../../static/img/personal/teamRecruitment.jpg" width="100%" />
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
                <div class="code-area">
                    <qrcode-vue :value="shareLink" :size="size" level="H" className="code"></qrcode-vue>
                    <img :src="userPhoto" alt="" class="header"/>
                </div>
            </div>
        </div>
        <div class="share-btn text-center" @click="showShare()" v-show="shareBtnShow">
            分享
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
        name: 'team-recruitment',
        components: {
            QrcodeVue
        },
        data() {
            return {
                size: 85,
                userPhoto: '',
                shareCode: '',
                userName: '',
                adImgUrl:'',
                shareLink:'',
                shareBtnShow:true,
                show: false,
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
            copy(){
                var _this = this;
                var clipBoard = api.require('clipBoard');
                clipBoard.set({
                    value: _this.shareLink
                }, function(ret, err) {
                    if (ret) {
                        _this.$Message.info("复制成功");
                    } else {
                        _this.$Message.error("复制失败");
                    }
                });
            },
            showShare(){
                this.show =true;
                this.shareBtnShow = false;
//                users.shareImg(this, 0, $('header').outerHeight(true), api.winWidth, $('#shareNew').height(), '111')
            },
            share(type){
                this.show = false;
                var _this = this;
                setTimeout(function(){
                    users.shareStart(type,$("#team-recruitment").get(0),_this);
                },300);
                return;
//                users.shareImg(this,0,$('header').outerHeight(true)+$(".link").outerHeight(true),api.winWidth,$('.team-recruitment').height()-10,type)
            }
        },
        mounted() {
            this.$nextTick(function(){

            });
        },activated() {
            var _this = this;
            users.shareAction(this,function(json,memberid){
                users.getCacheMyInfo(_this,function(myInfo) {
                    _this.userName = myInfo.nikename;
                    _this.adImgUrl = json.teamrecruit_sharebgimg;
                    _this.shareLink = json.reg_shareurl + "?onlineid=" + myInfo.inviter;
                    _this.shareCode = myInfo.inviter;
//                var sharedModule = api.require('shareAction');
//                sharedModule.share({
//                    text:url,
//                    type: 'text'
//                });
                    if(_this.session.isAPPRuntime()){
                        _this.appUtil.getCacheImg( myInfo.logo,function(base64Str){
                            _this.userPhoto = base64Str;
                        });
                    }else{
                        _this.userPhoto = myInfo.logo
                    }
//                    var height = $(window).height() - $('header').outerHeight(true) - $('.link').outerHeight(true)
//                    if($(window).height()<$(".back").height()){
//                        height = $(".back").height();
//                    }
//                    setTimeout(function(){
//                        $(".team-recruitment").height(height-2);
//                    },500)
                },true);
            },-1);
        },
        deactivated(){
            this.show = false;
            this.shareBtnShow = true;
        }
    }
</script>

<style lang="scss">
    .team-recruitment-root{
        height:100%;

        background-color:#1D0F2B;
        position: relative;
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
        .link{padding-left:40px;margin: 10px 0px;line-height:50px;height: 50px;
        .tit{width: 22%;float: left;height: 50px;overflow: hidden;}
        .address{ width: 60%;float: left;height: 50px;overflow: hidden; word-wrap: normal;
            white-space: nowrap;
            text-overflow: ellipsis;}
        .copy{color:#f8c513;float: left;}
    }
    .share-btn {
        position: absolute;bottom: 80px;right:0px;
        width: 85%;
        margin: 0 55px;
        font-size: 40px;
        line-height: 40px;
        background-color: #F8C513;
        color: #210936;
        padding: 25px 0;
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
    }
    .team-recruitment {
        position: relative;
        background-color: #1D0F2B;
        width: 100%;
        overflow: hidden;
        border:none;
        .back{display: block;}
        .share-info {
            display: inline-block;
            width: calc(100% - 100px);
            position: absolute;top: 730px;right: 30px;
            .code-area {

                position: relative;
                float:left;
                .header {
                    width: 40px;
                    height: 40px;
                    position: absolute;
                    left: 50%;
                    top:50%;
                    margin-left: -20px;
                    margin-top: -20px;
                }
                .code{
                    border: 4px solid #FFFFFF;
                    display:block;
                    overflow:hidden;
                    canvas{display: block;}
                }

            }
            .share-container {
                width: calc(100% - 220px);
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

    }
    }
</style>
