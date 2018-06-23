<template>
    <div class="edit-aliPay-num">
        <input type="text" placeholder="请输入支付宝账号">
    </div>
</template>

<script>
    export default {
        name: 'edit-aliPay-num',
        methods: {
            editEvent() {
                this.$router.push('/verifiedForm')
            }
        }
    }
</script>

<style lang="scss">
    .edit-aliPay-num {
        input {
            width: 100%;
            font-size: 30px;
            line-height: 30px;
            padding: 30px 30px 30px;
            color: #ffffff;
            background-color: #333339;
            margin-top: 20px;
            height: inherit;
        }
    }
</style>
