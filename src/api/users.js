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
    verified:"/my/verified",
    verifiedinfo:"/my/verifiedinfo",
    share:"/my/baseset",
    banklist:"/my/banklist",
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
                           time:  utils.dateFormat(item.replytime,"yyyy/MM/dd hh:mm"),
                           content: item.reply
                       };
                   }
                   data.push(
                       {questions:{
                           time: utils.dateFormat(item.addtime,"yyyy/MM/dd hh:mm"),
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
                var h = data.sex=="男"||data.sex==null?'./static/img/defheaderm.png':'./static/img/defheadern.png';

                context.baseData = {
                    photos: data.logo == null ? h : data.logo,
                    sex: data.sex == null ? '' : data.sex,
                    id: data.inviter,
                    nikename: data.nikename,
                    personality: data.personality,
                    wxpay: data.wxpay,
                    mobile:data.mobile,
                    mywallet:data.mywallet
                }
                context.currentSex =  {
                    id: (data.sex == null||data.sex=="男" ?1: 2),
                    name: (data.sex == null ?'男': data.sex)
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
                var h = data.sex=="男"||data.sex==null?'./static/img/defheaderm.png':'./static/img/defheadern.png';
                data.logo = data.logo==null?h: data.logo;
                session.appCache("MyInfo_" + memberid, data);
                callback(data);
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    myIdentityLoad:function (context){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.myIdentity, {memberid: memberid}, function (json) {
                var data = json.data;
                context.list = [];
                var note = {name: '圈主',passed: 0};
                if(data.isclub===1){
                    note = {name: '圈主',passed: 1};
                }
                context.list.push(note);
                note = {name: '星级达人',passed: 0};
                if(data.starlevel&&data.starlevel>0){
                    var number =["","一","二","三","四"];
                    note = {name: number[data.starlevel]+'星达人',passed: 1};
                }
                context.list.push(note);
                note = {name: '商家',passed: 0};
                if(data.isshops===1){
                    note = {name: '商家',passed: 1};
                }
                context.list.push(note);
                note = {name: '城市合伙人',passed: 0};
                if(data.iscityagent===1){
                    note = {name: '城市合伙人',passed: 1};
                }
                context.list.push(note);

            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
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
                            userName: item.nikename,
                            activity:parseFloat(item.activity).toFixed(2),
                            teamactivity:parseFloat(item.teamactivity).toFixed(2),
                            amount: item.offlineCount
                        });
                    total+=item.offlineCount;
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
                        label: item.Charge,
                        code: item.code
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
                        time:utils.dateFormat(item.addtime,"yyyy/MM/dd hh:mm"),
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
                        time:utils.dateFormat(item.addtime,"yyyy/MM/dd hh:mm"),
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
    },
    verifiedAction(context,formData){
        var _this = this;
        session.getMemberID(function(memberid) {
            formData.memberid = memberid;
            axios.post(_this.verified, formData, function (json) {
                context.$Message.info(json.msg);
                context.$router.replace("/personalCenter");
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    verifiedInfoAction(context,memberid){
        var _this = this;
        axios.post(_this.verifiedinfo, {memberid:memberid}, function (json) {
            context.formData = json.data;
            if(json.data.isrealauth==0){
                _this.backListAction(context);
            }
        }, function (json) {
            context.formData.isrealauth=0
            _this.backListAction(context);
        });
    },
    shareAction:function(context,callback,articleid){
        var _this = this;
        session.getMemberID(function(memberid) {
            var param = {memberid:memberid};
            if(articleid){
                param.articleid = articleid;
            }
            axios.post(_this.share, {memberid:memberid}, function (json) {
                callback(json.data,memberid);
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    backListAction:function(context){
        axios.post(this.banklist, null, function (json) {
            context.selectBank.list = [];
            $.each(json.data, function(i, item) {
            //$(json.data).each(function(i,item){
                context.selectBank.list.push({id:i,name:item});
            })

        }, function (json) {
            context.$Message.error(json.msg);
        });
    },
    shareImg:function(context,x,y,w,h,shareTo){
        context.shareBtnShow = false;
        var screenClip = api.require('screenClip');
        screenClip.open({
            cutFrame: {x: 0, y:y, w: w, h: h},
            save: {album: false, imgPath: "fs://sport", "imgName": "sport.png"}
        },function(ret, err) {
//                    if (ret.status) {
////                        alert(JSON.stringify(ret));
//                    } else {
////                        alert(JSON.stringify(err));
//                    }
        });
        setTimeout(function(){
            screenClip.save( {album: false, imgPath: "fs://sport", "imgName": "sport.png"},function(ret, err) {
                context.shareBtnShow = true;
                if (ret.status) {
                    if(shareTo=="QQ"){
                        var qq = api.require('QQPlus');
                        qq.installed(function(ret, err) {
                            if (ret.status) {
                                qq.shareImage({
                                    type : 'QZone',
                                    imgPath: "fs://sport/sport.png"
                                },function(ret, err){
                                    if (ret.status){
                                        //alert("分享成功！");
                                    } else {
                                        api.alert({msg: JSON.stringify(err)});
                                    }
                                });
                            } else {
                                api.alert({ msg: "没有安装QQ" });
                            }
                        });


                    }else{
                        var sharedModule = api.require('shareAction');
                        sharedModule.share({
                            path:"fs://sport/sport.png",
                            type: 'image'
                        });
                    }

                } else {
                }
            });
        },600);
    }
}
