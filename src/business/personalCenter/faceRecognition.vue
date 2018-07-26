<template>
    <div class="face-recognition">
        <div class="tips"></div>
        <div class="little-tips">
            <div class="tips-item">
                <l-icon name="shouji"/>
                <div class="text">正对手机</div>
            </div>
            <div class="tips-item">
                <l-icon name="guangxian"/>
                <div class="text">光线充足</div>
            </div>
            <div class="tips-item">
                <l-icon name="dongzuo"/>
                <div class="text">放慢动作</div>
            </div>
        </div>
        <div class="btn"  @click="nextStep"  :class="{'btn-disabled': nextDisabled}">开始</div>
        <popupError v-if="showPopupError"
                    :showPopupError.sync="showPopupError" />
        <verifyCodeModal v-if="showVerifyCodeModal"
                         @cancel="onDialogCancel"
                         @videoResult="onDialogVideoResult"
                         :videoFail.sync="videoFail"
                         :videoFailText.sync="videoFailText"
        />
        <loading v-if="showLoading" ></loading>
        <result v-if="showResult"
                @restart="onDialogAgain"
                :showResult.sync="showResult"
                :videoResultDetail="videoResultDetail"></result>
    </div>
</template>

<script>
    import verifyCodeModal from './face/verifyCodeModal';
    import loading from './face/loading';
    import result from './face/result';
    import popupError from './face/popupError';
    import users from '../../api/users.js'
    let _this
    export default {
        name: 'face-recognition',
        components: {
            verifyCodeModal,
            loading,
            result,
            popupError
        },
        data() {
            return {
                loading:'',
                showVerifyCodeModal: false,
                verifyCode: '',
                nextDisabled: false,
                showLoading: false,
                showResult: false,
                videoResultDetail: null,
                videoFail: false,
                videoFailText: {},
                showPopupError: false,
            };
        },
        mounted() {
            _this = this
            _this.$nextTick(function () {
                $(_this.$el).css('min-height', $('.view-container').height())
            })
        },
        methods: {
            onDialogCancel() {
                this.nextDisabled = false;
                this.showVerifyCodeModal = false;
            },

            onDialogAgain() {
                this.nextDisabled = false;
                this.showVerifyCodeModal = true;
            },
            getObjectURL(file) {
                var url = null;
                if (window.createObjcectURL != undefined) {
                    url = window.createOjcectURL(file);
                } else if (window.URL != undefined) {
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(file);
                }
                return url;
            },
            onDialogVideoResult(filePath, sessionId) {
                let self = this;
                if(sessionId==null){
                    this.errorContent();
                    return;
                }
                this.session.getMemberID(function(memberid) {
                    let formdata = {
                        values: {
                            'type': 'faceliveness_verify',
                            'apiType': 'faceliveness',
                            'session_id': sessionId,
                            'memberid':memberid
                        },
                        files: {
                            file: filePath
                        }
                    };
                    self.showLoading = true;
                    var url = self.axios.host + '/extend/aibaidu';
//                api.alert({ msg: JSON.stringify(formdata) });
//                url = "http://192.168.8.88:8088/aidemo";
                    api.ajax({
                        url: url,
                        method: 'post',
                        timeout: 120,
                        data: formdata
                    }, function (ret, err) {
                        if (ret) {
                            self.showLoading = false;
//                        api.alert({ msg: JSON.stringify(ret) });
                            if (ret.errno == 0) {
                                //验证成功
                                var formData = self.$route.query;
//                            api.alert({ msg: JSON.stringify(formData) });
                                formData.isaiface = 1;
                                self.$Message.info('验证成功');
                                self.$router.replace("/personalCenter");
//                                users.verifiedAction(self, formData);
                                self.showVerifyCodeModal = false;
                            } else {
                                self.errorContent(ret.data);
//                                self.showResult = true;
//                                self.videoResultDetail = data;
                            }

                        }
                    });
                });
//                this.axios.files('/extend/aibaidu', formdata, function (ret, err) {
//                    api.alert({msg: JSON.stringify(ret)});
//                    api.alert({msg: JSON.stringify(err)});
//                    self.showLoading = false;
//                    self.showVerifyCodeModal = false;
//                });
//                alert(JSON.stringify(ret));
//                let reader = new FileReader();
//                reader.readAsDataURL(ret.data)
//                reader.addEventListener('loadend', function () {
//                    var vedio = reader.result.split(',');
//                    alert(vedio[0]);
//
//                    let formdata = {
//                        type: 'faceliveness_verify',
//                        apiType: 'faceliveness',
//                        'session_id': sessionId,
//                        'video_base64':vedio[1]
//                    };
//                    _this.axios.post('extend/aibaidu',formdata,function(json){
//
//                    },function(json){
//                        self.showLoading = false;
//                        self.showVerifyCodeModal = false;
//                        var data = json.data;
//                        if(!data){
//                            _this.errorContent();
//                        }else{
//                            self.showResult = true;
//                            self.videoResultDetail = data;
//                        }
//                    });
//                });
            },
//            onDialogVideoResult(event, sessionId) {
//                let self = this;
//                const files = event.target.files;
//                this.showLoading = true;
//                if (files && files.length > 0) {
//                    let file = files[0];
//
//                    if (file.size > 20 * 1024 * 1024) {
//                        this.showLoading = false;
//                        this.videoFail = true;
//                        this.videoFailText = {
//                            title: '视频上传失败',
//                            detail: '您录制的视频时间过大,请重新录制'
//                        };
//                        return;
//                    }
//
//                    let reader = new FileReader();
////                    var URL = window.URL || window.webkitURL || window.mozURL;
////                    var url = URL.createObjectURL(file);
//                   alert(this.getObjectURL(file));
//                    return;
//                    reader.readAsDataURL(file)
//                    reader.addEventListener('loadend', function () {
//                        // 显示loding图
//                        var videoCompression = api.require('videoCompression');
//                        videoCompression.compression({
//                            path: reader.result,
//                            quality: 'low'
//                        }, function(ret) {
//                            if(ret.eventType == 'exporting'){
//
//                                _this.loading = JSON.stringify(ret);
////                        console.log(JSON.stringify(ret));
//                            } else {
//                                alert(event.target.value);
//                                api.alert({msg:JSON.stringify(ret)});
//                            }
//                        });
////                        alert(file.getAsDataURL());
//                        return;
//                        var vedio = reader.result.split(',');
//                        let formdata = {
//                            type: 'faceliveness_verify',
//                            apiType: 'faceliveness',
//                            'session_id': sessionId,
//                            'video_base64':vedio[1]
//                        };
//                        if(sessionId==null){
//                            this.errorContent();
//                            return;
//                        }
//                        _this.axios.post('extend/aibaidu',formdata,function(json){
//
//                        },function(json){
//                            self.showLoading = false;
//                            self.showVerifyCodeModal = false;
//                            var data = json.data;
//                            if(!data){
//                                _this.errorContent();
//                            }else{
//                                self.showResult = true;
//                                self.videoResultDetail = data;
//                            }
//                        });
//                    });
//                }
//            },
            nextStep() {
                this.showVerifyCodeModal = true;
            },

            errorContent(msg) {
                this.showLoading = false;
                this.videoFail = true;
                this.videoFailText = {
                    title: '视频验证失败',
                    detail: msg
                };
            }
        }

    }
</script>

<style lang="scss">
    .face-recognition {
        background-color: #F5F5F5;
        width: 100%;
        height: 100%;
        position: relative;
        .tips {
            width: 100%;
            height: 640px;
            background: url("../../../static/img/personal/1.png") no-repeat;
            background-size: contain;
        }
        .little-tips {
            width: 100%;
            display: flex;
            justify-content: space-between;
            background-color: #ffffff;
            .tips-item {
                width: 33.333333%;
                text-align: center;
                padding-bottom: 20px;
                .icons {
                    width: 150px;
                    height: 150px;
                }
                .text {
                    color: #333339;
                }
            }
        }
        .btn {
            background-color: #f8c513;
            color: #25252B;
            width: 100%;
            font-size: 34px;
            line-height: 34px;
            padding: 30px 0;
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 0;
            &-disabled {
                 background-color: #ccc;
             }
        }
    }
</style>
