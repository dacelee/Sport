<template>
    <div :class="limit > 1?'upload_more':'upload_one'" >
        <div class="upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)" v-if="limit > 1"></Icon>
            </template>
            <template v-else>
                <span class="error" v-html="item.error"></span>
                <Progress v-if="item.showProgress" :percent="item.percentage" :status="progressStatus" :stroke-width="4"
                          hide-info ></Progress>
            </template>
        </div>
        <template v-if="limit > 1 && uploadSuccessList.length < limit">
            <div class="upload-box" @click="getPicture()">
                <div class="upload-pic">
                    <l-icon name="shangchuantupian"/>
                </div>
                <div class="select-upload-label">上传图片 {{uploadSuccessList.length}}/{{limit}}</div>
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
            action: {
                type: String,
                required: true
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
                context:"",
                uploadFile:"",
                progressStatus:"active",
                uploadList: [],
                uploadSuccessList: [],
                tempIndex: 1,
                success:0
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
                    _this.appUtil.actionSheet(function (ret) {
                        if (ret.data) {
                            var w = api.winWidth;
                            var clipW = _this.width;
                            var clipH = _this.height;
                            var oldW = _this.width;
                            if(_this.width > w*0.8){
                                clipW = w*0.8;
                                clipH = _this.height*(clipW/oldW)
                            }
                            if(_this.width<_this.height){
                                var h = api.winHeight;
                                var oldH = _this.height;
                                if(_this.height> h*0.8){
                                    clipH = h*0.8
                                    clipW = _this.width*(clipW/oldH)
                                }
                            }
                            _this.$router.push({
                                name: 'imageClip',
                                params:{"base64": ret.base64Data},
                                query: {"context": _this.context,"width":clipW,"height":clipH}
                            });
                        } else {
//                            _this.$Message.error("获取图片失败");
                        }
                    });
                }
            },
            listener(){
                var _this = this;
                if (this.session.isAPPRuntime()) {
                    api.addEventListener({
                        name: 'clip_success_'+ _this.context
                    }, function (ret, err) {
                        if (ret) {
                            var base64 = ret.value.base64;
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
                                }
                            }
                            axios.post(_this.action,qs.stringify({"base64":base64,"doc":"png"}), config).then(function(res){
                                if (res.data.code === 1) {
                                    _this.uploadFile.status  ="finished";
                                    _this.uploadFile.imgUrl = res.data.data.imgpath;
                                    _this.handleSuccess(_this.uploadFile);
                                }else{
                                    _this.$Message.error(res.data.msg);
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
                        } else {
                            _this.onError("图片上传出错");
//                            alert(JSON.stringify(err));
                        }
                    });
                }
            }
        },
        created (){
//            var uploadFile = {url: 1, showProgress: true, percentage: 0,status:""}
//            uploadFile.error = "上传出错";
//            this.uploadList.push(uploadFile);
             this.context = "listener_"+Date.now() + this.tempIndex++;
             this.listener();
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
