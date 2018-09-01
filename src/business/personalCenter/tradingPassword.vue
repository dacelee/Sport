<template>
    <div class="trading-password">
        <div class="trading-password-list">
            <div class="trading-password-item">
                <input type="password" placeholder="请输入原密码" v-model="password1" v-verify="password1" >
            </div>
            <div class="trading-password-item">
                <input type="password" placeholder="请输入新密码" v-model="password2" v-verify="password2">
            </div>
            <div class="trading-password-item">
                <input type="password" placeholder="请确认新密码" v-model="password3" v-verify="password3">
            </div>
            <div class="btn" @click="submit">提&emsp;交</div>
        </div>
    </div>
</template>

<script>
    import users from '../../api/users.js'
    export default {
        name: 'trading-password',
        data(){
            return {
                password1: "",
                password2: "",
                password3: ""
            }
        },
        verify: {
            password2: [{minLength: 1, message: "新密码必须填写"},{minLength: 6, message: "新密码不得小于6位"}],
            password3: [{minLength: 1, message: "确认新密码必须填写"}]
        },
        methods: {
            submit() {
                if (!this.$verify.check()) {
                    var errMsg = this.appUtil.toastRemind(this.$verify.verifyQueue, this.$verify.$errors);
                    this.$Message.error(errMsg);
                } else {
                    if (this.password2 != this.password3) {
                        this.$Message.error("两次密码输入不一致");
                        return;
                    }
                    var formData = {type: "tradepwd", "pwd": this.password2, "oldpwd":  this.password1};
                    users.setPwd(this, formData);
                }
            }
        }

    }
</script>

<style lang="scss">
    .trading-password {
        .trading-password-list {
            padding-top: 50px;
            .trading-password-item {
                width: 690px;
                margin: 0 auto 40px;
                input {
                    font-size: 28px;
                    line-height: 28px;
                    padding: 35px 30px;
                    -webkit-border-radius: 8px;
                    -moz-border-radius: 8px;
                    border-radius: 8px;
                    background-color: rgba(255, 255, 255, 0.9);
                    color: #000;
                    height: inherit;
                    margin-bottom: 0;
                    border: none;
                    width: 100%;
                }
                input::placeholder {
                    line-height: 38px;
                    font-size: 28px;
                }
                input:-moz-placeholder {
                    line-height: 38px;
                    font-size: 28px;
                }
                input:-ms-input-placeholder {
                    line-height: 38px;
                    font-size: 28px;
                }
                input::-webkit-input-placeholder {
                    line-height: 38px;
                    font-size: 28px;
                }
            }
            .btn {
                background-color: #F8C513;
                color: #25252B;
                font-size: 34px;
                line-height: 34px;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                padding: 32px 0;
                text-align: center;
            }
        }
    }
</style>
