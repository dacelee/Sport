<template>
    <div class="l-short-menu">
        <div class="short-menu-item text-center" v-for="item in list" :class="{'active':item.id === currentRoute}"
             @click="changeRoute(item.id)">{{ item.name }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'short-menu',
        props: {
            list: {
                type: Array,
                default: []
            },
            currentRoute: ''
        },
        methods: {
            changeRoute(route) {
                this.$emit('change', route)
            }
        }
    }
</script>

<style lang="scss">
    .l-short-menu {
        background-color: #25252B;
        border: 1px solid #999999;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        display: flex;
        justify-content: space-around;
        width: 690px;
        margin: 20px auto;
        .short-menu-item {
            font-size: 24px;
            line-height: 24px;
            padding: 18px 0;
            width: inherit;
            &.active {
                background-color: #8E8E90;
                color: #ffffff;
            }
        }
        .short-menu-item:nth-child(1) {
            -webkit-border-radius: 8px 0 0 8px;
            -moz-border-radius: 8px 0 0 8px;
            border-radius: 8px 0 0 8px;
        }
        .short-menu-item:nth-last-child(1) {
            -webkit-border-radius: 0 8px 8px 0;
            -moz-border-radius: 0 8px 8px 0;
            border-radius: 0 8px 8px 0;
        }
    }
</style>
