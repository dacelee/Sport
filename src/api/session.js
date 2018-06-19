export default {
    indexinfo:"/member/indexinfo" ,
    todaystepinfo:'/member/todaystepinfo',//今日步数基本信息
    login:"/member/login",
    sendsmscode:"/member/sendsmscode",
    reg:"member/reg", //注册
    findpwd:"/member/findpwd", //找回密码
    region:"/member/region",
    teamCreate:"/team/create",
    nearReam:"/team/nearteam", //附近组队
    teamDetail:"/team/detail",
    teamMember:"team/member",
    teamDelMember:"team/delmember",//删除队员
    regionGetall:"/region/getall",
    toDayStepInfo:"/member/todaystepinfo",//今日步数
    taskAll:"/task/list",//所有任务
    buyTask:"/task/buytask",
    myTask:"/task/mytasklist",//我的任务
    historyTask:"/task/mytaskhistorylist",
    articleList:"/article/list",//文章列表
    articleDetail:"/article/detail",//文章详情
    coinSalelist:"/coinsale/coinmysalelist",
    joinTeam:"/team/jointeam",
    isAPPRuntime:function(){
        //用于处理非apicloud运行环境
        return  this.appCache('appRuntime');
    },
    getMemberID:function(){
        return 1;
    },
    isLogin:function(){//是否登录
        return true;
        var loginUser = $api.getStorage('loginUser');
        if(!loginUser){
            return false;
        }
        return true;
    },
    loginSuccess:function(user){
        this.appCache('loginUser',user);
    },
    clearCache:function(key){
        if(this.isAPPRuntime()){
            $api.setStorage(key,null);
        }
    },
    appCache:function(key,val){
        if(val&&val!=null){
            $api.setStorage(key,val);
            return val;
        }else{
            return $api.getStorage(key);
        }
    },

}
