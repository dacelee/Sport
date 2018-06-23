<template>
    <div class="edit-id-card">
        <input type="text" placeholder="请输入身份证号码">
    </div>
</template>

<script>
    export default {
        name: 'edit-id-card',
        methods: {
            editEvent() {
                this.$router.push('/verifiedForm')
            }
        }
    }
</script>

<style lang="scss">
    .edit-id-card {
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
