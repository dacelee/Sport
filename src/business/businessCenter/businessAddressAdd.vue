<template>
    <div class="businessAddressAdd">
        <l-head>  
         <l-icon name="fanhui" @click.native="$router.push('businessCenter')" slot="left-item"/>
            新增收货地址 
        </l-head>
        <div class="add-item">
            <div class="left-label pull-left">收货人</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请填写姓名">
            </div>
        </div>
        <div class="add-item">
            <div class="left-label pull-left">联系方式</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请填写手机号码">
            </div>
        </div>
        <div class="text-area">
            <div class="label">收货地址</div>
                <textarea placeholder="请填写详细地址，不少于5个字"></textarea>
        </div>
        <div class="aset">
          <div class="pull-left">设为默认</div>
          <div class="pull-right"><l-icon name="morenguan" /></div>
        </div>
        <div class="save-btn text-center" >保存</div>
    </div>
</template>

<script>
let _this
    export default {
        name: 'businessAddressAdd',
        data() {
            return {
                router: 'businessAddressAdd',
                
            }
        },
        methods: {
        businessSettlement() {
            _this.$router.push('businessSettlement')
        }
     },
     mounted() {
        _this = this
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
                    color: #ffffff;
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
