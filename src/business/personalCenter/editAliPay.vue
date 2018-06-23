<template>
    <div class="edit-ali-pay">
        <input type="text" placeholder="请输入支付宝账号">
    </div>
</template>

<script>
    export default {
        name: 'edit-ali-pay',
        methods: {
            editEvent() {
                this.$router.push('/basicInformation')
            }
        }
    }
</script>

<style lang="scss">
    .edit-ali-pay {
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
