<template>
    <div class="verified-form">
        <div class="content">
            <div class="tip"> 温馨提示：请填写真实信息</div>
            <div class="refusereason" v-if="formData.isrealauth==4">拒绝原因:{{formData.refusereason}}</div>
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
                <div class="value"><div class="bankname"  @click="getBank" v-html="formData.bankname"></div></div>
            </div>
            <div class="verified-form-item">
                <div class="label">银行卡</div>
                <div class="value"><input placeholder="请填写" v-model="formData.bankaccount" ></div>
            </div>
            <div class="verified-form-item split">
                <div class="label">支付宝</div>
                <div class="value"><input placeholder="请填写"  v-verify="formData.alipay" v-model="formData.alipay" :readonly="formData.isrealauth!=0"></div>
            </div>
            <div class="verified-form-item split" v-if="formData.isrealauth==0||formData.isrealauth==3||formData.isrealauth==4">
                <div class="label">请上传人脸照片</div>
                <div class="upload-box  text-center" >
                    <div class="upload-pic ">
                        <l-icon name="shangchuantupian"/>
                    </div>
                    <div class="select-upload-label text-center">人脸照片</div>
                    <l-imageUpload :limit="1" :onSuccess="uploadPhotosSuccess" :uploadImgs="uploadImgs" :width="360" :height="400"
                                   :sourceType="'camera'"
                    />
                </div>
            </div>
            <div class="msg split">{{msg}}</div>
            <div class="verified-form-item " v-if="msg!=''&&(formData.isrealauth==0||formData.isrealauth==3||formData.isrealauth==4)">
                <div class="label">请上传身份证照片</div>
                <div class="upload-box  text-center sfz" >
                    <div class="upload-pic ">
                        <l-icon name="shangchuantupian"/>
                    </div>
                    <div class="select-upload-label text-center">身份证照片</div>
                    <l-imageUpload :limit="1" :url="'/my/uploadimgsfz'" :onSuccess="uploadPhotosSuccess2" :uploadImgs="uploadImgs2" :width="257" :height="162"
                                   :sourceType="'camera'"
                    />
                </div>
            </div>
            <div class="status" v-if="formData.isrealauth==2">状态:冻结</div>
        </div>
        <div class="btn" @click="faceRecognition" v-if="(formData.isrealauth==0||formData.isrealauth==4)">提交验证</div>
        <div class="btn" @click="faceRecognition" v-if="formData.isrealauth==1||formData.isrealauth==3">修改</div>
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
                msg:'',
                memberid:0,
                bankList:[],
                uploadImgs:[],
                uploadImgs2:[],
                formData:{
                    truename:"",
                    idcard:"",
                    alipay:"",
                    bankname:"请选择",
                    bankaccount:"",
                    idcardimg:"",
                    isrealauth:0
                },
            }
        },
        verify: {
            formData:{
                    truename: [{minLength: 1, message: "姓名必须填写"}],
                    idcard: [{minLength: 15, message: "请填写正确身份证号码"}],
                    alipay: [{minLength: 1, message: "支付宝必须填写"} ]
                }
        },
        methods: {
            faceRecognition() {
                if(this.formData.isrealauth==1){
                    if(this.formData.bankname=="请选择"||this.formData.bankaccount==''){
                        this.$Message.error("请完善银行卡信息");
                        return;
                    }
                    users.verifiedAction(this, {bankname:this.formData.bankname,bankaccount:this.formData.bankaccount});
                    return;
                }
                if (!this.$verify.check()) {
                    var errMsg = this.appUtil.toastRemind(this.$verify.verifyQueue, this.$verify.$errors);
                    this.$Message.error(errMsg);
                } else {
                    if(this.formData.bankname=="请选择"){
                        this.formData.bankname=='';
                    }
//                    if(!this.appUtil.dentityCodeValid(this.formData.idcard)){
//                        this.$Message.error("身份证号不合法");
//                        return;
//                    }
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
            uploadPhotosSuccess2(res){
                //完成身份证验证
                this.$Message.info("上传成功，请等待审核");
//                this.$router.replace("/personalCenter");
            },
            init(){
                this.uploadImgs =[];
                this.uploadImgs2 =[];
                this.memberid = 0;
                this.msg = '';
                this.formData={
                    truename:"",
                    idcard:"",
                    alipay:"",
                    bankname:"请选择",
                    bankaccount:"",
                    idcardimg:"",
                    isrealauth:0
                }
            },
            changeBank(data){
                this.selectBank.showSelect=false;
                this.formData.bankname = data.name;
            },
            getBank(){
                this.selectBank.showSelect = true;
            }
        },
        activated(){
            var _this = this;
            this.init();
            this.session.getMemberID(function(memberid) {
//                if(_this.memberid!=memberid){
                    _this.memberid = memberid;
                    users.verifiedInfoAction(_this,memberid);
//                }
            });
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
    .content{overflow-y:scroll;}
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
            input,.bankname{background: transparent;border: none;text-align: right;color: #FFF;}
            input:read-only{
                color: #999999;
            }

        }
        .msg{padding: 5px;color:#F1AB04;padding: 10px 40px;}
        .status{padding: 20px;text-align: right;color: #999;font-size: 30px}
        .refusereason{padding: 20px;color: red;font-size: 30px;padding-left:40px;padding-bottom: 10px}
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
        .sfz{width: 300px}
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
