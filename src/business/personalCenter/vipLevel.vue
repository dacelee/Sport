<template>
    <div class="vip-level-list">
        <div class="current-level text-center">
            <div class="level">当前会员等级：{{ level }}</div>
            <div class="contribution">当前贡献：{{ contribution }}</div>
            <div class="lessNum">距离下次升级还差{{ lessNum }}贡献</div>
        </div>
        <div class="level-list-item" v-for="item in list">
            <div class="label">
                <div class="icons">
                    <l-icon name="huiyuanbiaozhi"/>
                </div>
                <div class="level-label">
                    {{ '会员等级'+ item.level }}
                </div>
            </div>
            <div class="privilege">
                <div class="require">{{ item.require }}</div>
                <div class="label">交易手续费{{ item.label }}%</div>
            </div>
        </div>
    </div>
</template>

<script>
    import users from '../../api/users.js'
    export default {
        name: 'vip-level',
        data() {
            return {
                level: 2,
                contribution: 2400,
                lessNum: 600,
                list: [
//                    {
//                        level: 1,
//                        require: 1000,
//                        label: '5%'
//                    },
//                    {
//                        level: 2,
//                        require: 2000,
//                        label: '交易手续费5%'
//                    },
//                    {
//                        level: 3,
//                        require: 3000,
//                        label: '交易手续费5%'
//                    },
//                    {
//                        level: 4,
//                        require: 4000,
//                        label: '交易手续费5%'
//                    },
//                    {
//                        level: 5,
//                        require: 5000,
//                        label: '交易手续费5%'
//                    }
                ]
            }
        },activated () {
            this.loadMyInfo();
        },methods: {
            loadMyInfo(){
                var _this=  this;
                users.getCacheMyInfo(this,function(data){
                    _this.level= data.memberlevel;
                    _this.contribution =  data.contributionvalue;
                    users.loadMemberLevel(_this,_this.contribution);
                });
            }
        }
    }
</script>

<style lang="scss">
    .vip-level-list {
        width: 690px;
        margin: 0 auto;
        .current-level {
            margin-top: 20px;
            background-color: #333339;
            padding: 60px 30px 60px;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            .level {
                color: #F8C513;
                font-size: 30px;
                line-height: 30px;
                margin-bottom: 30px;
            }
            .contribution {
                color: #999999;
                font-size: 24px;
                line-height: 24px;
                margin-bottom: 10px;
            }
            .lessNum {
                color: #999999;
                font-size: 24px;
                line-height: 24px;
            }
        }
        .level-list-item {
            background-color: #333339;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            padding: 30px 30px 30px 30px;
            margin-top: 20px;
            .label {
                display: flex;
                justify-content: flex-start;
                .icons {
                    width: 30px;
                    height: 30px;
                    margin-right: 20px;
                }
                .level-label {
                    font-size: 30px;
                    line-height: 30px;
                }
            }
            .privilege {
                padding: 20px 0 0 50px;
                display: flex;
                justify-content: space-between;
                color: #999999;
                font-size: 24px;
                line-height: 24px;
            }
        }
    }
</style>
