<template>
    <div class="verified-form">
        <div class="verified-form-item">
            <div class="label">姓名</div>
            <div class="value"><input placeholder="请填写" v-verify="formData.truename" v-model="formData.truename"></div>
        </div>
        <div class="verified-form-item">
            <div class="label">身份证</div>
            <div class="value"><input placeholder="请填写"  v-verify="formData.idcard" v-model="formData.idcard"></div>
        </div>
        <!--<div class="verified-form-item">-->
            <!--<div class="label">手机号</div>-->
            <!--<div class="value"><input placeholder="请填写"  v-verify="formData.truename" v-model="formData.truename"></div>-->
        <!--</div>-->
        <div class="verified-form-item split">
            <div class="label">银行名称</div>
            <div class="value"><input placeholder="请填写"  v-verify="formData.bankname" v-model="formData.bankname"></div>
        </div>
        <div class="verified-form-item">
            <div class="label">银行卡</div>
            <div class="value"><input placeholder="请填写"  v-verify="formData.bankaccount" v-model="formData.bankaccount"></div>
        </div>
        <div class="verified-form-item split">
            <div class="label">支付宝</div>
            <div class="value"><input placeholder="请填写"  v-verify="formData.alipay" v-model="formData.alipay"></div>
        </div>

        <div class="btn" @click="faceRecognition">下一步</div>
    </div>
</template>

<script>
    export default {
        name: 'verified-form',
        data() {
            return {
                formData:{
                    truename:"",
                    idcard:"",
                    alipay:"",
                    bankname:"",
                    bankaccount:""
                },
            }
        },
        verify: {
            formData:{
                    truename: [{minLength: 1, message: "姓名必须填写"}],
                    idcard: [{minLength: 1, message: "身份证必须填写"}],
                    bankname: [{minLength: 1, message: "银行名称必须填写"}],
                    bankaccount: [{minLength: 1, message: "银行卡必须填写"}],
                    alipay: [{minLength: 1, message: "支付宝必须填写"} ]
                }
        },
        methods: {
            faceRecognition() {
                if (!this.$verify.check()) {
                    var errMsg = this.appUtil.toastRemind(this.$verify.verifyQueue, this.$verify.$errors);
                    this.$Message.error(errMsg);
                } else {
//                    if(!this.appUtil.dentityCodeValid(this.formData.idcard)){
//                        this.$Message.error("身份证号格式错误");
//                        return;
//                    }
                    this.$router.push({name:'faceRecognition',query:this.formData});
                }
            }
        }
    }

</script>

<style lang="scss">
    .verified-form {
        width: 100%;
        .verified-form-item {
            width: 100%;
            background-color: #333339;
            font-size: 30px;
            line-height: 30px;
            color: #999999;
            padding: 30px 30px 30px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #25252B;
            .icons {
                transform: rotate(180deg);
            }
            &.split {
                margin-top: 20px;
            }
             input{background: transparent;border: none;text-align: right;color: #FFF;}
        }
        .btn {
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
