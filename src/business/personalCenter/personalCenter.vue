<template>
    <div class="personalCenter">
        <div class="head-title text-center">
            我的
            <l-icon name="shezhi" class="setting"/>
        </div>
        <div class="personalCenter-head-info">
            <div class="left-head-photo pull-left">
                <img :src="headPhoto" alt="">
            </div>
            <div class="right-user-info pull-left">
                <div class="user-name">{{ userName }}</div>
                <div class="user-id">ID:{{ idNum }}</div>
                <div class="user-description">{{ description }}</div>
            </div>
        </div>
        <div class="user-basic-info">
            <ul class="user-basic-info-value">
                <li class="pull-left text-center user-basic-info-item" v-for="item in basicInfoValue">
                    <div class="value">{{ item }}</div>
                </li>
            </ul>
            <ul class="user-basic-info-label">
                <li class="pull-left text-center user-basic-info-item" v-for="item in basicInfoLabel">
                    <div class="value">{{ item }}</div>
                </li>
            </ul>
        </div>
        <div class="user-menu-list">
            <ul>
                <li class="user-menu-list-item candy">
                    <l-icon name="zongtangguo" class="left-icons"/>
                    <div class="left-label">总糖果</div>
                    <div class="right-value">{{ candyNum }}</div>
                </li>
                <li class="user-menu-list-item personal" :class="{'mt10':index === 0}"
                    v-for="(item,index) in personalMenuList">
                    <l-icon :name="item.icons" class="left-icons"/>
                    <div class="left-label">{{ item.name }}</div>
                    <l-icon name="fanhui" class="link-icons" @click.native="toDetailsPage(item.id)"/>
                </li>
                <li class="user-menu-list-item trading" :class="{'mt10':index === 0}"
                    v-for="(item,index) in tradingMenuList">
                    <l-icon :name="item.icons" class="left-icons"/>
                    <div class="left-label">{{ item.name }}</div>
                    <l-icon name="fanhui" class="link-icons" @click.native="toDetailsPage(item.id)"/>
                </li>
                <li class="user-menu-list-item team" :class="{'mt10':index === 0}" v-for="(item,index) in teamMenuList">
                    <l-icon :name="item.icons" class="left-icons"/>
                    <div class="left-label">{{ item.name }}</div>
                    <l-icon name="fanhui" class="link-icons" @click.native="toDetailsPage(item.id)"/>
                </li>
            </ul>
        </div>
        <l-footerMenu :currentRoute.sync="route"/>
    </div>
</template>

<script>
    export default {
        name: 'personal-center',
        data() {
            return {
                route: 'personalCenter',
                headPhoto: '/static/img/personal/default.jpg',
                userName: 'Louis',
                idNum: 45462331218,
                description: '菩提本无树，明镜亦非台，心中无一物，何处惹尘埃.菩提本无树，明镜亦非台，心中无一物，何处惹尘埃.菩提本无树，明镜亦非台，心中无一物，何处惹尘埃.',
                basicInfoLabel: [ '会员等级', '活跃度', '贡献值' ],
                basicInfoValue: [ 1, 34, 2600 ],
                candyNum: 123213.00312312,
                personalMenuList: [
                    {
                        id: 'basicInfo',
                        name: '基本资料',
                        icons: 'jibenziliao'
                    },
                    {
                        id: 'verified',
                        name: '实名认证',
                        icons: 'shimingrenzheng'
                    },
                    {
                        id: 'identity',
                        name: '身份信息',
                        icons: 'shenfenxinxi'
                    }
                ],
                tradingMenuList: [
                    {
                        id: 'transaction',
                        name: '我的交易',
                        icons: 'wodejiaoyi'
                    },
                    {
                        id: 'businessOrder',
                        name: '商圈订单',
                        icons: 'shangquandingdan'
                    },
                    {
                        id: 'addressManage',
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
                    }
                ]
            }
        },
        methods: {
            toDetailsPage(route) {
            
            }
        }
    }
</script>

<style lang="scss">
    .personalCenter {
        overflow: hidden;
        background-color: #25252B;
        
        .head-title {
            height: 80px;
            line-height: 80px;
            font-size: 34px;
            background: #404049;
            position: relative;
            .icons {
                position: absolute;
                width: 30px;
                height: 30px;
                z-index: 2;
                margin: 25px 0;
                &.setting {
                    right: 20px;
                }
            }
        }
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
            }
            .right-user-info {
                margin-left: 30px;
                width: calc(100% - 190px);
                height: 160px;
                color: #999999;
                font-size: 24px;
                overflow: hidden;
                .user-name {
                    font-size: 32px;
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
            .user-basic-info-item {
                width: 33.3333333%;
            }
            .user-basic-info-value {
                color: #ffd554;
                font-size: 32px;
                .user-basic-info-item {
                    margin: 20px auto 10px;
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
                &.mt10 {
                    margin-top: 20px;
                }
            }
        }
    }
</style>
