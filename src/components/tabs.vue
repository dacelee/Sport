<template>
    <div class="l-tabs">
        <div class="tabs-item" v-for="item in list" :class="{'active':item.id === current}"
             @click="changeRoute(item.id)">{{ item.name }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tabs',
        props: {
            list: {
                type: Array,
                default: []
            },
            current: ''
        },
        methods: {
            changeRoute(route) {
                this.$emit('change', route)
            }
        }
    }
</script>

<style lang="scss">
    .l-tabs {
        background-color: #404148;
        display: flex;
        justify-content: center;
        .tabs-item {
            font-size: 28px;
            line-height: 28px;
            padding: 30px 0 27px;
            border-bottom: 3px solid #404148;
            color: #999999;
            margin: 0 36px;
            &.active {
                border-color: #F8C513;
                color: #ffffff;
            }
        }
    }
</style>
