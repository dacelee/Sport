<template>
    <div class="activityList">
        <l-head>
         <l-icon name="fanhui" @click.native="$router.push('clubDetails')" slot="left-item"/>
             活动
        <div class="btn text-white" slot="right-item" @click="publishActivity">发布活动</div>
        </l-head>
        <div class="activityList-container">
            <div class="activityList-item" v-for="item in list">
                <div class="left-img pull-left" @click="toDetails(item)">
                    <img :src="item.imgPath" alt="">
                </div>
                <div class="right-container pull-left">
                    <div class="left-basic-info text-white pull-left">
                        <div class="name">{{ item.name }}
                        </div>
                        <div class="club-num-info">
                            {{ item.theTime }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let _this
    export default {
        name: 'activityList',
        data() {
            return {
                router: 'activityList',
                filterName: '',
                list: [
                    {
                        imgPath: 'static/img/club/1.jpg',
                        name: '大波超酷炫的跑步活动来袭 你想 去哪个？',
                        theTime: '2018.5.14 12:33'
                    },
                    {
                        imgPath: 'static/img/club/2.jpg',
                        name: '大波超酷炫的跑步活动来袭你想去哪个？',
                        theTime: '2018.5.14 12:33'
                    },
                    {
                        imgPath: 'static/img/club/3.jpg',
                        name: '酷跑狂人',
                        theTime: '2018.5.14 12:33'
                    },
                    {
                        imgPath: 'static/img/club/4.jpg',
                        name: '大波超酷炫的跑步活动来袭 你想 去哪个？',
                        theTime: '2018.5.14 12:33'

                    }
                ]
            }
        },
        methods: {
            reset() {
                console.log(this.filterName)
            },
            publishActivity() {
                _this.$router.push('publishActivity')
            }
        },
        mounted() {
            _this = this
        }
    }
</script>

<style lang="scss">
    .activityList {
        .head-title {
            height: 80px;
            line-height: 80px;
            font-size: 34px;
            background: #404049;
            position: relative;
            .btn {
                position: absolute;
                height: 30px;
                line-height: 30px;
                font-size: 30px;
                z-index: 2;
                top: 25px;
                right: 30px;
            }
        }
        .search-area {
            margin: 20px auto;
        }
        .activityList-container {
            width: calc(100% - 60px);
            margin: 0 auto;
            .activityList-item {
                width: 100%;
                height: 159px;
                background: #333339;
                margin: 20px auto 20px;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
                padding: 30px 25px 30px 30px;
                .left-img {
                    width: 100px;
                    height: 100px;
                    img {
                        width: 100px;
                        height: 100px;
   
                    }
                }
                .right-container {
                    margin-left: 20px;
                    width: calc(100% - 130px);
                    .left-basic-info {
                        width: calc(100% - 0);
                        .name {
                            font-size: 32px;
                            line-height: 32px;
                           
                            .icons {
                                width: 100px;
                                height: 32px;
                                margin-left: 10px;
                            }
                        }
                        .club-num-info {
                            font-size: 24px;
                            line-height: 24px;
                            color: #999999;
                            margin-top: 20px;
                            .activity-count {
                                margin-left: 20px;
                            }
                        }
                    }
                    .right-distance {
                        width: 100px;
                        margin-left: 15px;
                        .icons {
                            width: 30px;
                            height: 30px;
                            color: #ffffff;
                            margin-top: 18px;
                        }
                        .distance-num {
                            font-size: 24px;
                            line-height: 24px;
                            margin-top: 10px;
                        }
                    }
                }
            }
        }
    }
</style>
