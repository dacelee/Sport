<template>
    <div class="news-details">
        <div id="new-header">
            <div class="news-details-container">
                <div class="news-details-title">{{ newsDetails.title }}</div>
                <div class="news-details-info">
                    <div class="news-author pull-left" v-if="newsDetails.author!=''">作者:{{ newsDetails.author }}</div>
                    <div class="news-time ">发布时间:{{ newsDetails.dateTime }}</div>
                </div>
                <div  class="news-details-content"  v-if="acticleType==3">
                    <div v-for="item in newsDetails.photos">
                        <img :src="item" width="100%"/>
                    </div>
                </div>
                <div class="news-details-content" v-html="newsDetails.content"></div>
            </div>
            <div class="news-reward-info">
                <div class="pull-left">吐槽:{{ rewardInfo.complain }}</div>
                <div class="pull-right" v-if="acticleType==3">打赏:{{ rewardInfo.reward }}</div>
            </div>
        </div>
        <div class="news-evaluation">
            <Scroll :on-reach-bottom="handleReachBottom" :height="scrollHeight" >
            <div class="news-evaluation-item" v-for="item in evaluation">
                <div class="news-evaluation-info">
                    <div class="news-evaluation-photo pull-left">
                        <img :src="item.photoPath" alt="">
                    </div>
                    <div class="news-evaluation-basic-info pull-left">
                        <div class="news-evaluation-basic-name">{{ item.userName }}</div>
                        <div class="news-evaluation-basic-datetime">{{ item.dateTime }}</div>
                    </div>
                </div>
                <div class="news-evaluation-container" v-html="item.container"></div>
            </div>
            </Scroll>
        </div>
        <div class="news-short-menu">
            <div class="news-short-menu-item text-center" @click="evaluationFn" v-if="!mycreate">
                <l-icon name="bianji"/>
                吐槽
            </div>
            <div class="news-short-menu-item text-center" @click="rewardFn"  v-if="acticleType==3&&!mycreate">
                <l-icon name="huodong"/>
                打赏
            </div>
            <div class="news-short-menu-item text-center" @click="share">
                <l-icon name="fenxiang"/>
                分享
            </div>
        </div>
        <div class="news-details-popup" v-if="showPopup" @click="showPopup = false">
            <div class="container" v-if="popupType === 'reward'" @click.stop="">
                <div class="title text-center">正在打赏</div>
                <div class="less-num text-center">当前糖果余额:{{ myCoin }}</div>
                <div class="reward-num">
                    <input type="text" placeholder="最少打赏0.01" v-model="coin">
                </div>
                <div class="reward-num">
                    <input type="password" placeholder="交易密码" v-model="password">
                </div>
                <div class="operation-btn">
                    <div class="btn btn-cancel text-center" @click="showPopup = false">取&emsp;消</div>
                    <div class="btn btn-confirm text-center" @click="givecoinAdd">确&emsp;定</div>
                </div>
            </div>
            <div class="evaluation" v-if="popupType === 'evaluation'" @click.stop="">
                <textarea placeholder="请输入吐槽内容" v-model="comment"></textarea>
                <div class="btn btn-confirm pull-right" @click="commentSubmit">发送</div>
            </div>
        </div>
    </div>
</template>

<script>
    let _this
    import users from '../../api/users.js'
    export default {
        name: 'news-details',
        data() {
            
            return {
                acticleType:0,
                popupType: '',
                scrollHeight:10,
                showPopup: false,
                myCoin: 0,
                page:1,
                comment: '',
                mycreate:false,
                coin: '',
                password:'',
                newsDetails: {
//                    title: '运动后恶心想吐怎么办 运动后恶心想吐的原因',
//                    author: 'Louis',
//                    dateTime: '2018/06/06 21:25',
//                    content: '跑步是一种锻炼身体的好习惯，很多年轻人都有早上跑步的习惯，但是有时候跑步会岔气，这是为什么呢？跑步时，我们应该选择合适的时间和方式，不应该盲目去跑。'
                },
                rewardInfo: {
                    complain: 0,
                    admiration: 0,
                    reward: 0
                },
                evaluation: [
//                    {
//                        photoPath: '/static/img/news/1.jpg',
//                        userName: 'Louis',
//                        dateTime: '2018/06/07 23:33',
//                        container: '这个方法好棒棒，好喜欢'
//                    }
////                    ,
////                    {
////                        photoPath: '/static/img/news/2.jpg',
////                        userName: 'Louis',
////                        dateTime: '2018/06/07 23:33',
////                        container: '这个方法好棒棒，好喜欢'
////                    },
////                    {
////                        photoPath: '/static/img/news/1.jpg',
////                        userName: 'Louis',
////                        dateTime: '2018/06/07 23:33',
////                        container: '这个方法好棒棒，好喜欢'
////                    }
                ]
            }
        },
        methods: {
            rewardFn() {
                _this.popupType = 'reward'
                _this.showPopup = true
            },
            evaluationFn() {
                _this.popupType = 'evaluation'
                _this.showPopup = true
//                this.comment = "";
            },
            commentSubmit() {
                var param = this.$route.params
                if(this.comment==""){
                    this.$Message.info("请输入吐槽内容");
                    return;
                }
                var _this = this;
                this.session.getMemberID(function (memberid) {
                    _this.axios.post('/article/articlecomment_add',
                        {'articleid': param.id, memberid: memberid, content: _this.comment, type: 1}, function (json) {
                            _this.$Message.info(json.msg)
                            _this.showPopup = false;
                            _this.page = 1;
                            _this.comment = "";
                            _this.loadComment()
                        }, function (json) {
                            _this.$Message.info(json.msg)
                        })
                })
                
                
            },
            givecoinAdd() {
                var param = this.$route.params
                if (this.coin == '' || this.coin < 0.01) {
                    this.$Message.error('最少打赏0.01')
                    return
                } if (this.password == '') {
                    this.$Message.error('请输入交易密码')
                    return
                }
                this.session.getMemberID(function(memberid){
                    _this.axios.post("/article/articlegivecoin_add", {"articleid":param.id,memberid:memberid,coin:_this.coin,type:1,'tradepwd':_this.password}, function (json) {
                        _this.$Message.info(json.msg);
                        _this.showPopup = false;
                        _this.loadData();
                    },function(json){
                        _this.$Message.info(json.msg);
                    });
                });
            },
            loadData() {
                var param = this.$route.params
                this.axios.post(this.session.articleDetail, {'id': param.id}, function (json) {
                    var data = json.data
                    var photos = [];
                    if(data.photos!="null"&&data.photos!=""){
                        photos = data.photos.split(",");
                    }
                    _this.newsDetails = {
                        photos:photos,
                        title: data.title,
                        author: '',
                        dateTime: _this.appUtil.dateFormat(data.addtime, 'yyyy/MM/dd hh:mm'),
                        content: data.content
                    }
                    _this.session.getMemberID(function(memberid){
                        if(data.adminid==memberid){
                            _this.mycreate = true;
                        }
                    })
                    _this.rewardInfo = {
                        complain: data.commentTotal?data.commentTotal:0,
                        admiration: data.goods,
                        reward: data.rewardsTotal?data.rewardsTotal:0,
                    }
                    _this.acticleType = data.type;
                },function(json){
                    _this.$Message.error(json.msg);
                });
            },
            del(){
                var id = this.$route.params.id
                App.confirm({"title":'警告',"content":"确定删除分享吗?"}).then(function() {
                    axios.post("/article/article_del", {id: id}, function (json) {
                        context.$Message.info(json.msg);
                        context.$router.go(-1);
                    }, function (json) {
                        context.$Message.error(json.msg);

                    });
                });
            },
            loadComment(resolve) {
                var param = this.$route.params;
                this.axios.post('/article/commentlist', {'articleid': param.id, page: this.page, pageSize: 10},
                        function (json) {
                            var data = json.dataList
                            if (_this.page == 1) {
                                _this.evaluation = [];
                            }
                            $(data).each(function (index, item) {
                                var h = item.sex=="男"||item.sex==null?'./static/img/man.png':'./static/img/woman.png';
                                item.logo = (item.logo==null||item.logo=='null')?h: item.logo;
                                _this.evaluation.push({
                                    photoPath: item.logo,
                                    userName: item.nikename,
                                    dateTime: _this.appUtil.dateFormat(item.addtime, 'yyyy/MM/dd hh:mm'),
                                    container: item.content
                                })
                            })
                            if (_this.page == 1) {
                                setTimeout(function(){
                                    _this.scrollHeight = $(".news-evaluation-item").outerHeight(true)*data.length+20;
                                },500)

                            }
                            if(data.length>0){
                                _this.page++;
                            }
                        }, function (json) {
                            _this.$Message.error(json.msg);
                        }, resolve);
            },
            share(){
                var articleid = this.$route.params.id;
                this.$router.push({name: 'articleShare', query: {id: articleid}})
            },
            handleReachBottom () {
                var _this = this;
                return new Promise(function(resolve){
                    _this.loadComment(resolve);
                });
            }
        },
        activated() {
            this.password = "";
            this.comment = "";
            this.page=1;
            this.scrollHeight = 0;
            this.loadData()
            this.loadComment();
        },
        mounted() {
            _this = this
            var headerHeight = $("header").outerHeight(true);
            var height = $(window).height()-headerHeight;
            this.scrollHeight = $(window).height()-$("#new-header").outerHeight(true)-$(".news-short-menu").outerHeight(true)-80;
            $(".news-details").css({"min-height":height});
            users.getCacheMyInfo(this, function (user) {
                _this.myCoin = user.cointotal;
            }, true)
        }
    }
</script>
<style lang="scss">
    .news-details {
        background-color: #f5f5f5;
        padding-bottom: 100px !important;

    .news-details-container {
        color: #000;
        background-color: #ffffff;
        width: 750px;
        padding: 15px 30px 0;
        display: inline-block;
    .news-details-title {
        font-size: 42px;
        line-height: 50px;
        text-align: center;
    }
    .news-time{text-align: center;}
    .news-details-info {
        margin: 20px 0 40px 0;
        color: #666666;
    .news-author {
        margin-right: 30px;
    }
    }
    .news-details-content {
        font-size: 32px;
        line-height: 40px;
        color: #333333;
        padding-bottom: 60px;
        overflow: hidden;
        width: 100%;
    img {
        width: 100%;
    }
    }
    }
    .news-reward-info {
        font-size: 24px;
        line-height: 24px;
        padding: 20px 30px;
        border-top: 1px solid #666666;
        background-color: #ffffff;
        color: #000;
        display: inline-block;
        width: 750px;
    .admiration {
        margin-left: 30px;
    }
    }
    .news-evaluation {
        margin-top: 20px;
        background-color: #ffffff;
        width: 750px;
        color: #333333;
    .news-evaluation-item {
        padding: 30px 30px 30px;
        border-bottom: 1px solid #666666;
    .news-evaluation-info {
        margin-bottom: 15px;
        display: inline-block;
    .news-evaluation-photo {
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
    .news-evaluation-basic-info {
        height: 80px;
        margin-left: 20px;
    .news-evaluation-basic-name {
        font-size: 32px;
        line-height: 32px;
        margin-top: 10px;
        width: 500px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .news-evaluation-basic-datetime {
        font-size: 24px;
        line-height: 24px;
        margin-top: 10px;
        color: #999999;
    }
    }
    .news-evaluation-container {
        font-size: 26px;
        line-height: 30px;
        overflow: hidden;
    }
    }
    }
    }
    .news-short-menu {
        width: 750px;
        background-color: #404148;
        display: flex;
        justify-content: space-between;
        height: 90px;
        padding: 5px 0;
        position: fixed;
        bottom: 0;
        left: 0;
    .news-short-menu-item {
        flex: 1;
        line-height: 80px;
        font-size: 32px;
        border-right: 1px solid #999999;
    }
    .news-short-menu-item:nth-last-child(1) {
        border-right: none;
    }
    }
    .news-details-popup {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        position: fixed;
        top: 0;
        left: 0;
    .container {
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #25252B;
        width: 750px;
        height: 630px;
        padding-top: 110px;
    .title {
        font-size: 34px;
        line-height: 34px;
    }
    .less-num {
        font-size: 24px;
        line-height: 24px;
        margin-top: 40px;
        color: #999999;
    }
    .reward-num {
        width: 510px;
        margin: 50px auto;
    input {
        width: 510px;
        font-size: 34px;
        line-height: 34px;
        padding: 25px 20px 25px 20px;
        background-color: #333339;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        color: #ffffff;
    }
    }
    .operation-btn {
        width: 750px;
        height: 100px;
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
        left: 0;
    .btn {
        width: 375px;
        line-height: 100px;
        font-size: 32px;
    &.btn-cancel {
         background-color: #404148;
     }
    &.btn-confirm {
         background-color: #F8C513;
         color: #25252B;
     }
    }
    }
    }
    .evaluation {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 750px;
        background-color: #25252B;
        padding: 30px 30px 80px 30px;
    textarea {
        width: 690px;
        height: 160px;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        background-color: #333339;
        font-size: 30px;
        line-height: 40px;
        padding: 20px 20px 20px;
        color: #ffffff;
    }
    .btn-confirm {
        font-size: 32px;
        line-height: 32px;
        padding: 14px 50px;
        background-color: #F8C513;
        color: #25252B;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        margin-top: 30px;
    }
    }
    }
    }
</style>
