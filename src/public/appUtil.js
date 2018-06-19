/**
 * Created by zhlj on 2018/6/6.
 */
import axios from '../api/axios.js'
import session from '../api/session.js'
function AppUtil() {
    this.location = function (callback, getAddress) {
        //封装apiCloud aMap定位;
        var aMap = api.require('aMap');
        //mui.toast("定位中...");
        var locationCount = 0;
        aMap.getLocation(function (ret, err) {
            locationCount++;
            if (ret.status) {
                aMap.stopLocation();
                if (getAddress) {
                    var lon = ret.lon;
                    var lat = ret.lat;
                    aMap.getNameFromCoords({
                        lon: lon,
                        lat: lat
                    }, function (ret, err) {
                        if (ret.status) {
                            ret.lon = lon;
                            ret.lat = lat;
                        }
                        //mui.toast("定位成功");
                        //alert(JSON.stringify(ret));
                        callback(ret);
                    });
                } else {
                    //mui.toast("定位成功");
                    callback(ret);
                }
                //alert(JSON.stringify(ret));
            } else {
                if(locationCount>=3){
                    aMap.stopLocation();
                }
                callback(ret);
                //alert(JSON.stringify(err));
            }
        });
    }
    this.toastRemind = (verifyQueue, errors) => {
        //处理表单验证结果
        var errors = errors;
        //console.log(errors);
        var errMsg = "";
        $.each(verifyQueue, function (i) {
            var queue = verifyQueue[i];
            for (var i = 0; i < queue.length; i++) {
                var node = queue[i];
                var e = eval("errors." + node);
                if (e.length > 0) {
                    //Vue.prototype.$toast(e[0]);
                    errMsg = e[0];
                    break;
                }
            }
            return;
        });
        return errMsg;
    }
    //计步
    this.pedometer=function (){
        var pedometer = api.require('pedometer');
        var _this = this;
        pedometer.startCount(function(ret) {
            //alert(ret.steps);
            _this.pedometerRes(ret);
        });
    }
    this.pedometerRes= function(ret){
        var _this = this;
        var stepsData = session.appCache("stepsData");
        var date = new Date().format("yyyy/MM/dd");
        var time = new Date().getTime();
        if(stepsData==null){
            session.appCache("stepsData",{"date":date,"time":time});
            return;
        }
        //判断当前时间,推送昨日步数
        if(stepsData.date!=date){
            var pedometer = api.require('pedometer');
            var steps = pedometer.getSteps();
            var memberid = session.getMemberID;
            axios.post(session.toDayStepInfo,{'memberid':memberid,'steps':steps}, function () {
                session.clearCache("steps");
                var pedometer = api.require('pedometer');
                pedometer.stopCount();
                pedometer.startCount(function(ret) {
                    _this.pedometerRes(ret);
                });
            });
        }
    }
    this.bulidJSONCity=(callback)=>{
        var _this = this;
        var selectorJSON = session.appCache("regionAll");
        if(selectorJSON!=null){
            callback({"code":1,"data":selectorJSON});
            return;
        }else{
            axios.post(session.regionGetall,null, function (data) {
                //获取全部区域数据
                var citys = data.data;
                //封装成控件所需的json
                selectorJSON = _this.getChildCity(citys);
                session.appCache("regionAll",selectorJSON);
                callback({"code":1,"data":selectorJSON});
            },function(data){
                callback({"code":0});
            });
        }
    }
    this.getChildCity = (subArea)=>{
        var _this = this;
        var areas = [];
        $(subArea).each(function(index,item){
            var short_name = item.short_name;
            var city = {'name':short_name,'id':item.id}
            if(item.sub){
                city.sub =_this.getChildCity(item.sub);
            }
            areas.push(city);
        });
        return areas;
    }
    this.actionSelector = (dataJson,callback)=>{
        //选择控件
        var UIActionSelector = api.require('UIActionSelector');
        UIActionSelector.open({
            datas:dataJson,
            title:{                                      //（可选项）JSON 对象类型；选择器顶部标题栏设置
                text: '',
                bg:'#78787A'
            },
            lineColor:'#78787A',
            cancel:{
                bg: '#313237',
                color: '#fff',
            },
            ok:{
                bg: '#F6B415',
                color: '#000',
            },
            layout:{
                size: 12,                          //（可选项）数字类型；普通选项的字体大小；默认：12
                sizeActive: 16,
                maskBg: 'rgba(0,0,0,0.2)',         //（可选项）字符串类型；遮罩层背景，点击该区域隐藏选择器，支持 rgb，rgba，#，img；默认：rgba(0,0,0,0.2)
                bg: '#1E1E22',                        //（可选项）字符串类型；选择器有效区域背景，支持 rgb，rgba，#，img；默认：#fff
                color:  'RGBA(215, 131, 61, 1)',                     //（可选项）字符串类型；选项的文字颜色，支持 rgb，rgba，#；默认：#848484
                colorSelected: '#FFF'
            }
        }, function(ret, err) {
            if (ret) {
                if(ret.eventType=="ok"){
                    callback(ret);
                }
            } else {
                alert(JSON.stringify(err));
            }
        })
    }
    this.dateFormat=(time,format)=>{
        return new Date(parseInt(time)).format(format);
    },
    this.findRegion=(region,regions)=>{
         //根据位置匹配数据库数据
        var res = null;//$api.getStorage("regionAll");
        var selectorJSON = session.appCache("regionAll");
        if(selectorJSON==null){
             return null;
         }else{
            if(regions){

                $(regions).each(function(index,item){
                    if(region.indexOf(item.name)!=-1){
                        res = {};
                        res.id = item.id;
                        res.sub = item.sub;
                        return;
                    }
                })
            }else{
                $(selectorJSON).each(function(index,item){
                    if(region.indexOf(item.name)!=-1){
                        res = {};
                        res.id = item.id;
                        res.sub=item.sub;
                        return;
                    }
                });
            }
            return res;
         }
     }
};
var appUtil = new AppUtil();
export default {
    toastRemind: function (verifyQueue, errors) {
        return appUtil.toastRemind(verifyQueue, errors);
    },
    location: function (callback, getAddress) {
        return appUtil.location(callback, getAddress);
    },
    bulidJSONCity: function (callback) {
        return appUtil.bulidJSONCity(callback);
    },
    actionSelector: function (dataJson,callback) {
        return appUtil.actionSelector(dataJson,callback);
    },
    dateFormat: function (time,format) {
        return appUtil.dateFormat(time,format);
    },
    findRegion:function(region,regions){
        return appUtil.findRegion(region,regions);
    }
}

Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}
