<template>
    <div class="news-details">
        <div class="news-details-container">
            <div class="news-details-title">{{ newsDetails.title }}</div>
            <div class="news-details-info">
                <div class="news-author pull-left" v-if="newsDetails.author!=''">作者:{{ newsDetails.author }}</div>
                <div class="news-time ">发布时间:{{ newsDetails.dateTime }}</div>
            </div>
            <div class="news-details-content" v-html="newsDetails.content"></div>
        </div>
        <div class="news-short-menu" v-if="newsDetails.isupdate!=1&&(newsDetails.type==1||newsDetails.type==2)">
            <div class="news-short-menu-item text-center" @click="joinin">
                <l-icon name="fenxiang"/>
                同意加入
            </div>
        </div>
    </div>
</template>
<script>
    import team from '../../api/team.js'
    export default {
        name: 'news-details',
        data() {

            return {
                newsDetails: {}
            }
        },
        methods: {
            loadData(){
                var  _this = this;
                var param = this.$route.params;
                this.axios.post("/notice/detail", {"id":param.id}, function (json) {
                    var data = json.data;
                    var content = data.content;
                    if(data.type==1||data.type==2){
                        var where = data.type==1?data.teamname:data.clubname;
                        content = data.sendnikename+"邀请您加入"+where;
                    }
                    _this.newsDetails= {
                        title: data.title,
                        author: '',
                        dateTime: _this.appUtil.dateFormat(data.addtime,"yyyy/MM/dd hh:mm"),
                        content: content,
                        isupdate:data.isupdate,
                        cludid:data.clubid,
                        teamid:data.teamid,
                        type:data.type
                    }
                },function(json){

                });
            },
            joinin(){
                var param = this.$route.params;
                team.dotypeAction(this,param.id);
            }
        },
        activated(){
            this.loadData();
        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    .news-details {
        background-color: #f5f5f5;
        padding-bottom: 100px !important;
        overflow-y:scroll;
        height:100%;


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
        img{max-width: 100%}
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
        margin: 70px auto;
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
