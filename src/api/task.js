export default {
    taskSync(todaySteps,todayTime,context){
        var _this = this;
        context.session.getMemberID(function (memberid) {
            context.axios.post("/task/getcoinunit", null, function (json) {
                var coinUnit = json.data.getcoinunit;
                var allTask = context.db.loadTask(memberid,context); //有效任务
                var activityaddSteps = [-1,-1];
                context.axios.post("/task/myactivityadd", {'memberid': memberid}, function (json) {

                    //加成
                },function (json) {
                    //context.$Message.error(json.msg)
                })
            });
        });
    },
    activityaddStepsAction(activityaddSteps,coinUnit,activity,todayTime,context){
        if(activityaddSteps[0]>0){
            var steps = activityaddSteps[0];
            if(activityaddSteps[1]>0){
                steps+=activityaddSteps[1];
            }
            var  coinnum = (steps * coinUnit * activity).toFixed(2);
            context.axios.post("/task/getcoin", {
                'mytaskid': 0,
                coinnum: coinnum,
                'activity': activity,
                steps: steps,
                addtimes: todayTime
            }, function () {

            }, function (json) {
                //context.$Message.error(json.msg)
            })
        }
    }
}
