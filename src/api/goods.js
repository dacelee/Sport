import axios from './axios.js'
import session from './session.js'
import utils from '../public/appUtil.js'
export default {
    pageSize:10,
    status :["",'待付款','已付款','已发货','已取消',"确认收货"],
    goodList:"/shops/goodslist",
    detail:"/shops/detail",
    orderList:"/shops/orderlist",
    orderDetail:"/shops/orderdetail",
    cateList:"/shops/catelist",
    addCart:"/shops/addcart",
    cartList:"/shops/cartlist",
    updateCart:"/shops/updatecart",
    delCart:"/shops/delcart",
    orderSubmit:"/shops/ordersubmit",
    orderStatus:"/shops/editstatus",
    chakuaidi:"/shops/chakuaidi",
    loadGoods:function(context,scrop,cateid,attr,sort,sorttype,resolve){
        var page = 1
        if(context.page){
            page = context.page;
        }
        var size = this.pageSize;
        axios.post(this.goodList, {
            "page":page,
            "pageSize": size,
            "cateid": cateid,
            "attr": attr,
            "sort": sort,
            "sorttype": sorttype
        }, function (json) {
            if (page == 1) {
                eval("context." + scrop + "=[]");
            }
            $(json.dataList).each(function (index, item) {
                var data = {
                    id: item.id,
                    imgPath: item.logo,
                    name: item.name,
                    price: item.price,
                    equal: item.qty
                };
                eval("context." + scrop + ".push(data)");
            });
            if (json.dataList.length > 0&&context.page) {
                context.page++;
            }
        }, function (json) {
            context.$Message.error(json.msg);
        }, resolve);
    },
    loadOrderList:function(context,status,resolve){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.orderList, {memberid: memberid,status:status,page:context.page,pageSize:_this.pageSize}, function (json) {
                var data = json.dataList;
                if(context.page==1){
                    context.list = [];
                }
                $(data).each(function(index,item){
                    var goodsList = item.detailList;
                    var goods = [];
                    $(goodsList).each(function(index,item){
                        goods.push({
                            imgPath: item.logo,
                            name: item.goodsname,
                            unitPrice:item.price,
                            extendData:item.cointotal,
                            amount:item.qty
                        });
                    });
                    context.list.push({
                        id: item.id,
                        totalPrice: item.price.toFixed(2),
                        goods: goods,
                        amount:goods.length,
                        extendData:item.cointotal,
                        status: item.status,
                        status_des: _this.status[item.status]
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
    loadOrderDetail:function(context,orderid){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.orderDetail, {orderid: orderid}, function (json) {
                var data = json.data;
                context.addressList= [
                    {
                        label: '收货人',
                        value: data.name
                    },
                    {
                        label: '联系电话',
                        value: data.mobile
                    },
                    {
                        label: '收货地址',
                        value: data.address
                    }
                ];
                data.price= data.price.toFixed(2);
                data.cointotal = data.cointotal.toFixed(2);
                context.orderInfo= [
                        {
                            label: '订单状态',
                            value: _this.status[data.status]
                        },
                        {
                            label: '订单号',
                            value: data.orderno
                        },
                        {
                            label: '交易金额',
                            value: data.price+'人民币+'+data.cointotal+'糖果'
                        },
                        {
                            label: '交易时间',
                            value: utils.dateFormat(data.addtime,"yyyy.MM.dd hh:mm")
                        }
                    ];
                var goodsList = data.detailList;
                context.goodsList = [];
                $(goodsList).each(function(index,item){
                    context.goodsList .push({
                        imgPath: item.logo,
                        name: item.goodsname,
                        unitPrice:item.price,
                        candy:item.cointotal,
                        num:item.qty
                    });
                });
                context.orderno = data.orderno;
                context.unorderno = data.unorderno;
                context.status= data.status;
                context.totalNum = goodsList.length;
                context.totalPrice = data.price ;
                context.totalCoin = data.cointotal;
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    loadCateList:function(context){
        axios.post(this.cateList, null , function (json) {
            context.menuList = [];
            var data = json.dataList;
            $(data).each(function(index,item){
                context.menuList.push({
                    id: item.id,
                    logo:item.logo,
                    name: item.cate
                });
            });
        },function(json){
            context.$Message.error(json.msg);
        });
    },
    loadGoodDetail:function(context,id){
        axios.post(this.detail, {id:id} , function (json) {
            var data = json.data;
            context.logo = data.logo;
            context.title = data.name;
            context.price = data.price;
            context.coin = data.currentCoinPrice.toFixed(2);
            context.coinPrice = data.currentCoinUsd;
            context.word = data.content;
        },function(json){
            context.$Message.error(json.msg);
        });
    },
    addGoodToCart:function(context,goodsid,num,price,coinnum,type){
        var _this =this;
        session.getMemberID(function(memberid) {
            axios.post(_this.addCart, {
                memberid: memberid,
                goodsid: goodsid,
                num: num,
                price: price,
                coinnum: coinnum
            }, function (json) {
                context.carShow = false;
                if(type==1){
                    context.$Message.info(json.msg);
                }else{
                    context.$router.push("businessSettlement")
                }
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    loadCartGoods:function(context,cartid){
        var _this =this;
        session.getMemberID(function(memberid) {
            axios.post(_this.cartList, { memberid: memberid}, function (json) {
                context.list = [];
                $(json.dataList).each(function(index,item){
                    if(!cartid||cartid.indexOf(item.id)!=-1){
                        context.list.push( {
                            id:item.id,
                            pic: item.logo,
                            name: item.goodsname,
                            rmb: item.price,
                            hlb: item.cointotal,
                            num: item.qty,
                            oldnum: item.qty,
                        })
                    }
                });
                context.changeNum();
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    updateCartAction:function (context,cartid,num){
        axios.post(this.updateCart, { cartid: cartid,num:num}, function (json) {

        }, function (json) {
            context.$Message.error(json.msg);
        });
    },
    delCartAction:function (context,cartids){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.delCart, {cartids: cartids, memberid: memberid}, function (json) {
                context.$Message.info(json.msg);
                context.editEvent();
                _this.loadCartGoods(context);
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    orderSubmitAction:function(context,deliveryid,cartids,paytype,callback){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.orderSubmit, {memberid: memberid, deliveryid:deliveryid,cardids:cartids,paytype:paytype}, function (json) {
                //订单创建成功,完成支付
                if(callback){
                    callback(json.data.unorderno);
                }
                //context.$router.replace('orderCenter')
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    orderStatusAction(context,orderid,status){
        var _this = this;
        axios.post(_this.orderStatus, {orderid: orderid, status: status}, function (json) {
            context.$Message.info(json.msg);
            if (status == "clear") {
                context.$router.go(-1);
            } else {
                _this.loadOrderDetail(context, orderid);
            }
        }, function (json) {
            context.$Message.error(json.msg);
        });
    }

}
