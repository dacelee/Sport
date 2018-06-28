<template>
    <div class="verified-form">
        <div class="verified-form-item" v-for="item in list" :class="{'split':item.split}"
             @click="item.type === 1 ? changePage(item.route) : ''">
            <div class="label">{{ item.name }}</div>
            <div class="value">
                {{ item.value ? item.value : '请填写' }}
                <l-icon name="fanhui" v-if="!item.value || item.value === ''"/>
            </div>
        </div>
        <div class="btn" @click="faceRecognition">提交</div>
    </div>
</template>

<script>
    export default {
        name: 'verified-form',
        data() {
            return {
                list: [
                    {
                        name: '姓名',
                        value: '',
                        route: 'editUserName',
                        type: 1
                    },
                    {
                        name: '身份证',
                        value: '',
                        route: 'editIdCard',
                        type: 1
                    },
                    {
                        name: '手机号',
                        value: '',
                        route: 'editPhoneNum',
                        type: 1
                    },
                    {
                        name: '银行卡',
                        value: '',
                        route: 'editBankCard',
                        type: 1,
                        split: true
                    },
                    {
                        name: '支付宝',
                        value: '',
                        route: 'editAliPayForm',
                        type: 1
                    }
                ]
            }
        },
        methods: {
            changePage(route) {
                this.$router.push(route)
            },
            faceRecognition() {
                this.$router.push('/faceRecognition')
            }
        }
    }
</script>

<style lang="scss">
    .verified-form {
        width: 100%;
        .verified-form-item {
            width: 100%;
            background-color: #333339;
            font-size: 30px;
            line-height: 30px;
            color: #999999;
            padding: 30px 30px 30px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #25252B;
            .icons {
                transform: rotate(180deg);
            }
            &.split {
                margin-top: 20px;
            }
        }
        .btn {
            background-color: #F8C513;
            color: #25252B;
            text-align: center;
            padding: 30px 0;
            position: absolute;
            bottom: 0;
            width: 100%;
            font-size: 34px;
            line-height: 34px;
        }
    }
</style>
