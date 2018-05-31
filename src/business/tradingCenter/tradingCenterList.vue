<template>
    <div class="trading-center-list">
        <div class="head-title text-center">
            交易中心
        </div>
        <div class="trading-charts">
            <div class="charts" id="trading-charts"></div>
        </div>
        <div class="trading-data-board">
            <div class="trading-data-item pull-left" v-for="item in dataList">
                <div class="left-label pull-left">{{ item.name }}</div>
                <div class="right-value pull-left">{{ item.value }}</div>
            </div>
        </div>
        <div class="trading-tabs">
            <div class="trading-tabs-item text-center active">我要买</div>
            <div class="trading-tabs-item text-center">我要卖</div>
        </div>
        <div class="search-area">
            <l-search placeholder="搜索" v-model="filterName" @change="reset"/>
        </div>
        <div class="trading-center-list-business">
            <div class="trading-business-item" v-for="item in businessList">
                <div class="left-img pull-left">
                    <img :src="item.imgPath" alt="">
                </div>
                <div class="item-base-info pull-left">
                    <div class="base-info-name">{{ item.name }}</div>
                    <div class="base-info-price-info">
                        <div class="unit-price pull-left">{{ '单价:'+item.unitPrice }}</div>
                        <div class="less-count pull-left">{{ '数量:' +item.lessCount}}</div>
                    </div>
                    <div class="trading-info">{{ '最近30日成交:'+item.tradingNum }}</div>
                </div>
                <div class="right-business-btn pull-left text-center">
                    购买
                </div>
            </div>
        </div>
        <l-footerMenu :currentRoute.sync="route"/>
    </div>
</template>

<script>
    let chartsEl
    export default {
        name: 'trading-center-list',
        data() {
            return {
                route: 'tradingCenter',
                filterName: null,
                dataList: [
                    {
                        name: '最低价格',
                        value: '3美元'
                    },
                    {
                        name: '最高价格',
                        value: '6美元'
                    },
                    {
                        name: '当前价格',
                        value: '5美元'
                    },
                    {
                        name: '成交量',
                        value: '600'
                    },
                    {
                        name: '涨跌幅度',
                        value: '4%'
                    }
                ],
                businessList: [
                    {
                        imgPath: 'static/img/personal/default.jpg',
                        name: 'Louis',
                        unitPrice: (Math.random() * 500).toFixed(0),
                        lessCount: (Math.random() * 1000).toFixed(0),
                        tradingNum: (Math.random() * 5000).toFixed(0)
                    },
                    {
                        imgPath: 'static/img/personal/default.jpg',
                        name: 'Judy',
                        unitPrice: (Math.random() * 500).toFixed(0),
                        lessCount: (Math.random() * 1000).toFixed(0),
                        tradingNum: (Math.random() * 5000).toFixed(0)
                    },
                    {
                        imgPath: 'static/img/personal/default.jpg',
                        name: 'Afari',
                        unitPrice: (Math.random() * 500).toFixed(0),
                        lessCount: (Math.random() * 1000).toFixed(0),
                        tradingNum: (Math.random() * 5000).toFixed(0)
                    },
                    {
                        imgPath: 'static/img/personal/default.jpg',
                        name: 'Hans',
                        unitPrice: (Math.random() * 500).toFixed(0),
                        lessCount: (Math.random() * 1000).toFixed(0),
                        tradingNum: (Math.random() * 5000).toFixed(0)
                    },
                    {
                        imgPath: 'static/img/personal/default.jpg',
                        name: 'Hill',
                        unitPrice: (Math.random() * 500).toFixed(0),
                        lessCount: (Math.random() * 1000).toFixed(0),
                        tradingNum: (Math.random() * 5000).toFixed(0)
                    },
                    {
                        imgPath: 'static/img/personal/default.jpg',
                        name: 'Memo',
                        unitPrice: (Math.random() * 500).toFixed(0),
                        lessCount: (Math.random() * 1000).toFixed(0),
                        tradingNum: (Math.random() * 5000).toFixed(0)
                    }
                ]
            }
        },
        methods: {
            reset() {
            
            },
            setChartsData() {
                let option = {
                    title: {
                        show: false
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: [ '价格', '交易量' ],
                        y: 'top',
                        x: 'left',
                        top: 10,
                        left: 10,
                        textStyle: {
                            color: '#999999'
                        }
                    },
                    grid: {
                        top: 40,
                        left: 40,
                        right: 20,
                        bottom: 40
                    },
                    toolbox: {
                        show: false,
                    },
                    color: [ '#ff0066', '#fec800' ],
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: [ '5月1日', '5月2日', '5月3日', '5月4日', '5月5日', '5月6日', '5月7日' ],
                        axisLabel: {
                            show: true,
                            color: '#ffffff'
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            show: true,
                            color: '#ffffff'
                        }
                    },
                    series: [
                        {
                            name: '价格',
                            type: 'line',
                            data: [ 112, 121, 111, 13, 12, 13, 10 ],
                        },
                        {
                            name: '交易量',
                            type: 'line',
                            data: [ 81, 42, 31, 55, 87, 94, 113 ],
                        }
                    ]
                }
                chartsEl.setOption(option)
            }
        },
        mounted() {
            chartsEl = App.eCharts.echarts.init(document.getElementById('trading-charts'))
            this.setChartsData()
        }
    }
</script>

<style lang="scss">
    .trading-center-list {
        .head-title {
            height: 80px;
            line-height: 80px;
            font-size: 34px;
            background: #404049;
            position: relative;
            .icons {
                position: absolute;
                width: 30px;
                height: 30px;
                z-index: 2;
                margin: 25px 0;
            }
        }
        .trading-charts {
            width: calc(100% - 60px);
            margin: 20px auto;
            height: 520px;
            background-color: #333339;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            .charts {
                width: 100%;
                height: 520px;
                color: #ffffff;
            }
        }
        .trading-data-board {
            width: calc(100% - 60px);
            background-color: #333339;
            margin: 0 auto 20px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            padding: 30px 30px 20px 30px;
            overflow: hidden;
            .trading-data-item {
                width: 50%;
                font-size: 30px;
                line-height: 30px;
                display: inline-block;
                margin-bottom: 20px;
                .left-label {
                    color: #999999;
                    width: 120px;
                }
                .right-value {
                    margin-left: 10px;
                    width: calc(100% - 130px);
                }
            }
        }
        .trading-tabs {
            margin: 20px auto;
            width: calc(100% - 62px);
            height: 56px;
            line-height: 56px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            border: 2px solid #8e8e90;
            display: flex;
            justify-content: space-between;
            .trading-tabs-item {
                width: 50%;
                &.active {
                    background-color: #8e8e90;
                }
            }
        }
        .trading-center-list-business {
            margin: 0 auto;
            width: calc(100% - 60px);
            .trading-business-item {
                width: 100%;
                height: 180px;
                padding: 30px 30px 30px;
                background-color: #333339;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                margin-top: 20px;
                .left-img {
                    width: 120px;
                    height: 120px;
                    img {
                        width: 120px;
                        height: 120px;
                        -webkit-border-radius: 100%;
                        -moz-border-radius: 100%;
                        border-radius: 100%;
                    }
                }
                .item-base-info {
                    width: calc(100% - 280px);
                    margin-left: 30px;
                    .base-info-name {
                        font-size: 30px;
                        line-height: 30px;
                        margin-bottom: 25px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .base-info-price-info {
                        font-size: 24px;
                        line-height: 24px;
                        margin-bottom: 17px;
                        overflow: hidden;
                        .unit-price {
                            width: 45%;
                        }
                        .less-count {
                            width: 45%;
                            margin-left: 10%;
                        }
                    }
                    .trading-info {
                        color: #999999;
                        font-size: 24px;
                        line-height: 24px;
                    }
                }
                .right-business-btn {
                    width: 116px;
                    height: 116px;
                    border: 2px solid #F8C513;
                    color: #F8C513;
                    font-size: 30px;
                    line-height: 116px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
            }
        }
    }
</style>
