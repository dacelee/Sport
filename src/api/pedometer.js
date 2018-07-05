import axios from './axios.js'
import session from './session.js'
import utils from '../public/appUtil.js'
export default {
    toDayStepInfo: "/delivery/list",
    start: function (context) {
        if (!session.isLogin()) {
            return;
        }
        var pedometer = api.require('pedometer');
        var _this = this;
        session.appCache("pedometerStart", true);
        pedometer.startCount(function (ret) {
            context.stepNum = ret.steps;
            var steps = ret.steps;
            session.appCache("steps", steps);
            //_this.pedometerRes(ret);
        });
    },
    pedometerRes: function (ret) {

        var _this = this;
        var stepsData = session.appCache("stepsData");
        var date = new Date().format("yyyy/MM/dd");
        var time = new Date().getTime();
        if (stepsData == null) {
            session.appCache("stepsData", {"date": date, "time": time});
            return;
        }
        //判断当前时间,推送昨日步数
        if (stepsData.date != date) {
            var pedometer = api.require('pedometer');
            var steps = pedometer.getSteps();
            session.getMemberID(function (memberid) {
                axios.post(_this.toDayStepInfo, {'memberid': memberid, 'steps': steps}, function () {

                });
            });
        }
    },
    getSteps: function () {
        return session.appCache("steps");
    },
    stop:function(){
        if(session.isAPPRuntime()){
            var pedometer = api.require('pedometer');
            pedometer.stopCount();
        }
        session.rmCache("pedometerStart");
        session.rmCache("steps");
    }

}
