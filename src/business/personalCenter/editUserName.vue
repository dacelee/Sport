<template>
    <div class="edit-user-name">
        <input type="text" placeholder="请输入姓名">
    </div>
</template>

<script>
    export default {
        name: 'edit-user-name',
        methods: {
            editEvent() {
                this.$router.push('/verifiedForm')
            }
        }
    }
</script>

<style lang="scss">
    .edit-user-name {
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
