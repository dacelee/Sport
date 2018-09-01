<template>
    <div class="share-news">
        <div class="share-news-item">
            <div class="left-label pull-left">标题</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入"  v-model="formData.title" v-verify="formData.title">
            </div>
        </div>
        <div class="share-news-item text-area">
            <div class="left-label pull-left">内容</div>
            <div class="right-input pull-left">
                <textarea placeholder="在此输入分享内容"  v-model="formData.content" v-verify="formData.content"></textarea>
            </div>
        </div>
        <div class="share-news-item">
            <div class="left-label pull-left">视频</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="输入视频地址" v-model="formData.videourl">
            </div>
        </div>
        <div class="select-pic text-center">
            <l-imageUpload :limit="4"  :onSuccess="uploadPhotosSuccess"
                           :onRemove="removePhotos" :uploadImgs="uploadImgs" />
        </div>
        <div class="save-btn text-center" @click="submitData">分享</div>
    </div>
</template>

<script>
    import club from '../../api/club.js'
    export default {
        name: 'share-news',
        data(){
            return {
                uploadImgs:[],
                formData:{
                    isshare:1,
                    title:"",
                    content:"",
                    photos:"",
                    videourl:""
                }
            }
        },
        verify: {
            formData: {
                title: [{minLength: 1, message: "标题必须填写"}],
                content: [{minLength: 1, message: "简介必须填写"}]
            }
        },
        methods: {
            submitData() {
                if(!this.$verify.check()){
                    var errMsg = this.appUtil.toastRemind(this.$verify.verifyQueue,this.$verify.$errors);
                    this.$Message.error({content:errMsg});
                }else {

                    let _this = this;
                    this.formData.clubid = 0;
                    this.session.getMemberID(function (memberid) {
                        _this.formData.adminid = memberid;
                        club.addArticle(_this, _this.formData);
                    });
                }
            },
            uploadPhotosSuccess(res) {
                this.formData.photos = res;
            },
            removePhotos(res){
                this.formData.photos = res;
            }
        },
        activated() {
            this.uploadImgs=[];
            this.formData={
                isshare:0,
                title:"",
                content:"",
                photos:"",
                videourl:""
            }
        },
        deactivated(){
        }
    }
</script>

<style lang="scss">
    .share-news {
        width: 100%;
        .share-news-item {
            width: 750px;
            overflow: hidden;
            margin-bottom: 0;
            background-color: #33333a;
            height: 90px;
            &:nth-child(1) {
                height: 130px;
                padding-top: 40px;
            }
            .left-label {
                width: 100px;
                font-size: 30px;
                line-height: 30px;
                margin: 30px 0 30px 30px;
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
        .select-pic {
            margin-bottom: 0;
            background-color: #33333a;
            padding: 30px 0 140px 30px;
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
    }
</style>
