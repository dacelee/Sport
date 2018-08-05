<template>
    <div class="share-new" id="shareNew">
        <div class="top">
            <img :src="imgPath" alt="">
        </div>
        <div class="container">
            <div class="news-item title">
                {{ title }}&emsp;{{ time }}
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
                <img :src="header" class="header" >
            </div>
        </div>
        <div class="shareBtn" @click="share('weixin')" v-if="shareBtnShow">分享</div>
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
    import QrcodeVue from 'qrcode.vue';
    export default {
        name: 'articleShare',
        components: {
            QrcodeVue
        },
        data() {
            return{
                size: 85,
                title:'',
                time:'',
                imgPath:'',
                shareLink:'',
                header:'',
                show:false,
                shareBtnShow:true,
                shareContainer:'',
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
            shareLoad(){
                var _this = this;
                var articleid = this.$route.query.id;
                this.axios.post(this.session.articleDetail, {'id': articleid}, function (json) {
                    var data = json.data
                    _this.title = data.title;
                    _this.time = _this.appUtil.dateFormat(data.addtime, 'yyyy/MM/dd hh:mm');
                    _this.shareContainer = data.intro;
                });
                users.shareAction(this,function(json,memberid){
                    users.getCacheMyInfo(_this,function(myInfo){
                        _this.imgPath = json.article_sharetopimg;
                        _this.header = myInfo.logo;
                        _this.shareLink = json.reg_shareurl+"&onlineid="+ myInfo.inviter;

                    },true)
                });
            },
            share(type){
                users.shareImg(this,0,$('header').outerHeight(true),api.winWidth,$('#shareNew').height(),type)
            }
        },
        mounted() {
            $(".code").width(87)
            $(".code").height(87)
        },
        activated() {
            this.shareLoad();
        }
    }
</script>
<style lang="scss">
    .share-new{
        width: 100%;
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

        .top{
            width: 100%;
        }
        .top img{
            width: 100%;
        }
        .container{
            margin-top: 10px;
        }
        .news-item{
            padding: 20px 20px 20px;
            font-size: 30px;
            line-height: 40px;
        }
        .news-item.title{
            font-size: 40px;
            line-height: 50px;
        }
        .share-container{
           height: 300px;
            width: 100%;
            position: relative;
        }
        .share-container .left-words{
            position: absolute;
            line-height: 50px;
            font-size: 35px;
            width: calc(100% - 300px);
            bottom: 30px;
            left: 30px;
        }
        .share-container .right-code{
           position: absolute;
            bottom: 30px;
            right: 30px;
        }
        .share-container .right-code .code canvas{display: block;}
        .share-container .right-code .header {width: 40px;height:40px;position: absolute;left: 50%;top: 50%;margin-top: -20px;margin-left: -20px;display: block;}
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