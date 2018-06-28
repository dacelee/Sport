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
        <div class="btn">开始</div>
    </div>
</template>

<script>
    let _this
    export default {
        name: 'face-recognition',
        mounted() {
            _this = this
            _this.$nextTick(function () {
                $(_this.$el).css('min-height', $('.view-container').height())
            })
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
        }
    }
</style>
