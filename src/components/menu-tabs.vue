<template>
    <div class="menu-tabs text-white">
        <div class="menu-tabs-item pull-left text-center" v-for="item in list" @click="changeTabs(item)"
             :class="{'active':currentMenu === item.id}">{{ item.name }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'menu-tabs',
        props: {
            currentMenu: {
                type: String,
                default: ''
            },
            list: {
                type: Array,
                default: []
            }
        },
        methods: {
            changeTabs(item) {
                this.$emit('change', item.id)
            }
        }
    }
</script>

<style lang="scss">
    .menu-tabs {
        width: 690px;
        font-size: 24px;
        margin: 0 auto;
        background-color: rgb(42, 42, 47);
        -webkit-border-radius: 8px 8px 8px 8px;
        -moz-border-radius: 8px 8px 8px 8px;
        border-radius: 8px 8px 8px 8px;
        overflow: hidden;
        border: 2px solid #8E8E90;
        .menu-tabs-item {
            width: 343px;
            height: 56px;
            line-height: 56px;
            &.active {
                background-color: #8E8E90;
            }
        }
    }
</style>
