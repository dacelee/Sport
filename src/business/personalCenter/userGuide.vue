<template>
    <div class="user-guide">
        <div class="content" v-html="content"></div>
    </div>
</template>

<script>
    let _this
    export default {
        name: 'user-guide',
        data() {
            return {
                content: '新手指引的文档介绍'
            }
        },
        mounted() {
            _this = this
        }
    }
</script>

<style lang="scss">
    .user-guide {
        .content {
            padding: 30px 30px 30px;
        }
    }
</style>
