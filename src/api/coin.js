import axios from './axios.js'
import session from './session.js'
import utils from '../public/appUtil.js'
export default {
    pageSize:10,
    status :["",'待付款','已付款','已付币','已取消'],
    appealStatus :["",'申诉中','申诉成功支付糖果 ','申诉成功退还糖果','申诉取消'],
    coinMySaleList:"/coinsale/coinmysalelist",
    coinOrderList:"/coinsale/coinmyorderlist",
    coinOrderDetail:"/coinsale/orderdetail",
    coinlog:"/my/coinloglist",
    appeal:"/coinsale/editstatusByAppeal",
    kline:"coinsale/kline",
    baseInfo:"/coinsale/coinsaleinfo",
    saleAdd:"/coinsale/mysaleadd",
    saleCoin:"/coinsale/orderadd",
    loadSales:function(context,resolve){

    },
    loadCoinlog:function(context,resolve){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.coinlog, {memberid: memberid,page:context.page,pageSize:_this.pageSize}, function (json) {
                var data = json.dataList;
                if(context.page==1){
                    context.list = [];
                }
                $(data).each(function(index,item){
                    context.list.push({
                        name: item.logrecord,
                        time:utils.dateFormat(item.addtime,"yyyy/MM/dd hh:ss"),
                        num: item.coinnum
                    });
                })
                if(data.length>0){
                    context.page++;
                }
            }, function (json) {
                context.$Message.error(json.msg);
            },resolve);
        });
    },
    loadOrderList:function(context,status,resolve){

    },
    loadOrderDetail:function(context,coinorderid){
        var _this = this;
        axios.post(_this.coinOrderDetail, {coinorderid: coinorderid}, function (json) {
            var data = json.data;
            var coinorder = data.coinorder;
            context.status = coinorder.status;
            var orderInfo = {
                title: '订单信息',
                label: _this.status[coinorder.status],
                details: [
                    {
                        title: '订单号',
                        value: coinorder.orderno
                    },
                    {
                        title: '交易数量',
                        value: coinorder.cointotal+'糖果'
                    },
                    {
                        title: '单价',
                        value: coinorder.unitprice+'元'
                    },
                    {
                        title: '总金额',
                        value: coinorder.cnyunitprice+'人民币'
                    },
                    {
                        title: '交易时间',
                        value: utils.dateFormat(coinorder.addtime,"yyyy.MM.dd hh:ss"),
                    }
                ]
            }
            var seller = data.seller;
            var saleUser = {
                    title: '卖家信息',
                    details: [
                        {
                            imgPath: seller.logo,
                            value: seller.nikename
                        },
                        {
                            title: '姓名',
                            value: seller.nikename,
                        },
                        {
                            title: '电话',
                            value: seller.mobile
                        }
                    ]
                };

            var cardInfo = {
                title: '银行卡信息',
                details: [
                    {
                        title: '银行',
                        value: seller.bankname,
                    },
                    {
                        title: '卡号',
                        value: seller.bankaccount
                    }
                ]
            }

            var payInfo =   {
                title: '支付信息',
                details: [
                    {
                        title: '支付宝',
                        value: '15855678093'
                    },
                    {
                        title: '微信',
                        value: '15855678093'
                    }
                ]
            }
            var buyer = data.buyer;
            var payCat = null
            if(coinorder.status==2){
                payCat = {
                    title: '支付截图',
                    details: [
                        {
                            imgPath: '/static/img/goods/1.jpg',
                            isBigImg: true
                        }
                    ]
                }
            }

            context.list=[orderInfo,saleUser,cardInfo,payCat];

        }, function (json) {
            context.$Message.error(json.msg);
        });
    },
    loadDetail:function(context,coinorderid){

    },
    appealAction:function(context,coinorderid,appealremark,appealphoto){
        axios.post(this.appeal, {coinorderid: coinorderid,"appealremark":appealremark,"appealphoto":appealphoto}, function (json) {
            context.$Message.info(json.msg);
            context.$router.go(-1);
        }, function (json) {
            context.$Message.error(json.msg);
        });
    },
    loadKline:function(context,days,callback){
        axios.post(this.kline, {days: days}, function (json) {
            //context.$Message.info(json.msg);
            var reg = new RegExp('\\[[^\\]]*\\]','ig');
            //var reg = /\[([^]]*)]/ig;
            var data = json.data.match(reg);
            callback(data);
        }, function (json) {
            context.$Message.error(json.msg);
        });
    },
    loadBaseInfo:function(context){

    },
    saleAddAction:function(context,cointotal,unitprice,type,handlingfee){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.saleAdd, {memberid: memberid,cointotal:cointotal,unitprice:unitprice,type:type,handlingfee:handlingfee}, function (json) {
                context.$Message.info(json.msg);
               _this.loadSales(context);
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    saleCoinAction:function(context,coinmysaleid,cointotal,unitprice,tradepwd,type,handlingfee){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.saleCoin, {memberid: memberid,coinmysaleid:coinmysaleid,cointotal:cointotal,unitprice:unitprice,type:type,handlingfee:handlingfee,tradepwd:tradepwd}, function (json) {
                context.$Message.info(json.msg);
                _this.loadSales(context);
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    }


}
