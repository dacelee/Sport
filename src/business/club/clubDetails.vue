<template>
    <div class="clubDetails">
        <div class="clubDetails-head-info">
            <div class="left-head-photo pull-left">
                <img :src="headPhoto" alt="">
            </div>
            <div class="right-user-info pull-left">
                <div class="user-name">{{ clubName }}</div>
                <div class="user-id">创建人:{{ idNum }}</div>
                <div class="user-description">创建时间：{{ createTime }}</div>
            </div>
        </div>
        <div class="user-basic-info">
            <ul class="user-basic-info-value">
                <li class="pull-left text-center user-basic-info-item" v-for="item in InfoValue1">
                    <div class="value">{{ item }}</div>
                </li>
            </ul>
            <ul class="user-basic-info-label">
                <li class="pull-left text-center user-basic-info-item" v-for="item in InfoValue2">
                    <div class="value">{{ item }}</div>
                </li>
            </ul>
        </div>
        <div class="user-menu-list">
            <ul>
                <li class="user-menu-list-item personal mt10"
                     @click="goToPage('clubTeams')">
                    <div class="left-label" >
                        成员列表</div>
                    <l-icon name="fanhui" class="link-icons" />
                </li>
                <li class="user-menu-list-item personal"
                   @click="goToPage('nearbyUser')" v-if="mycreate">
                    <div class="left-label" >附近的人</div>
                    <l-icon name="fanhui" class="link-icons" />
                </li>
                <li class="user-menu-list-item personal"
                    @click="goToPage('activityList')">
                    <div class="left-label" >活动</div>
                    <l-icon name="fanhui" class="link-icons" />
                </li>
            </ul>
        </div>
        <div class="clubMsg">
            <div class="clubDetailMsg">
                <h3 class='title'>群介绍</h3>
                <!--<img src="/static/img/news/2.jpg" />-->
                <div class="word" v-html="intor"></div>
            </div>
            <div class="save-btn text-center" v-if="jioned&&!mycreate" @click="quitClub">
                退出俱乐部
            </div>
            <div class="save-btn text-center" v-if="!mycreate&&!jioned&&!jionedother" @click="joinClub">申请加入</div>
            <!--<div class='text-center word1'>俱乐部创建人没认证，底部按钮显示申请认证</div>-->
            <div class="save-btn" v-if="mycreate">
                <div class="del text-center" v-if="jioned" @click="delClub">
                    删除
                </div>
                <div class="update text-center" v-if="jioned" @click="updateClub">
                    修改
                </div>
                <div class=" text-center" v-if="isunderline!=1" @click="clubCertification">申请实体认证</div>
            </div>
            <!--<div class='text-center word2'>已加入，已认证，底部无按钮 并且无发布活</div>-->
        </div>
    </div>
</template>
<script>
    import club from '../../api/club.js'
    export default {
        name: 'clubDetails',
        data() {
            return {router: 'clubDetails',
                headPhoto: '',
                clubName: '',
                idNum: '',
                createTime: '0',
                InfoValue1: [ '', 0, 0 ],
                InfoValue2: [ '地区', '人数', '总活跃度' ],
                intor:"",
                jioned:false,
                jionedother:false,
                isunderline:0,
                mycreate:false};
        },
        methods: {
            goToPage(router) {
                var clubid = this.$route.query.id;
                if(router=="nearbyUser"){
                    this.$router.push({name:"nearbyUser",query:{id:clubid,type:2}})
                }else{
                    this.$router.push({name:router,query:{id:clubid}})
                }
            },
            editEvent() {
                var clubid = this.$route.query.id;
                this.$router.push({name:'publishActivity',query:{id:clubid}});
            },
            loadData(){
                var clubid = this.$route.query.id;
                club.showDetail(this,clubid);
                club.checkClubMemberAction(this,clubid);

            },
            updateClub(){
                var clubid = this.$route.query.id;
                this.$router.push({name:'createClub',query:{id:clubid}});
            },
            clubCertification(){
                var clubid = this.$route.query.id;
                this.$router.push({name:'clubCertification', query: {id: clubid}});
            },
            joinClub(){
                var clubid = this.$route.query.id;
                club.joinClubAction(this,clubid);
            },quitClub(){
                var clubid = this.$route.query.id;
                club.quitClubAction(this,clubid);
            },delClub(){
                var clubid = this.$route.query.id;
                club.delClubAction(this,clubid);
            },
            initDate(){
                this.headPhoto = ''
                this.clubName = '加载中...'
                this.idNum = ''
                this.createTime = '0'
                this.InfoValue1 = ['', 0, 0]
                this.intor = ""
                this.jioned = false
                this.jionedother = false
                this.isunderline = 0
                this.mycreate = false
            }
        },
        deactivated(){
            this.initDate()
        },
        activated() {
            this.loadData();

        }
    }
</script>

<style lang="scss">
    .clubDetails {
        overflow: hidden;
        background-color: #25252B;
    .clubDetails-head-info {
        background-color: #404049;
        overflow: hidden;
        padding: 30px 50px 0px 30px;
    .left-head-photo {
        width: 120px;
        height: 120px;
    img {
        width: 120px;
        height: 120px;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
    }
    }
    .right-user-info {
        margin-left: 30px;
        width: calc(100% - 190px);
        height: 160px;
        color: #999999;
        font-size: 24px;
        overflow: hidden;
    .user-name {
        font-size: 30px;
        color: #ffffff;
        margin-bottom: 15px;
    }
    .user-id {
        margin-bottom: 3px;
        height: 40px;
        width: 100%;
        overflow: hidden;
    }
    .user-description {
        overflow: hidden;


    }
    }
    }
    .user-basic-info {
        font-size: 24px;
        color: #999999;
        background-color: #404049;
        overflow: hidden;
        padding:20px 0;
        margin-top:5px;
    .user-basic-info-item {
        width: 33.3333333%;
    }
    .user-basic-info-value {
        color: #fff;
        overflow: hidden;
        font-size: 32px;
    .user-basic-info-item {
        margin: 0 auto 0;
    }
    }
    }
    .user-menu-list {
    .user-menu-list-item {
        position: relative;
        height: 88px;
        line-height: 88px;
        background-color: #333339;
        color: #999999;
        font-size: 30px;
        border-bottom: 2px solid #25252B;
    &.candy .right-value {
         position: absolute;
         right: 30px;
         color: #ffd554;
     }
    .icons {
        width: 30px;
        height: 30px;
        position: absolute;
        margin: 29px 0;
    &.left-icons {
         left: 30px;
     }
    &.link-icons {
         right: 30px;
         transform: rotate(180deg);
     }
    }
    .left-label {
        margin-left: 30px;
        position: absolute;
    }
    &.mt10 {
         margin-top: 20px;
     }
    }
    }
    .clubMsg{
        background-color: #333339;
        margin-top:20px;
        padding-bottom:100px;
    .clubDetailMsg{
        padding:30px;
        color:#999;
        font-size:30px;
        line-height:40px;
    .ttile{font-size:30px;}
    .word{font-size:30px;}
    img{width:100%;max-width:100%;margin-bottom:15px;}
    }
    .save-btn{
        width:100%;
        height:90px;
        line-height: 90px;
        color:#FF25252B;
        background-color: #F8C513;
        color: #000;
        font-size: 34px;
        display: flex;
        justify-content:center;
        align-items:Center;
        position: fixed;
        bottom: 0px;
        .del{background-color: #EF533B;color: #FFF;}
        .update{background-color: #333339;color: #FFF;}
        div{flex: 1;height: 100%;}
    }
    .word1{margin:50px 0;font-size:30px;}
    .word2{margin:50px auto; width:60%;font-size:34px;}
    }
    }
</style>
