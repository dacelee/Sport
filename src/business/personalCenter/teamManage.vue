<template>
    <div class="team-manage">
        <div class="team-manage-page">
            <div class="team-list-item" v-for="item in list">
                <img :src="item.imgPath" alt="">
                <div class="name"><div>{{ item.userName }}</div><div>活跃度:{{ item.activity }}</div><div>团队活跃度:{{ item.teamactivity }}</div></div>

                <div class="personalAmount">团队人数<div>{{ item.amount }}</div></div>
            </div>
            <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
               <span slot="no-more">
                    暂无更多数据
               </span>
            </infinite-loading>
        </div>
        <div class="total-amount text-right">合计：{{ total }}人</div>
    </div>
</template>

<script>
    import users from '../../api/users.js'
    import InfiniteLoading from 'vue-infinite-loading'
    export default {
        name: 'team-manage',
        components: {
            InfiniteLoading,
        },
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
            infiniteHandler($state){
                users.loadMyGroupTeam(this,$state);
            }
        },
        mounted() {
            this.$nextTick(function () {
                var headerHeight = $("header").outerHeight(true);
                $(".team-manage-page").height($(window).height()-headerHeight-$(".total-amount").outerHeight(true));
            });

//            users.loadMyGroupTeam(this)
        },
        activated() {
            this.page = 1;
            this.list = [];
            this.$nextTick(function () {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            });
        }
    }
</script>

<style lang="scss">
    .team-manage {
        width: 100%;
        padding: 0 30px;
        .team-manage-page{  width: 100%;overflow-y:scroll;}
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
                margin-top: 15px;
            }
            .name {
                margin-left: 20px;
                float: left;
                line-height: 45px;
            }
            .personalAmount {
                float: right;
                line-height: 45px;
                text-align: center;
                padding-top: 20px;
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
