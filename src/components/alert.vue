<template>
    <div class="ui-alert" v-if="show">
        <div class="alert-container">
            <div class="alert-title text-center">{{ info.title ? info.title : '提示' }}</div>
            <div class="alert-content text-center" v-html="info.content ? info.content : '提示框内容'"></div>
            <div class="alert-btn">
                <div class="btn" v-if="isConfirm" @click="cancel">{{ info.cancelLabel ? info.cancelLabel : '取消' }}</div>
                <div class="btn btn-confirm" :class="{'alert':!isConfirm}" @click="ok">{{ info.confirmLabel ?
                    info.confirmLabel :
                    '确定' }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let _this, p
    export default {
        name: 'alert',
        data() {
            return {
                show: false,
                isConfirm: false,
                info: {},
            }
        },
        methods: {
            alert(obj) {
                Object.assign(_this.info, obj)
                _this.isConfirm = false
                console.log(_this.info)
                _this.show = true
            },
            confirm(obj) {
                _this.isConfirm = true
                _this.show = true
                let res, rej
                p = new Promise(function (resolve, reject) {
                    res = resolve
                    rej = reject
                    obj._res = res
                    obj._rej = rej
                })
                Object.assign(_this.info, obj)
                return p
            },
            ok() {
                if (_this.isConfirm) {
                    _this.show = false
                    _this.info._res()
                }
                else {
                    _this.show = false
                    _this.info._rej()
                }
            },
            cancel() {
                _this.show = false
            }
        },
        created() {
            _this = this
            window.App = {
                extend(sources) {
                    Object.assign(this, sources)
                }
            }
            App.extend({
                alert(obj) {
                    return _this.alert(obj)
                },
                confirm(obj) {
                    return _this.confirm(obj)
                }
            })
        }
    }
</script>

<style lang="scss">
    .ui-alert {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1025;
        background-color: rgba(0, 0, 0, 0.5);
        .alert-container {
            background-color: #ffffff;
            position: absolute;
            left: 50%;
            top: 50%;
            width: 550px;
            transform: translateX(-50%) translateY(-50%);
            box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);
            .alert-title {
                color: #000000;
                font-size: 30px;
                padding: 20px 20px 20px;
                line-height: 30px;
                width: 100%;
            }
            .alert-content {
                color: #333333;
                font-size: 30px;
                line-height: 40px;
                padding: 20px 20px 40px;
            }
            .alert-btn {
                display: flex;
                width: 100%;
                justify-content: space-between;
                .btn {
                    width: 50%;
                    background-color: #333339;
                    text-align: center;
                    color: #ffffff;
                    font-size: 30px;
                    line-height: 30px;
                    padding: 30px 0;
                    &.btn-confirm {
                        background-color: #f8c513;
                        color: #000000;
                    }
                    &.alert {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
