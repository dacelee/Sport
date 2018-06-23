<template>
    <div class="clubCertification">
        <div class="select-upload">
         <h4 class="title">营业执照</h4>
            <div class="upload-box text-center">
                <l-icon name="shimingrenzheng"/>
                <l-imageUpload   :limit="1"
                                 :width="345"
                                 :height="200"
                                 :action="'http://api.bozhiyue.com/my/uploadimg'" style="border-radius: 50%;"
                                 :onSuccess="uploadLicenseSuccess"
                                 :onRemove = "removeLicense"
                    />
                <div class="select-upload-label text-center">上传营业执照</div>
            </div>

        </div>
        <div class="club-item mt-20">
            <div class="left-label pull-left">姓名</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入" v-model="formData.authName" v-verify="formData.authName">
            </div>
        </div>
        <div class="club-item">
            <div class="left-label pull-left">身份证</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入" v-model="formData.authCard" v-verify="formData.authCard">
            </div>
        </div>
        <div class="club-item">
            <div class="left-label pull-left">电话</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入"  v-model="formData.authTel"  v-verify="formData.authTel">
            </div>
        </div>
         <div class="club-item">
            <div class="left-label pull-left">地址</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入"  v-model="formData.authAddress" v-verify="formData.authAddress">
            </div>
        </div>
        <div class="select-pic" >
            <h3 class="title">俱乐部介绍</h3>
            <!--<div class="upload-box  text-center">-->
                <!--<div class="upload-pic ">-->
                    <!--<l-icon name="shangchuantupian"/>-->
                <!--</div>-->
                <!--<div class="select-upload-label text-center">上传图片 0/1</div>-->
               <!---->
            <!--</div>-->
            <l-imageUpload   :limit="4"  :action="'http://api.bozhiyue.com/my/uploadimg'"  :onSuccess="uploadPhotosSuccess"  :onRemove = "removePhotos"/>
        </div>
        <div class="save-btn text-center" @click="clubCertificationSuccess">提交</div>
    </div>
</template>
<script>
    import club from '../../api/club.js'
    export default {
        name: 'clubCertification',
        data(){
            return {
                formData:{
                    authLicense:"",
                    authName:"",
                    authCard:"",
                    authTel:"",
                    authAddress:"",
                    photos:""
                }
            }
        },
        verify: {
            formData: {
                authName: [{minLength: 1, message: "姓名必须填写"}],
                authCard: [{minLength: 1, message: "身份证必须填写"}],
                authTel: [{minLength: 1, message: "电话必须填写"},"mobile"],
                authAddress: [{minLength: 1, message: "地址必须填写"}]
            }
        },
        methods: {
            reset() {
//                console.log(this.filterName)
            },
            clubCertificationSuccess() {
                if(this.formData.authLicense==""){
                    this.$Message.error("请上传营业执照");
                    return;
                }

                if(!this.$verify.check()){
                    var errMsg = this.appUtil.toastRemind(this.$verify.verifyQueue,this.$verify.$errors);
                    this.$Message.error(errMsg);
                }else {
                    this.formData.id = this.$route.query.id;
                    club.clubAuth(this, this.formData);
                }
            },
            uploadLicenseSuccess(res,item) {
                this.formData.authLicense = res;

            },
            removeLicense(res){
                this.formData.photos = res;
            },
            uploadPhotosSuccess(res,item){
                this.formData.photos = res;
            },
            removePhotos(res){
                this.formData.photos = res;
            }

        },
        mounted() {
        }
    }
</script>

<style lang="scss">
    .clubCertification {
        .select-upload {
        width:100%;
        background-color:#33333a;
        padding:10px 0  30px 0;
        margin-bottom:40px;
        .title{padding-left:30px;font-size:30px;color:#999}
        .upload-box{
            position: relative;
            background-color:#25252B;
            width:auto;
            height:400px;
            margin:0 30px;
            border-radius:10px;
            .icons {
            width: 100px;
            height: 100px;
            color: #999999;
            margin-top:130px;
             }
        }
        .select-upload-label {
            color: #999999;
            font-size:30px;
            line-height: 30px;
            margin-top:20px;
            }
     }
    .select-pic {
        margin-bottom: 0px;
        background-color: #33333a;
        padding: 30px 0 140px 30px;
        .title{
            margin-bottom: 10px;
        }
        }

        padding-bottom: 60px;
        .club-item {
            width: 750px;
            overflow: hidden;
            margin-bottom: 0px;
            background-color: #33333a;
            height: 90px;
            .left-label {
                width: 100px;
                font-size: 30px;
                line-height: 30px;
                margin:30px 0 30px 30px;
            }
            .right-input {
                width: 590px;
                margin-top: 10px;
                input {
                    width: 590px;
                    height: 70px;
                    background-color: #25252B;
                    color: #ffffff;
                    padding: 0 20px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
            }
            &.text-area {
                height: inherit;
                padding: 0 0 10px 0;
                textarea {
                    width: 590px;
                    height: 400px;
                    background-color: #25252B;
                    color: #ffffff;
                    padding: 10px 20px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
            }
        }
        .save-btn {
            font-size: 34px;
            line-height: 34px;
            padding: 33px 0;
            background-color: #F8C513;
            color: #000;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 750px;
        }
        .mt-20 {
            margin-top: -20px;
        }
    }
</style>
