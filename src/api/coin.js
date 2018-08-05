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
    editStatus:"/coinsale/editstatus",
    uploadPayPhoto:"/coinsale/uploadpayphoto",
    mySaleCancel:"/coinsale/mysalecancel",
    myCoinSaleList:"/coinsale/mycoinmysalelist",
    timer:0,
    loadSales:function(context,memberid,beginprice,endprice,resolve){
        var _this = this;
        var param ={type: context.type,page:context.page,pageSize:_this.pageSize};
        if(memberid!=''){
            param.memberid = memberid;
        }
        if(beginprice!=''){
            param.beginprice = beginprice;
        }
        if(endprice!=''){
            param.endprice = endprice;
        }
        axios.post(_this.coinMySaleList, param, function (json) {
            var data = json.dataList;
            if(context.page==1){
                context.businessList = [];
            }
            session.getMemberID(function(memberid) {
                $(data).each(function (index, item) {
                    context.businessList.push({
                        id: item.id,
                        clear:item.memberid == memberid,
                        imgPath: item.logo,
                        name: item.nikename,
                        unitPrice: item.unitprice,
                        lessCount: item.cointotal,
                        tradingNum: item.volumes,
                        type: context.type
                    });
                })
            });
            if(data.length>0){
                context.page++;
            }
            if(context.businessList.length>10){
                context.scrollHeight = 500;
            }else{
                context.scrollHeight = context.businessList.length*$(".trading-business-item").outerHeight(true);
            }
        }, function (json) {
            context.$Message.error(json.msg);
        },resolve);
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
                        time:utils.dateFormat(item.addtime,"yyyy/MM/dd hh:mm"),
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
        var _this = this;
        session.getMemberID(function(memberid) {
            if(status<3){
                axios.post(_this.myCoinSaleList, {memberid: memberid,type:status,page:context.page,pageSize:_this.pageSize}, function (json) {
                    var data = json.dataList;
                    if(context.page==1){
                        context.list = [];
                    }
                    $(data).each(function(index,item){
                        context.list.push({
                            id: item.id,
                            unitPrice: item.unitprice,
                            lessCount: item.cointotal,
                            tradingNum:item.volumes,
                            name: item.nikename,
                            status:item.status,
                            type:1
                        });
                    })
                    if(data.length>0){
                        context.page++;
                    }
                }, function (json) {
                    context.$Message.error(json.msg);
                },resolve);
            }else{
                axios.post(_this.coinOrderList, {memberid: memberid,status:status,page:context.page,pageSize:_this.pageSize}, function (json) {
                    var data = json.dataList;
                    if(context.page==1){
                        context.list = [];
                    }
                    $(data).each(function(index,item){
                        context.list.push({
                            id: item.id,
                            imgPath: item.logo,
                            name: item.nikename,
                            time: utils.dateFormat(item.addtime,"yyyy/MM/dd hh:mm"),
                            status: _this.status[item.status],
                            type:2
                        });
                    })
                    if(data.length>0){
                        context.page++;
                    }
                }, function (json) {
                    context.$Message.error(json.msg);
                },resolve);
            }

        });
    },
    loadOrderDetail:function(context,coinorderid){
        var _this = this;
        axios.post(_this.coinOrderDetail, {coinorderid: coinorderid}, function (json) {
            var data = json.data;
            var coinorder = data.coinorder;
            context.status = coinorder.status;
            context.clear=false;
            context.payment=false;
            context.appeal=false;
            context.receivables=false;
            context.confirm=false;

            var status = coinorder.status;
            var appealstatus = coinorder.appealstatus;
            session.getMemberID(function (memberid){
                var isbuyer = false;
                if (data.buyer.id == memberid) {
                    isbuyer = true;
                }
                if (status < 5) {
                    var stautsStr = _this.status[status];
                } else {
                    switch (status) {
                        case 10:
                            stautsStr = "交易中";
                            break;
                        case 20:
                            stautsStr = isbuyer?"已付款":"已付糖果";
                            break;
                    }
                }

                if (status == 2 || status == 3) {
                    if (appealstatus == 1) {
                        stautsStr = _this.appealStatus[1];
                    }
                }
                var orderInfo = {
                    title: '订单信息',
                    label: stautsStr,
                    details: [
                        {
                            title: '订单号',
                            value: coinorder.orderno
                        },
                        {
                            title: '交易数量',
                            value: coinorder.cointotal + '糖果'
                        },
                        {
                            title: '单价',
                            value: coinorder.unitprice + '元'
                        },
                        {
                            title: '总金额',
                            value: coinorder.cnyunitprice + '人民币'
                        },
                        {
                            title: '交易时间',
                            value: utils.dateFormat(coinorder.addtime, "yyyy.MM.dd hh:mm"),
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
                            value: seller.truename,
                        },
                        {
                            title: '电话',
                            value: seller.mobile
                        },
                        {
                            title: '支付交易号',
                            value: coinorder.tradenumber
                        }
                    ]
                };
                context.list = [orderInfo, saleUser];

                if (seller.bankname) {
                    var cardInfo = {
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
                    context.list.push(cardInfo);
                }
                if (seller.alipay || seller.wxpay) {
                    var pay = {
                        details: []
                    }
                    if (seller.alipay) {
                        pay.details.push({
                            title: '支付宝',
                            value: seller.alipay
                        });
                    }
                    //if(seller.wxpay){
                    //    pay.details.push( {
                    //        title: '微信',
                    //        value: seller.wxpay
                    //    });
                    //}
                    context.list.push(pay);
                }
                var buyer = data.buyer;
                var buyerUser = {
                    title: '买家信息',
                    details: [
                        {
                            imgPath: buyer.logo,
                            value: buyer.nikename
                        },
                        {
                            title: '姓名',
                            value: buyer.truename,
                        },
                        {
                            title: '电话',
                            value: buyer.mobile
                        }
                    ]
                };
                context.list.push(buyerUser);

                context.buyer = data.buyer;
                context.seller = data.seller;
                if (coinorder.status == 2) {
                    var payCat = {
                        title: '支付截图',
                        details: [
                            {
                                imgPath: coinorder.tradescreenshot,
                                isBigImg: true
                            }
                        ]
                    }
                    context.list.push(payCat);
                }
                if (appealstatus != 0 && appealstatus != 4) {
                    var appealInfo = {
                        title: '申诉信息',
                        details: [
                            {
                                title: '申诉说明',
                                value: coinorder.appealremark
                            },
                            {
                                imgPath: coinorder.appealphoto,
                                isBigImg: true
                            }
                        ]
                    }
                    context.list.push(appealInfo);
                }

                if (status == 1) {
                    context.clear = true;
                    //支付倒计时24小时
                    this.timeShow(24 * 3600 * 1000, coinorder.addtime, context);
                } else {
                    context.clear = false;
                }
                if (data.buyer.id == memberid) {
                    context.payment = (status == 1 ? true : false); //确认支付
                    if (status == 2 || status == 3) {
                        if (appealstatus == 0 || appealstatus == 4) {
                            //支付时间过12小时可以申诉
                            //context.confirm
                            //this.timeShow(12*3600*1000,coinorder.paytime,context);
                            context.appeal = true; //可以申诉
                        }
                    }
                } else if (data.seller.id == memberid) {
                    if (status == 2 || status == 3) {
                        if (status == 2) {
                            context.receivables = true; //确认收款
                        }
                        if (appealstatus == 0 || appealstatus == 4) {
                            //context.appeal = true; //可以申诉
                        }
                    }

                }
            });
        }, function (json) {
            context.$Message.error(json.msg);
        });
    },
    timerStimeShowhow(time,addtime,context){
        var _this = this;
        this.timer = setInterval(function(){
            var now = new Date().getTime();
            if (addtime + time > now) {
                var t = addtime + time - now;
                context.timer =  utils.dateFormat(t,"hh:mm");
            } else {
                clearInterval(_this.timer);
                context.timer  = "已失效";
            }
        }, 1000);
    },
    loadDetail:function(context,coinorderid){
        axios.post(this.coinOrderDetail, {coinorderid: coinorderid}, function (json) {
            var data = json.data;
            var coinorder = data.coinorder;
            context.orderNo=coinorder.orderno;
            context.orderNum=coinorder.cointotal;
            context.unitPrice = coinorder.unitprice;
            context.totalPrice = coinorder.cnyunitprice;
            context.time = utils.dateFormat(coinorder.addtime,"yyyy.MM.dd hh:mm");
        }, function (json) {
            context.$Message.error(json.msg);
        });
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
        axios.post(this.baseInfo, null, function (json) {
            var data = json.data;
            context.high=data.high;
            context.low=data.low;
            context.current=data.current;
            context.priceInterval = context.current/2+"-" +context.current*2;
            context.volume=data.volume;
            context.percent=data.percent;
        }, function (json) {
            context.$Message.error(json.msg);
        });
    },
    saleAddAction:function(context,cointotal,unitprice,type,handlingfee,smscode,tradepwd){
        var _this = this;
        session.getMemberID(function(memberid) {
            var param = {memberid: memberid,cointotal:cointotal,unitprice:unitprice,type:type,handlingfee:handlingfee,tradepwd:tradepwd};
            if(smscode){
                param.smscode = smscode;
            }
            axios.post(_this.saleAdd, param, function (json) {
                context.$Message.info(json.msg);
                context.page=1;
               _this.loadSales(context);
                context.isShowSell = false
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    saleCoinAction:function(context,coinmysaleid,cointotal,unitprice,tradepwd,type,handlingfee){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.saleCoin, {memberid: memberid,coinmysaleid:coinmysaleid,cointotal:cointotal,unitprice:unitprice,handlingfee:handlingfee,tradepwd:tradepwd}, function (json) {
                //context.$Message.info(json.msg);
                //context.page=1;
                //_this.loadSales(context);
               //订单详情,完成支付凭证上传
                context.isShow = false;
                var id = json.data.id;
                context.$router.push({name: 'transactionDetails', params: {id: id}})
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    editStatusAction:function(context,coinorderid,status){
        var _this = this;
        if(status==4){
            App.confirm({"title":'警告',"content":'确定取消订单吗?'}).then(function() {
                axios.post(_this.editStatus, {
                    'coinorderid': coinorderid,
                    'status': status,
                }, function (json) {
                    context.$Message.info(json.msg);
                    context.id = 0;
                    context.$router.go(-1);
                }, function (json) {
                    context.$Message.info(json.msg)
                })
            });
        }else{
            axios.post(_this.editStatus, {
                'coinorderid': coinorderid,
                'status': status,
            }, function (json) {
                context.$Message.info(json.msg);
                _this.loadOrderDetail(context,coinorderid);
                //if(status==2){
                //    context.id = 0;
                //    //context.$router.replace('/paySuccess')
                //}else{
                //
                //}
            }, function (json) {
                context.$Message.info(json.msg)
            })
        }
    },
    uploadPayPhotoAction:function(context,coinorderid,tradescreenshot){
        var _this = this;
        axios.post(_this. uploadPayPhoto, {
            'coinorderid': coinorderid,
            'tradescreenshot': tradescreenshot,
        }, function (json) {
            _this.editStatusAction(context,coinorderid,2);
        }, function (json) {
            context.$Message.info(json.msg)
        })
    },
    mySaleCancelAction(context,coinmysaleid,center){
        var _this = this;
        App.confirm({"title":'警告',"content":'确定取消吗?'}).then(function() {
            axios.post(_this.mySaleCancel, {
                'coinmysaleid': coinmysaleid,
            }, function (json) {
                context.$Message.info(json.msg);
                context.page=1;
                if(center){
                    _this.loadOrderList(context,context.status);
                }else{
                    _this.loadSales(context);
                }
            }, function (json) {
                context.$Message.info(json.msg)
            })
        });
    }


}
