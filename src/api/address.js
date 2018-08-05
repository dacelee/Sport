import axios from './axios.js'
import session from './session.js'
import utils from '../public/appUtil.js'
export default {
    list:"/delivery/list",
    del:"/delivery/del",
    add:"/delivery/add",
    edit:'/delivery/edit',
    detail:'delivery/detail',
    defaultAddress: "delivery/defaultlist",
    loadList:function(context){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.list, {memberid: memberid}, function (json) {
                var data = json.dataList;
                context.list = [];
                $(data).each(function(index,item){
                    context.list.push(  {
                        id:item.id,
                        userName: item.name,
                        phone: item.mobile,
                        address: item.address,
                        isDefault: item.isdefault==1?true:false
                    });
                })
                if(data.length>0){
                    context.page++;
                }
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    addAddress:function(context,fromData,id){
        var _this = this;
        if(id){
            fromData.id=id;
            axios.post(_this.edit, fromData, function (json) {
                context.$Message.info(json.msg);
                context.$router.go(-1);
            }, function (json) {
                context.$Message.error(json.msg);
            });
        }else{
            session.getMemberID(function(memberid) {
                fromData.memberid = memberid;
                axios.post(_this.add, fromData, function (json) {
                    context.$Message.info(json.msg);
                    context.$router.go(-1);
                }, function (json) {
                    context.$Message.error(json.msg);
                });
            });
        }
    },
    loadDetail:function(context,id){
        var _this = this;
        axios.post(_this.detail, {id: id}, function (json) {
            var data = json.data;
            context.formData={
                    name: data.name,
                    proid: data.proid,
                    cityid:  data.cityid,
                    areaid:  data.areaid,
                    address: data.address,
                    mobile: data.mobile,
                    isdefault:data.isdefault
            };
            context.loadArea();
        }, function (json) {
            context.$Message.error(json.msg);
        });
    },
    setDefault:function(context,id){
        var _this = this;
        axios.post(_this.edit, {id: id}, function (json) {
            context.$Message.info(json.msg);
            _this.loadList(context);
        }, function (json) {
            context.$Message.error(json.msg);
        });
    },
    delAddress:function(context,id){
        var _this = this;
        App.confirm({"title":'警告',"content":"确定删除此地址吗?"}).then(function(){
            axios.post(_this.del, {id: id}, function (json) {
                context.$Message.info(json.msg);
                _this.loadList(context);
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    useAddress:function(context,id){
        var _this = this;
        if(id){
            axios.post(_this.detail, {id: id}, function (json) {
                var data = json.data;
                context.delivery={
                    linkman: data.name,
                    address: data.address,
                    mobile: data.mobile,
                };
            }, function (json) {
                context.$Message.error(json.msg);
            });
        }else{
            session.getMemberID(function(memberid){
                axios.post(_this.defaultAddress, {memberid: memberid}, function (json) {
                    if(json.dataList.length==0){
                        return;
                    }
                    var data = json.dataList[0];
                    context.delivery = {
                        linkman: data.name,
                        address: data.address,
                        mobile: data.mobile,
                    };
                    context.deliveryid = data.id;
                });
            }, function (json) {
                context.$Message.error(json.msg);
            });
        }

    },
}
