<template>
    <div class="team-recruitment">
            <div class="link">
                推广链接：<div class="address">{{ shareLink }}</div> <div class="copy" @click="copy">复制</div>
            </div>
        <div id="report">
            <div class="team-recruitment-ad">
                <img :src="adImgUrl" alt="" >
                <div class="code-info">
                    <div class="right-img">
                        <qrcode-vue :value="shareLink" :size="size" level="H" className="code"></qrcode-vue>
                        <img :src="header" class="header" >
                    </div>
                </div>
                <div class="other-info-item">
                    我的邀请码：{{ shareCode }}
                </div>
            </div>
        </div>
        <div class="shareBtn" @click="share('weixin')" v-if="shareBtnShow">分享</div>
        <div class="track-share-container"  v-if="show">
            <div class="track-share">
                <div v-for="item in shareList" class="track-share-item text-center" @click="share(item.icon)">
                    <l-icon :name="item.icon"/>
                    <div class="share-label">{{ item.name }}</div>
                    <img :src="codeUrl" alt="" >
                </div>
            </div>
        </div>
        <img :src="codeUrl" alt="">
    </div>
</template>

<script>
    import users from '../../api/users.js'
    import QrcodeVue from 'qrcode.vue';
    export default {
        name: 'team-recruitment',
        components: {
            QrcodeVue
        },
        data() {
            return {
                size: 85,
                show:false,
                adImgUrl: '',
                adUrl: '',
                codeUrl: '',
                header:'',
                shareLink: '',
                shareCode: '',
                shareBtnShow:true,
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
            share(){

                users.shareImg(this,0,$('header').outerHeight(true)+$(".link").outerHeight(true),api.winWidth,$('#report').height())

            }
        },
        mounted() {
            $(".code").width(87)
            $(".code").height(87)
        },
        activated() {
            var _this = this;
            this.shareBtnShow = true;
            users.shareAction(this,function(json,memberid){
                users.getCacheMyInfo(_this,function(myInfo) {
                    _this.header = myInfo.logo;
                    _this.adImgUrl = json.teamrecruit_sharebgimg;
                    _this.shareLink = json.reg_shareurl + "?onlineid=" + myInfo.inviter;
                    _this.shareCode = myInfo.inviter;
//                var sharedModule = api.require('shareAction');
//                sharedModule.share({
//                    text:url,
//                    type: 'text'
//                });
                });
            });
        }
    }
</script>

<style lang="scss">
    .team-recruitment {
    .link{padding: 0px 40px;margin-bottom: 20px;line-height:60px;height: 60px;margin-top:20px;
        .address{width: 400px;display: inline-grid;height: 60px;overflow: hidden; white-space:nowrap;}
    }
    .copy{color:#f8c513;display: inline-block;}
        .team-recruitment-ad {
            position: relative;
            width: 100%;
            img {
                width: 100%;display: block;
            }
            .other-info-item{position: absolute;left: 30px;bottom: 50px;}
            .code-info{position: absolute;bottom: 20px;right: 50px;
            .right-img{position: relative;}
            }

            .header{width: 40px;height:40px;position: absolute;left: 50%;top: 50%;margin-top: -20px;margin-left: -20px;}
        }
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
        .shareBtn{
            text-align: center;
            line-height: 34px;
            padding: 33px 0;
            background-color: #F8C513;
            color: #000;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 750px;}
    }
</style>
