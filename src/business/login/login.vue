<template>
    <div class="login-container">
        <div class="login-form">
            <div class="login-form-item user-phone">
                <l-icon name="shoujihao"/>
                <input type="text" placeholder="手机号" v-verify="userInfo.phone"  v-model="userInfo.phone">
            </div>
            <div class="login-form-item user-password">
                <l-icon name="mima"/>
                <input type="password" placeholder="密码" v-verify="userInfo.password" v-model="userInfo.password">
            </div>
            <div class="forget-password text-right text-white" @click="$router.push('/register/forgetPassword')">忘记密码
            </div>
            <div class="btn-login text-center" @click="login">登&emsp;录</div>
            <div class="btn-register text-center" @click="$router.push('/register')">注&emsp;册</div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import verify from "vue-verify-plugin";


    Vue.use(verify);
    var _this;
    export default {
        name: 'login',
        data() {
            return {
                userInfo: {
                    phone: "",
                    password: ""
                }
            }
        }, verify: {
            userInfo: {
                phone: [{minLength:1,  message: "手机号码必须填写"},"mobile"],
                password:[ {minLength:6, message: "密码不得小于6位"}]
            }
        }, mounted() {
            _this = this;
            if(this.session.isLogin()){
                _this.$router.replace('/');
            }
        }, methods: {
            login(){
                if(!this.$verify.check()){
                    var errMsg = this.appUtil.toastRemind(this.$verify.verifyQueue,this.$verify.$errors);
                    this.$toast(errMsg);
                }else{
                    //登录
                    this.axios.post(this.session.login,
                            {
                                'mobile': this.userInfo.phone,
                                'loginpwd': this.userInfo.password
                            },
                            function (data) {
                                console.log(data);
                                _this.$toast(data.msg);
                                var user = data.data;
                                _this.session.loginSuccess(user);
                                this.$router.replace('/')
                            }, function (data) {
                                console.log(data);
                                _this.$toast(data.msg);
                                _this.session.loginSuccess(true);
                                _this.$router.replace('/')
                            });
                    return;
                }
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
                    color: #999999;
                }
                input:-moz-placeholder {
                    color: #999999;
                }
                input::-moz-placeholder {
                    color: #999999;
                }
                input:-ms-input-placeholder {
                    color: #999999;
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
