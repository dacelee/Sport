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
    loadGoods:function(context,scrop,cateid,attr,sort,sorttype,resolve,pageSize){
        var size = this.pageSize;
        if(pageSize){
            size = pageSize;
        }
       axios.post(this.goodList, {"page":context.page,"pageSize":size,"cateid":cateid,"attr":attr,"sort":sort,"sorttype":sorttype}, function (json) {
           var data = [];
           if(context.page==1){
               eval("context."+scrop+"=[]");
           }
           $(json.dataList).each(function(index,item){
                data.push({
                    id:item.id,
                    imgPath: item.logo,
                    name: item.name,
                    price: item.price,
                    equal: item.qty
                });
            });
           if(data.length>0){
               context.page++;
           }
           eval("context."+scrop+"= data");
        },function(json){
           context.$Message.error(json.msg);
        },resolve);
    },
    loadOrderList:function(context,status,resolve){

    },
    loadOrderDetail:function(context,orderid){

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
            context.word = data.intro;
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
    loadCartGoods:function(context){
        var _this =this;
        session.getMemberID(function(memberid) {
            axios.post(_this.cartList, { memberid: memberid}, function (json) {
                context.list = [];
                $(json.dataList).each(function(index,item){
                    context.list.push( {
                        id:item.id,
                        pic: item.logo,
                        name: item.goodsname,
                        rmb: item.price,
                        hlb: item.cointotal,
                        num: item.qty,
                        oldnum: item.qty,
                    })
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

    },
    orderSubmitAction:function(context,deliveryid,paytype){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.orderSubmit, {memberid: memberid, deliveryid: deliveryid,paytype:paytype}, function (json) {
                this.$router.replace('paySuccess')
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    }


}
