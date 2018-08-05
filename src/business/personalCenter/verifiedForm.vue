<template>
    <div class="verified-form">
        <div class="content">
            <div class="tip"> 温馨提示：请填写真实信息</div>
            <div class="verified-form-item">
                <div class="label">姓名</div>
                <div class="value"><input placeholder="请填写" v-verify="formData.truename" v-model="formData.truename" :readonly="formData.isrealauth!=0"></div>
            </div>
            <div class="verified-form-item">
                <div class="label">身份证</div>
                <div class="value"><input placeholder="请填写"  v-verify="formData.idcard" v-model="formData.idcard" :readonly="formData.isrealauth!=0"></div>
            </div>
            <!--<div class="verified-form-item">-->
                <!--<div class="label">手机号</div>-->
                <!--<div class="value"><input placeholder="请填写"  v-verify="formData.truename" v-model="formData.truename"></div>-->
            <!--</div>-->
            <div class="verified-form-item split">
                <div class="label">银行名称</div>
                <div class="value"><input placeholder="请填写"  v-verify="formData.bankname" v-model="formData.bankname" readonly @click="getBank"></div>
            </div>
            <div class="verified-form-item">
                <div class="label">银行卡</div>
                <div class="value"><input placeholder="请填写"  v-verify="formData.bankaccount" v-model="formData.bankaccount" :readonly="formData.isrealauth!=0"></div>
            </div>
            <div class="verified-form-item split">
                <div class="label">支付宝</div>
                <div class="value"><input placeholder="请填写"  v-verify="formData.alipay" v-model="formData.alipay" :readonly="formData.isrealauth!=0"></div>
            </div>
            <div class="verified-form-item split">
                <div class="label">请上传人脸照片</div>
                <div class="upload-box  text-center" v-if="formData.isrealauth==1&&formData.idcardimg!=''">
                    <img :src="formData.idcardimg"  >
                </div>
                <div class="upload-box  text-center"  v-if="formData.isrealauth==0">
                    <div class="upload-pic ">
                        <l-icon name="shangchuantupian"/>
                    </div>
                    <div class="select-upload-label text-center">人脸照片</div>
                    <l-imageUpload :limit="1" :onSuccess="uploadPhotosSuccess"
                                   :imageClipStart="imageClipStart"
                                   :imageClipEnd="imageClipEnd"  :width="360" :height="400"
                                   :sourceType="'camera'"
                    />
                </div>
            </div>
        </div>
        <div class="btn" @click="faceRecognition" v-if="formData.isrealauth==0">提交验证</div>
        <l-selectOption :list="selectBank.list" :selected="selectBank.current" @change="changeBank" v-if="selectBank.showSelect"/>
    </div>
</template>
<script>
    import users from '../../api/users.js'
    export default {
        name: 'verified-form',
        data() {
            return {
                imageClip:false,
                selectBank:{
                    list:[],
                    current:{},
                    showSelect:false
                },
                memberid:0,
                bankList:[],
                formData:{
                    truename:"",
                    idcard:"",
                    alipay:"",
                    bankname:"",
                    bankaccount:"",
                    idcardimg:"",
                    isrealauth:0
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
                    if(!this.appUtil.dentityCodeValid(this.formData.idcard)){
                        this.$Message.error("身份证号不合法");
                        return;
                    }
                    if(this.formData.idcardimg==""){
                        this.$Message.error("请上传本人面部照片");
                        return;
                    }
                    users.verifiedAction(this, this.formData);
//                    setTimeout(function(){
//                        _this.$router.push({name:'faceRecognition',query:_this.formData});
//                    },500);

                }
            },
            uploadPhotosSuccess(res,item) {
                this.formData.idcardimg = res;
            },
            imageClipStart(){
                this.imageClip = true;
            },
            imageClipEnd(){
                this.imageClip = false;
            },
            init(){
                this.uploadImgs =[];
                this.memberid = 0;
                this.formData={
                    truename:"",
                    idcard:"",
                    alipay:"",
                    bankname:"",
                    bankaccount:"",
                    idcardimg:"",
                    isrealauth:1
                }
            },
            changeBank(data){
                this.selectBank.showSelect=false;
                this.formData.bankname = data.name;
            },
            getBank(){
                if(this.formData.isrealauth==0){
                    this.selectBank.showSelect=true;
                }
            }

        },
        activated(){
            var _this = this;
            if(!this.imageClip){
                this.init();
                this.session.getMemberID(function(memberid) {
    //                if(_this.memberid!=memberid){
                        _this.memberid = memberid;
                        users.verifiedInfoAction(_this,memberid);
    //                }
                });
            }
        },
        deactivated(){
            this.selectBank.showSelect=false;
        },
        mounted() {
            var headerHeight = $("header").outerHeight(true);
            var height = $(window).height()-headerHeight-$(".verified-form .btn").outerHeight(true);

            $(".verified-form .content").height(height);
        }
    }

</script>

<style lang="scss">
    .verified-form {
        width: 100%;
    .tip{padding: 10px 40px;color: #F1AB04;}
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
            width: 100%;
            font-size: 34px;
            line-height: 34px;
        }
        .upload-box{
            margin-top: 30px;
            display: inline-block;
            width: 180px;
            height: 200px;
            text-align: center;
            border: 1px solid transparent;
            border-radius: 10px;
            overflow: hidden;
            background-color: #25252B;
            position: relative;
            margin-right: 15px;
            margin-bottom: 10px;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        }
        .upload-box .icons {
            width: 60px;
            color: #999999;

        }
        .upload-box .upload-pic{padding-top: 60px;padding-bottom: 5px;}

        .upload-box img {
            width: 100%;
            height: 100%;
        }
    }
</style>
