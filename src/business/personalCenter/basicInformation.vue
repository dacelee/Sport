<template>
    <div class="basic-information">
        <div class="basic-information-item" @click="item.route ? changePage(item) : ''" v-for="item in list"
             :class="{'split':item.split,'isImg':item.imgPath}">
            <div class="label">{{ item.name }}</div>
            <div class="right">
                <div class="photo" v-if="item.imgPath">
                    <img :src="item.imgPath" alt="">
                </div>
                <div class="value" v-if="item.value">{{ item.value }}</div>
                <div class="value" v-if="item.isSex">{{ currentSex.name}}</div>
                <l-icon name="fanhui" v-if="item.showIcons"/>
            </div>
        </div>
        <l-selectOption :list="sexList" :selected="currentSex" @change="changeSex" v-if="showSexSelect"/>
    </div>
</template>

<script>
    export default {
        name: 'basic-information',
        data() {
            return {
                showSexSelect: false,
                currentSex: {
                    id: 1,
                    name: '帅哥'
                },
                sexList: [
                    {
                        id: 1,
                        name: '帅哥'
                    },
                    {
                        id: 2,
                        name: '美女'
                    }
                ],
                list: [
                    {
                        name: '头像',
                        imgPath: '/static/img/personal/default.jpg',
                        route: 'changeHead',
                        showIcons: true
                    },
                    {
                        name: 'ID',
                        value: '12031203213',
                    },
                    {
                        name: '昵称',
                        showIcons: true,
                        route: 'editNick',
                        split: true
                    },
                    {
                        name: '个性签名',
                        showIcons: true,
                        route: 'editSignature'
                    },
                    {
                        name: '性别',
                        showIcons: true,
                        route: 'selectSex',
                        isSex: true
                    },
                    {
                        name: '微信号',
                        showIcons: true,
                        route: 'editWeChat',
                        split: true
                    },
                    {
                        name: '支付宝号',
                        showIcons: true,
                        route: 'editAliPay',
                    }
                ]
            }
        },
        methods: {
            changeSex(data) {
                this.currentSex = data
                this.showSexSelect = false
            },
            changePage(data) {
                if (data.isSex) {
                    this.showSexSelect = true
                }
                else {
                    this.$router.push(data.route)
                }
            }
        }
    }
</script>

<style lang="scss">
    .basic-information {
        width: 100%;
        .basic-information-item {
            padding: 30px 30px 30px;
            position: relative;
            display: flex;
            justify-content: space-between;
            background-color: #333339;
            color: #999999;
            font-size: 30px;
            line-height: 30px;
            border-bottom: 1px solid #000000;
            .right {
                display: flex;
                justify-content: space-between;
            }
            &.isImg {
                line-height: 160px;
                height: 220px;
                img {
                    margin-right: 30px;
                    width: 160px;
                    height: 160px;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    border-radius: 100%;
                }
                .icons {
                    margin-top: 65px;
                }
            }
            .value {
                color: #ffffff;
            }
            .icons {
                transform: rotate(180deg);
            }
            &.split {
                margin-top: 20px;
            }
        }
    }
</style>
