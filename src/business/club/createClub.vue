<template>
    <div class="create-club">
        <div class="select-upload">
            <div class="upload-box text-center" >
                <l-icon name="shangchuantouxiang"/>
                <l-imageUpload   :limit="1"
                                 style="border-radius: 50%;" :onSuccess="uploadHeadSuccess"/>
            </div>
            <div class="select-upload-label text-center">上传俱乐部头像</div>
        </div>
        <div class="club-item mt-20">
            <div class="left-label pull-left">名称</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入俱乐部名称" v-model="formData.name" v-verify="formData.name">
            </div>
        </div>
        <div class="club-item">
            <div class="left-label pull-left">地区</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="俱乐部位置" v-model="area" @click="selCity" readonly>
            </div>
        </div>
        <div class="club-item text-area">
            <div class="left-label pull-left">简介</div>
            <div class="right-input pull-left">
                <textarea placeholder="在此输入俱乐部简介" v-model="formData.intro"></textarea>
            </div>
        </div>

        <div class="save-btn text-center" @click="submitData">提交</div>

    </div>
</template>
<script>
    import citys from '../../api/citys.js'
    import club from '../../api/club.js'
    export default {
        name: 'create-club',
        data() {
//            var memberid = this.session.getMemberID();
            return {
                formData: {
                    memberid: 0,
                    name: "",
                    proid: "",
                    cityid: "",
                    areaid: "",
                    intro: "",
                    x: "",
                    y: "",
                    logo: ""
                },
                area: "",
                locationData: null,//定位数据
                selectorJSON: null
            }
        }, verify: {
            formData: {
                name: [{minLength: 1, message: "俱乐部名称必须填写"}]
            }
        },
        mounted() {

        },activated(){
            if (this.session.isAPPRuntime() && this.area == '') {
                this.loadCity();
            }
        },
        methods: {
            submitData(){
                var _this = this;
                if (_this.formData.proid == "" || _this.formData.cityid == "" || _this.formData.areaid == "") {
                    _this.$Message.error("请选择俱乐部位置");
                    return;
                }
                if(!_this.$verify.check()){
                    var errMsg = this.appUtil.toastRemind(this.$verify.verifyQueue,this.$verify.$errors);
                    _this.$Message.error(errMsg);
                }else {
                    club.clubCreate(_this, _this.formData);
                }
            },
            selCity(){
                var _this = this;
                if (_this.selectorJSON == null) {
                    _this.$Message.info("正在加载城市数据...");
                    return;
                }
                citys.actionSelector(_this.selectorJSON, function (ret) {
                    _this.area = ret.level1 + " " + ret.level2 + " " + ret.level3;
                    _this.formData.proid = ret.selectedInfo[0].id;
                    _this.formData.cityid = ret.selectedInfo[1].id;
                    _this.formData.areaid = ret.selectedInfo[2].id;
                });
            },
            loadCity(){
                var _this = this;
                citys.bulidJSONCity(function (json) {
                    if (json.code == 1) {
                        _this.selectorJSON = json.data;
                        _this.location();//定位
                    } else {
                        _this.$Message.error("加载城市数据失败");
                    }
                });
            },
            location(){
                var _this = this;
                this.amap.getLocation(this,function (ret) {
                    if (!ret.status) {
                        _this.$Message.error("定位失败");
                        return;
                    }
                    _this.formData.x = ret.lon;
                    _this.formData.y = ret.lat;
                    _this.locationData = ret;
                    var state = ret.state;
                    var city = ret.city;
                    var district = ret.district;
//                    var street = ret.street;
//                    var address = ret.address;
//                    var thoroughfare = ret.thoroughfare;
                    _this.area = state + " " + city + " " + district;
                    //匹配城市ID
                    var dbData = citys.locationToDBData(_this, _this.locationData);
                    if (dbData != null) {
                        _this.formData.proid = dbData.proid;
                        _this.formData.cityid = dbData.cityid;
                        _this.formData.areaid = dbData.areaid;
                    }
                }, true);
            },
            uploadHeadSuccess(res) {
                this.formData.logo = res;
            }
        }
    }
</script>

<style lang="scss">
    .create-club {
    .select-upload {
        width:100%;
        background-color:#33333a;
        padding:50px 0;
        margin-bottom:40px;
    .upload-box{
        background-color:#25252B;
        width:140px;
        height:140px;
        margin:0 auto 0;
        border-radius:50%;
        display: flex;
        justify-content:center;
        position: relative;
        align-items:Center;

    .icons {
        width: 50px;
        height: 44px;
        color: #999999;
    }
    img {
        width: 100%;
        height: 100%;
        border-radius:50%;
    }
    }
    .select-upload-label {
        color: #999999;
        font-size: 30px;
        line-height: 30px;
        margin-top:20px;
    }
    }
    .select-pic {
        margin-bottom:0px;
        background-color: #33333a;
        padding:30px 0 140px 30px;
    }
    padding-bottom: 60px;
    .club-item {
        width: 750px;
        overflow: hidden;
        margin-bottom: 0px;
        background-color: #33333a;
        height: 90px;
    .left-label {
        width: 100px;
        font-size: 30px;
        line-height: 30px;
        margin:30px 0 30px 30px;
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
         padding: 0 0 10px 0;
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
        background-color: #F8C513;
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
