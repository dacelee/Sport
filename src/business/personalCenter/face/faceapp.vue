<template>
    <div>
        <div class="sketch">
            <div class="sketch-img"></div>
            <p class="sketch-text">正面平视手机、保证光线充足<br />请勿遮挡面部</p>
        </div>
        <div class="prompt">
            <div class="prompt-box">
                <div class="prompt-box-text" v-for="item in items" :key="item.number">
                    <span class="prompt-box-text-number">{{item.number}}</span><span class="prompt-box-text-content">{{item.text}}</span>
                    <span class="prompt-box-text-border" v-if="item.border"></span>
                </div>
            </div>
            <span class="prompt-next"
                  :class="{'prompt-next-disabled': nextDisabled}"
                  @click="nextStep">下一步</span>
        </div>
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
/**
 * @file 人脸活体检测h5 demo容器组件
 * @author v_yangbin02
 */

import request from 'superagent';
import verifyCodeModal from './verifyCodeModal';
import loading from './loading';
import result from './result';
import popupError from './popupError';
let _this;
export default {
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
            items: [
                {
                    number: 1,
                    text: '牢记验证码，点击开始录制',
                    border: 1
                }, {
                    number: 2,
                    text: '开启前置摄像头，用普通话朗读数字',
                    border: 1
                }, {
                    number: 3,
                    text: '完成录制，等待验证结果',
                    border: 0
                }
            ]
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
        _this = this;
    },

    methods: {
        onDialogCancel() {
            this.nextDisabled = false;
            this.showVerifyCodeModal = false;
        },

        onDialogAgain() {
            this.nextDisabled = false;
            this.showResult = false;
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
                        'video_base64':decodeURIComponent(vedio[1])
                    };
                    if(sessionId==null){
                        this.errorContent();
                        return;
                    }

                    _this.axios.post('http://192.168.0.102:8088/aidemo',formdata,function(json){
                        var data = json.data;
                        self.showLoading = false;
                        self.showResult = true;
                        self.videoResultDetail = data;
                        // 关闭弹窗
                        self.showVerifyCodeModal = false;
                    },function(){
                        _this.errorContent();
                    });
//                    console.error(formdata.video_base64);
//                    $.ajax({
//                        url: 'http://192.168.0.102:8088/aidemo',
//                        type: "post",
//                        dataType: 'json',
//                        data: JSON.stringify(formdata),
//                        success: function (data) {
//
//                            // alert(data.data.token_video);
//                        }
//                    });
//                    request
//                        .post('http://192.168.0.102:8088/aidemo')
//                        .type('form')
//                        .send(formdata)
//                        .then(({body}) => {
//                            /* eslint-disable fecs-camelcase */
//                            const {err_no, data} = body;
//                            if (err_no) {
//                                this.errorContent();
//                                return;
//                            }
//                            self.showLoading = false;
//                            self.showResult = true;
//                            self.videoResultDetail = data;
//                            // 关闭弹窗
//                            self.showVerifyCodeModal = false;
//                            /* eslint-enable fecs-camelcase */
//                        })
//                        .catch(msg => {
//                            this.errorContent();
//                        });
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
};
</script>
<style lang="less">
    @color-blue: #0073eb;

    html,
    body {
        height: 100%;
        margin: 0;
        font-size: 12px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow: hidden;
        font-family: tahoma, arial, "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
    }

    * {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    @media (max-width: 374px) {
        html,
        body {
            font-size: 9px;
        }
    }

    .sketch {
        background: rgba(225, 225, 225, .95);
        padding: .8333rem 1.666rem 1.2rem;

        &-img {
            width: 278px;
            height:400px;
            margin: 0 auto;
            background: url(../../../static/face/images/sketch.png) 0 0 no-repeat;
            background-size: 100% auto;
        }

        &-text {
            font-size: 24px;
            color: #999;
            letter-spacing: 0;
            line-height: 44px;
            text-align: center;
        }
    }

    .prompt {
        padding-bottom: 20px;

        &-box {
            padding: 40px 0;

            &-text {
                margin: 0 auto 45px;
                height: 70px;
                line-height: 40px;
                width: 85%;

                &:last-child {
                    margin-bottom: 0;
                }

                &-number {
                    border-radius: 40px;
                    border: 1.5px solid #FFF;
                    text-align: center;
                    color: #FFF;
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    box-sizing: border-box;
                    font-size: 20px;
                    vertical-align: top;
                    margin-right: 15px;
                    letter-spacing: 0;
                }

                &-content {
                    color: #fff;
                    letter-spacing: 0;
                    white-space: nowrap;
                    display: inline-block;
                    font-size: 30px;
                }

                &-border {
                    height: 1.9rem;
                    margin: .417rem 0 .417rem 0.59rem;
                    width: 0;
                    border-left: 1px dotted @color-blue;
                    display: block;
                }
            }
        }

        &-next {
            margin: 0 auto;
            height: 80px;
            line-height: 80px;
            text-align: center;
            background: @color-blue;
            border-radius: 8px;
            color: #fff;
            display: block;
            width: 660px;
            font-size: 28px;
            outline: none;
            border: none;

            &-disabled {
                background-color: #ccc;
            }
        }
    }

</style>