<template>
    <div class="register-container">
        <l-head>
            <l-icon name="fanhui" @click.native="$router.push('/login')" slot="left-item"/>
            注册
        </l-head>
        <div class="register-form">
            <div class="register-form-item">
                <input type="text" placeholder="手机号"   v-model="userInfo.mobile" v-verify.mobile="userInfo.mobile" v-verify="userInfo.mobile">
            </div>
            <div class="register-form-item">
                <input type="number" placeholder="验证码" class="validate-code-input" v-model="userInfo.smscode" v-verify="userInfo.smscode">
                <div class="btn-validate-code text-center pull-right" @click="getSmsCode">{{ codeSend }}</div>
            </div>
            <div class="register-form-item">
                <input type="password" placeholder="密码"  v-verify="userInfo.loginpwd" v-model="userInfo.loginpwd">
            </div>
            <div class="register-form-item">
                <input type="text" placeholder="推荐人" v-model="userInfo.inviter" >
            </div>
            <div class="agree" @click="agree">  <l-icon name="gouxuan"/>  用户协议</div>
            <div class="register-form-item register-btn">
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
        name: 'register',
        data() {
            return {
                codeSend:"获取验证码",
                userInfo: {
                    mobile: "",
                    loginpwd: "",
                    inviter: "",
                    smscode: ""
                },
                timer:0,
            }
        } ,verify: {
            userInfo: {
                mobile: [{minLength:11,  message: "手机号码格式错误"}],
                loginpwd:[ {minLength:6, message: "密码不得小于6位"}],
                smscode:[{minLength:1,  message: "验证码必须填写"}]
            }
        }, mounted() {
            _this = this;
//            window.apiready = function() {
            if(_this.session.isAPPRuntime()){
                var header = $api.dom('.header-menu');
                var  headerHeight = $api.fixStatusBar(header);
            }
//            }
        },
        methods: {
            submitForm() {
                if(!this.$verify.check()){
                    var errMsg = this.appUtil.toastRemind(this.$verify.verifyQueue,this.$verify.$errors);
                    _this.$Message.error(errMsg);
                }else{
//                    clearInterval(_this.timer);
//                    console.log( this.userInfo.mobile);
                    this.$router.push({name:'selectGender',params:this.userInfo}); //选择性别
                }
            },
            getCode(){
                const TIME_COUNT = 60;
                var count = TIME_COUNT;
                this.timer = setInterval(function(){
                    if (count > 0 && count <= TIME_COUNT) {
                        count--;
                        _this.codeSend = count+"s";
                        console.log(_this.codeSend);
                    } else {
                        clearInterval(_this.timer);
                        _this.codeSend = "获取验证码";
                    }
                }, 1000);
            },
            getSmsCode(){
                if(_this.codeSend != "获取验证码"){
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
            },
            agree(){
                this.$router.push('agree')
            }
        }
    }
</script>

<style lang="scss">
    .register-container {
        background: url("../../../static/img/index/bg.png") no-repeat;
        width: 750px;
        height: 100%;
        padding-bottom: 0 !important;
        position: absolute;
        top: 0;
        left: 0;
        background-size: cover;
    .agree{float: left;}
    .head-title {
        background-color: transparent;
    }
    .register-form {
        width: 580px;
        margin: 80px auto 0;
    .register-form-item {
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
