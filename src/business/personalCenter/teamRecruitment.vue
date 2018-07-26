<template>
    <div class="team-recruitment">
            <div class="link">
                推广链接：{{ shareLink }} <div class="copy" @click="copy">复制</div>
            </div>
        <div id="report">
            <div class="team-recruitment-ad">
                 <img :src="adImgUrl" alt="" >
            </div>
            <div class="team-recruitment-container">
                <div class="recruitment-container" v-html="content"></div>
                <div class="code-info">
                    <div class="left-words">
                       {{content2}}
                    </div>
                    <div class="right-img">
                        <qrcode-vue :value="shareLink" :size="size" level="H" className="code"></qrcode-vue>
                    </div>
                </div>
            </div>
            <div class="other-info">
                <div class="other-info-item">
                    我的推广码：{{ shareCode }}
                </div>
                <!--<div class="other-info-item text-right text-yellow" @click="saveImg">-->
                    <!--保存图片-->
                <!--</div>-->
            </div>
        </div>
        <div class="track-share-container">
            <div class="track-share">
                <div v-for="item in shareList" class="track-share-item text-center" @click="share(item.icon)">
                    <l-icon :name="item.icon"/>
                    <div class="share-label">{{ item.name }}</div>
                    <img :src="codeUrl" alt="">
                </div>
            </div>
        </div>
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
                adImgUrl: '/static/img/personal/default.jpg',
                adUrl: '',
                content: '',
                content2:'',
                codeUrl: '',
                shareLink: '',
                shareCode: '',
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
                var _this = this;
//                $("img").each(function(){
//                    $(this).attr("crossOrigin",'Anonymous');
//                })
                var screenClip = api.require('screenClip');
                screenClip.open({
                    cutFrame: {x: 0, y: $('header').outerHeight(true)+$(".link").outerHeight(true), w: api.winWidth, h: $('#report').height()},
                    save: {album: false, imgPath: "fs://sport", "imgName": "sport.png"}
                },function(ret, err) {
//                    if (ret.status) {
////                        alert(JSON.stringify(ret));
//                    } else {
////                        alert(JSON.stringify(err));
//                    }
                });
                setTimeout(function(){
                    screenClip.save( {album: false, imgPath: "fs://sport", "imgName": "sport.png"},function(ret, err) {
                        if (ret.status) {
                            var sharedModule = api.require('shareAction');
                            sharedModule.share({
                                path:"fs://sport/sport.png",
                                type: 'image'
                            });
//                            alert(JSON.stringify(ret));
                        } else {
//                            alert(JSON.stringify(err));
                        }
                    });
                },600);

//                html2canvas($('.team-recruitment-container').get(0),
//                        {useCORS:true,
//                            width:window.screen.availWidth,
//                            heigth:window.screen.availHeight,
//                            x:0,
//                            y:window.pageYOffset,
//                            scale:1,
//                          })
//                        .then(function (canvas) {
//                            var imgUrl = canvas.toDataURL("image/png", 0.7);
//                            _this.codeUrl = imgUrl;
//                        });
            }
        },
        mounted() {
            $(".code").width(87)
            $(".code").height(87)
//            this.size = $(".code").width()-2;
        },
        activated() {
            var _this = this;
            users.shareAction(this,function(json,memberid){
                users.getCacheMyInfo(this,function(myInfo) {
                    _this.adImgUrl = json.teamrecruit_sharebanner;
                    _this.content = json.teamrecruit_sharecotent1;
                    _this.content2 = json.teamrecruit_sharecotent2;
                    _this.shareLink = json.reg_shareurl + "?onlineid=" + myInfo.inviter+"&articleid=-1";
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
    .link{padding: 10px 40px;}
    .copy{color:#f8c513;display: inline-block;}
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
                    .code {
                        display: block;
                        text-align: center;
                        vertical-align: middle;
                        border:2px solid #FFF;
                        padding-top: 2px;
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
