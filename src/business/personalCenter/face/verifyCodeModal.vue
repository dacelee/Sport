<template>
    <div class="modal-layer">
        <div class="modal-layer-mask"></div>
        <div class="modal-layer-popup">
            <div class="modal-layer-success"
                 v-if="!videoFail">
                <div class="modal-layer-popup-title">请牢记以下验证码</div>
                <div class="modal-layer-popup-content">此验证码将于<span>{{refreshTime}}</span>秒后过期<br />用普通话朗读数字，视频时长<span>3-8</span>秒最佳</div>
                <div class="modal-layer-popup-number">
                    <span v-for="items in codeResult">{{items}}</span>
                </div>
                <div class="modal-wrapper"
                    :class="{'modal-point': btnPoint}" @click="recordVideo">
                    <span class="modal-confirm-btn"
                            :disabled="timeHaveToStay > 0">
                        {{timeHaveToStay | confirmBtnText}}
                    </span>

                    <!--<input type="file"-->
                        <!--class="camera-input"-->
                        <!--@change="iptChange($event)"-->
                        <!--ref="cameraInput"-->
                        <!--accept="video/*"-->
                        <!--capture="camcorder" v-show="timeHaveToStay == 0" />-->
                </div>
            </div>
            <div class="modal-layer-fail"
                 v-if="videoFail">
                <div class="modal-layer-fail-icon"></div>
                <div class="modal-layer-fail-title">{{videoFailText.title}}</div>
                <div class="modal-layer-fail-detail">{{videoFailText.detail}}</div>
                <div class="modal-layer-fail-restart"
                    @click="videoRestart">重新获取</div>
            </div>
            <span class="modal-layer-close"
                   @click="closePopup()">
            </span>
        </div>

        
    </div>
</template>

<script>
    /**
     * @file 人脸活体检测h5 弹层
     * @author v_yangbin02
     */

    import request from 'superagent';
    let _this;
    export default {
        props: {

            videoFail: {
                type: Boolean,
                default: false
            },
            videoFailText: {
                type: Object,
                default: {
                    title: '视频无法上传',
                    detail: '您录制的视频时间过长,请重新录制'
                }
            }
        },
        data() {
            return {
                video:'',
                // 需要等待的时间
                timeHaveToStay: 3,
                refreshTime: 60,
                btnPoint: false,
                codeResult: '',
                sessionId: '',
                stayTimer: null,
                startTimeMinute: null
            };
        },
        created() {
            _this = this;
            this.getVerifyCodeModal();
        },
        filters: {
            confirmBtnText(timeHaveToStay) {
                if (timeHaveToStay > 0) {

                    return `记住了，开始录制(${timeHaveToStay}s)`;
                }
                return '记住了，开始录制';
            }
        },
        methods: {
            closePopup() {
                this.clearTimer();
                this.$emit('cancel');
            },

            clearTimer() {
                this.stayTimer && clearTimeout(this.stayTimer);
                this.startTimeMinute && clearTimeout(this.startTimeMinute);

                this.stayTimer = null;
                this.startTimeMinute = null;
            },

            stayTimerF() {
                this.stayTimer = setTimeout(
                    () => {
                        if (--this.timeHaveToStay === 0) {
                            this.stayTimer = null;
                            this.btnPoint = true;
                            return;
                        }
                        this.stayTimerF();
                    },
                    1000
                );
            },
            recordVideo(){
                if (this.timeHaveToStay > 0) {
                    return;
                }
                var _this = this;
                _this.clearTimer();


                _this.$router.push({
                    name: 'videoRecorder',
                });
                return ;

            },
            getVerifyCodeModal() {
                let formdata = {
                    type: 'faceliveness_sessioncode',
                    apiType: 'faceliveness'
                };
//                this.codeResult = [2,3,3,3,4,5];
//                this.sessionId =1234;
//                this.timeHaveToStay = 3;
//                this.stayTimerF();
//                this.btnPoint = false;
//                this.refreshTime = 60;
//                this.timeout();
//                return;
                _this.axios.post('extend/aibaidu',formdata,function(json){

                },function(json){
                    var res = json.data.result;
                    if (res) {
                        _this.codeResult = res.code;
                        _this.sessionId = res.session_id;
                        _this.timeHaveToStay = 3;
                        _this.stayTimerF();
                        _this.btnPoint = false;
                    }
                    else {
                        console.log(json);
                        _this.errorContent();
                    }
//                    _this.errorContent();
                });

                this.refreshTime = 60;
                this.timeout();
            },

            timeout() {
                // 60秒倒计时
                this.startTimeMinute = setTimeout(
                    () => {
                        if (--this.refreshTime === 0) {
                            this.getVerifyCodeModal();
                            this.startTimeMinute = null;
                            return;
                        }
                        this.timeout();
                    },
                    1000
                );
            },
            videoRestart() {
                this.$emit('update:videoFail', false);
                this.$emit('update:videoFailText', {});
                this.clearTimer();
                this.getVerifyCodeModal();
            },

            errorContent() {
                this.$emit('update:videoFail', true);
                this.$emit('update:videoFailText', {
                    title: '获取验证码失败',
                    detail: '请重新获取验证码'
                });
            },

            iptChange(event) {
                if (this.timeHaveToStay === 0) {
                    this.clearTimer();
                    this.timeHaveToStay = 3;
                    this.$emit('videoResult', event, this.sessionId);
                }
            }
        },
        mounted() {
            // 弹出弹窗后，开始计时，3秒后用户可以开始录制视频
//             this.$refs.cameraInput.addEventListener('change', event => {
//                 this.$emit('videoResult', event, this.sessionId);
//                 this.clearTimer();
//             });
            var _this = this;
            api.addEventListener({
                name: 'videoRecorder'
            }, function (ret, err) {
                var filePath = ret.value.file;
//                alert(filePath);
                _this.timeHaveToStay = 3;
                _this.$emit('videoResult', filePath,_this.sessionId);
            });

        },
        beforeDestroy() {
            this.clearTimer();
        }
    };
</script>

<style lang="less">
    @color-white: #fff;
    @color-3: #333;

    .modal-layer {
        width: 100%;
        height: auto;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        &-mask {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            opacity: 0.45;
            background: #000;
            z-index: 1;
        }

        &-popup {
            width: 600px;
            height: 500px;
            background-color: @color-white;
            padding: 0 20px 20px ;
            position: fixed;
            left: 50%;
            top:380px;
            margin-left: -300px;
            z-index: 2;

            &-title {
                font-size: 35px;
                color: @color-3;
                height: 30px;
                line-height:30px;
                text-align: center;
                margin: 80px  0 40px 0;
            }

            &-content {
                font-size: 26px;
                color: #666;
                text-align: center;
                margin-bottom:30px;
                letter-spacing: 0;

                span {
                    color: #f00;
                }
            }

            &-number {
                font-size: 0;
                text-align: center;

                span {
                    font-size:55px;
                    color: @color-3;
                    display: inline-block;
                    width: 75px;
                    height: 95px;
                    line-height: 90px;
                    margin-right: 20px;
                    border: 2px solid #e1e1e1;
                    border-radius: 20px;
                    text-align: center;
                    box-sizing: border-box;
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }

        &-close {
            outline: none;
            position: absolute;
            width: 80px;
            height:80px;
            left: 50%;
            bottom: -200px;
            margin-left: -40px;
            background: url(../../../../static/face/images/icon_close.png) 0 0 no-repeat;
            background-size: 100% auto;
        }

        &-fail {

            &-icon {
                width: 110px;
                height: 110px;
                margin: 60px auto 40px;
                background: url(../../../../static/face/images/icon_fail.png) 0 0 no-repeat;
                background-size: 100% auto;
            }

            &-title {
                text-align: center;
                font-size: 38px;
                color: @color-3;
                margin-bottom: 20px;
            }

            &-detail {
                font-size:26px;
                color: #666;
                text-align: center;
            }

            &-restart {
                height: 70px;
                text-align: center;
                background: #0073eb;
                border-radius: 8px;
                line-height: 70px;
                position: absolute;
                width: 560px;
                bottom: 10px;
                font-size: 28px;
                color: @color-white;
            }
        }

        .modal-wrapper {
            height: 70px;
            text-align: center;
            background: #bcd2eb;
            border-radius: 8px;
            line-height: 70px;
            position: absolute;
            width: 560px;
            bottom: 20px;
            &.modal-point {
                background: #0073eb;
            }
        }

        .modal-confirm-btn {
            font-size: 28px;
            color: @color-white;
            width: 100%;
            height: 100%;
        }

        .camera-input {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }
</style>
