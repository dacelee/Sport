<template>
    <div class="personalCenter">
        <div class="personalCenter-head-info">
            <div class="left-head-photo pull-left">
                <img :src="headPhoto" alt="" v-if="headPhoto">
            </div>
            <div class="right-user-info pull-left">
                <div class="user-name">{{ userName }}  </div>
                <div class="user-id">ID:{{ idNum }}<div style="float: right">版本:{{version}}</div></div>
                <div class="user-description">{{ description }}</div>

            </div>
        </div>
        <div class="user-basic-info">
            <div class="basic-info-list text-center" v-for="item in basicList" @click="toDetailsPage(item.route)">
                <div class="value">{{ item.value }}</div>
                <div class="label">{{ item.label }}</div>
            </div>
        </div>
        <div class="user-menu-list">
            <ul>
                <li class="user-menu-list-item candy" @click="toDetailsPage('candyRecords')">
                    <l-icon name="zongtangguo" class="left-icons"/>
                    <div class="left-label">总糖果</div>
                    <div class="right-value">{{ candyNum }}</div>
                </li>
                <li class="user-menu-list-item personal" :class="{'mt10':index === 0}"
                    v-for="(item,index) in personalMenuList" @click="toDetailsPage(item.id)">
                    <l-icon :name="item.icons" class="left-icons"/>
                    <div class="left-label">{{ item.name }}</div>
                    <div class="right-label">{{ item.note }}</div>
                    <l-icon name="fanhui" class="link-icons"/>
                </li>
                <li class="user-menu-list-item trading" :class="{'mt10':index === 0}"
                    v-for="(item,index) in tradingMenuList" @click="toDetailsPage(item.id)">
                    <l-icon :name="item.icons" class="left-icons"/>
                    <div class="left-label">{{ item.name }}</div>
                    <l-icon name="fanhui" class="link-icons"/>
                </li>
                <li class="user-menu-list-item team" @click="toDetailsPage(item.id)" :class="{'mt10':index === 0}"
                    v-for="(item,index) in teamMenuList">
                    <l-icon :name="item.icons" class="left-icons"/>
                    <div class="left-label">{{ item.name }}</div>
                    <l-icon name="fanhui" class="link-icons"/>
                </li>
                <li class="user-menu-list-item team" @click="toDetailsPage(item.id)" :class="{'mt10':index === 0}"
                    v-for="(item,index) in helpList">
                    <l-icon :name="item.icons" class="left-icons"/>
                    <div class="left-label">{{ item.name }}</div>
                    <l-icon name="fanhui" class="link-icons"/>
                </li>
            </ul>
        </div>
        <l-footerMenu :currentRoute.sync="route"/>
    </div>
</template>

<script>
    import users from '../../api/users.js'
    
    export default {
        name: 'personal-center',
        data() {
            return {
                version:'',
                route: 'personalCenter',
                headPhoto: '', // 有头像用这个，把用户的头像路径存储到此字段即可
                userName: '',
                idNum: 0,
                description: '',
                basicList: [
                    {
                        value: 0,
                        label: '会员等级',
                        route: 'vipLevel'
                    },
                    {
                        value: 0,
                        label: '活跃度',
                        route: 'activityRecords'
                    },
                    {
                        value: 0,
                        label: '贡献值',
                        route: 'contributionRecords'
                    }
                ],
                candyNum: 0,
                personalMenuList: [
                    {
                        id: 'basicInformation',
                        name: '基本资料',
                        icons: 'jibenziliao',
                        note:'',
                    },
                    {
                        id: 'verifiedForm',
                        name: '实名认证',
                        icons: 'shimingrenzheng',
                        note:'',
                    },
                    {
                        id: 'identityInformation',
                        name: '身份信息',
                        icons: 'shenfenxinxi',
                        note:'',
                    }
                ],
                tradingMenuList: [
                    {
                        id: 'transaction',
                        name: '我的交易',
                        icons: 'wodejiaoyi'
                    },
                    {
                        id: 'orderCenter',
                        name: '商圈订单',
                        icons: 'shangquandingdan'
                    },
                    {
                        id: 'addressInfo',
                        name: '收货地址',
                        icons: 'shouhuodizhi'
                    }
                ],
                teamMenuList: [
                    {
                        id: 'teamManage',
                        name: '我的团队',
                        icons: 'wodetuandui'
                    },
                    {
                        id: 'teamRecruitment',
                        name: '团队招募',
                        icons: 'tuanduizhaomu'
                    },

                ],
                helpList: [
                    {
                        id: 'myArticle',
                        name: '我的文章',
                        icons: 'wodejiaoyi'
                    },
                    {
                        id: 'userGuide',
                        name: '新手入门',
                        icons: 'xinshourumen'
                    },
                    {
                        id: 'feedbackList',
                        name: '问题反馈',
                        icons: 'wentifankui'
                    }
                ]
            }
        }, activated() {
            this.version = api.appVersion;
            this.loadMyInfo()
        },
        methods: {
            toDetailsPage(route) {
                this.$router.push(route)
            },
            editEvent() {
                this.$router.push('/personalSetting')
            },
            loadMyInfo(){
                var _this=  this;
                users.getCacheMyInfo(this,function(data){
                    _this.headPhoto = data.logo;
                    _this.userName = data.nikename;
                    _this.idNum = data.inviter;
                    _this.description = data.personality;
                    _this.basicList[0].value= data.memberlevel;
                    _this.basicList[1].value= data.activity+"+"+data.activityadd;
                    var note = '未认证';
                    if(data.isrealauth==1){
                        note = '已认证';
                    }else if(data.isrealauth==2){
                        note = '冻结';
                    }else if(data.isrealauth==3){
                        note = '审核中';
                    }else if(data.isrealauth==4){
                        note = '已拒绝';
                    }
                    _this.personalMenuList[1].note = note;
                    _this.basicList[2].value= data.contributionvalue;
                    _this.candyNum =  data.cointotal.toFixed(4);
                },true);
            }
        }
    }
</script>

<style lang="scss">
    .personalCenter {
        padding-bottom: 120px;
        overflow: hidden;
        background-color: #25252B;
        .personalCenter-head-info {
            background-color: #404049;
            height: 220px;
            overflow: hidden;
            padding: 30px 50px 30px 30px;
            .left-head-photo {
                width: 160px;
                height: 160px;
                img {
                    width: 160px;
                    height: 160px;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    border-radius: 100%;
                }
                .icons {
                    width: 160px;
                    height: 160px;
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
                line-height: 24px;
                padding-top: 20px;
                overflow: hidden;
                .user-name {
                    font-size: 32px;
                    line-height: 32px;
                    color: #ffffff;
                    margin-bottom: 6px;
                }
                .user-id {
                    margin-bottom: 6px;
                }
                .user-description {
                    overflow: hidden;
                    height: 68px;
                    line-height: 34px;
                }
            }
        }
        .user-basic-info {
            font-size: 24px;
            color: #999999;
            background-color: #404049;
            overflow: hidden;
            height: 140px;
            display: flex;
            justify-content: space-around;
            .basic-info-list {
                padding: 32px 0 32px;
                .value {
                    color: #ffd554;
                    font-size: 32px;
                    margin-bottom: 20px;
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
                    margin-left: 80px;
                    position: absolute;
                }
                .right-label{position: absolute;right: 80px;color: #ffd554;}
                &.mt10 {
                    margin-top: 20px;
                }
            }
        }
    }
</style>
