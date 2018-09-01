<template>
    <div class="logistics">
        <div class="logistics-list">
            <div class="logistics-list-item" v-for="item in list">
                <div class="date-time">{{ item.dateTime }}</div>
                <div class="point"></div>
                <div class="status">{{ item.status }}</div>
                <div class="logistics-info">{{ item.info }}</div>
            </div>
        </div>
    </div>
</template>
<script>
    import goods from '../../api/goods.js'
    export default {
        name: 'logistics',
        data() {
            return {
                list: [
                    {
                        dateTime: '',
                        info: '物流信息查询中...',
                        status: '',
                    },
//                    {
//                        dateTime: '昨天 14:32',
//                        info: '[代收点]您的快件已存放至菜鸟驿站，地址：湖南省长沙市你猜区你猜栋你猜号',
//                        status: '待取件',
//                    },
//                    {
//                        dateTime: '昨天 14:00',
//                        info: '配送员[你大爷]正在开始派件，请您耐心等候',
//                        status: '派件中'
//                    },
//                    {
//                        dateTime: '昨天 04:00',
//                        info: '[长沙市]快递公司已收入，准备派送员进行派件',
//                        status: '待派件'
//                    },
//                    {
//                        dateTime: '昨天 05:00',
//                        info: '随便搞段文字描述一下算了',
//                        status: '运输中'
//                    },
//                    {
//                        dateTime: '04-03 01:00',
//                        info: '随便搞段文字了，不晓得描述了',
//                        status: '已取件'
//                    },
//                    {
//                        dateTime: '04-02 14:32',
//                        info: '随便搞段文字了，不晓得描述了',
//                        status: '待取件'
//                    }
                ]
            }
        },
        activated () {
            var orderId = this.$route.params.id
            goods.loadLogistics(this,orderId);
        },
        mounted() {
            var _this = this
            _this.$nextTick(function () {
                let height = $('.view-container').height()
                $(_this.$el).css('min-height', height)
            })
        }
    }
</script>

<style lang="scss">
    .logistics {
        width: 100%;
        padding-bottom: 0 !important;
        background-color: #f5f5f5;
        color: #666666;
        .logistics-list {
           padding-top: 20px;
            padding-bottom: 50px;
        }
        .logistics-list-item {
            position: relative;
            width: calc(100% - 150px);
            padding: 30px 0 30px 60px;
            border-left: 1px solid #666666;
            margin-left: 150px;
            .date-time {
                position: absolute;
                margin-left: -180px;
                width: 100px;
                text-align: center;
            }
            .point {
                width: 16px;
                height: 16px;
                -webkit-border-radius: 100%;
                -moz-border-radius: 100%;
                border-radius: 100%;
                background-color: #666666;
                position: absolute;
                margin-left: -68px;
            }
            .status {
                font-size: 32px;
                line-height: 32px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .logistics-info {
                font-size: 24px;
                line-height: 34px;
            }
            &:nth-child(1) {
                color: #ff9900 !important;
                padding: 0 0 0 60px;
                .point {
                    background-color: #ff9900;
                }
            }
        }
    }
</style>
