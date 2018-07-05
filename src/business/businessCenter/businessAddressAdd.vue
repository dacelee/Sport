<template>
    <div class="businessAddressAdd">
        <div class="add-item">
            <div class="left-label pull-left">收货人</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请填写姓名" v-model="formData.name" v-verify="formData.name">
            </div>
        </div>
        <div class="add-item">
            <div class="left-label pull-left">联系方式</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请填写手机号码" v-model="formData.mobile"  v-verify="formData.mobile">
            </div>
        </div>
        <div class="add-item">
            <div class="left-label pull-left">区域选择</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="" readonly @click="selCity" v-model="area"  v-verify="area">
            </div>
        </div>
        <div class="text-area">
            <div class="label">详细地址</div>
            <textarea placeholder="请填写详细地址，不少于5个字" v-model="formData.address"  v-verify="formData.address"></textarea>
        </div>
        <div class="aset">
          <div class="pull-left">设为默认</div>
          <div class="pull-right" @click="setDefaul" ><l-icon :name="formData.isdefault==1?'morenkai':'morenguan'" /></div>
        </div>
        <div class="save-btn text-center" @click="submit">保存</div>
    </div>
</template>

<script>
    import citys from '../../api/citys.js'
    import address from '../../api/address.js'
    export default {
        name: 'businessAddressAdd',
        data() {
            return {
                formData: {
                    name: "",
                    proid: "",
                    cityid: "",
                    areaid: "",
                    address: "",
                    mobile: "",
                    isdefault:0,
                },
                area: "",
                locationData: null,//定位数据
                selectorJSON: null
                
            }
        }, verify: {
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
            this.loadCity();
            var id = this.$route.query.id;
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
.businessAddressAdd {
background-color: #F5F5F5;
.add-item {
            width: 100%;
            overflow: hidden;
            margin-bottom: 15px;
            background-color: #fff;
            height: 90px;
            color:#333;
            .left-label {
                width: 17%;
                font-size: 28px;
                line-height: 30px;
                margin:30px 0 30px 30px;
            }
            .right-input {
                width: 76%;
                margin-top: 10px;
                input {
                   width: 100%;
                    height: 70px;
                    background-color: #fff;
                    border:solid #ddd 1px;
                    padding: 0 20px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
            }
        }
.text-area{background-color:#fff;padding:30px;color:#333;font-size:28px;}
.text-area .label{font-size:28px;margin-bottom:20px;}
.text-area textarea{width:100%}
.aset{background-color:#fff;padding:15px 30px;color:#333;font-size:28px;margin-top:15px;overflow:hidden}
.aset .pull-left{padding-top:12px;}
.aset .icons{font-size:60px;}
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
}
</style>
