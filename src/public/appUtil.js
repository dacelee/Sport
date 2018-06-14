/**
 * Created by zhlj on 2018/6/6.
 */
import axios from '../api/axios.js'
import session from '../api/session.js'
function AppUtil() {
    this.location = function (callback, getAddress) {
        //封装apiCloud aMap定位;
        var aMap = api.require('aMap');
        aMap.getLocation(function (ret, err) {
            if (ret.status) {
                if (getAddress) {
                    var lon = ret.lon;
                    var lat = ret.lat;
                    aMap.getNameFromCoords({
                        lon: ret.lon,
                        lat: ret.lat
                    }, function (ret, err) {
                        if (ret.status) {
                            ret.lon = lon;
                            ret.lat = lat;
                        }
                        callback(ret);
                    });
                } else {
                    callback(ret);
                }
                //alert(JSON.stringify(ret));
            } else {
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
        pedometer.startCount(function(ret) {
            alert(ret.steps);
        });
    }
    this.bulidJSONCity=(callback)=>{
        var _this = this;
        var UIActionSelectorJSON =session.appCache("regionGetall");
        if(UIActionSelectorJSON!=null){
            callback({"code":1,"data":UIActionSelectorJSON});
            return;
        }else{
            axios.post(session.regionGetall,null, function (data) {
                //获取全部区域数据
                var citys = data.data;
                //封装成控件所需的json
                UIActionSelectorJSON = _this.getChildCity(citys);
                session.appCache("regionGetall",UIActionSelectorJSON);
                callback({"code":1,"data":UIActionSelectorJSON});
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
    }

}
