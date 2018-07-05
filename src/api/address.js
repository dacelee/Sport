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

    },
    loadDetail:function(context,id){

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


    },
}
