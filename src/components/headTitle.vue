<template>
    <div class="head-title text-center">
        <l-icon name="fanhui" class="back" @click.native="back"
                v-if="this.$route.name !== 'home' && this.$route.name !== 'personalCenter' && this.$route.name !== 'businessCenter' && this.$route.name !== 'club' && this.$route.name !== 'tradingCenter'"/>
        {{ name }}
        <l-icon name="shezhi" class="setting" @click.native="setting" v-if="this.$route.name === 'personalCenter'"/>
    </div>
</template>

<script>
    export default {
        name: 'head-title',
        props: {
            name: {
                type: String,
                default: '首页'
            }
        },
        methods: {
            back() {
                this.$router.go(-1)
            },
            setting() {
            
            }
        }
    }
</script>

<style lang="scss">
    .head-title {
        height: 80px;
        line-height: 80px;
        font-size: 34px;
        background: #404049;
        position: relative;
        .icons {
            position: absolute;
            width: 30px;
            height: 30px;
            z-index: 2;
            margin: 25px 0;
            &.back {
                left: 10px;
            }
            &.setting {
                right: 10px;
            }
        }
    }
</style>
