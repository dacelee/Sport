import axios from './axios.js'
import session from './session.js'
import utils from '../public/appUtil.js'
export default {
    pageSize:10,
    nearMember:"/team/nearmember",
    join:"/notice/add",
    dotype:"/notice/dotype",
    nearbyMemberList:function(context,x,y,resolve){
        var _this = this;
        axios.post(_this.nearMember, {x: x,y:y,page:context.page,pageSize:_this.pageSize}, function (json) {
            var data = json.dataList;
            if(context.page==1){
                context.list = [];
            }
            session.getMemberID(function(memberid) {
                $(data).each(function (index, item) {
                    var h = item.sex=="男"||item.sex==null?'./static/img/defheaderm.png':'./static/img/defheadern.png';
                    item.logo = item.logo==null?h: item.logo;
                    if(item.id!=memberid){
                        context.list.push({
                            imgPath: item.logo,
                            name: item.nikename,
                            chengyuanIcon: item.sex == "女" ? 'chengyuan-nv' : 'chengyuan-nan',
                            activity: item.activity!=null?parseFloat(item.activity).toFixed(2):0,
                            memberid:item.id
                        });
                    }
                })
            });
            if(data.length>0){
                context.page++;
            }
        }, function (json) {
            context.$Message.error(json.msg);
        },resolve);
    },
    joinAction(context,receivememberid,type,typeid){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.join, {sendmemberid: memberid,receivememberid:receivememberid,type:type,typeid:typeid}, function (json) {
                context.$Message.info(json.msg);
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    dotypeAction(context,id){
        axios.post(this.dotype, {id: id}, function (json) {
            context.$Message.info(json.msg);
            context.loadData();
        }, function (json) {
            context.$Message.error(json.msg);
        });
    }

}
