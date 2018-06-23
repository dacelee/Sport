<template>
    <div class="select-gender">
        <l-head>
            <l-icon name="fanhui" @click.native="$router.push('/register')" slot="left-item"/>
            选择性别
        </l-head>
        <div class="select-gender-form">
            <div class="select-gender-item" @click="toHome('女')">
                <l-icon name="woshimeinv" class="text-center"/>
                <div class="select-gender-label text-center">我是美女</div>
            </div>
            <div class="select-gender-item" @click="toHome('男')">
                <l-icon name="woshishuaige" class="text-center"/>
                <div class="select-gender-label text-center">我是帅哥</div>
            </div>
            <div class="select-gender-item tips-words">
                <div class="select-gender-label text-center">选择性别将享受更好的体验</div>
            </div>
        </div>
    </div>
</template>

<script>
    let _this;
    export default {
        name: 'select-gender',
        created() {
            _this = this;
        },
        methods: {
            toHome(sex) {
                var param = this.$route.params;
                param.sex = sex;
//                console.log(param);
                //注册
                this.axios.post(this.session.reg,
                        param,function(data){
//                        console.log(data);
                            _this.$Message.info(data.msg);
                            _this.$router.replace('/login')
                        },function(data){
//                        console.log(data);
                            _this.$Message.error(data.msg);
                            _this.$router.replace("/register");

                        });

            }
        }
    }
</script>

<style lang="scss">
    .view-container{margin-top:0px;padding-top:0px;}
    .select-gender {
    .head-title {
        background-color: #25252B;
    }
    .select-gender-form {
    .select-gender-item {
        width: 360px;
        margin: 120px auto 0;
    .icons {
        width: 240px;
        height: 240px;
        margin: 0 60px 26px;
    }
    .select-gender-label {
        color: #999999;
        font-size: 30px;
        line-height: 30px;
    }
    &.tips-words {
         margin-top: 220px;
     }
    }
    }
    }
</style>
