<template>
    <div class="appeal-info">
        <div class="appeal-list-item">
            <div class="item-title">
                <div class="title">订单信息</div>
            </div>
            <div class="item-container">
                <div class="item-list">
                    <div class="left-label">订单号</div>
                    <div class="right-details">{{ orderNo }}</div>
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
    </div>
</template>

<script>
    export default {
        name: 'appeal'
    }
</script>

<style scoped>

</style>
