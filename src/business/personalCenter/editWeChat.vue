<template>
    <div class="edit-we-chat">
        <input type="text" placeholder="请输入微信号">
    </div>
</template>

<script>
    export default {
        name: 'edit-we-chat',
        methods: {
            editEvent() {
                this.$router.push('/basicInformation')
            }
        }
    }
</script>

<style lang="scss">
    .edit-we-chat {
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
