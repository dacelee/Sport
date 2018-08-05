import axios from './axios.js'
import session from './session.js'
import utils from '../public/appUtil.js'
import task from './task.js'
export default {
    systemType:'',
    backAction:null,
    context:null,
    db:null,
    pedometer:null,
    baseSteps:0,
    timer:0,
    syncStepsNum:0,
    start: function (context,db) {
        this.systemType = api.systemType;
        this.db = db;
        this.context = context;
        var _this = this;
        var syncStepsNum = session.appCache("syncStepsNum");
        if(syncStepsNum){
            this.syncStepsNum = syncStepsNum;
        }
        session.getMemberID(function (memberid) {

        })
    },
    startCount(){

    },
    //taskTimer(){
    //    var _this = this;
    //    this.syncSteps();
    //    clearTimeout(this.timer);
    //    if (session.isLogin()) {
    //        this.timer = setTimeout(function () {
    //            _this.taskTimer()
    //        }, 10000);
    //    }
    //},
    restartCount(){


    },
    syncSteps(){

    },
    updateTodaySteps(steps,timeInt){

    },
    getMyTask(){

    },
    setBackAction:function(action){
        this.backAction = action;
    },
    getSteps: function () {
        var steps = session.appCache("steps");
        return steps?steps:0;
    },
    stop:function(){
        var steps = session.appCache("steps");
        if(steps) {
            steps = parseInt(steps);
            session.rmCache("lastSyncStepsTime")
            var currentTime = new Date().format("yyyy-MM-dd hh:mm:ss");
            task.taskSync(steps,currentTime,this.context);
        }
        session.rmCache("stepsData");
        session.rmCache("steps");
        if(session.isAPPRuntime()){
            if(this.systemType=="android") {
                this.pedometer.stopCount();
            }
        }
    }

}
