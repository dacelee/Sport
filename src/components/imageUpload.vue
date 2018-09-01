<template>
    <div :class="limit > 1?'upload_more':'upload_one'" >
        <div class="upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url" :style="{width:imgWidth,height:imgHeight}" >
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)" v-if="limit > 1"></Icon>
            </template>
            <template v-else>
                <span class="error" v-html="item.error"></span>
                <Progress v-if="item.showProgress" :percent="item.percentage" :status="progressStatus" :stroke-width="4"
                          hide-info ></Progress>
            </template>
        </div>
        <template v-if="limit > 1 && uploadList.length < limit">
            <div class="upload-box" @click="getPicture()">
                <div class="upload-pic">
                    <l-icon name="shangchuantupian"/>
                </div>
                <div class="select-upload-label">上传图片 {{uploadList.length}}/{{limit}}</div>
            </div>
        </template>
        <template v-else>
            <div class="upload-btn" @click="getPicture()"></div>
        </template>
    </div>
</template>
<script>
    var axios = require('axios')
    var qs = require('qs')
    export default {
        name: 'Upload',
        props: {
            imgWidth:{type:String,defult:"100%"},
            imgHeight:{type:String,defult:"100%"},
            uploadImgs:{
                type: Array
            },
            url:{
                type:String,
                default:"/my/uploadimg"
            },
            sourceType:{
                type:String,
                default:"all"
            },
            limit: {
                type: Number,
                default: 1
            },
            width: {
                type: Number,
                default: 200
            },
            height: {
                type: Number,
                default: 200
            },
            noClip:{
                type:Boolean,
                default:false,
            },
            imageClipStart:{
                type: Function,
                default () {//截图开始
                    return {};
                }
            },
            imageClipEnd:{
                type: Function,
                default () { //截图结束
                    return {};
                }
            },
            onSuccess: {
                type: Function,
                default () {
                    return {};
                }
            },
            onError: {
                type: Function,
                default () {
                    return {};
                }
            },
            onRemove: {
                type: Function,
                default () {
                    return {};
                }
            },
        },
        data () {
            return {
                uploadFile:"",
                progressStatus:"active",
                uploadList: [],
                uploadSuccessList: [],
                tempIndex: 1,
                success:0
            }
        },
        mounted() {

        },
        watch: {
            uploadImgs:function (imgs) {
                var _this= this;
                _this.uploadList = [];
                if(imgs.length==0){
                    this.uploadSuccessList = [];
                }
                $(imgs).each(function(index,url){
                    if(url&&url!=null&&url!=""){
                        var item = {url:url, showProgress: false, percentage: 0,status:"finished",error:""}
                        if(_this.uploadList.indexOf(item)==-1){
                            _this.uploadList.push(item);
                        }

                    }
                });
            }
        },
        methods: {
            handleView (name) {
            },
            handleRemove (item) {
//                const fileList = this.$refs.upload.fileList;
//                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                const fileList = this.uploadList;
                this.uploadList.splice(fileList.indexOf(item), 1);
                this.uploadSuccessList.splice(fileList.indexOf(item.imgUrl), 1);
                if(this.limit>1&&this.uploadSuccessList.length>0){
                    this.onRemove(this.uploadSuccessList.join(","));
                }else{
                    this.onRemove("");
                }
            },
            handleSuccess (item) {
//                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
//                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
                this.uploadSuccessList.push(item.imgUrl);
                if(this.limit>1){
                    this.onSuccess(this.uploadSuccessList.join(","),item);
                }else{
                    this.onSuccess(item.imgUrl,item);
                }
            },
            handleError (err, response, file) {
                this.onError(err, response, file);
            },
            getPicture(){
                var _this = this;
                if (_this.session.isAPPRuntime()) {
                    var destinationType = "url";
                    if(_this.noClip){
                        destinationType = "base64";
                    }
                    if(_this.sourceType=="all"){
                        _this.appUtil.actionSheet(function (ret) {
                            if(_this.noClip){
                                _this.upload(ret.base64Data);
                                _this.imageClipEnd();
                                return;
                            }
                            if (ret.data) {
                                _this.imageClip2(ret.data);
//                                _this.imageClip(ret.base64Data);
                            } else {
                               _this.$Message.info("操作取消");
                            }
                        },destinationType);
                    }else{
                        _this.appUtil.picture(function (ret) {
                            if(_this.noClip){
                                _this.upload(ret.base64Data);
                                _this.imageClipEnd();
                                return;
                            }
                            if (ret.data) {
                                _this.imageClip2(ret.data);
                            } else {
                                _this.$Message.info("操作取消");
                            }
                        },_this.sourceType,destinationType);
                    }
                }
            },
            imageClip2(url){
                var _this = this;
                this.imageClipStart();
                this.listener();
                api.openWin({
                    name: 'imageClip',
                    url: 'widget://html/imageClip.html',
                    rect: {
                        x: 0,
                        y: 0,
                        w: api.winWidth,
                        h: api.winHeight
                    },
                    animation:{
                        type:"fade",                //动画类型（详见动画类型常量）
                        subType:"from_right",       //动画子类型（详见动画子类型常量）
                        duration:100                //动画过渡时间，默认300毫秒
                    },
                    pageParam: {
                        url: url,
                        width:_this.width,
                        height:_this.height
                    }
                });

            },
//            imageClip(base64Data){
//                var _this = this;
//                var w = api.winWidth;
//                var clipW = _this.width;
//                var clipH = _this.height;
//                var oldW = _this.width;
//                if(_this.width > w*0.8){
//                    clipW = w*0.8;
//                    clipH = _this.height*(clipW/oldW)
//                }
//                if(_this.width<_this.height){
//                    var h = api.winHeight;
//                    var oldH = _this.height;
//                    if(_this.height> h*0.8){
//                        clipH = h*0.8
//                        clipW = _this.width*(clipW/oldH)
//                    }
//                }
//                var  context = "listener_"+Date.now() + _this.tempIndex++;
//                _this.listener(context);
//                _this.imageClipStart();
//                if(!_this.noClip){
//                    _this.$router.push({
//                        name: 'imageClip',
//                        params:{"base64": base64Data},
//                        query: {"context": context,"width":clipW,"height":clipH}
//                    });
//                }else{
//                    api.sendEvent({
//                        name: 'clip_success_'+context,
//                        extra: {
//                            base64: base64Data
//                        }
//                    });
//                }
//            },
//            listener(context){
//                var _this = this;
//                if (this.session.isAPPRuntime()) {
//                    api.addEventListener({
//                        name: 'clip_end_'+ context
//                    }, function (ret, err) {
//                        _this.imageClipEnd();
//                        api.removeEventListener({
//                            name: 'clip_end_'+ context
//                        });
//                    });
//                    api.addEventListener({
//                        name: 'clip_success_'+ context
//                    }, function (ret, err) {
//                        api.removeEventListener({
//                            name: 'clip_success_'+ context
//                        });
//                        api.removeEventListener({
//                            name: 'clip_success_'+ context
//                        });
//                        if (ret) {
//                            var base64 = ret.value.base64;
//                            _this.upload(base64)
//                        }
//                    });
//                }
//            },
            listener(){
                var _this = this;
                api.addEventListener({
                    name: 'clip_success'
                }, function (ret, err) {
                    api.removeEventListener({
                        name: 'clip_success'
                    });
                    _this.imageClipEnd();
                    if (ret) {
                        var base64 = ret.value.base64;
                        _this.upload(base64)
                    }
                });
            },
            upload(base64){
                var _this = this;
                _this.uploadFile = {url: base64, showProgress: true, percentage: 0,status:"",error:""}
                _this.uploadFile.uid = Date.now() + this.tempIndex++;
                if (_this.limit > 1) {
                    _this.uploadList.push(_this.uploadFile);
                } else {
                    _this.uploadList = [_this.uploadFile];
                }
                _this.uploadFile.percentage = 0;
                _this.progressStatus = "active";
                //上传图片
                var config = { onUploadProgress:function (progressEvent) {
                    if (progressEvent.lengthComputable) {
                        var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                        _this.uploadFile.percentage = complete;
                        //                                    _this.$Message.info(complete);
                    }
                },
                    timeout: 30000
                }
                var action = _this.axios.host+_this.url;
                var loginUser = $api.getStorage('loginUser');
                var params = {"base64":base64,"doc":"jpg"};
                if(loginUser&&loginUser!=null&&loginUser.idcode!=null){
                    params.idcode = loginUser.idcode;
                    //params.idcode = 'c5838dedfa0b4463b29d203495c73780'
                }
                axios.post(action,qs.stringify(params), config).then(function(res){
                    if (res.data.code === 1) {
                        _this.uploadFile.status  ="finished";
                        _this.uploadFile.imgUrl = res.data.data.imgpath;
                        _this.handleSuccess(_this.uploadFile);
                    }else{
                        _this.$Message.error(res.data.msg);
                        _this.progressStatus = "wrong";
                        setTimeout(function(){
                            const fileList = _this.uploadList;
                            _this.uploadList.splice(fileList.indexOf(_this.uploadFile), 1);
                        },3000)
                    }
                },function(res){
//                                _this.uploadFile.status  ="finished";
                    _this.progressStatus = "wrong";
                    _this.uploadFile.error = "上传出错";
                    _this.onError("图片上传出错");
                    setTimeout(function(){
                        const fileList = _this.uploadList;
                        _this.uploadList.splice(fileList.indexOf(_this.uploadFile), 1);
                    },3000)
                });
            }
        }
    }
</script>
<style lang="scss">
    .upload_more{
        text-align: left;
    }
    .upload_one {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
    }

    .upload_one .upload-btn{ width: 100%;
        height: 100%;position: absolute;top:0px;left: 0px;}

    .upload_more .upload-list,.upload_more .upload-box {
        display: inline-block;
        width: 210px;
        height: 210px;
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

    .upload_one .upload-list{
        position: relative;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
    }

    .upload_more .upload-box .icons {
        width: 60px;
        height: 52px;
        color: #999999;
    }
    .upload_more .upload-box img {
        width: 100%;
        height: 100%;
    }

    .upload_more .upload-box .upload-pic{padding-top: 60px}

    .upload_more .error,.upload_one .error{
        position: relative;
        top:25%;
        color: #ed3f14;
    }

    .upload_more .select-upload-label {
        color: #999999;
        font-size: 24px;
        line-height: 15px;
        margin-top:20px;
    }

    .ivu-progress {
        top:25%;
        width: 90%
    }

    .upload-list img {
        width: 100%;
        height: 100%;
    }



     .upload-list i {
        position: absolute;
        right: 5px;
         top:0px;
        color: #ed3f14;
        font-size: 40px;
    }



</style>
