<template>
    <div class="create-team">
        <div class="team-item mt-20">
            <div class="left-label pull-left">名称</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入队伍名称" v-model="formData.name" v-verify="formData.name" >
            </div>
        </div>
        <div class="team-item">
            <div class="left-label pull-left">地区</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="活动位置" v-model="area" @click="selCity">
            </div>
        </div>
        <div class="team-item text-area">
            <div class="left-label pull-left">简介</div>
            <div class="right-input pull-left">
                <textarea placeholder="请输入队伍简介" v-model="formData.intro"></textarea>
            </div>
        </div>
        <div class="save-btn text-center" @click="submitData">提交</div>
    </div>
</template>
<script>
    import citys from '../../api/citys.js'
    export default {
        name: 'create-team',
        data() {
            var memberid = this.session.getMemberID();
            return{
                formData:{
                    memberid:memberid,
                    name:"",
                    proid:"",
                    cityid:"",
                    areaid:"",
                    intro:"",
                    x:"",
                    y:""},
                area:"",
                locationData: null,//定位数据
//                province:[],
                selectorJSON:null
            }
        },verify: {
            formData: {
                name: [{minLength:1,  message: "队伍名称必须填写"}]
            }
        }, mounted() {
            this.loadCity();
        },activated(){
            if(this.session.isAPPRuntime()&&this.area == ''){
                this.location();//定位
            }
        },methods: {
            loadCity(){
                var _this = this;
                citys.bulidJSONCity(function(json){
                    if(json.code==1){
                        _this.selectorJSON = json.data;
                    }else{
                        _this.$Message.error("加载城市数据失败");
                    }
                });
            },
            location(){
                var _this = this;
                citys.location(function(ret){
                    if(!ret.status){
                        _this.$Message.error("定位失败,请开启GPS");
                        return;
                    }
                    _this.formData.x = ret.lon;
                    _this.formData.y = ret.lat;
                    _this.locationData = ret;
                    var state =  ret.state;
                    var city = ret.city;
                    var district = ret.district;
                    var street = ret.street;
                    var address = ret.address;
                    var thoroughfare = ret.thoroughfare;
//                    alert( street )
                    if(!thoroughfare){
                        _this.area = address.replace(state,"").replace(city,"").replace(district,"").replace(street,"");
                    }else{
                        _this.area = thoroughfare;
                    }

                },true);
            },
            submitData(){
                var ret = this.locationData;
                var state =  ret.state;
                var city = ret.city;
                var district = ret.district;
                if(!state){
                    this.location();
                    return;
                }
                var dbData = citys.locationToDBData(_this, ret);
                if (dbData != null) {
                    this.formData.proid = dbData.proid;
                    this.formData.cityid = dbData.cityid;
                    this.formData.areaid = dbData.areaid;
                }else{
                    return;
                }
                if(!this.$verify.check()){
                    var errMsg = this.appUtil.toastRemind(this.$verify.verifyQueue,this.$verify.$errors);
                    this.$Message.error(errMsg);
                }else{
                    var _this = this;
                    this.axios.post(this.session.teamCreate,this.formData, function (data) {
                        _this.$Message.info(data.msg);
                        _this.$router.replace('/teamList');
                    },function(data){
                        _this.$Message.error(data.msg);
                    });
                }
            },selCity(){
                if (this.selectorJSON == null) {
                    this.$Message.info("正在加载城市数据...");
                    return;
                }
                var _this = this;
                citys.actionSelector(this.selectorJSON, function (ret) {
                    _this.area = ret.level1 + " " + ret.level2 + " " + ret.level3;
                    _this.formData.proid = ret.selectedInfo[0].id;
                    _this.formData.cityid = ret.selectedInfo[1].id;
                    _this.formData.areaid = ret.selectedInfo[2].id;
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
