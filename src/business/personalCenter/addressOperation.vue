<template>
    <div class="address-operation">
        <div class="add-address-item">
            <div class="left-label pull-left text-right">收货人</div>
            <div class="right-info pull-left">
                <input type="text" placeholder="" v-model="formData.name" v-verify="formData.name">
            </div>
        </div>
        <div class="add-address-item">
            <div class="left-label pull-left text-right">联系方式</div>
            <div class="right-info pull-left">
                <input type="text" placeholder="" v-model="formData.mobile"  v-verify="formData.mobile">
            </div>
        </div>
        <div class="add-address-item">
            <div class="left-label pull-left text-right">区域选择</div>
            <div class="right-info pull-left">
                <input type="text" placeholder="" readonly @click="selCity" v-model="area"  v-verify="area">
            </div>
        </div>
        <div class="add-address-item">
            <div class="left-label label pull-left text-right">收货地址</div>
            <div class="right-details pull-left">
                <textarea  v-model="formData.address"  v-verify="formData.address"></textarea>
            </div>
        </div>
        <div class="add-address-item">
            <div class="left-label pull-left text-right">设为默认</div>
            <div class="pull-left setDefaul" @click="setDefaul" ><l-icon :name="formData.isdefault==1?'morenkai':'morenguan'" /></div>
        </div>
        <div class="btn" @click="submit">保存</div>
    </div>
</template>

<script>
    import citys from '../../api/citys.js'
    import address from '../../api/address.js'
    export default {
        name: 'address-operation',
        data() {
            return {
                formData: {
                    name: "",
                    proid: "",
                    cityid: "",
                    areaid: "",
                    address: "",
                    mobile: "",
                },
                area: "",
                locationData: null,//定位数据
                selectorJSON: null
            }
        },
        verify: {
            formData:{
                name: [{minLength: 1, message: "收货人姓名必须填写"}],
                mobile: [{minLength: 1, message: "联系方式填写"},"mobile"],
                address: [{minLength: 1, message: "收货地址必须填写"}],
            },
            area: [{minLength: 1, message: "区域必须选择"}]
        },
        mounted() {

        },
        activated () {
            var id = this.$route.query.id;
            this.loadCity();
            if(!id){
                this.area="";
                this.formData={
                    name: "",
                    proid: "",
                    cityid: "",
                    areaid: "",
                    address: "",
                    mobile: "",
                    isdefault:0,
                }
            }
        },
        methods: {
            loadCity(){
                var _this = this;
                citys.bulidJSONCity(function (json) {
                    if (json.code == 1) {
                        _this.selectorJSON = json.data;
                        var id = _this.$route.query.id;
                        if(id){
                            address.loadDetail(_this,id);
                        }
                    } else {
                        _this.$Message.error("加载城市数据失败");
                    }
                });
            },
            selCity(){
                if (this.selectorJSON == null) {
                    this.$Message.info("正在加载城市数据...");
                    return;
                }
                var _this = this;
                citys.actionSelector(_this.selectorJSON, function (ret) {
                    _this.area = ret.level1 + " " + ret.level2 + " " + ret.level3;
                    _this.formData.proid = ret.selectedInfo[0].id;
                    _this.formData.cityid = ret.selectedInfo[1].id;
                    _this.formData.areaid = ret.selectedInfo[2].id;
                });
            },
            loadArea(){
                if (this.selectorJSON == null) {
                    return;
                }
                if(this.formData.proid==""){
                    return;
                }

                var pro = citys.getArea(this.formData.proid);
                if(pro!=null){
                    this.area = pro.name+" ";
                    var city = citys.getArea(this.formData.cityid,pro.sub);
                    if(city!=null){
                        this.area += city.name+" ";
                        var street = citys.getArea(this.formData.areaid,city.sub);
                        if(street!=null){
                            this.area += street.name;
                        }
                    }
                }
            },
            submit(){
                if (!this.$verify.check()) {
                    var errMsg = this.appUtil.toastRemind(this.$verify.verifyQueue, this.$verify.$errors);
                    this.$Message.error(errMsg)
                }else{
                    var id = this.$route.query.id;
                    address.addAddress(this,this.formData,id);
                }
            },
            setDefaul(){
                this.formData.isdefault =  this.formData.isdefault==1?0:1;
            }
        }
    }
</script>

<style lang="scss">
    .address-operation {
        .add-address-item {
            margin: 20px 0;
            width: 100%;
            overflow: hidden;
            .left-label {
                padding-right: 20px;
                color: #999999;
                width: 160px;
                font-size: 30px;
                line-height: 95px;
            }
            .right-details {
                width: 100%;
                padding: 30px 30px 30px;
                textarea {
                    background-color: #333339;
                    padding: 30px 30px 30px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                    width: 100%;
                    height: 240px;
                    color: #ffffff;
                    font-size: 30px;
                    line-height: 40px;
                }
            }
            .right-info {
                width: calc(100% - 200px);
                input {
                    width: 100%;
                    font-size: 30px;
                    line-height: 30px;
                    padding: 30px 30px 30px;
                    color: #ffffff;
                    background-color: #333339;
                    height: inherit;
                }
            }
            .setDefaul{padding-left: 30px;}
            .icons{font-size:60px;padding-top:22px}
        }
        .btn {
            position: fixed;
            bottom: 0;
            left: 0;
            background-color: #f8c513;
            color: #333333;
            text-align: center;
            font-size: 34px;
            line-height: 34px;
            padding: 30px 0 30px;
            width: 100%;
        }
    }
</style>
