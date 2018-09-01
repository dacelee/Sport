<template>
    <div class="home">
        <div class="home-container">
            <div class="home-head">
                <l-banner2/>
            </div>
            <div class="home-notice">
                <div class="left-icons pull-left" @click="noticeList">
                    <l-icon name="tongzhi-"/>
                </div>
                <div class="right-container" @click="showNoticeDetails">
                    {{ news.title||'&nbsp;' }}
                </div>
            </div>
            <div class="short-menu">
                <div class="short-menu-item text-center" v-for="item in shortMenuList"
                     @click="toShortMenu(item.router)">
                    <l-icon :name="item.icons" class="short-menu-icon"/>
                    <div class="short-menu-label">{{ item.name }}</div>
                </div>
            </div>
            <div class="step-container" @click="showStepDetails">
                <div class="left-people">
                    <l-icon :name="Men ? 'nan' : 'nv'" v-if="!isRunning"/>
                    <img :src="Men ? './static/img/home/men.gif' : './static/img/home/woman.gif'" alt=""
                         v-if="isRunning">
                </div>
                <div class="right-step-info">
                    <div id="trading-charts" class="chart"></div>
                    <div class=" text-center">
                        <div class="step-num-info">
                            {{ stepNum }} <span class="steps">步</span>
                        </div>
                        <div class="step-heat">{{ stepHeat }} 卡路里</div>
                    </div>
                </div>
            </div>
            <div class="reward-info text-center">今日奖励糖果:{{ rewardNum }}</div>
            <div class="user-basic-info">
                <div class="text-center user-basic-info-list" @click="linkTo('vipLevel')">
                    <div class="basic-info-value isVip" >{{ vipLevel }}</div>
                    <div class="basic-info-label">会员等级</div>
                </div>
                <div class="text-center user-basic-info-list" @click="linkTo('activityRecords')">
                    <div class="basic-info-value">{{ activity }}</div>
                    <div class="basic-info-label">活跃度</div>
                </div>
                <div class="text-center user-basic-info-list" @click="linkTo('candyRecords')">
                    <div class="basic-info-value">{{ totalReward }}</div>
                    <div class="basic-info-label">总糖果</div>
                </div>
                <div class="text-center user-basic-info-list" @click="linkTo('contributionRecords')">
                    <div class="basic-info-value">{{ contribution }}</div>
                    <div class="basic-info-label">贡献值</div>
                </div>
            </div>
        </div>
        <div class="alert-news-container">
            <div class="container">
                <div class="news-list">
                    <div class="news-list-item" @click="homeNewsDetail(homePosterId)">
                        <img :src="homePoster" width="100%"/>
                    </div>
                </div>
                <div class="lines"></div>
                <l-icon name="guanbi" @click.native="hideTips"/>
            </div>
        </div>
        <l-footerMenu :currentRoute.sync="route"/>
    </div>
</template>
<script type="text/javascript">
    import users from '../../api/users.js'
    import citys from '../../api/citys.js'
    export default {
        name: 'home',
        data() {
            return {
                status: '',
                timer: 0,
                news: '',
                route: 'home',
                shortMenuList: [],
                homePoster:'',
                homePosterId:0,
                Men: false,
                isRunning: false,
                stepNum: 0,
                stepHeat: 0,
                rewardNum: '0',
                vipLevel: '',
                activity: 0,
                taskSteps: 0,
                totalReward: 0,
                contribution: 0,
                getCoinUnit: 0,
                charts: null,
                showAd: true
            }
        },
        mounted() {
            var  _this = this
            _this.getShortMenuList()
            this.appUtil.addApiCloudEventListener("resume",function(ret, err){
                if(_this.status == 'activated'){
                    _this.showTips();
                }
            });
            this.appUtil.addApiCloudEventListener("pedometer",function(stepNum, err){
//                console.info("home:"+_this.status);
                _this.backAction(stepNum)
            });
        },
        activated() {
            if (!this.session.isLogin()) {
                this.$router.push('login');
                return;
            }
            // 以下是显示广告的
            this.loadNews();
            this.status = 'activated'
            var _this = this
            _this.loadData();
            users.getCacheMyInfo(this, function (user) {
                _this.Men = user.sex == '男' ? true : false
            })
            setTimeout(function(){
                _this.showTips();
            },2000);
        },
        deactivated() {
            this.status = 'deactivated'
        },
        methods: {
            showTips() {
                var _this =this;
                var homeNewShow = this.session.appCache("homeNewShow");
                if(homeNewShow){
                    return;
                }
                citys.bulidJSONCity(function (json) {
                    if (json.code == 1) {
                        setTimeout(function(){
                            _this.amap.getLocation(_this,function (ret) {
                                if (!ret.status) {
//                                    _this.$Message.error("定位失败");
                                    return;
                                }
    //                            console.log(JSON.stringify(ret));
                                var dbData = citys.locationToDBData(_this, ret);
                                if (dbData != null) {
                                    _this.axios.post("/msg/indextanchuang", {'cityid': dbData.cityid, page: 1, pageSize: 1}, function (json) {
                                        if(json.dataList.length>0){
                                            _this.homePosterId =json.dataList[0].id;
                                            _this.homePoster = json.dataList[0].logo;
                                            $('.alert-news-container').fadeIn()
                                            $('.container').stop(true, true).animate({top: 120})
                                            _this.session.appCache("homeNewShow",true);
                                        }
                                    })
                                }
                            },true)
                        },1000)
                    } else {
                        _this.$Message.error("加载城市数据失败");
                    }
                });

            },
            hideTips() {
                $('.alert-news-container').fadeOut()
                $('.container').stop(true, true).animate({top: 0})
            },
            showNoticeDetails() {
                this.$router.push({name: 'articleDetails', params: {id: this.news.id}})
            },
            getShortMenuList() {
                this.shortMenuList = [
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
                var   _this = this;
                if (this.session.isLogin()) {
                    this.session.getMemberID(function (memberid) {
                        _this.axios.post(_this.session.indexinfo, {'memberid': memberid}, function (json) {
                            var data = json.data
                            _this.vipLevel = data.memberLevel
                            _this.activity = data.activity
                            _this.totalReward = parseFloat(data.cointotal).toFixed(4)
                            _this.contribution = parseInt(data.contributionvalue);
                            
                        })
//                        _this.axios.post(_this.session.todaystepinfo, {'memberid': memberid}, function (json) {
//                            var data = json.data
//                            _this.stepHeat = data.distance
//                        })
                        _this.stepNum = _this.pedometer.getSteps();
                        if(isNaN(_this.stepNum)){
                            _this.stepNum = 0;
                        }
                        _this.stepHeat = (_this.stepNum*0.03175).toFixed(2);
                        _this.axios.post(_this.session.myTask, {'memberid': memberid}, function (json) {
                            if (json.dataList.length > 0) {
                                _this.taskSteps = json.dataList[0].steps
                            }else{
                                _this.taskSteps = 6000;
                            }
                            _this.axios.post(_this.session.getCoinUnit, null, function (json) {
                                _this.getCoinUnit = json.data.getcoinunit
                                var steps = _this.stepNum<_this.taskSteps?_this.stepNum:_this.taskSteps;
                                _this.rewardNum = (steps * _this.getCoinUnit * _this.activity).toFixed(8);
                                _this.eCharts();
                            }, function (json) {
                                _this.$Message.error(json.msg)
                            })
                        }, function (json) {
                            _this.$Message.error(json.msg)
                        })
                    })
                }
            },
            backAction(stepNum) {
                if (this.status == 'deactivated') {
                    return
                }
                if (stepNum != this.stepNum){
                        this.isRunning = true
                    clearTimeout(this.timer)
                    var _this = this
                    this.timer = setTimeout(function () {
                        _this.isRunning = false
                    }, 2000)
                }
                if (stepNum >= 0 && stepNum != this.stepNum) {
                    this.stepNum = stepNum
                    var steps = this.stepNum < this.taskSteps ? this.stepNum : this.taskSteps;
                    this.rewardNum = (steps * this.getCoinUnit * this.activity).toFixed(8)
                    this.stepHeat = (stepNum * 0.03175).toFixed(2);
                    this.eCharts()
                }


            },
            eCharts() {
                this.charts = this.$echarts.init(document.getElementById('trading-charts'))
                var total = this.taskSteps - this.stepNum
                var step = this.stepNum
                if (total <= 0) {
                    total = 0
                    step = 3000
                }
                var _this = this
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
                    color: [ '#f8c513', '#47474F' ],
                    grid: {
                        left: '0',
                        right: '0',
                        bottom: '0',
                        top: '0'
                        
                    },
                    series: [
                        {
                            name: '运动圈',
                            type: 'pie',
                            radius: [ '90%', '100%' ],
                            avoidLabelOverlap: false,
                            legendHoverLink: false,
                            hoverAnimation: false,
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
                            data: [
                                {value: step},
                                {value: total},
                            ]
                        }
                    ]
                }
                this.charts.setOption(option)
//                chartsEl.on('click', function (params) {
//                    console.log(params);
//                });
            },
            loadNews(){
                var _this = this;
                this.session.getMemberID(function (memberid) {
                    _this.axios.post("/notice/list", {memberid:memberid,'page': 1,pageSize:1}, function (json) {
                        var news = json.dataList;
                        $(news).each(function (index, item) {
                            _this.news = item
                        })
                    })
                })
            },
            noticeList() {
                this.$router.push({name: 'articleList', query: {type: 1}})
            },
            homeNewsDetail(id){
                this.$router.push({name: 'guide', params: {id:id}})
            },
            linkTo(route){
                this.$router.push(route);
            }

        }
    }

</script>

<style lang="scss">
    .home {
        .alert-news-container {
            position: fixed;
            width: 100%;
            height: 100%;
            z-index: 1024;
            left: 0;
            top: 0;
            display: none;
            background-color: rgba(0, 0, 0, 0.4);
            .container {
                top: 0;
                width: 100%;
                position: absolute;
                .lines {
                    width: 1px;
                    height: 60px;
                    border-right: 2px dashed #ffffff;
                    margin-left: 374px;
                }
                .news-list {
                    width: 500px;
                    margin-left: 125px;
                    -webkit-border-radius: 15px;
                    -moz-border-radius: 15px;
                    border-radius: 15px;
                    .news-list-item {
                        color: #fff;
                        font-size: 30px;
                        line-height: 30px;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        padding: 10px 0;
                    }
                }
                .icons {
                    color: #ffffff;
                    width: 60px;
                    height: 60px;
                    margin-left: 345px;
                }
            }
        }
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
                .chart {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    width: 100%;
                    height: 100%;
                }
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
