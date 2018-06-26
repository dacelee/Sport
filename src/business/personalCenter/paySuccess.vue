<template>
    <div class="pay-success">
        <div class="text-center">
            <l-icon name="chenggong" class="success-icon"/>
        </div>
        <div class="title text-center">支付成功</div>
        <div class="details text-center">您购买的糖果支付成功<br/>请前往个人中心查看</div>
    </div>
</template>

<script>
    export default {
        name: 'pay-success'
    }
</script>

<style lang="scss">
    .pay-success {
        .success-icon {
            width: 100px;
            height: 100px;
            margin-top: 280px;
        }
        .title {
            font-size: 34px;
            margin: 43px auto 120px;
        }
        .details {
            font-size: 28px;
            color: #999999;
            line-height: 48px;
        }
    }
</style>
