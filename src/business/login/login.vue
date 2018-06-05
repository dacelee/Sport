<template>
    <div class="login-container">
        <div class="login-form">
            <div class="login-form-item user-phone">
                <l-icon name="shoujihao"/>
                <input type="text" placeholder="手机号" v-model="userInfo.phone">
            </div>
            <div class="login-form-item user-password">
                <l-icon name="mima"/>
                <input type="password" placeholder="密码" v-model="userInfo.password">
            </div>
            <div class="forget-password text-right text-white" @click="$router.push('/register/forgetPassword')">忘记密码
            </div>
            <div class="btn-login text-center">登&emsp;录</div>
            <div class="btn-register text-center" @click="$router.push('/register')">注&emsp;册</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                userInfo: {
                    phone: null,
                    password: null
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
