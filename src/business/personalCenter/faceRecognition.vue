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
        <loading v-if="showLoading"></loading>
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
            let ua = navigator.userAgent.toLowerCase();
            let model = ua.indexOf('android');
            let browser = ua.indexOf('micromessenger');

            if (model !== -1 && browser !== -1) {
                this.showPopupError = true;
            }
            if (typeof(FileReader) === 'undefined' ){
                this.showVerifyCodeModal = true;
                this.errorContent();
                this.videoFail = true;
                this.videoFailText.detail = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！";
            }
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

            onDialogVideoResult(event, sessionId) {
                // 显示loding图
                const files = event.target.files;
                this.showLoading = true;

                if (files && files.length > 0) {
                    let file = files[0];
                    let self = this;
                    if (file.size > 20 * 1024 * 1024) {
                        this.showLoading = false;
                        this.videoFail = true;
                        this.videoFailText = {
                            title: '视频上传失败',
                            detail: '您录制的视频时间过大,请重新录制'
                        };
                        return;
                    }

                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.addEventListener('loadend', function () {
                        var vedio = reader.result.split(',');
                        let formdata = {
                            type: 'faceliveness_verify',
                            apiType: 'faceliveness',
                            'session_id': sessionId,
                            'video_base64':vedio[1]
                        };
                        if(sessionId==null){
                            this.errorContent();
                            return;
                        }
                        _this.axios.post('extend/aibaidu',formdata,function(json){

                        },function(json){
                            self.showLoading = false;
                            self.showVerifyCodeModal = false;
                            var data = json.data;
                            if(!data){
                                _this.errorContent();
                            }else{
                                self.showResult = true;
                                self.videoResultDetail = data;
                            }
                        });
                    });
                }
            },
            nextStep() {
                this.showVerifyCodeModal = true;
            },

            errorContent() {
                this.showLoading = false;
                this.videoFail = true;
                this.videoFailText = {
                    title: '视频上传失败',
                    detail: '视频上传失败，请重新上传'
                };
            }
        }

    }
</script>

<style lang="scss">
    .face-recognition {
        background-color: #F5F5F5;
        width: 100%;
        .tips {
            width: 100%;
            height: 640px;
            background: url("/static/img/personal/1.png") no-repeat;
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
