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
            if(memberid==0){
                return;
            }
            //_this.taskTimer();
            _this.getMyTask();
            if( _this.pedometer==null){
                _this.pedometer = api.require('pedometer');
            }
            var steps = session.appCache("steps");
            if (!steps) {
                steps = _this.db.loadTodaySteps(memberid,context);
                session.appCache("steps", steps);
            }
            if(_this.syncSteps()==2){
                _this.baseSteps = steps;
                _this.startCount();
            }
        })
    },
    startCount(){
        var _this = this;
        if(this.systemType=="ios"){
            console.info("ios计步开始");
        }else{
            //console.info("android计步开始");
            this.pedometer.startCount(function (ret) {

                //console.info("android计步 baseSteps:"+_this.baseSteps);
                //console.info("android计步 total:"+total+"   "+_this.baseSteps);
                session.appCache("steps", total);
                //console.info("total:"+total);
            });
        }
    },
    taskTimer(){
        //var _this = this;
        //this.syncSteps();
        //clearTimeout(this.timer);
        //if (session.isLogin()) {
        //    this.timer = setTimeout(function () {
        //        _this.taskTimer()
        //    }, 10000);
        //}
    },
    restartCount(){

    },
    syncSteps(){
        var today = new Date().format("yyyy-MM-dd");
        var timeInt =  Date.parse(new Date(new Date().format("yyyy-MM-dd 00:00:00")));
        var stepsData = session.appCache("stepsData");
        var steps = session.appCache("steps");
        if(!steps){
            return;
        }
        var steps = parseInt(steps);
        //console.info("计步同步:"+today+" "+stepsData.steps);
        if(!stepsData){
            session.appCache("stepsData", {"today": today, "steps": steps});
            return 2;
        }
        //session.appCache("stepsData", {"today": "2018-07-15", "steps": stepsData.steps});
        //stepsData.today = "2018-07-17";
        if(today!=stepsData.today){
            //计步重启
            timeInt = Date.parse(new Date(stepsData.today+" 00:00:00"));
            //alert(stepsData.steps);
            this.updateTodaySteps(stepsData.steps,timeInt);
            task.taskSync(stepsData.steps,stepsData.today+" 23:59:59",this.context);
            this.restartCount();
            return 1;
        }else{
            //var lastSyncStepsTime = parseInt(session.appCache("lastSyncStepsTime"));
            var now = new Date().getTime();
            //console.info((now-lastSyncStepsTime)/1000);
            //if(!lastSyncStepsTime||lastSyncStepsTime+1200*1000<now){
            //    session.appCache("lastSyncStepsTime",now);
            var currentTime = new Date().format("yyyy-MM-dd hh:mm:ss");
            task.taskSync(steps,currentTime,this.context);
            //}
            if(steps!=stepsData.steps){
                this.updateTodaySteps(steps,timeInt);
            }
            session.appCache("stepsData", {"today": today, "steps": steps});
            return 2;
        }
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
