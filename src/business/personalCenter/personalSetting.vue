<template>
    <div class="personal-setting">
        <div class="personal-setting-item" v-for="item in list" :class="{'split':item.padding}"
             @click="changePage(item.id)">
            {{ item.name }}
            <l-icon name="fanhui"/>
        </div>
        <div class="logout" @click="quitApp">退出登录</div>
    </div>
</template>

<script>
    import pedometer from '../../api/pedometer.js'
    let _this
    export default {
        name: 'personal-setting',
        data() {
            return {
                list: [
                    {
                        id: 'tradingPassword',
                        name: '交易密码'
                    },
                    {
                        id: 'loginPassword',
                        name: '登录密码',
                        padding: true
                    },
                    {
                        id: 'userGuide',
                        name: '钱包地址',
                        padding: true
                    },
                    {
                        id: 'userGuide',
                        name: '新手入门'
                    },
                    {
                        id: 'feedbackList',
                        name: '问题反馈'
                    }
                ]
            }
        },
        methods: {
            changePage(route) {
                _this.$router.push(route)
            },
            quitApp(){
                var _this = this;
                App.confirm({"title":'警告',"content":"确定要退出应用?"}).then(function(){
                    pedometer.stop();
                    _this.session.loginOut();
                    _this.$router.replace("/login");
                });

            }
        },
        mounted() {
            _this = this
        }
    }
</script>

<style lang="scss">
    .personal-setting {
        .personal-setting-item {
            background-color: #333339;
            position: relative;
            padding: 30px 30px 30px;
            color: #999999;
            font-size: 30px;
            line-height: 30px;
            margin-bottom: 2px;
            .icons {
                position: absolute;
                right: 30px;
                transform: rotate(180deg);
            }
            &.split {
                margin-bottom: 20px;
            }
        }
        .logout {
            background-color: #F8C513;
            color: #25252B;
            text-align: center;
            padding: 30px 0;
            position: absolute;
            bottom: 0;
            width: 100%;
            font-size: 34px;
            line-height: 34px;
        }
    }
</style>
