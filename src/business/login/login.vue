<template>
    <div class="login-container">
        <div class="login-form">
            <div class="login-form-item user-phone">
                <l-icon name="shoujihao"/>
                <input type="text" placeholder="手机号" v-verify="userInfo.phone" v-model="userInfo.phone">
            </div>
            <div class="login-form-item user-password">
                <l-icon name="mima"/>
                <input type="password" placeholder="密码" v-verify="userInfo.password" v-model="userInfo.password">
            </div>
            <div class="forget-password text-right text-white" @click="$router.push('/register/forgetPassword')">忘记密码
            </div>
            <div class="btn-login text-center" @click="login">登&emsp;录</div>
            <div class="btn-register text-center" @click="register">注&emsp;册</div>
        </div>
    </div>
</template>
<script>
    var _this
    export default {
        name: 'login',
        data() {
            return {
                userInfo: {
                    phone: '',
                    password: '',
                    ip:'',
                    deviceId:'',
                }
            }
        }, verify: {
            userInfo: {
                phone: [ {minLength: 1, message: '手机号码必须填写'}, 'mobile' ],
                password: [ {minLength: 6, message: '密码不得小于6位'} ]
            }
        }, mounted() {
            if (this.session.isLogin()) {
                _this.$router.replace('/')
            }
        },
        activated(){
            this.userInfo={ phone: '',password: ''};
        }
        , methods: {
            login() {
                var _this = this;
                var ipAddress = api.require('ipAddress');
                ipAddress.getIp(
                        {isNetIp: true},
                        function (ret, err) {
                            //                                alert(JSON.stringify(ret) + "   " + JSON.stringify(err));
                            if (ret.status) {
                                _this.ip = ret.ip;
                            }
                        });
                this.deviceId = api.deviceId;
                if (!this.$verify.check()) {
                    var errMsg = this.appUtil.toastRemind(this.$verify.verifyQueue, this.$verify.$errors)
                    this.$Message.error(errMsg)
                }
                else {
                //登录
                _this.axios.post(_this.session.login, {
                            'mobile': _this.userInfo.phone,
                            'loginpwd': _this.userInfo.password,
                            "bindmobile": _this.deviceId,
                            'ip': _this.ip
                        },
                        function (json) {
                            _this.$Message.info(json.msg)
                            var user = json.data
                            _this.session.loginSuccess(user,_this);
                            _this.$router.replace('/')
                        }, function (json) {
                            _this.$Message.error(json.msg)
                        });
                }
            },
            register(){
                this.$router.push('/register')
            }

        }
    }
</script>

<style lang="scss">
    .login-container {
        background: url("../../../static/img/index/bg.png") no-repeat;
        width: 750px;
        height: 100%;
        padding-bottom: 0 !important;
        position: absolute;
        top: 0;
        left: 0;
        background-size: cover;
        .login-form {
            width: 580px;
            margin: 365px auto 0;
            .login-form-item {
                position: relative;
                input {
                    width: 580px;
                    height: 85px;
                    background-color: rgba(255, 255, 255, 0.1);
                    -webkit-border-radius: 8px;
                    -moz-border-radius: 8px;
                    border-radius: 8px;
                    padding-left: 80px;
                    font-size: 28px;
                    line-height: 28px;
                    color: #ffffff;
                }
                input::-webkit-input-placeholder {
                    color: #bbb;
                }
                input:-moz-placeholder {
                    color: #bbb;
                }
                input::-moz-placeholder {
                    color: #bbb;
                }
                input:-ms-input-placeholder {
                    color: #bbb;
                }
                .icons {
                    width: 32px;
                    height: 40px;
                    position: absolute;
                    top: 25.5px;
                    left: 30px;
                }
                &.user-phone {
                    margin-bottom: 40px;
                }
                &.user-password {
                    margin-bottom: 20px;
                }
            }
            .forget-password {
                margin-bottom: 120px;
                font-size: 24px;
                line-height: 24px;
            }
            .btn-login {
                width: 580px;
                color: #25252B;
                font-size: 34px;
                line-height: 34px;
                padding: 32px 0;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
                background-color: #F8C513;
                margin: 0 auto 60px;
                box-shadow: 2px 2px 2px #ffd554;
            }
            .btn-register {
                font-size: 34px;
                line-height: 34px;
            }
        }
    }
</style>
