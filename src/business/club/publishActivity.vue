<template>
    <div class="publishActivity">
        <div class="club-item mt-20">
            <div class="left-label pull-left">名称</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入活动名称" v-model="formData.title" v-verify="formData.title" >
            </div>
        </div>
        <div class="club-item text-area">
            <div class="left-label pull-left">简介</div>
            <div class="right-input pull-left">
                <textarea placeholder="在此输入活动内容" v-model="formData.content" v-verify="formData.content"></textarea>
            </div>
        </div>
        <div class="club-item text-area">
            <div class="left-label pull-left">分享</div>
            <div class="right-input pull-left">
                <div class="setDefaul" @click="setShare" ><l-icon :name="formData.isshare==1?'morenkai':'morenguan'" /></div>
            </div>
        </div>
        <div class="select-pic text-center">
            <!--<div class="upload-box">-->
            <!--<div class="upload-pic">-->
            <!--<l-icon name="shangchuantupian"/>-->
            <!--</div>-->
            <!--<div class="select-upload-label">上传图片 0/1</div>-->
            <!--</div>-->
            <l-imageUpload   :limit="4"  :onSuccess="uploadPhotosSuccess"  :onRemove = "removePhotos" :uploadImgs="imgs"/>
        </div>
        <div class="save-btn text-center" @click="publish">发布</div>
    </div>
</template>

<script>
    import club from '../../api/club.js'
    export default {
        name: 'publishActivity',
        data(){
            return {
                formData:{
                    isshare:0,
                    title:"",
                    content:"",
                    photos:""
                },
                imgs:[]
            }
        },
        verify: {
            formData: {
                title: [{minLength: 1, message: "活动标题必须填写"}],
                content: [{minLength: 1, message: "活动简介必须填写"}]
            }
        },
        methods: {
            publish() {
                if(!this.$verify.check()){
                    var errMsg = this.appUtil.toastRemind(this.$verify.verifyQueue,this.$verify.$errors);
                    this.$Message.error({content:errMsg});
                }else {
                    let _this = this;
                    this.formData.clubid = this.$route.query.id;
                    this.session.getMemberID(function (memberid) {
                        _this.formData.adminid = memberid;
                        club.addArticle(_this, _this.formData);
                    });
                }
            },
            setShare(){
                this.formData.isshare =  this.formData.isshare==1?0:1;
            },
            uploadPhotosSuccess(res,item){
                this.formData.photos = res;
            },
            removePhotos(res){
                this.formData.photos = res;
            }
        },
        mounted() {
        },
        activated() {
            this.formData = {
                isshare: 0,
                title: "",
                content: "",
                photos: ""
            }
            this.imgs=[];
        }

    }
</script>

<style lang="scss">
    .publishActivity {
    .select-upload {
        width:100%;
        background-color:#33333a;
        padding:50px 0;
        margin-bottom:40px;
    .upload-box{
        background-color:#25252B;
        width:140px;
        height:140px;
        margin:0 auto 0;
        border-radius:50%;
        display: flex;
        justify-content:center;
        align-items:Center;
    .icons {
        width: 50px;
        height: 44px;
        color: #999999;
    }
    }
    .select-upload-label {
        color: #999999;
        font-size: 30px;
        line-height: 30px;
        margin-top:20px;
    }
    }
    .select-pic {
        margin-bottom:0px;
        background-color: #33333a;
        padding:30px 0 140px 30px;
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
        margin-top:0;
    }
    .setDefaul{font-size: 50px;}
    }
</style>
