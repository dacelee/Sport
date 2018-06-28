<template>
    <div class="order-list">
        <l-tabs :list="statusList" :current="status" @change="changeRoute"/>
        <div class="order-list-item" v-for="item in list" @click="showDetails(item)">
            <div class="photo">
                <img :src="item.imgPath" alt="">
            </div>
            <div class="details">
                <div class="name">{{ item.name }}</div>
                <div class="user-name">{{ item.userName }}</div>
                <div class="time">{{ item.time }}</div>
            </div>
            <div class="status">
                {{ item.status }}
            </div>
        </div>
    </div>
</template>

<script>
    let _this
    export default {
        name: 'order-list',
        data() {
            return {
                status: 'all',
                statusList: [
                    {
                        id: 'all',
                        name: '全部'
                    },
                    {
                        id: 'pending',
                        name: '待付款'
                    },
                    {
                        id: 'appeal',
                        name: '申诉中'
                    },
                    {
                        id: 'canceled',
                        name: '已取消'
                    }
                ],
                list: [
                    {
                        id: 1,
                        imgPath: '/static/img/personal/default.jpg',
                        name: '买入活力币',
                        userName: 'Faker',
                        time: '2018.06.24 18:29',
                        status: '待付款'
                    },
                    {
                        id: 2,
                        imgPath: '/static/img/personal/default.jpg',
                        name: '买入活力币',
                        userName: 'Faker',
                        time: '2018.06.24 18:29',
                        status: '待付款'
                    },
                    {
                        id: 3,
                        imgPath: '/static/img/personal/default.jpg',
                        name: '买入活力币',
                        userName: 'Faker',
                        time: '2018.06.24 18:29',
                        status: '待付款'
                    },
                    {
                        id: 4,
                        imgPath: '/static/img/personal/default.jpg',
                        name: '买入活力币',
                        userName: 'Faker',
                        time: '2018.06.24 18:29',
                        status: '待付款'
                    }
                ]
            }
        },
        methods: {
            changeRoute(res) {
                this.status = res
            },
            showDetails(data) {
                this.$router.push({name: 'transactionDetails', params: {id: data.id}})
            }
        },
        mounted() {
            _this = this
            this.$nextTick(function () {
                let height = $('.view-container').height()
                $(_this.$el).css('min-height', height)
            })
        }
    }
</script>

<style lang="scss">
    .view-container .order-list {
        padding-bottom: 0 !important;
    }
    
    .order-list {
        width: 100%;
        height: 100%;
        background-color: #F5F5F5;
        .order-list-item {
            width: 100%;
            padding: 30px 30px 30px;
            background-color: #ffffff;
            color: #333333;
            display: flex;
            justify-content: flex-start;
            margin-bottom: 20px;
            .photo {
                width: 120px;
                height: 120px;
                margin-right: 30px;
                img {
                    width: 120px;
                    height: 120px;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    border-radius: 100%;
                }
            }
            .details {
                width: calc(100% - 270px);
                .name {
                    font-size: 30px;
                    line-height: 30px;
                    margin-bottom: 20px;
                    margin-top: 6px;
                }
                .userName {
                    font-size: 24px;
                    line-height: 24px;
                    margin-bottom: 10px;
                }
                .time {
                    font-size: 24px;
                    line-height: 24px;
                    color: #666666;
                }
            }
            .status {
                font-size: 30px;
                line-height: 120px;
                color: #F5A623;
            }
        }
    }
</style>
