<template>
    <div class="step-statistics">
        <div class="select-count-way">
            <l-select v-model="selected" :list="countWayList" @change="changeCountWay"/>
        </div>
        <div class="charts-step-info">
            <div id="step-charts" class="charts"></div>
        </div>
        <div class="step-num-info text-center">
            <ul>
                <li>
                    <div class="step-label">总步数</div>
                    <div class="step-num">{{ totalStep }}</div>
                </li>
                <li>
                    <div class="step-label">消耗卡路里</div>
                    <div class="step-num">{{ calories }}</div>
                </li>
                <li>
                    <div class="step-label">总公里</div>
                    <div class="step-num">{{ mileage }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    var moment = require('moment');
    let charts
    export default {
        name: 'step-statistics',
        data() {
            return {
                selected:  {id: '1'},
                startTime:0,
                endTime:0,
                type:1,
                xData:[],
                startDay:'',
                totalDay:7,
                countWayList: [
                    {
                        id: '1',
                        name: '按周统计'
                    },
                    {
                        id: '2',
                        name: '按半月统计'
                    },
                    {
                        id: '3',
                        name: '按月统计'
                    }
                ],
                totalStep: 0,
                calories: 0,
                mileage: 0
            }
        },
        methods: {
            changeCountWay() {
                var _this= this;
                _this.session.getMemberID(function(memberid) {
                    _this.mileage = _this.amap.getTodayMileage(_this,memberid);
                });
                this.totalStep = 0;
                if(this.selected.id==1){
                    var startDay = moment().isoWeekday(1).format('YYYY/MM/DD 00:00:00');//周一日期
                    var endDay = moment().isoWeekday(7).format('YYYY/MM/DD 23:59:59');
                    this.startTime = Date.parse(new Date(startDay));
                    this.endTime = Date.parse(new Date(endDay));
                    this.xData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                    this.totalDay = 7;
                }else if(this.selected.id==2){
                    this.xData = [];
                    var startDay = moment().add('days',-14).format('YYYY/MM/DD 00:00:00');
                    var endDay = moment().format('YYYY/MM/DD 23:59:59');
                    this.startTime = Date.parse(new Date(startDay));
                    this.endTime = Date.parse(new Date(endDay));
                    for(var i=14;i>=0;i--){
                        this.xData.push(moment().add('days',-i).format('DD'));
                    }
                    this.totalDay = 15;
                }else if(this.selected.id==3){
                    this.xData = [];
                    var startDay = moment().startOf('month').format('YYYY/MM/DD 00:00:00');//周一日期
                    var endDay = moment().endOf('month').format('YYYY/MM/DD 23:59:59');
                    this.startTime = Date.parse(new Date(startDay));
                    this.endTime = Date.parse(new Date(endDay));
                    this.totalDay = parseInt(moment().endOf('month').format('DD'));
                    for(var i=0;i<this.totalDay;i++){
                        this.xData.push(moment(startDay, "YYYY/MM/DD 00:00:00").add('days',i).format('DD'));
                    }
                }
                this.startDay = moment(startDay, "YYYY/MM/DD 00:00:00");
                this.getChartsOption();
            },
            getChartsOption() {
                charts = this.$echarts.init(document.getElementById('step-charts'))
                var _this = this;
                this.session.getMemberID(function (memberid) {
                    var data = _this.db.loadStepCount(memberid,_this.startTime,_this.endTime,_this);
//                    $(data).each(function(index,item) {
//                        alert(_this.appUtil.dateFormat(item.addtime, "yyyy-MM-dd hh:ss"))
//                    });
                    var seriesData = [];
                    for(var i=0;i<=_this.totalDay;i++){
                        var time = _this.startDay.valueOf();
                        _this.startDay.add('days',1);
                        var push = false;
                        $(data).each(function(index,item){
                            if (time==item.addtime) {
                                push = true;
                                _this.totalStep+=parseInt(item.steps);
                                seriesData.push(item.steps);
                                return;
                            }
                        });
                        _this.calories =  (_this.totalStep*0.03175).toFixed(2);
                        if(!push){
                            seriesData.push(0);
                        }
                    }
                    if (seriesData.length == 0) {
                        return;
                    }
                    charts.setOption({
                        grid:{left:"15%"},
                        xAxis: {
                            type: 'category',
                            data: _this.xData,
                            axisLabel: {
                                show: true,
                                color: '#ffffff'
                            }
                        },
                        color: ['#fec800'],
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                show: true,
                                color: '#ffffff'
                            }
                        },
                        series: [
                            {
                                data: seriesData,
                                type: 'bar'
                            }
                        ],
                        dataZoom: [
                            {
                                id: 'dataZoomX',
                                type: 'inside',
                                xAxisIndex: [0],
                                filterMode: 'none'
                            }
                        ],
                        barWidth: 5
                    })
                });
            }
        },
        mounted() {
            this.changeCountWay();
        },
        activated() {
//            this.changeCountWay();
        }
    }
</script>

<style lang="scss">
    .step-statistics {
        .select-count-way {
            margin: 20px auto;
        }
        .charts-step-info {
            width: 690px;
            margin: 0 auto;
            height: 450px;
            .charts {
                width: 690px;
                height: 450px;
                background-color: #33333a;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
            }
        }
        .step-num-info {
            width: 690px;
            height: 200px;
            padding: 50px 90px 50px;
            display: flex;
            justify-content: space-between;
            margin: 20px auto;
            background-color: #33333a;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            li {
                width: 160px;
                display: inline-block;
                .step-label {
                    font-size: 30px;
                    line-height: 30px;
                    color: #999999;
                }
                .step-num {
                    font-size: 48px;
                    line-height: 48px;
                    margin-top: 20px;
                }
            }
        }
    }
</style>
