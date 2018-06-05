<template>
    <div class="select-gender">
        <div class="head-title text-center">
            <l-icon name="fanhui" class="left-icons" @click.native="$router.push('/register')"/>
            选择性别
        </div>
        <div class="select-gender-form">
            <div class="select-gender-item" @click="toHome">
                <l-icon name="woshimeinv" class="text-center"/>
                <div class="select-gender-label text-center">我是美女</div>
            </div>
            <div class="select-gender-item" @click="toHome">
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
    export default {
        name: 'select-gender',
        methods: {
            toHome() {
                this.$router.push('/')
            }
        }
    }
</script>

<style lang="scss">
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
