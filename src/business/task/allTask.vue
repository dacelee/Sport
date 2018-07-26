<template>
    <div class="all-task">
        <div class="task-info-list">
            <div class="task-list-item task-list-piece" v-for="item in list">
                <div class="task-head-info">
                    <div class="task-list-name">
                        <img :src="item.imgPath" alt="" v-if="item.imgPath">{{ item.name }}
                    </div>
                    <div class="task-list-activity">活跃度：{{ item.activity }}</div>
                </div>
                <div class="task-details-container">
                    <div class="task-details-info">
                        <div class="task-details-info-item">兑换所需：{{ item.needSugar }}枚</div>
                        <div class="task-details-info-item">奖励糖果：{{ item.rewardSugar }}枚</div>
                        <div class="task-details-info-item">所需步数：{{ item.steps }}</div>
                    </div>
                    <div class="task-details-btn" @click="sales(item.id)">兑换</div>
                </div>
            </div>
            <div class="bottomBtnBuy" v-show="isShow">
                <div class="buyBox">
                    <div class="buyText"><label>交易密码</label><input type="password" v-model="password" placeholder="输入交易密码">
                    </div>
                </div>
                <div class="pull-left" v-for="item in tabsListSales" @click="buy(item.id)">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    var _this
    export default {
        name: 'all-task',
        data() {
            return {
                isShow:false,
                password:'',
                salesId:0,
                list: [
//                    {
//                        name: '试炼任务',
//                        needSugar: 10,
//                        rewardSugar: 11,
//                        steps: 3000,
//                        activity: 1
//                    }
                ],
                tabsListSales: [
                    {
                        id: 'cancel',
                        name: '取消'
                    },
                    {
                        id: 'ok',
                        name: '确定'
                    }
                ]
            }
        }, mounted() {
            _this = this
            this.loadTask()
        }
        , methods: {
            loadTask() {
                this.axios.get(this.session.taskAll, null, function (json) {
                    var list = json.dataList
                    var data = []
                    $(list).each(function (index, item) {
                        data.push(
                            {
                                id: item.id,
                                name: item.name,
                                needSugar: item.coinprice,
                                rewardSugar: item.coinget,
                                steps: item.steps,
                                imgPath:item.logo,
                                activity: item.activity
                            }
                        )
                    })
                    _this.list = data
                }, function (json) {
                
                })
            },
            sales(id){
                this.isShow =  true;
                this.salesId = id;
            },
            buy(id) {
                if(id=="ok"){
                    if(this.password==""){
                        this.$Message.error("请输入交易秘密");
                        return;
                    }
                    this.session.getMemberID(function (memberid) {
                        _this.axios.get(_this.session.buyTask, {'memberid': memberid, 'taskid': _this.salesId,tradepwd:_this.password}, function (json) {
                            _this.$Message.info(json.msg)
                        }, function (json) {
                            _this.$Message.error(json.msg)
                        })
                    })
                }else{
                    this.isShow =  false;
                }

            }
        }
    }
</script>

<style lang="scss">
    .all-task {
        width: 690px;
        margin: 0 auto 20px;
        .task-info-list {
            width: 690px;
            .task-list-item {
                height: 245px;
                margin-top: 20px;
                .task-head-info {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 40px;
                    .task-list-name {
                        font-size: 32px;
                        line-height: 32px;
                        img {
                            width: 32px;
                            height: 32px;
                        }
                    }
                    .task-list-activity {
                        font-size: 24px;
                        line-height: 24px;
                        padding: 4px 0;
                    }
                }
                .task-details-container {
                    display: flex;
                    justify-content: space-between;
                    position: relative;
                    .task-details-info {
                        width: 400px;
                        .task-details-info-item {
                            margin-bottom: 20px;
                            font-size: 24px;
                            line-height: 24px;
                        }
                    }
                    .task-details-btn {
                        font-size: 30px;
                        line-height: 28px;
                        height: 74px;
                        display: inline-block;
                        padding: 22px 30px 22px;
                        border: 2px solid #ffffff;
                        position: absolute;
                        right: 0;
                        bottom: 20px;
                        -webkit-border-radius: 8px;
                        -moz-border-radius: 8px;
                        border-radius: 8px;
                    }
                }
            }
            
        }
        .bottomBtnBuy {
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 999;
            overflow: hidden;
            width: 100%;
            text-align: center;
            background: #25252B;
        div.pull-left {
            font-size: 34px;
            line-height: 34px;
            padding: 33px 0;

            color: #fff;
        }
        .pull-left {
            width: 50%;
            background-color: #404148;
        }
        .pull-left:last-child {
            width: 50%;
            background-color: #F8C513;
            color: #000;
        }
            .buyBox {
                background: #25252B;
                width: 100%;
                padding: 80px 0;
            .buying {
                font-size: 34px;
                color: #fff
            }
            .buyleft {
                font-size: 24px;
                color: #999;
                padding: 30px 0;
            }
            .buyText {
            label {
                margin-right: 20px;
            }
            input {
                background: #333339;
                height: 80px;
                border-radius: 10px;
                width: 60%;
                padding: 0 10px;
                color: #ffffff;
            }
            &:nth-last-child(1) {
                 padding: 15px 0 0 0;
             }
            }
            }
        }
    }
</style>
