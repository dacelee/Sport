import axios from './axios.js'
import session from './session.js'
import utils from '../public/appUtil.js'
export default {
    nearclub:"/club/nearclub",
    detail:"/club/detail",
    create:"/club/create",
    auth:"/club/authstore",
    articleList:"/club/articlelist",
    addArticleUrl:"/club/addarticle",
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
                        distance: item.juli+'km'
                    });
            });
           context.page++;
           context.list = data;
        },function(json){
           context.$Message.error({content:json.msg});
        });
    },
    showDetail:function(context,clubid){
        axios.post(this.detail, {"clubid":clubid}, function (json) {
            var data = json.data;
            context.headPhoto = data.logo;
            context.clubName = data.name;
            context.idNum = data.nikename;
            context.createTime = utils.dateFormat(data.addtime,"yyyy.MM.dd");
            context.InfoValue1 = [ data.areaname, data.membercount, data.activity ];
            context.intor = data.intro;
            //context.auth_license = data.auth_license;
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
    }

}
