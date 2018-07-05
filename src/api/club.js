import axios from './axios.js'
import session from './session.js'
import utils from '../public/appUtil.js'
export default {
    pageSize:10,
    nearclub:"/club/nearclub",
    detail:"/club/detail",
    create:"/club/create",
    auth:"/club/authstore",
    articleList:"/club/articlelist",
    addArticleUrl:"/club/addarticle",
    memberList:"/club/memberlist",
    loadClub:function(context,name,memberid,x,y,page,pageSize){
       axios.post(this.nearclub, {"page":page,"pageSize":pageSize,"name":name,"memberid":memberid,"x":x,"y":y}, function (json) {
            var data = [];
            $(json.dataList).each(function(index,item){
                data.push(
                    { id:item.id,
                        imgPath:item.logo,
                        name:  item.name,
                        peopleCount: item.countTotal,
                        activity: item.activity,
                        status:item.memberid==memberid?0:(item.isjoin>0?1:(item.isunderline==1?2:3)),
                        distance: item.juli.toFixed(1)+'km'
                    });
            });
           context.page++;
           context.list = data;
        },function(json){
           context.$Message.error({content:json.msg});
        });
    },
    showDetail:function(context,clubid){
        
    },
    clubCreate:function(context,formData){
        var  _this = this;
        session.getMemberID(function(memberid){
            formData.memberid = memberid;
            axios.post(_this.create, formData, function (json) {
                context.$Message.info(json.msg);
                context.$router.replace({name:'createClubSuccess',query:{id:json.id}});
            },function(json){
                context.$Message.error(json.msg);
            });
        });

    },
    clubAuth:function(context,formData){
        axios.post(this.auth, formData, function (json) {
            context.$Message.info(json.msg);
            context.$router.replace('clubCertificationSuccess');
        },function(json){
            context.$Message.error(json.msg);
        });
    },
    loadActivityList:function(context,clubid,page,pageSize){
        axios.post(this.articleList, {"page":page,"pageSize":pageSize,"clubid":clubid}, function (json) {
            var data = [];
            $(json.dataList).each(function(index,item){
                data.push(
                    {
                        id:item.id,
                        imgPath:item.logo,
                        name: item.title,
                        theTime: utils.dateFormat(item.addtime,"yyyy.MM.dd hh:ss")
                    });
            });
            context.list = data;
        },function(json){
            context.$Message.error({content:json.msg});
        });
    },
    addArticle:function(context,formData){
        axios.post(this.addArticleUrl, formData, function (json) {
            context.$Message.info(json.msg);
            context.$router.go(-1);
        },function(json){
            context.$Message.error(json.msg);
        });
    },
    loadMemberList:function(context,clubid,name,resolve){
        var _this = this;
        axios.post(_this.memberList, {clubid: clubid,name:name,page:context.page,pageSize:_this.pageSize}, function (json) {
            var data = json.dataList;
            if(context.page==1){
                context.list = [];
            }
            $(data).each(function(index,item){
                context.list.push({
                    imgPath: item.logo,
                    name: item.nikename,
                    chengyuanIcon:item.sex=="美女"?'chengyuan-nv':'chengyuan-nan',
                    rank: item.memberlevel,
                    activity: item.activity,
                    already:item.teammemberid>0?'已组队':'',
                    level: item.level,

                });
            })
            if(data.length>0){
                context.page++;
            }
        }, function (json) {
            context.$Message.error(json.msg);
        },resolve);
    }

}
