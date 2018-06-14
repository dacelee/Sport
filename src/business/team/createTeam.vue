<template>
    <div class="create-team">
        <div class="team-item mt-20">
            <div class="left-label pull-left">名称</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入队伍名称" v-model="formDate.name" v-verify="formDate.name" >
            </div>
        </div>
        <div class="team-item">
            <div class="left-label pull-left">地区</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请选择地区" readonly v-model="area" @click="selCity">
            </div>
        </div>
        <div class="team-item text-area">
            <div class="left-label pull-left">简介</div>
            <div class="right-input pull-left">
                <textarea placeholder="请输入队伍简介" v-model="formDate.intro"></textarea>
            </div>
        </div>
        <div class="save-btn text-center" @click="submitDate">提交</div>
    </div>
</template>
<script>
    let _this
    export default {
        name: 'create-team',
        data() {
            return{
                formDate:{ name:"",
                    proid:"",
                    cityid:"",
                    areaid:"",
                    intro:"",
                    x:"",
                    y:""},
                area:"",
//                province:[],
                selectorJSON:null
            }
        },verify: {
            formDate: {
                name: [{minLength:1,  message: "队伍名称必须填写"}]
            }
        }, mounted() {
            _this = this;
            _this.loadCity();
            window.apiready = function() {
                _this.location();
            }
        },methods: {
            loadCity(){
                this.appUtil.bulidJSONCity(function(json){
                    if(json.code==1){
                        _this.selectorJSON = json.data;
                    }else{
                        _this.$toast("加载城市数据失败");
                    }

                })
            },
            location(){
                this.appUtil.location(function(ret){
                    if(!ret.status){
                        _this.$toast("定位失败请开启GPS后再试试");
                        return;
                    }
                    this.formDate.x = ret.lon;
                    this.formDate.y = ret.lat;
                    //匹配城市id
                },true);
            },
            submitDate(){
                if(!this.$verify.check()){
                    var errMsg = this.$appUtil.toastRemind(this.$verify.verifyQueue,this.$verify.$errors);
                    this.$toast(errMsg);
                }else{
                    this.axios.post(this.session.teamCreate,this.formDate, function (data) {
                        _this.$toast(data.msg);
                        _this.$router.replace('/teamList');
                    },function(data){
                        _this.$toast(data.msg);
                    });
                }
            },selCity(){
                //调用apicloud选择城市
                if( _this.selectorJSON==null){
                    _this.$toast("正在加载城市数据,请稍后...");
                    return;
                }
                _this.appUtil.actionSelector(_this.selectorJSON,function (ret){
                    _this.area= ret.level1+" "+ret.level2 +" "+ret.level3;
                    _this.formDate.proid = ret.selectedInfo[0].id;
                    _this.formDate.cityid = ret.selectedInfo[1].id;
                    _this.formDate.areaid = ret.selectedInfo[2].id;
                });
            }
        }
    }

</script>
<style lang="scss">
    .create-team {
        padding-bottom: 60px;
        .team-item {
            width: 750px;
            overflow: hidden;
            margin-bottom: 20px;
            background-color: #33333a;
            height: 90px;
            .left-label {
                width: 100px;
                font-size: 30px;
                line-height: 30px;
                margin: 30px 0 30px 30px;
            }
            .right-input {
                width: 590px;
                margin-top: 10px;
                input {
                    width: 590px;
                    height: 70px;
                    background-color: #25252B;
                    color: #ffffff;
                    padding: 0 20px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
            }
            &.text-area {
                height: inherit;
                padding: 0 0 100px 0;
                textarea {
                    width: 590px;
                    height: 400px;
                    background-color: #25252B;
                    color: #ffffff;
                    padding: 10px 20px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
            }
        }
        .save-btn {
            font-size: 34px;
            line-height: 34px;
            padding: 33px 0;
            background-color: #ffd554;
            color: #000;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 750px;
        }
        .mt-20 {
            margin-top: -20px;
        }
    }
</style>
