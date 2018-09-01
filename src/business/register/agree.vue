<template>
    <div class="register-container2">
        <div class="register-form"  v-html="data">
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: 'agrees',
        data() {
            return {
                data:"",

            }
        } ,
        mounted() {
            var header = $api.dom('.header-menu');
            var headerHeight = $api.fixStatusBar(header);
            var _this = this;
            this.axios.post("/member/agree", null, function (json) {
                _this.data=json.data.content;
            }, function (json) {

            });
        },
    }
</script>

<style lang="scss">
    .register-container2 {
        width: 750px;
        height: 100%;
        padding-bottom: 0 !important;
        background-color: #FFF;
        color:#000;
        overflow: scroll;
    .register-form {
        width: 580px;
        margin: 60px auto 0;
    .register-form-item {
        margin-bottom: 40px;
    input {
        font-size: 28px;
        line-height: 28px;
        padding: 35px 10px 35px 30px;
        width: 580px;
        background-color: rgba(255, 255, 255, 0.1);
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        color: #ffffff;
    &.validate-code-input {
         width: 360px;
     }
    }
    input::-webkit-input-placeholder {
        color: #bbb;
    }
    input:-moz-placeholder {
        color: #bbb;
    }
    input::-moz-placeholder {
        color: #bbb;
    }
    input:-ms-input-placeholder {
        color: #bbb;
    }
    .btn-validate-code {
        width: 188px;
        font-size: 28px;
        line-height: 28px;
        border: 2px solid #F8C513;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        color: #F8C513;
        padding: 35px 0;
    }
    &.register-btn {
         margin-top: 353px;
    .btn-register {
        width: 580px;
        font-size: 34px;
        line-height: 34px;
        background-color: #F8C513;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        color: #25252B;
        padding: 32px 0;
    }
    }
    }
    }
    }
</style>
