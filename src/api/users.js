import axios from './axios.js'
import session from './session.js'
import utils from '../public/appUtil.js'
export default {
    setPwdAction:"/my/setpwd",
    feedbackList:"/my/feedbacklist",
    feedbackAddAction:"/my/feedbackadd",
    editInfoAction:"/my/editinfo",
    myInfoAction:"/my/myinfo",
    setPwd:function(context,formData){
        session.getMemberID(function(memberid) {
            formData.memberid = memberid;
            axios.post(this.setPwdAction, formData, function (json) {
                context.$Message.info(json.msg);
                context.$router.replace(-1);
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    loadFeedback:function(context,page,pageSize){
        var _this = this;
       session.getMemberID(function(memberid){
           axios.post(_this.feedbackList, {"page":page,"pageSize":pageSize,"memberid":memberid}, function (json) {
               var data = [];
               $(json.dataList).each(function(index,item){
                   var reply = {};
                   if(item.reply){
                       reply = {
                           time:  utils.dateFormat(item.replytime,"yyyy/MM/dd hh:ss"),
                           content: item.reply
                       };
                   }
                   data.push(
                       {questions:{
                           time: utils.dateFormat(item.addtime,"yyyy/MM/dd hh:ss"),
                           content:item.content
                       },
                           reply: reply
                       });
               });
               context.list = data;
           },function(json){
               context.$Message.error({content:json.msg});
           });
       });
    },
    feedbackAdd:function(context,formData){
        var _this = this;
        session.getMemberID(function(memberid){
            formData.memberid = memberid;
            axios.post(_this.feedbackAddAction,formData, function (json) {
                context.$Message.info(json.msg);
                context.$router.go(-1);
            },function(json){
                context.$Message.error(json.msg);
            });
        });

    },
    editInfo:function(context,fieldname,fieldvalue,noChange){
        var _this = this;
        session.getMemberID(function(memberid){
            axios.post(_this.editInfoAction,{memberid:memberid,fieldname:fieldname,fieldvalue:fieldvalue}, function (json) {
                context.$Message.info(json.msg);
                if(noChange){
                    return;
                }else{
                    context.$router.go(-1);
                }

            },function(json){
                context.$Message.error(json.msg);
            });
        });
    },
    myInfo:function(context){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.myInfoAction, {memberid: memberid}, function (json) {
                var data = json.data;
                session.appCache("MyInfo_" + memberid, data);
                context.baseData = {
                    photos: data.logo == null ? '/static/img/personal/default.jpg' : data.logo,
                    sex: data.sex == null ? '' : data.sex,
                    id: data.id,
                    nikename: data.nikename,
                    personality: data.personality,
                    wxpay: data.wxpay
                }
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    getCacheMyInfo:function(context,callback){
        var _this = this;
        session.getMemberID(function(memberid) {
            var myInfo = session.appCache("MyInfo_" + memberid);
            if (myInfo != null) {
                callback(myInfo);
            }
            axios.post(_this.myInfoAction, {memberid: memberid}, function (json) {
                var data = json.data;
                session.appCache("MyInfo_" + memberid, data);
                callback(data);
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    }

}
