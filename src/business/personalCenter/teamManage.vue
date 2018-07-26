<template>
    <div class="team-manage">
        <Scroll :on-reach-bottom="handleReachBottom" :height="scrollHeight" :distance-to-edge="10">
            <div class="team-list-item" v-for="item in list">
                <img :src="item.imgPath" alt="">
                <div class="name">{{ item.userName }}</div>
                <div class="personalAmount">下线{{ item.amount }}人</div>
            </div>
            <div class="total-amount text-right">合计：{{ total }}人</div>
        </Scroll>
    </div>
</template>

<script>
    import users from '../../api/users.js'
    export default {
        name: 'team-manage',
        data() {
            return {
                total: 0,
                page:1,
                scrollHeight:0,
                list: [
//                    {
//                        imgPath: '/static/img/personal/default.jpg',
//                        userName: '游泳的鱼',
//                        amount: (Math.random() * 100).toFixed(0)
//                    },
//                    {
//                        imgPath: '/static/img/personal/default.jpg',
//                        userName: '游泳的鱼',
//                        amount: (Math.random() * 100).toFixed(0)
//                    },
//                    {
//                        imgPath: '/static/img/personal/default.jpg',
//                        userName: '游泳的鱼',
//                        amount: (Math.random() * 100).toFixed(0)
//                    }
                ]
            }
        },
        methods: {
            handleReachBottom () {
                var _this = this;
                return new Promise(function(resolve) {
                    users.loadMyGroupTeam(_this,resolve);
                });
            }
        },
        mounted() {
            this.$nextTick(function () {
                var headerHeight = $("header").outerHeight();
                this.scrollHeight = $(window).height()-headerHeight;
            })
            users.loadMyGroupTeam(this)
        }
    }
</script>

<style lang="scss">
    .team-manage {
        width: 100%;
        padding: 0 30px;
        .team-list-item {
            width: 100%;
            background-color: #333339;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            padding: 30px 30px 30px;
            margin-top: 20px;
            font-size: 30px;
            line-height: 80px;
            display: inline-block;
            img {
                width: 80px;
                height: 80px;
                -webkit-border-radius: 100%;
                -moz-border-radius: 100%;
                border-radius: 100%;
                float: left;
            }
            .name {
                margin-left: 20px;
                float: left;
            }
            .personalAmount {
                float: right;
            }
        }
        .total-amount {
            position: fixed;
            bottom: 0;
            left: 0;
            background-color: #333339;
            font-size: 34px;
            line-height: 34px;
            padding: 30px 30px 30px;
            width: 100%;
        }
    }
</style>
