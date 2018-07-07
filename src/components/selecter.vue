<template>
    <div class="l-select">
        <input type="text" class="l-select-input" readonly="readonly" :placeholder="placeholder" v-model="nVal.name"
               @click="toggleList">
        <l-icon class="select-tips-icon" name="fanhui" :class="{'active':showSelectList}"/>
        <div class="select-list" v-if="showSelectList">
            <li class="select-list-item" :class="{'active':nVal.id === item.id}" v-for="item in list"
                @click="selectItem(item)">{{
                item.name }}
            </li>
        </div>
    </div>
</template>

<script>
    let _this
    export default {
        name: 'l-select',
        props: {
            placeholder: {
                type: String,
                default: '请选择一个选项'
            },
            value: '',
            list: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                showSelectList: false,
                nVal: '',
            }
        },
        methods: {
            toggleList() {
                _this.showSelectList = !_this.showSelectList
            },
            selectItem(item) {
                _this.nVal = item
                _this.$emit('input', item)
                _this.showSelectList = false
            }
        },
        mounted() {
            _this = this
            _this.nVal = _this.value
            _this.list.forEach(function (item) {
                if (item.id === _this.nVal || item.id === _this.nVal.id) {
                    _this.nVal = item
                }
            })
            $('html').click(function () {
                _this.showSelectList = false
            })
            $(_this.$el).click(function (e) {
                e.stopPropagation()
            })
        }
    }
</script>

<style lang="scss">
    .l-select {
        width: 100%;
        margin: 0 auto;
        position: relative;
        .l-select-input {
            width: 100%;
            background-color: #33333a;
            color: #ffffff;
            font-size: 30px;
            line-height: 30px;
            padding: 30px 25px 30px 30px;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
        }
        .select-tips-icon {
            transform: rotate(-90deg);
            position: absolute;
            right: 30px;
            top: 35px;
            width: 30px;
            height: 30px;
            transition: 0.3s ease-in-out;
            &.active {
                transform: rotate(90deg);
                color: #ffd554;
            }
        }
        .select-list {
            padding: 10px 20px;
            background-color: #ffffff;
            color: #000000;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            position: absolute;
            width: 100%;
            z-index: 2;
            .select-list-item {
                font-size: 30px;
                line-height: 30px;
                padding: 25px 0 25px;
                border-bottom: 1px solid #d7dce6;
                &.active {
                    color: #ffd554;
                }
                &:nth-last-child(1) {
                    border-bottom: none;
                }
            }
        }
    }
</style>
