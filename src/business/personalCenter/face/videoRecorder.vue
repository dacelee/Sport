<template>
    <div class="videoRecorder">
        <div class="action">
            <div class="btn" @click="start">开始</div>
            <div class="clear" @click="clear">取消</div>
        </div>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                videoRecorder:null,
                recoder:false
            }
        },
        deactivated(){
            this.videoRecorder.stop();
            this.videoRecorder.close();
        },
        activated() {
            this.open();
            this.recorder = false;
            $(".btn").html('开始');
            $(".btn").removeClass('stop');
        },
        methods: {
            open(){
                var _this = this;
                this.videoRecorder = api.require('videoRecorder');
                this.videoRecorder.open({
                    rect: {
                        x: 0,
                        y: 0,
                        w: api.frameWidth,
                        h: api.winHeight - $(" .videoRecorder .action").outerHeight(true)
                    },
                    quality: "480p",
                    saveToAlbum: false,
                    camera:'front',
                    save: {
                        path: 'fs://videoRecorder',
                    },
                    fixed: false
                }, function(ret) {
                    if (ret) {
                        if(ret.eventType =="finished"){
//                            alert(JSON.stringify(ret));
                            api.sendEvent({
                                name: 'videoRecorder',
                                extra: {
                                    file: ret.filePath
                                }
                            });
                            _this.videoRecorder.close();
                            _this.$router.go(-1);
                        }else if(ret.eventType =="fail"){
                            _this.$Message.error("无访问摄像头或麦克风权限");
                            this.$router.go(-1);
                        }
//                _this.$emit('videoResult', ret,_this.sessionId);
                    }
                });;
            },
            start(){
                if(!this.recorder){
                    this.videoRecorder.start({
                        timer: 8
                    });
                    this.recorder = true;
                    $(".btn").html('停止');
                    $(".btn").addClass('stop');
                }else{
                    this.videoRecorder.stop();

                }
            },
            clear(){
                this.videoRecorder.stop();
                this.videoRecorder.close();
                this.$router.go(-1);
            }
        }
    };
</script>

<style lang="scss">
    .videoRecorder .action{position: absolute;bottom: 0px;width: 100%;left: 0px;height: 180px;padding-top: 30px;text-align: center;
    .btn {
        font-size: 30px;
        border-radius: 50%;
        color: #000;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
        background: #F6B415;
        display: inline-block;
    }
    .stop{background-color: red;color:#FFF;}
    .clear{color: #Fff; font-size: 30px;position: absolute;right: 80px;top:0px;display: inline-block;top:45%;}
    }
</style>