<template>
    <div class="club-list">
        <div class="search-area">
            <l-search placeholder="搜索" v-model="filterName" @change="reset"/>
        </div>
        <div class="club-list-container">
            <div class="club-list-item" v-for="item in list">
                <div class="left-img pull-left" @click="toDetails(item)">
                    <img :src="item.imgPath" alt="">
                </div>
                <div class="right-container pull-left">
                    <div class="left-basic-info text-white pull-left">
                        <div class="name">{{ item.name }}
                            <l-icon
                                :name="item.status === 0 ? 'wochuangjian' : item.status === 1 ? 'yijiaru' : item.status === 2 ? 'renzheng' : ''"
                                v-if="item.status !== 3"/>
                        </div>
                        <div class="club-num-info">
                            <div class="people-count pull-left">人数:{{ item.peopleCount }}</div>
                            <div class="activity-count pull-left">活跃:{{ item.activity }}</div>
                        </div>
                    </div>
                    <div class="right-distance text-center pull-left">
                        <l-icon name="juli1"/>
                        <div class="distance-num">{{ item.distance }}</div>
                    </div>
                </div>
            </div>
        </div>
        <l-footerMenu :currentRoute="route"/>
    </div>
</template>

<script>
let _this
    export default {
        name: 'club-list',
        data() {
            return {
                route: 'club',
                filterName: '',
                list: [
                    {
                        imgPath: 'static/img/club/1.jpg',
                        name: '旋风无敌小队',
                        peopleCount: 12350,
                        activity: 8987,
                        status: 0,
                        distance: '500m'
                    },
                    {
                        imgPath: 'static/img/club/2.jpg',
                        name: '夜跑都市人',
                        peopleCount: 4210,
                        activity: 3511,
                        status: 1,
                        distance: '1.5km'
                    },
                    {
                        imgPath: 'static/img/club/3.jpg',
                        name: '酷跑狂人',
                        peopleCount: 147,
                        activity: 131,
                        status: 2,
                        distance: '500m'
                    },
                    {
                        imgPath: 'static/img/club/4.jpg',
                        name: '减肥跑步俱乐部',
                        peopleCount: 312,
                        activity: 224,
                        status: 3,
                        distance: '3.4km'
                    }
                ]
            }
        },
        methods: {
            reset() {
                console.log(this.filterName)
            },
            editEvent() {
                _this.$router.push('createClub')
            },
            toDetails(item) {
                let _this = this
                _this.$router.push({name: 'clubDetails', params: {id: item.id}})
            }
        },
        mounted() {
            _this = this
        }
    }
</script>

<style lang="scss">
    .club-list {
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
        .club-list-container {
            width: calc(100% - 60px);
            margin: 0 auto;
            .club-list-item {
                width: 100%;
                height: 159px;
                background: #333339;
                margin: 0 auto 20px;
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
                        -webkit-border-radius: 100%;
                        -moz-border-radius: 100%;
                        border-radius: 100%;
                    }
                }
                .right-container {
                    margin-left: 20px;
                    width: calc(100% - 175px);
                    .left-basic-info {
                        width: calc(100% - 120px);
                        .name {
                            font-size: 32px;
                            line-height: 32px;
                            margin-top: 12px;
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
