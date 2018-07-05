import axios from './axios.js'
import session from './session.js'
import utils from '../public/appUtil.js'
export default {
    pageSize:10,
    setPwdAction:"/my/setpwd",
    feedbackList:"/my/feedbacklist",
    feedbackAddAction:"/my/feedbackadd",
    editInfoAction:"/my/editinfo",
    myInfoAction:"/my/myinfo",
    myIdentity:"/my/myidentity",
    myGroupTeam:"/my/mygroupteam",
    memberLevel:"/my/memberlevel",
    activityLog:"/my/activitylog",
    contributionvaluelog:"/my/contributionvaluelog",
    setPwd:function(context,formData){
        var _this = this;
        session.getMemberID(function(memberid) {
            formData.memberid = memberid;
            axios.post(_this.setPwdAction, formData, function (json) {
                context.$Message.info(json.msg);
                context.$router.go(-1);
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    loadFeedback:function(context,page){
        var _this = this;
       session.getMemberID(function(memberid){
           axios.post(_this.feedbackList, {"page":page,"pageSize":_this.pageSize,"memberid":memberid}, function (json) {
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
                context.currentSex =  {
                    id: (data.sex == null||data.sex=="帅哥" ?1: 2),
                    name: (data.sex == null ?'帅哥': data.sex)
                };
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    getCacheMyInfo:function(context,callback,load){
        var _this = this;
        session.getMemberID(function(memberid) {
            if(!load){
                var myInfo = session.appCache("MyInfo_" + memberid);
                if (myInfo != null) {
                    callback(myInfo);
                    return;
                }
            }
            axios.post(_this.myInfoAction, {memberid: memberid}, function (json) {
                var data = json.data;
                session.appCache("MyInfo_" + memberid, data);
                callback(data);
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    myIdentityLoad:function (context){

    },
    loadMyGroupTeam:function(context,resolve){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.myGroupTeam, {memberid: memberid,page:context.page,pageSize:_this.pageSize}, function (json) {
                var list = json.dataList;
                if(context.page==1){
                    context.list = [];
                }
                var total = 0;
                $(list).each(function(index,item){
                    context.list.push({
                            imgPath: item.logo,
                            userName: item.name,
                            amount: item.amount
                        });

                })
                if(list.length>0){
                    context.page++;
                }
                context.total = total;
            }, function (json) {
                context.$Message.error(json.msg);
            },resolve);
        });
    },
    loadMemberLevel:function(context,contribution){
        axios.post(this.memberLevel,null, function (json) {
            context.list = [];
            var list = json.dataList;
            var lessNum = "";
            $(list).each(function(index,item){
                context.list.push(
                    {
                        level: item.name,
                        require: item.endvalue,
                        label: item.Charge
                    });
                if(contribution<item.endvalue&&lessNum==""){
                    lessNum = item.endvalue-contribution;
                }
            });
            context.lessNum = lessNum;
        }, function (json) {
            context.$Message.error(json.msg);
        });
    },
    loadActivityLog:function(context,resolve){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.activityLog, {memberid: memberid,page:context.page,pageSize:_this.pageSize}, function (json) {
                var data = json.dataList;
                if(context.page==1){
                    context.list = [];
                }
                $(data).each(function(index,item){
                    context.list.push({
                        name: item.source,
                        time:utils.dateFormat(item.addtime,"yyyy/MM/dd hh:ss"),
                        num: item.activity
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
    loadContributionvaluelog:function(context,resolve){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.contributionvaluelog, {memberid: memberid,page:context.page,pageSize:_this.pageSize}, function (json) {
                var data = json.dataList;
                if(context.page==1){
                    context.list = [];
                }
                $(data).each(function(index,item){
                    context.list.push({
                        name: item.source,
                        time:utils.dateFormat(item.addtime,"yyyy/MM/dd hh:ss"),
                        num: item.contributionvalue
                    });
                })
                if(data.length>0){
                    context.page++;
                }
            }, function (json) {
                context.$Message.error(json.msg);
            },resolve);
        });
    }
}
