<template>
    <div class="task-list">
        <l-shortMenu :list="list" :currentRoute="currentRoute" @change="changeRoute"/>
        <div class="task-activity">
            <div class="activity-item">当前活跃度:{{ activity }}</div>
            <div class="activity-item">奖励糖果:{{ sugarNum }}</div>
            <div class="activity-item">步数:{{ stepNum }}</div>
        </div>
        <component :is="currentRoute"/>
    </div>
</template>

<script>
    let _this
    import allTask from './allTask.vue'
    import myTask from './myTask.vue'
    import historyTask from './historyTask.vue'
    
    export default {
        name: 'task-list',
        components: {
            allTask,
            myTask,
            historyTask
        },
        data() {
            return {
                currentRoute: 'allTask',
                activity: 0,
                sugarNum: 0,
                stepNum: 0,
                getCoinUnit:0,
                list: [
                    {
                        id: 'allTask',
                        name: '任务卷轴'
                    },
                    {
                        id: 'myTask',
                        name: '我的任务'
                    },
                    {
                        id: 'historyTask',
                        name: '历史任务'
                    }
                ]
            }
        },
        methods: {
            changeRoute(route) {
                _this.currentRoute = route
            },
            loadTask(){
                var _this = this;
                this.session.getMemberID(function(memberid){
                    var activity = 0;
                    _this.axios.post(_this.session.myTask, {"memberid":memberid}, function (json) {
                        $(json.dataList).each(function(index,item){
                            activity+= item.activity
                        })
                        _this.axios.post(_this.session.myActivityAdd, {"memberid":memberid}, function (json) {
                            activity+=json.data.activityadd;
                            _this.activity =  activity;
                        },function(json){
                            _this.$Message.error(json.msg)
                        });
                        _this.axios.post(_this.session.getCoinUnit,null, function (json) {
                            _this.getCoinUnit = json.data.getcoinunit;
                            _this.stepNum = _this.session.appCache("steps");
                            if(isNaN(_this.stepNum )){
                                _this.stepNum = 0;
                            }
                            _this.sugarNum = (_this.stepNum* _this.getCoinUnit* _this.activity).toFixed(4);
                        },function(json){
                            _this.$Message.error(json.msg)
                        });
                    },function(json){
                        _this.$Message.error(json.msg)
                    });

                });
            }

        },
        mounted() {
            _this = this;
//            this.loadTask();
        },
        activated(){
            this.loadTask();
        }
    }
</script>

<style lang="scss">
    .task-list {
        .task-activity {
            width: 690px;
            background-color: #33333a;
            margin: 0 auto;
            color: #999999;
            font-size: 24px;
            line-height: 24px;
            padding: 28px 0;
            display: flex;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            justify-content: space-around;
        }
        .task-list-piece {
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            padding: 30px 30px 30px;
        }
        .task-list-piece:nth-child(6n+1) {
            background-color: #73849d;
        }
        .task-list-piece:nth-child(6n+2) {
            background-color: #53b488;
        }
        .task-list-piece:nth-child(6n+3) {
            background-color: #a48f7e;
        }
        .task-list-piece:nth-child(6n+4) {
            background-color: #ca6869;
        }
        .task-list-piece:nth-child(6n+5) {
            background-color: #994dd7;
        }
        .task-list-piece:nth-child(6n+6) {
            background-color: #2579d2;
        }
    }
</style>
