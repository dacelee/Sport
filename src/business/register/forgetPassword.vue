<template>
    <div class="forget-password-container">
        <l-head>
            <l-icon name="fanhui" @click.native="$router.push('/login')" slot="left-item"/>
            忘记密码
        </l-head>
        <div class="forget-password-form">


            <div class="forget-password-form-item">
                <input type="text" placeholder="手机号"   v-model="userInfo.mobile" v-verify.mobile="userInfo.mobile" v-verify="userInfo.mobile">
            </div>
            <div class="forget-password-form-item">
                <input type="text" placeholder="验证码" class="validate-code-input" v-model="userInfo.smscode" v-verify="userInfo.smscode">
                <div class="btn-validate-code text-center pull-right" @click="getSmsCode">{{ codeSend }}</div>
            </div>
            <div class="forget-password-form-item">
                <input type="password" placeholder="新密码"  v-verify="userInfo.loginpwd" v-model="userInfo.loginpwd">
            </div>

            <div class="forget-password-form-item">
                <input type="password" placeholder="确认新密码"  v-verify="userInfo.loginpwd2" v-model="userInfo.loginpwd2">
            </div>
            <div class="forget-password-form-item register-btn">
                <div class="btn-register text-center" @click="submitForm">提&emsp;交</div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import verify from "vue-verify-plugin";
    Vue.use(verify);
    var _this;
    export default {
        name: 'forget-password',
        data() {
            return {
                codeSend:"获取验证码",
                userInfo: {
                    mobile: "",
                    loginpwd: "",
                    loginpwd2: "",
                    smscode: ""
                },
                timer:0,
                show:true,
            }
        } ,verify: {
            userInfo: {
                mobile: [{minLength:1,  message: "手机号码必须填写"},"mobile"],
                loginpwd:[ {minLength:6, message: "新密码不得小于6位"}],
                loginpwd2:[ {minLength:6, message: "确认密码不得小于6位"}],
                smscode:[{minLength:1,  message: "验证码必须填写"}]
            }
        }, mounted() {
            _this = this;
        },
        methods: {
            submitForm() {
                if(!this.$verify.check()){
                    var errMsg = this.appUtil.toastRemind(this.$verify.verifyQueue,this.$verify.$errors);
                    this.$toast(errMsg);
                }else{
                    clearInterval(_this.timer);
                    //
                    if(this.userInfo.loginpwd2!=this.userInfo.loginpwd){
                        _this.$Message.error("两次密码输入不一致");
                        return;
                    }
                    var param = JSON.parse(JSON.stringify(this.userInfo));
                    delete param.loginpwd2;
                    this.axios.post(_this.session.findpwd,
                            param,function(data){
                                _this.$Message.info("密码已经重置");
                                _this.$router.replace('/login')
                            },function(data){
                                _this.$Message.error(data.msg);
                            });
                }
            },getCode(){
                const TIME_COUNT = 60;
                var count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(function(){
                    if (count > 0 && count <= TIME_COUNT) {
                        count--;
                        _this.codeSend = count+"s";
                        console.log(_this.codeSend);
                    } else {
                        this.show = true;
                        clearInterval(_this.timer);
                        this.timer = null;
                        _this.codeSend = "获取验证码";
                    }
                }, 1000);
            },
            getSmsCode(){
                if(!this.show){
                    return;
                }
                if(!this.$verify.check("mobile")){
                    var errMsg = this.appUtil.toastRemind(this.$verify.verifyQueue,this.$verify.$errors);
                    _this.$Message.error(errMsg);
                }else{
                    this.getCode();
                    this.axios.post(this.session.sendsmscode, {'mobile':this.userInfo.mobile},function(data){
//                        console.log(data);
                        _this.$Message.info(data.msg);
                    },function(data){
//                        console.log(data);
                        _this.$Message.error(data.msg);
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
    .forget-password-container {
        background: url("../../../static/img/index/bg.png") no-repeat;
        width: 750px;
        height: 100%;
        padding-bottom: 0 !important;
        position: absolute;
        top: 0;
        left: 0;
        background-size: cover;
    .head-title {
        background-color: transparent;
    }
    .forget-password-form {
        width: 580px;
        margin: 80px auto 0;
    .forget-password-form-item {
        margin-bottom: 40px;
    input {
        font-size: 28px;
        line-height: 28px;
        padding: 35px 10px 35px 30px;
        width: 580px;
        background-color: rgba(255, 255, 255, 0.1);
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        color: #ffffff;
    &.validate-code-input {
         width: 360px;
     }
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
    .btn-validate-code {
        width: 188px;
        font-size: 28px;
        line-height: 28px;
        border: 2px solid #F8C513;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        color: #F8C513;
        padding: 35px 0;
    }
    &.register-btn {
         margin-top: 353px;
    .btn-register {
        width: 580px;
        font-size: 34px;
        line-height: 34px;
        background-color: #F8C513;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        color: #25252B;
        padding: 32px 0;
    }
    }
    }
    }
    }
</style>
