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
    let charts, _this
    export default {
        name: 'step-statistics',
        data() {
            return {
                selected: 'day',
                countWayList: [
                    {
                        id: 'day',
                        name: '按天统计'
                    },
                    {
                        id: 'week',
                        name: '按周统计'
                    },
                    {
                        id: 'month',
                        name: '按月统计'
                    }
                ],
                totalStep: 54321,
                calories: 287,
                mileage: 138
            }
        },
        methods: {
            changeCountWay() {
            
            },
            getChartsOption() {
                charts.setOption({
                    xAxis: {
                        type: 'category',
                        data: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ],
                        axisLabel: {
                            show: true,
                            color: '#ffffff'
                        }
                    },
                    color: [ '#fec800' ],
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            show: true,
                            color: '#ffffff'
                        }
                    },
                    series: [
                        {
                            data: [ 120, 200, 150, 80, 70, 110, 130 ],
                            type: 'bar'
                        }
                    ],
                    barWidth: 5
                })
            }
        },
        mounted() {
            _this = this
            charts = App.eCharts.echarts.init(document.getElementById('step-charts'))
            _this.getChartsOption()
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
