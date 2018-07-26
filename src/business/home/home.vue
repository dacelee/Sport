<template>
    <div class="home">
        <div class="home-container">
            <div class="home-head">
                <l-banner2/>
            </div>
            <div class="home-notice" >
                <div class="left-icons pull-left" @click="noticeList">
                    <l-icon name="tongzhi-" />
                </div>
                <div class="right-container" @click="showNoticeDetails">
                    {{ news.title }}
                </div>
            </div>
            <div class="short-menu">
                <div class="short-menu-item text-center" v-for="item in shortMenuList"
                     @click="toShortMenu(item.router)">
                    <l-icon :name="item.icons" class="short-menu-icon"/>
                    <div class="short-menu-label">{{ item.name }}</div>
                </div>
            </div>
            <div class="step-container"  @click="showStepDetails">
                <div class="left-people">
                    <l-icon :name="Men ? 'nan' : 'nv'" v-if="!isRunning"/>
                    <img :src="Men ? './static/img/home/men.gif' : './static/img/home/woman.gif'" alt="" v-if="isRunning">
                </div>
                <div class="right-step-info">
                    <div  id="trading-charts" class="chart"></div>
                    <div class=" text-center" >
                        <div class="step-num-info">
                            {{ stepNum }} <span class="steps">步</span>
                        </div>
                        <div class="step-heat">{{ stepHeat }} 卡路里</div>
                    </div>
                </div>
            </div>
            <div class="reward-info text-center">今日奖励糖果:{{ rewardNum }}</div>
            <div class="user-basic-info">
                <div class="text-center user-basic-info-list">
                    <div class="basic-info-value isVip">{{ vipLevel }}</div>
                    <div class="basic-info-label">会员等级</div>
                </div>
                <div class="text-center user-basic-info-list">
                    <div class="basic-info-value">{{ activity }}</div>
                    <div class="basic-info-label">活跃度</div>
                </div>
                <div class="text-center user-basic-info-list">
                    <div class="basic-info-value">{{ totalReward }}</div>
                    <div class="basic-info-label">总糖果</div>
                </div>
                <div class="text-center user-basic-info-list">
                    <div class="basic-info-value">{{ contribution }}</div>
                    <div class="basic-info-label">贡献值</div>
                </div>
            </div>
        </div>
        <l-footerMenu :currentRoute.sync="route"/>
    </div>
</template>
<script type="text/javascript">
    let _this

    import users from '../../api/users.js'
    export default {
        name: 'home',
        data() {
            return {
                status:'',
                timer:0,
                news:'',
                route: 'home',
                shortMenuList: [],
                Men: false,
                isRunning: false,
                stepNum: 0,
                stepHeat: 0,
                rewardNum: '0',
                vipLevel: '',
                activity: 0,
                taskSteps:0,
                totalReward: 0,
                contribution: 0,
                getCoinUnit: 0,
                charts:null
            }
        },
        mounted() {
            _this = this;
            _this.getShortMenuList();
            this.loadNews();
            _this.pedometer.setBackAction(function (stepNum) {
//                console.info("home:"+stepNum);
                _this.backAction(stepNum);
            })
        }, activated() {
            if (!this.session.isLogin()) {
                this.$router.push('login');
                return;
            }
            this.status = "activated";
            var _this = this
            _this.loadData();
            users.getCacheMyInfo(this,function(user){
                _this.Men = user.sex=="男"?true:false;
            });
//            _this.pedometer.setBackAction(function (stepNum) {
////                console.info("home:"+stepNum);
//                _this.backAction(stepNum);
//            })
        },
        deactivated(){
            this.status = "deactivated";
//            this.pedometer.setBackAction(null);
        },
        methods: {
            showNoticeDetails() {
                _this.$router.push({name: 'articleDetails', params: {id: _this.news.id}})
            },
            getShortMenuList() {
                _this.shortMenuList = [
                    {
                        router: 'teamList',
                        name: '组队',
                        icons: 'zudui'
                    },
                    {
                        router: 'task',
                        name: '任务',
                        icons: 'renwu'
                    },
                    {
                        router: 'activity',
                        name: '活动',
                        icons: 'huodong'
                    },
                    {
                        router: 'newsList',
                        name: '资讯',
                        icons: 'zixun'
                    }
                ]
            },
            showStepDetails() {
                this.$router.push('stepDetails')
            },
            toShortMenu(router) {
                this.$router.push(router)
            },

            loadData() {
                //登录检测
                if (this.session.isLogin()) {
                    this.session.getMemberID(function (memberid) {
                        _this.axios.post(_this.session.indexinfo, {'memberid': memberid}, function (json) {
                            var data = json.data
                            _this.vipLevel = data.memberLevel
                            _this.activity = data.activity
                            _this.totalReward = parseFloat(data.cointotal).toFixed(2)
                            _this.contribution = parseInt(data.contributionvalue)

                        })
                        _this.axios.post(_this.session.todaystepinfo, {'memberid': memberid}, function (json) {
                            var data = json.data
                            _this.stepHeat = data.distance
                        })
                        var activity = 0
                        _this.axios.post(_this.session.myTask, {'memberid': memberid}, function (json) {
                            if(json.dataList.length>0){
                                _this.taskSteps = json.dataList[0].steps;
                            }
                            $(json.dataList).each(function (index, item) {
                                activity += item.activity
                            })
                            _this.axios.post(_this.session.myActivityAdd, {'memberid': memberid}, function (json) {
                                activity += json.data.activityadd
                                _this.activity = activity
                                _this.axios.post(_this.session.getCoinUnit, null, function (json) {
                                    _this.getCoinUnit = json.data.getcoinunit
                                    _this.stepNum = _this.pedometer.getSteps();
                                    if(isNaN(_this.stepNum)){
                                        _this.stepNum = 0;
                                    }
                                    if(isNaN(_this.activity)){
                                        _this.activity = 0;
                                    }
                                    var steps = _this.stepNum<_this.taskSteps?_this.stepNum:_this.taskSteps;
                                    _this.rewardNum = (steps * _this.getCoinUnit * _this.activity);
                                    _this.stepHeat = (steps*0.03175).toFixed(2);
                                    _this.eCharts();
                                }, function (json) {
                                    _this.$Message.error(json.msg)
                                })
                            }, function (json) {
                                _this.$Message.error(json.msg)
                            })

                        }, function (json) {
                            _this.$Message.error(json.msg)
                        })
                    });
                }
            },
            backAction(stepNum){
                if(this.status=="deactivated"){
                    return;
                }
                this.stepNum = stepNum;
                var steps = this.stepNum<this.taskSteps?this.stepNum:this.taskSteps;
                this.rewardNum = (steps * this.getCoinUnit * this.activity);
                this.stepHeat = (steps*0.03175).toFixed(2);
                this.isRunning = true;
                clearTimeout(this.timer);
                var _this = this;
                this.timer = setTimeout(function(){
                    _this.isRunning = false;
                },2000);
                this.eCharts();
            },
            eCharts(){
//                alert(this.stepNum);
                this.charts = this.$echarts.init(document.getElementById('trading-charts'));
                var total = this.taskSteps-this.stepNum;
                var step = this.stepNum;
                if(total<=0){
                    total = 0;
                    step = 3000;
                }
                var _this = this;
                var option = {
                    title: {
                        show: false
                    },
                    tooltip: {
                        show: false
                    },
                    legend: {
                        show: false,
                    },
                    color:['#f8c513','#47474F'],
                    grid:{ left: '0',
                        right: '0',
                        bottom: '0',
                        top:'0'

                    },
                    series: [
                        {
                            name:'运动圈',
                            type:'pie',
                            radius: ['90%', '100%'],
                            avoidLabelOverlap: false,
                            legendHoverLink:false,
                            hoverAnimation:false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:step},
                                {value:total},
                            ]
                        }
                    ]
                };
                this.charts.setOption(option);
//                chartsEl.on('click', function (params) {
//                    console.log(params);
//                });
            },
            loadNews(){
                var _this = this;
                this.axios.post("/msg/notice", {'page': 1,pageSize:1}, function (json) {
                    var news = json.dataList;
                    $(news).each(function (index, item) {
                        _this.news = item;
                    })
                })
            },
            noticeList(){
                this.$router.push({name: 'articleList', query: {type:1}})
            }
        }
    }

</script>

<style lang="scss">
    .home {
    
    }
    
    .home-container {
        overflow: hidden;
        padding-bottom: 120px;
        .home-head {
            width: 750px;
            .head-img {
                width: 750px;
            }
        }
        .home-notice {
            line-height: 32px;
            font-size: 32px;
            padding: 28px 30px;
            width: calc(100% - 60px);
            border-bottom: 1px solid #000000;
            margin: 0 auto;
            .left-icons {
                margin-right: 30px;
                .icons {
                    width: 32px;
                    height: 32px;
                }
            }
        }
        .short-menu {
            padding: 40px 0 50px;
            width: calc(100% - 60px);
            border-bottom: 1px solid #000000;
            margin: 0 auto;
            .short-menu-item {
                width: 25%;
                display: inline-block;
                .short-menu-icon {
                    width: 60px;
                    height: 60px;
                }
                .short-menu-label {
                    font-size: 30px;
                    line-height: 30px;
                    margin-top: 20px;
                }
            }
        }
        .step-container {
            padding: 50px 40px 60px 80px;
            display: flex;
            justify-content: space-between;
            .left-people {
                width: 191px;
                height: 314px;
                margin-top: 20px;
                .icons {
                    width: 280px;
                    height: 314px;
                }
                img {
                    width: 320px;
                    margin-left: -30px;
                }
            }
            .right-step-info {
                width: 330px;
                height: 330px;
                position: relative;
                .circleProgress {
                    width: 330px;
                    height: 330px;
                    border: 20px solid transparent;
                    border-radius: 50%;
                    position: absolute;
                    border-top: 20px solid #f8c513;
                    border-right: 20px solid #f8c513;
                    top: -20px;
                    left: -20px;
                    z-index: 1;
                    ::before {
                        -webkit-border-radius: 20px 0 0 20px;
                        -moz-border-radius: 20px 0 0 20px;
                        border-radius: 20px 0 0 20px;
                    }
                    ::after {
                    
                    }
                }
                .chart{position: absolute;top:0px;left: 0px;width: 100%;height: 100%; }
                .rightcircle {
                    border-top: 10px solid green;
                    border-right: 10px solid green;
                    right: 0;
                }
                .step-num-info {
                    width: 230px;
                    padding-bottom: 10px;
                    margin: 102px auto 0;
                    border-bottom: 4px solid #666666;
                    color: #FFD554;
                    overflow: hidden;
                    font-size: 60px;
                    line-height: 60px;
                    .steps {
                        font-size: 30px;
                        line-height: 30px;
                        display: inline-block;
                    }
                }
                .step-heat {
                    font-size: 30px;
                    line-height: 30px;
                    margin-top: 14px;
                }
            }
        }
        .reward-info {
            font-size: 28px;
            line-height: 28px;
            color: #ffd554;
        }
        .user-basic-info {
            margin-top: 50px;
            padding: 0 40px 0 40px;
            display: flex;
            justify-content: space-between;
            text-align: center;
            .user-basic-info-list {
                width: 120px;
                .basic-info-value {
                    margin-bottom: 20px;
                    height: 48px;
                    line-height: 48px;
                    font-size: 48px;
                    &.isVip {
                        background: #ffd554;
                        color: #000000;
                        height: 40px;
                        line-height: 40px;
                        margin: 4px auto 24px;
                        font-size: 36px;
                        -webkit-border-radius: 25px;
                        -moz-border-radius: 25px;
                        border-radius: 25px;
                        width: 96px;
                    }
                }
                .basic-info-label {
                    font-size: 24px;
                    line-height: 24px;
                }
            }
        }
    }
</style>
