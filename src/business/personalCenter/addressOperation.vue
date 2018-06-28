<template>
    <div class="address-operation">
        <div class="add-address-item">
            <div class="left-label pull-left text-right">收货人</div>
            <div class="right-info pull-left">
                <input type="text" placeholder="">
            </div>
        </div>
        <div class="add-address-item">
            <div class="left-label pull-left text-right">联系方式</div>
            <div class="right-info pull-left">
                <input type="text" placeholder="">
            </div>
        </div>
        <div class="add-address-item">
            <div class="left-label label pull-left text-right">收货地址</div>
            <div class="right-details pull-left">
                <textarea></textarea>
            </div>
        </div>
        <div class="btn">保存</div>
    </div>
</template>

<script>
    export default {
        name: 'address-operation'
    }
</script>

<style lang="scss">
    .address-operation {
        .add-address-item {
            margin: 20px 0;
            width: 100%;
            overflow: hidden;
            .left-label {
                padding-right: 20px;
                color: #999999;
                width: 160px;
                font-size: 30px;
                line-height: 95px;
            }
            .right-details {
                width: 100%;
                padding: 30px 30px 30px;
                textarea {
                    background-color: #333339;
                    padding: 30px 30px 30px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                    width: 100%;
                    height: 240px;
                    color: #ffffff;
                    font-size: 30px;
                    line-height: 40px;
                }
            }
            .right-info {
                width: calc(100% - 200px);
                input {
                    width: 100%;
                    font-size: 30px;
                    line-height: 30px;
                    padding: 30px 30px 30px;
                    color: #ffffff;
                    background-color: #333339;
                    height: inherit;
                }
            }
        }
        .btn {
            position: absolute;
            bottom: 0;
            left: 0;
            background-color: #f8c513;
            color: #333333;
            text-align: center;
            font-size: 34px;
            line-height: 34px;
            padding: 30px 0 30px;
            width: 100%;
        }
    }
</style>
