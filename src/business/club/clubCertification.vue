<template>
    <div class="clubCertification">
        <div class="select-upload" @click="toHome">
         <h4 class="title">营业执照</h4>
            <div class="upload-box text-center">
            <l-icon name="shimingrenzheng"/>
            <div class="select-upload-label text-center">上传营业执照</div>
            </div>
        </div>
        <div class="club-item mt-20">
            <div class="left-label pull-left">姓名</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入">
            </div>
        </div>
        <div class="club-item">
            <div class="left-label pull-left">身份证</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入">
            </div>
        </div>
        <div class="club-item">
            <div class="left-label pull-left">电话</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入">
            </div>
        </div>
         <div class="club-item">
            <div class="left-label pull-left">地址</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入">
            </div>
        </div>
        <div class="select-pic" @click="toHome">
         <h3 class="title">俱乐部介绍</h3>
                <div class="upload-box">
                  <div class="upload-pic text-center">
                   <l-icon name="shangchuantupian"/>
                  </div>
                <div class="select-upload-label text-center">上传图片 0/1</div>
                </div>
        </div>
        <div class="save-btn text-center" @click="clubCertificationSuccess">提交</div>
    </div>
</template>

<script>
let _this
    export default {
        name: 'clubCertification',
        methods: {
            reset() {
                console.log(this.filterName)
            },
            clubCertificationSuccess() {
                _this.$router.push('clubCertificationSuccess')
            }
        },
        mounted() {
            _this = this
        }
    }
</script>

<style lang="scss">
    .clubCertification {
        
        .select-upload {
        width:100%;
        background-color:#33333a;
        padding:10px 0  30px 0;
        margin-bottom:40px;
        .title{padding-left:30px;font-size:30px;color:#999;padding:15px 30px;}
        .upload-box{ 
            background-color:#25252B;
            width:auto;
            height:400px;
            margin:0 30px;
            border-radius:10px;
            .icons {
            width: 100px;
            height: 100px;
            color: #999999;
            margin-top:130px;
             }
        }
        .select-upload-label {
            color: #999999;
            font-size:30px;
            line-height: 30px;
            margin-top:20px;
            }
     }
     .select-pic {
        .title{font-size:30px;color:#999;padding:15px 0;}
        margin-bottom:0;
        margin-top:20px;
        background-color: #33333a;
        padding:10px 0 140px 30px;
        .upload-box{ 
            background-color:#25252B;
            width:210px;
            height:210px;
            border-radius:10px;
            .icons {
            width: 60px;
            height: 52px;
            padding-top:60px;
            color: #999999;
             }
        }
        .select-upload-label {
            color: #999999;
            font-size: 24px;
            line-height: 15px;
            margin-top:20px;
            }
     }
        padding-bottom: 60px;
        .club-item {
            width: 750px;
            overflow: hidden;
            margin-bottom: 0px;
            background-color: #33333a;
            height: 90px;
            .left-label {
                width: 100px;
                font-size: 30px;
                line-height: 30px;
                margin:30px 0 30px 30px;
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
                padding: 0 0 10px 0;
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
        .mt-20 {
            margin-top: -20px;
        }
    }
</style>
