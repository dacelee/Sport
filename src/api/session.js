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
    myActivityAdd:"/task/myactivityadd",
    getCoinUnit :"/task/getcoinunit",
    isAPPRuntime:function(){
        //用于处理非apicloud运行环境
        return  this.appCache('appRuntime');
    },
    getMemberID:function(callback){
        var loginUser = $api.getStorage('loginUser');
        //return loginUser.id;
        if(!loginUser){
            callback(0);
            return false;
        }
        callback(loginUser.id);
    },
    isLogin:function(){//是否登录
        //return true;
        //$api.clearStorage();
        var loginUser = $api.getStorage('loginUser');
        if(!loginUser){
            return false;
        }
        return true;
    },
    getLoginUser(){
        return  $api.getStorage('loginUser');
    },
    openSession(context){

    },
    closeSession(context){

    },
    loginSuccess:function(user,context){
        this.appCache('loginUser',user);
        this.openSession(context);
        //if (this.isAPPRuntime()) {
        //    setTimeout(function(){
        //        context.pedometer.start(context,context.db);
        //    },200)
        //}
    },
    clearCache:function(){
        $api.clearStorage();
    },
    loginOut(context){
        //退出
        //if (this.isAPPRuntime()) {
        //    context.pedometer.stop();
        //}
        this.closeSession(context);
        this.rmCache('loginUser');
    },
    appCache:function(key,val){
        if(val!=null){
            $api.setStorage(key,val);
            return val;
        }else{
            return $api.getStorage(key);
        }
    },
    rmCache(key){
        $api.rmStorage(key);
    }

}
