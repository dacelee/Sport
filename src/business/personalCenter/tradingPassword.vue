<template>
    <div class="trading-password">
        <div class="trading-password-list">
            <div class="trading-password-item">
                <input type="text" placeholder="请输入原密码">
            </div>
            <div class="trading-password-item">
                <input type="text" placeholder="请输入新密码">
            </div>
            <div class="trading-password-item">
                <input type="text" placeholder="请确认新密码">
            </div>
            <div class="btn">提&emsp;交</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'trading-password'
    }
</script>

<style lang="scss">
    .trading-password {
        .trading-password-list {
            padding-top: 50px;
            .trading-password-item {
                width: 690px;
                margin: 0 auto 40px;
                input {
                    font-size: 28px;
                    line-height: 28px;
                    padding: 35px 30px;
                    -webkit-border-radius: 8px;
                    -moz-border-radius: 8px;
                    border-radius: 8px;
                    background-color: rgba(255, 255, 255, 0.9);
                    color: #000;
                    height: inherit;
                    margin-bottom: 0;
                    border: none;
                }
            }
            .btn {
                background-color: #F8C513;
                color: #25252B;
                font-size: 34px;
                line-height: 34px;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                padding: 32px 0;
                text-align: center;
            }
        }
    }
</style>
