export default {
    dbVersion:"0.0.3",
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
            //我的任务
            var ret = this.db.executeSqlSync({
                name: 'sport',
                sql: 'CREATE TABLE task(id int NOT NULL, name varchar(35), steps int, activity int, begintime int,endtime int,status int,memberid int NOT NULL,syncsteps int,finishtime int)'
            });
            if(!ret.status){
                context.$Message.error(ret.msg)
                return false;
            }
            //今日步数
            var ret = this.db.executeSqlSync({
                name: 'sport',
                sql: 'CREATE TABLE today_steps(steps int,distance int, addtime int NOT NULL,memberid int NOT NULL)'
            });
            if(!ret.status){
                context.$Message.error(ret.msg)
                return false;
            }
            //轨迹
            var ret = this.db.executeSqlSync({
                name: 'sport',
                sql: 'CREATE TABLE trace(lng varchar(20),lat  varchar(20),heading REAL,altitude REAL, addtime int,memberid int)'
            });
            if(!ret.status){
                context.$Message.error(ret.msg)
                return false;
            }
            var ret = this.db.executeSqlSync({
                name: 'sport',
                sql: 'CREATE TABLE db_version(version varchar(30))'
            });
            if(!ret.status){
                context.$Message.error(ret.msg)
                return false;
            }
        }else{
            this.versionCheck(context);
        }
        return true;
    }
}
