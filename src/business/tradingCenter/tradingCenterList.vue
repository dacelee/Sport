<template>
    <div class="trading-center-list">
        <div class="charts-range-list">
            <div class="charts-range-item" v-for="item in rangeList" :class="{'active':item.id === chartsActive}">{{
                item.name }}
            </div>
        </div>
        <div class="trading-charts">
            <div class="charts" id="trading-charts"></div>
        </div>
        <div class="trading-data-board">
            <div class="trading-data-item pull-left">
                <div class="left-label pull-left">最低</div>
                <div class="right-value pull-left">{{ low }}美元</div>
            </div>
            <div class="trading-data-item pull-left">
                <div class="left-label pull-left">最高</div>
                <div class="right-value pull-left">{{ high }}美元</div>
            </div>
            <div class="trading-data-item pull-left">
                <div class="left-label pull-left">当前</div>
                <div class="right-value pull-left">{{ current }}美元</div>
            </div>
            <div class="trading-data-item pull-left">
                <div class="left-label pull-left">成交</div>
                <div class="right-value pull-left">{{ volume }}</div>
            </div>
            <div class="trading-data-item pull-left">
                <div class="left-label pull-left">当前买单</div>
                <div class="right-value pull-left">{{ need }}</div>
            </div>
            <div class="trading-data-item pull-left">
                <div class="left-label pull-left">涨跌幅度</div>
                <div class="right-value pull-left">{{ percent }}</div>
            </div>
        </div>
        <l-shortMenu :currentRoute="currentMenu" :list="tabsList" @change="changeTabs"/>
        <div class="search-area">
            <div class="filter-way">
                <l-select v-model="currentFilter" :list="filterList" @change="changeFilterWay"/>
            </div>
            <div class="filter filter-id" v-if="currentFilter.id === 1">
                <input type="text" placeholder="搜索" @key.enter="search" v-model="filterName">
                <l-icon name="sousuo"/>
            </div>
            <div class="filter filter-price" v-if="currentFilter.id === 2">
                <input type="text" placeholder="最低价" v-model="priceLow">
                <div>~</div>
                <input type="text" placeholder="最高价" @key.enter="search" v-model="priceHigh">
                <l-icon name="sousuo"/>
            </div>
        </div>
        <div class="trading-center-list-business">
            <Scroll :on-reach-bottom="handleReachBottom" :height="scrollHeight" :distance-to-edge="10">
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
                    <div class="right-business-btn pull-left text-center" @click="market(item)" v-if="item.lessCount>0">
                        {{marketBtn}}
                    </div>
                </div>
            </Scroll>
        </div>
        <div class="bottomBtn">
            <div class="pull-left" v-for="item in tabsList" @click="myAction(item.id)">{{item.name}}</div>
        </div>
        <l-footerMenu :currentRoute.sync="route"/>
        <div class="bottomBtnBuy" v-show="isShow">
            <div class="buyBox">
                <div class="buying">正在{{marketBtn}}</div>
                <div class="buyleft">当前糖果剩余额：{{myCoin}}</div>
                <div class="buyText"><label>数量</label><input type="text" v-model="cointotal" placeholder="请输入数量"></div>
                <div class="buyText"><label>交易秘密</label><input type="password" v-model="password" placeholder="输入交易秘密">
                </div>
            </div>
            <div class="pull-left" v-for="item in tabsListBuy" @click="userBuy(item.id)">{{item.name}}</div>
        </div>
        <div class="bottomBtnBuy" v-show="isShowSell">
            <div class="buyBox">
                <div class="buying">发布{{marketAction}}</div>
                <div class="buyleft">当前价格：{{current}}</div>
                <div class="buyText"><label>数量</label><input type="text" v-model="cointotal2" placeholder="请输入交易数量">
                </div>
                <div class="buyText"><label>单价</label><input type="text" v-model="unitprice" placeholder="允许两倍溢价"></div>
            </div>
            <div class="pull-left" v-for="item in tabsListBuy" @click="marketSell(item.id)">{{item.name}}</div>
        </div>
    </div>
</template>

<script>
    let chartsEl
    import coin from '../../api/coin.js'
    import users from '../../api/users.js'
    
    export default {
        name: 'trading-center-list',
        data() {
            return {
                route: 'tradingCenter',
                filterName: null,
                isShow: false,
                isShowSell: false,
                marketBtn: '购买',
                marketAction: '买单',
                marketItem: null,
                page: 1,
                type: 1,
                myCoin: 0,
                scrollHeight: 500,
                high: 0,
                low: 0,
                current: 0,
                volume: 0,
                need: 0, // 需求数
                percent: 0,
                coinmysaleid: '',
                cointotal: '',
                cointotal2: '',
                unitprice: '',
                password: '',
                sealType: 1,
                tradecharge: 0,//手续费率
                filterList: [  // 搜索方式区分
                    {
                        id: 1,
                        name: '玩家ID和手机号'
                    },
                    {
                        id: 2,
                        name: '价格区间'
                    }
                ],
                currentFilter: { // 当前选择项
                    id: 1,
                    name: '玩家ID和手机号'
                },
                priceLow: '',
                priceHigh: '',
                chartsActive: 2,
                rangeList: [
                    {
                        id: 1,
                        name: '今日'
                    },
                    {
                        id: 2,
                        name: '一周'
                    },
                    {
                        id: 3,
                        name: '一月'
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
                ],
                currentMenu: '1',
                tabsList: [
                    {
                        id: '1',
                        name: '买'
                    },
                    {
                        id: '2',
                        name: '卖'
                    }
                ],
                tabsListBuy: [
                    {
                        id: 'cancel',
                        name: '取消'
                    },
                    {
                        id: 'ok',
                        name: '确定'
                    }
                ]
            }
        },
        methods: {
            search() {
            
            },
            changeTabs(res) {
                this.currentMenu = res
                this.type = res
                this.page = 1
                if (res == 1) {
                    this.marketBtn = '购买'
                }
                else {
                    this.marketBtn = '售出'
                }
                coin.loadSales(this)
            },
            changeFilterWay(res) {
                console.log(res)
            },
            handleReachBottom() {
                var _this = this
                return new Promise(function (resolve) {
                    coin.loadSales(_this, resolve)
                })
            },
            setChartsData() {
                coin.loadKline(this, 7, function (data) {
                    var date = eval('(' + data[ 0 ] + ')')
                    var x = eval('(' + data[ 1 ] + ')')
                    var y = eval('(' + data[ 2 ] + ')')
                    let option = {
                        title: {
                            show: false
                        },
                        tooltip: {
                            trigger: 'axis',
                            formatter(item) {
                                return item[ 0 ].marker + item[ 0 ].seriesName + ': $' + item[ 0 ].value + '<br/>' +
                                    item[ 1 ].marker + item[ 1 ].seriesName + ' :' + item[ 1 ].value
                            }
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
                            data: date,
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
                                data: x,
                            },
                            {
                                name: '交易量',
                                type: 'line',
                                data: y,
                            }
                        ]
                    }
                    chartsEl.setOption(option)
                })
                
            },
            market(item) {
                this.isShow = true
                this.marketItem = item
                this.cointotal = item.lessCount
            },
            myAction(type) {
                this.isShowSell = true
                this.sealType = type
                if (type == 2) {
                    this.marketAction = '卖单'
                }
                else {
                    this.marketAction = '买单'
                }
            },
            userBuy(id) {
                if (id == 'ok') {
                    if (this.marketItem == null) {
                        return
                    }
                    var cointotal = this.cointotal
                    if (cointotal == '' || cointotal <= 0) {
                        this.$Message.error('交易数量必须填写')
                        return
                    }
                    if (cointotal > this.marketItem.lessCount) {
                        this.$Message.error('交易数量必须小于' + this.marketItem.lessCount)
                        return
                    }
                    if (this.password == '') {
                        this.$Message.error('交易密码必须填写')
                        return
                    }
                    var unitprice = this.marketItem.unitPrice
                    var handlingfee = 0
                    if (this.marketItem.type == 2) {
                        handlingfee = (cointotal * unitprice * this.tradecharge).toFixed(1)
                    }
                    coin.saleCoinAction(this, this.marketItem.id, cointotal, unitprice, this.password,
                        this.marketItem.type, handlingfee)
                }
                else {
                    this.isShow = false
                }
            },
            marketSell(id) {
                if (id == 'ok') {
                    var cointotal = this.cointotal2
                    if (cointotal == '' || cointotal <= 0) {
                        this.$Message.error('交易数量必须填写')
                        return
                    }
                    if (cointotal > this.myCoin) {
                        this.$Message.error('交易数量必须小于' + this.myCoin)
                        return
                    }
                    var currentprice = this.current
                    var unitprice = this.unitprice
                    if (unitprice <= 0) {
                        this.$Message.error('交易单价必须大于0')
                        return
                    }
                    if (unitprice > currentprice * 2) {
                        this.$Message.error('只允许两倍溢价')
                        return
                    }
                    var handlingfee = 0
                    if (this.sealType == 2) {
                        handlingfee = (cointotal * unitprice * this.tradecharge).toFixed(1)
                    }
                    coin.saleAddAction(this, cointotal, unitprice, this.sealType, handlingfee)
                }
                else {
                    this.isShowSell = false
                }
            }, init() {
                var _this = this
                this.page = 1
                
                coin.loadBaseInfo(this)
                coin.loadSales(this)
                users.getCacheMyInfo(this, function (user) {
                    _this.myCoin = user.cointotal.toFixed(0)
                    _this.tradecharge = user.tradecharge
                }, true)
            }
        },
        activated() {
            chartsEl = App.eCharts.echarts.init(document.getElementById('trading-charts'))
            this.setChartsData()
            this.init()
            
        }
    }
</script>

<style lang="scss">
    .trading-center-list {
        padding-bottom: 120px;
        .charts-range-list {
            padding: 20px 30px;
            display: flex;
            justify-content: flex-end;
            .charts-range-item {
                font-size: 24px;
                line-height: 24px;
                padding: 15px 20px;
                border: 2px solid #d7dce6;
                margin: 0 0 0 20px;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                &.active {
                    color: #f8c513;
                    border-color: #f8c513;
                }
            }
        }
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
            margin: 0 auto 20px;
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
        .search-area {
            margin: 20px auto;
            display: flex;
            justify-content: space-between;
            width: calc(100% - 60px);
            .filter-way {
                width: 300px;
                input {
                    -webkit-border-radius: 8px 0 0 8px;
                    -moz-border-radius: 8px 0 0 8px;
                    border-radius: 8px 0 0 8px;
                }
            }
            .filter {
                width: calc(100% - 300px);
                position: relative;
                input {
                    width: 100%;
                    background-color: #33333a;
                    color: #ffffff;
                    font-size: 30px;
                    line-height: 30px;
                    padding: 30px 25px 30px 30px;
                    -webkit-border-radius: 0 8px 8px 0;
                    -moz-border-radius: 0 8px 8px 0;
                    border-radius: 0 8px 8px 0;
                }
                .icons {
                    position: absolute;
                    right: 20px;
                    top: 35px;
                    width: 30px;
                    height: 30px;
                }
                &.filter-price {
                    display: flex;
                    justify-content: flex-start;
                    input {
                        width: calc(50% - 13px);
                        border-radius: 0;
                        &:nth-last-child(1) {
                            -webkit-border-radius: 0 8px 8px 0;
                            -moz-border-radius: 0 8px 8px 0;
                            border-radius: 0 8px 8px 0;
                        }
                    }
                    > div {
                        background-color: #33333a;
                        color: #ffffff;
                        font-size: 30px;
                        line-height: 40px;
                        padding: 30px 5px 30px 5px;
                        float: left;
                    }
                }
            }
        }
        .trading-center-list-business {
            margin: 0 auto;
            width: calc(100% - 60px);
            padding-bottom: 100px;
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
        .bottomBtn {
            position: fixed;
            bottom: 100px;
            left: 0;
            overflow: hidden;
            width: 100%;
            text-align: center;
            div {
                font-size: 34px;
                line-height: 34px;
                padding: 33px 0;
                background-color: #F8C513;
                color: #000;
                width: 50%;
            }
            z-index: 9;
            .pull-left {
                background-color: #F8C513;
            }
        }
        .bottomBtnBuy {
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 999;
            overflow: hidden;
            width: 100%;
            text-align: center;
            background: #25252B;
            div.pull-left {
                font-size: 34px;
                line-height: 34px;
                padding: 33px 0;
                
                color: #fff;
            }
            .pull-left {
                width: 50%;
                background-color: #404148;
            }
            .pull-left:last-child {
                width: 50%;
                background-color: #F8C513;
                color: #000;
            }
        }
        .buyBox {
            background: #25252B;
            width: 100%;
            padding: 80px 0;
            .buying {
                font-size: 34px;
                color: #fff
            }
            .buyleft {
                font-size: 24px;
                color: #999;
                padding: 30px 0;
            }
            .buyText {
                label {
                    margin-right: 20px;
                }
                input {
                    background: #333339;
                    height: 80px;
                    border-radius: 10px;
                    width: 60%;
                    padding: 0 10px;
                    color: #ffffff;
                }
                &:nth-last-child(1) {
                    padding: 15px 0 0 0;
                }
            }
        }
    }
</style>
