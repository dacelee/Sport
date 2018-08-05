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
    checkClubMember:"/club/checkclubmember",
    delArticle:"/club/delarticle",
    delMember:"/club/delmember",
    joinClub:"/club/joinclub",
    loadClub:function(context,name,x,y,resolve){
        var _this = this;
        session.getMemberID(function(memberid) {
            axios.post(_this.nearclub, {
                "page": context.page,
                "pageSize": _this.pageSize,
                "name": name,
                "memberid": memberid,
                "x": x,
                "y": y
            }, function (json) {
                if(context.page==1){
                    context.list = [];
                }
                $(json.dataList).each(function (index, item) {
                    context.list.push({
                            id: item.id,
                            imgPath: item.logo,
                            name: item.name,
                            peopleCount: item.countTotal,
                            activity: parseFloat(item.activity).toFixed(2),
                            status: item.memberid == memberid ? 0 : (item.isjoin > 0 ? 1 : (item.isunderline == 1 ? 2 : 3)),
                            distance: item.juli.toFixed(1) + 'km'
                        });
                });
                if(json.dataList.length>0){
                    context.page++;
                }
            }, function (json) {
                context.$Message.error({content: json.msg});
            },resolve);
        });
    },
    showDetail:function(context,clubid){
        axios.post(this.detail, {"clubid":clubid}, function (json) {
            var data = json.data;
            context.headPhoto = data.logo;
            context.clubName = data.name;
            context.idNum = data.nikename;
            context.createTime = utils.dateFormat(data.addtime,"yyyy.MM.dd");
            context.InfoValue1 = [ data.areaname, data.membercount, parseFloat(data.activity).toFixed(2)];
            context.intor = data.intro;
            context.auth_license = data.auth_license;
            session.getMemberID(function(member_id){
                if(member_id==data.memberid){
                    context.mycreate = true;
                }
            });

        },function(json){
            context.$Message.error({content:json.msg});
        });
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
    loadActivityList:function(context,clubid,resolve){
        axios.post(this.articleList, {"page":context.page,"pageSize":this.pageSize,"clubid":clubid}, function (json) {
            if(context.page==1){
                context.list = [];
            }
                session.getMemberID(function(memberid) {
                    $(json.dataList).each(function (index, item) {
                        context.list.push(
                            {
                                id: item.id,
                                imgPath: item.logo,
                                name: item.title,
                                theTime: utils.dateFormat(item.addtime, "yyyy.MM.dd hh:mm"),
                                my: memberid==item.memberid
                            });
                    });
                });
           if(json.dataList.length>0){
               context.page++;
           }
        },function(json){
            context.$Message.error({content:json.msg});
        },resolve);
    },
    addArticle:function(context,formData){
        axios.post(this.addArticleUrl, formData, function (json) {
            context.$Message.info(json.msg);
            context.init = false;
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
            session.getMemberID(function(memberid) {
                $(data).each(function (index, item) {
                    if(item.level==1&&memberid==item.memberid){
                        context.$emit('changeRightTitle',"管理");
                    }
                    context.list.push({
                        imgPath: item.logo,
                        name: item.nikename,
                        chengyuanIcon: item.sex == "女" ? 'chengyuan-nv' : 'chengyuan-nan',
                        rank: item.memberlevel,
                        activity: item.activity,
                        already: item.teammemberid > 0 ? '已组队' : '',
                        level: item.level,
                        memberid:item.memberid,
                        mgrid:memberid
                    });

                })
            });
            if(data.length>0){
                context.page++;
            }
        }, function (json) {
            context.$Message.error(json.msg);
        },resolve);
    },
    checkClubMemberAction(context,clubid){
        var  _this = this;
        session.getMemberID(function(memberid){
            axios.post(_this.checkClubMember, {clubid:clubid,memberid:memberid}, function (json) {
                context.jioned = true
                context.$emit('changeRightTitle',"发布活动");
            },function(json){
                context.jioned = false;
                //context.$Message.error(json.msg);
                context.$emit('changeRightTitle',null);
            });
        });
    },
    delrticleAction(context,articleid,clubid){
        var _this = this;
        App.confirm({"title":'警告',"content":"确定删除活动吗?"}).then(function(){
            axios.post(_this.delArticle, {articleid: articleid}, function (json) {
                context.$Message.info(json.msg);
                context.page = 1;
                _this.loadActivityList(context,clubid);
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    delMemberAction(context,clubid,memberids){
        var _this = this;
        App.confirm({"title":'警告',"content":"确定删除成员吗?"}).then(function(){
            axios.post(_this.delMember, {memberids: memberids,clubid:clubid}, function (json) {
                context.$Message.info(json.msg);
                context.init();
                _this.loadMemberList(context,clubid);
            }, function (json) {
                context.$Message.error(json.msg);
            });
        });
    },
    joinClubAction(context,clubid){
        var _this = this;
        session.getMemberID(function(memberid){
            axios.post(_this.joinClub, {clubid:clubid,memberid:memberid}, function (json) {
                context.$Message.info(json.msg);
                context.$router.replace({name: 'clubTeams', query:{id:clubid}})
            },function(json){
                context.$Message.error(json.msg);

            });
        });
    }

}
