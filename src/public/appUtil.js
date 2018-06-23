/**
 * Created by zhlj on 2018/6/6.
 */
import axios from '../api/axios.js'
import session from '../api/session.js'
function AppUtil() {
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

    this.dateFormat=(time,format)=>{
        return new Date(parseInt(time)).format(format);
    }


};
var appUtil = new AppUtil();
export default {
    toastRemind: function (verifyQueue, errors) {
        return appUtil.toastRemind(verifyQueue, errors);
    },
    dateFormat: function (time,format) {
        return appUtil.dateFormat(time,format);
    },
    actionSheet:function(callback){
        var _this = this;
        api.actionSheet({
            title: '图片来源',
            cancelTitle: '取消选择',
            buttons: ['相机','相册', '图片库']
        }, function(ret, err){
            var index = ret.buttonIndex;
            if(index  == 1){
                _this.picture(callback,'camera');
            }else if( index == 2){
                _this.picture(callback,'album');
            }else if( index == 3){
                _this.picture(callback,'library');
            }
        });
    },
    picture:function(callback,sourceType){
        api.getPicture({
            sourceType: sourceType,
            encodingType: 'jpg',
            mediaValue: 'pic',
            destinationType: 'base64',
            quality:90,
            allowEdit: true,
            saveToPhotoAlbum: false
        }, function(ret, err){
            if(ret){
                callback(ret);
            }
        });
    },
    imageUpload:function(src){

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
