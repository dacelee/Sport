<template>
    <div class="appeal-info">
        <div class="appeal-list-item">
            <div class="item-title">
                <div class="title">订单信息</div>
            </div>
            <div class="item-container">
                <div class="item-list">
                    <div class="left-label text-left">订单号</div>
                    <div class="right-details text-right">{{ orderNo }}</div>
                </div>
                <div class="item-list">
                    <div class="left-label">交易数量</div>
                    <div class="right-details">{{ orderNum }}</div>
                </div>
                <div class="item-list">
                    <div class="left-label">单价</div>
                    <div class="right-details">{{ unitPrice }}</div>
                </div>
                <div class="item-list">
                    <div class="left-label">总价</div>
                    <div class="right-details">{{ totalPrice }}</div>
                </div>
                <div class="item-list">
                    <div class="left-label">交易时间</div>
                    <div class="right-details">{{ time }}</div>
                </div>
            </div>
        </div>
        <div class="appeal-list-item">
            <div class="item-title">
                <div class="title">申诉说明</div>
            </div>
            <div class="item-container">
                <textarea></textarea>
            </div>
            <div class="item-title">申诉证据</div>
            <div class="photo">
                <l-icon name="shangchuantupian"/>
                <div class="text">上传图片{{ photoNum }}/1</div>
            </div>
        </div>
        <div class="btn">提交</div>
    </div>
</template>

<script>
    export default {
        name: 'appeal',
        data() {
            return {
                orderNo: '1123213231',
                orderNum: '1',
                unitPrice: '13213',
                totalPrice: '1232131',
                time: '2018/06/28 00:49:32',
                photoNum: 0
            }
        }
    }
</script>

<style lang="scss">
    .appeal-info {
        width: 100%;
        position: relative;
        .appeal-list-item {
            width: calc(100% - 60px);
            margin: 20px auto 0;
            background-color: #333339;
            padding: 30px 0 30px;
            .item-title {
                font-size: 30px;
                line-height: 30px;
                color: #ffffff;
                border-left: 5px solid #f8c513;
                padding: 0 30px 0;
                margin-bottom: 30px;
            }
            .item-container {
                padding: 30px 30px 30px;
                border-top: 1px solid #666666;
                .item-list {
                    width: 100%;
                    font-size: 30px;
                    line-height: 30px;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    &:nth-last-child(1) {
                        margin-bottom: 0;
                    }
                    .left-label {
                        color: #999999;
                    }
                }
                textarea {
                    background-color: #25252b;
                    width: 100%;
                    height: 360px;
                    padding: 30px 30px 30px;
                    font-size: 30px;
                    line-height: 40px;
                    color: #ffffff;
                }
            }
            .photo {
                width: 210px;
                height: 210px;
                background-color: #25252b;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                margin-left: 30px;
                .icons {
                    width: 60px;
                    height: 60px;
                    margin: 50px 70px 30px;
                }
                .text {
                    color: #999999;
                    text-align: center;
                    width: 100%;
                    font-size: 24px;
                    line-height: 24px;
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
