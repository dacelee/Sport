<template>
    <div class="search-input">
        <input type="text" class="search-input-container" v-model="nVal"  @keyup.enter="responseFilter"
               :placeholder="placeholder">
        <l-icon name="sousuo"/>
    </div>
</template>

<script>
    export default {
        name: 'search-input',
        props: {
            placeholder: {
                type: String,
                default: '搜索'
            },
            value: null
        },
        data() {
            return {
                nVal: null
            }
        },
        deactivated() {
            this.nVal = ""
        },
        mounted() {
            this.nVal = this.value
        },
        methods: {
            responseFilter() {
                this.$emit('input', this.nVal)
                this.$emit('change')
            }

        }
    }
</script>

<style lang="scss">
    .search-input {
        width: calc(100% - 60px);
        height: 80px;
        position: relative;
        margin: 0 auto;
        .search-input-container {
            height: 80px;
            width: 100%;
            background-color: #33333a;
            padding-left: 80px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            color: #ffffff;
            font-size: 30px;
        }
        .icons {
            width: 30px;
            height: 30px;
            position: absolute;
            left: 30px;
            top: 25px;
        }
    }
</style>
