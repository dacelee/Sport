<template>
    <div class="imageClipcontent">
        <vueCropper
                ref="cropper"
                :img="option.img"
                :info="option.info"
                :outputSize="option.outputSize"
                :outputType="option.outputType"
                :canScale="option.canScale"
                :autoCrop="option.autoCrop"
                :fixed = "false"
                :canMoveBox="false"
                :fixedNumber = "option.fixedNumber"
                :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight"
                :fixedBox="option.fixedBox"
        ></vueCropper>
        <div class="clip_btn_save" @click="startCrop">
            确定
        </div>
    </div>
</template>
<script>
    import vueCropper from './vue-cropper'
    let _this
    export default {
        name: 'imageClip',
        data() {
//            var option = this.init();
            return {
                context:null,
                option: {}
            }
        },components: {
            vueCropper
        },
        methods: {
            startCrop(){
                var _this = this;
                this.$refs.cropper.getCropData(function(data){
                    api.sendEvent({
                        name: 'clip_success_'+_this.context,
                        extra: {
                            base64: data
                        }
                    });
                    _this.$router.go(-1);
                });
            },
            init(){
                var base64 = this.$route.params.base64;
                var autoCropWidth = this.$route.query.width||200;
                var autoCropHeight = this.$route.query.height||200;
                var fixedNumber = ["1:1"];
                if(autoCropWidth!=autoCropHeight){
                    fixedNumber =["1:"+(autoCropHeight/autoCropWidth)];
                }
                return {
                    img: base64,
                    info: false,
                    outputSize: 1,
                    outputType: 'png',
                    canScale: false,
                    autoCrop: true,
                    fixedNumber:fixedNumber,
                    autoCropWidth: autoCropWidth,
                    autoCropHeight: autoCropHeight,
                    fixedBox: true
                }
            }
        },
        activated(){
            var option = this.init();
            this.option = option;
            this.context = this.$route.query.context;
        },
        deactivated(){
            api.sendEvent({
                name: 'clip_end_'+this.context
            });
        },
        mounted() {
            _this = this;
            var height = $(window).height() - document.querySelector('header').offsetHeight - document.querySelector('.clip_btn_save').offsetHeight;
            $(".imageClipcontent").height(height);
        }
    }
</script>
<style lang="scss">
  .imageClipcontent {
      margin: auto;
      width: 100%;
      margin-bottom: 100px;

      .clip_btn_save {
          font-size: 34px;
          line-height: 34px;
          padding: 33px 0;
          background-color: #F8C513;
          color: #000;
          position: fixed;
          bottom: 0;
          left: 0;
          text-align: center;
          width: 750px;
      }

  }
</style>
