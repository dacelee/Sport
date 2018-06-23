<template>
    <div class="edit-nick">
        <input type="text" placeholder="请输入昵称">
    </div>
</template>

<script>
    export default {
        name: 'edit-nick',
        methods: {
            editEvent() {
                this.$router.push('/basicInformation')
            }
        }
    }
</script>

<style lang="scss">
    .edit-nick {
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
