export default {
    dbVersion:'0.0.1',
    db:null,
    initDb(context){
        var fs = api.require('fs');
        //var ret = fs.removeSync({
        //    path: 'fs://sport/sport.db'
        //});
        var sportFile = fs.existSync({
            path: 'fs://sport/sport.db'
        });

        this.db = api.require('db');
        var ret = this.db.openDatabaseSync({
            name: 'sport',
            path:'fs://sport/sport.db'
        });

        if(!ret.status){
            context.$Message.error(ret.msg);
            return false;
        }
        if(!sportFile.exist){

        }else{
            this.versionCheck();
        }
        return true;
    },
    versionCheck(){

    },
    version(){
        //alert("drop table trace");
        //return;
        var ret = this.db.executeSqlSync({
            name: 'sport',
            sql: 'DROP TABLE trace'
        });
        //轨迹
        var ret = this.db.executeSqlSync({
            name: 'sport',
            sql: 'CREATE TABLE trace(lng varchar(20),lat  varchar(20),heading REAL,altitude REAL, addtime int,memberid int)'
        });
    },
    addTask(id,name,steps,activity,begintime,endtime,status,memberid,context){
        if(this.db==null){
            if(!this.initDb(context)){
                return false;
            }
        }

        var ret = this.db.selectSqlSync({
            name: 'sport',
            sql: 'SELECT * FROM task where id='+id+" and memberid="+memberid
        });
        if(ret.status){
            if(ret.data.length==0) {
                var ret = this.db.executeSqlSync({
                    name: 'sport',
                    sql: 'INSERT INTO task VALUES(' + id + ',"' + name + '",' + steps + ',' + activity + ',' + begintime + ',' + endtime + ',' + status + ',' + memberid + ',0)'
                });
                if (!ret.status) {
                    context.$Message.error(ret.msg);
                    return false;
                }
            }
        }else{
            context.$Message.error(ret.msg);
            return false;
        }
        return true;
    },
    updateTodaySteps(memberid,steps,time,context){

    },
    loadStepCount(memberid,startTime,endTime,context){


    },
    loadTask(memberid,context){

    },
    syncTaskSteps(id,syncSteps,context){

    },
    loadTodaySteps(memberid,context){

    },

}
