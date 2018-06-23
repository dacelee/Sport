<template>
    <div class="select-option">
        <div class="select-container">
            <div class="select-list-item" v-for="item in list" @click="selectData(item)">
                {{ item.name }}
                <l-icon name="dagou" v-if="item.id === selected.id"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'select-option',
        props: {
            list: {
                type: Array,
                default: []
            },
            selected: {
                type: Object,
                default: {
                    id: '',
                    name: ''
                }
            }
        },
        methods: {
            selectData(data) {
                this.$emit('change', data)
            }
        }
    }
</script>
<style lang="scss">
    .select-option {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        .select-container {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            .select-list-item {
                font-size: 30px;
                line-height: 30px;
                padding: 30px 30px 30px;
                background-color: #404049;
                width: 100%;
                position: relative;
                color: #ffffff;
                border-top: 1px solid #000000;
                .icons {
                    position: absolute;
                    right: 30px;
                }
            }
        }
    }
</style>
