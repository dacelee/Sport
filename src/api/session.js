export default {
    indexinfo:"/member/indexinfo" ,
    todaystepinfo:'/member/todaystepinfo',//今日步数基本信息
    login:"/member/login",
    sendsmscode:"/member/sendsmscode",
    reg:"member/reg", //注册
    findpwd:"/member/findpwd",//找回密码
    region:"/member/region",
    teamCreate:"/team/create",
    nearteam:"/team/nearteam",
    regionGetall:"/region/getall",
    isAPPRuntime:function(){
        //用于处理非apicloud运行环境
        return  $api.getStorage('appRun');
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
        $api.setStorage('loginUser',user);
    },
    appCache:function(key,val){
        if(val){
            $api.setStorage(key,val);
        }else{
            $api.getStorage(key);
        }
    }
}
