<template>
    <div class="businessOrder"> 
       <div class="address"  @click='getAddress'>
         <div class="pull-left juli"><l-icon name="juli1"/></div>
         <div class="pull-left msg">
           <p>收货人：{{delivery.linkman}}</p>
           <p>联系电话：{{delivery.mobile}}</p>
           <p>收货地址：{{delivery.address}}</p>
         </div>
         <div class="pull-right icon"><l-icon name="fanhui" class="link-icons" /></div>
       </div>
       <div class="wordPic" v-for="item in list">
         <div class="smallPic pull-left"><img :src="item.pic"></div>
         <div class="pull-right">
          <div class="title">{{ item.name }}</div>
          <div class="goods-price">{{ item.rmb }}</div>
         <div class="bi">还需支付 <span>{{ item.hlb }} 糖果</span></div>
          <div class="bi">数量:{{ item.num }}</div>
         </div>
       </div>
       <div class="totals">共{{list.length}}件商品</div>
        <RadioGroup v-model="payType"  >
            <div class="payStylelist">
                <div class="payList">
                    <div class="pull-left">
                        <l-icon name="wechat"/>
                        微信支付
                    </div>
                    <div class="pull-right">
                        <Radio label="1"><l-icon :name="payType!=1?'weigouxuan':'gouxuan'" /></Radio>
                    </div>
                </div>
                <div class="payList">
                    <div class="pull-left">
                        <l-icon name="Shape"/>
                        支付宝支付
                    </div>
                    <div class="pull-right">
                        <Radio label="2"><l-icon :name="payType!=2?'weigouxuan':'gouxuan'" /></Radio>
                    </div>
                </div>
            </div>
            </RadioGroup>
        <div class="bottomBtn">
            <div class="pull-left leftBox">
            <div class="pull-left">
               合计
            </div>
            <div class="pull-right">
              <p>人民币：{{totalPrice}}</p>
              <p>糖果：{{totalCoin}}</p>
            </div>
            </div>
            <div class="pull-right rightBox"  @click="paySuccess">提交</div>
        </div>
    </div>
</template>

<script>
import goods from '../../api/goods.js'
import address from '../../api/address.js'
export default {
    name: 'businessOrder',
    data() {
        return {
            totalPrice:0,
            totalCoin:0,
            payType:1,
            deliveryid:0,
            delivery:{
                linkman:"",
                mobile:"",
                address:""
            },
            list: [
                {
//                    pic: 'static/img/goods/44.gif',
//                    name: '旋风无敌小队队队',
//                    rmb: 12350,
//                    hlb: 8987,
//                    num: 3,
                }
            ]
        }
    },
    methods: {
        getAddress(){
            this.$router.push('businessAddress')
        },
        paySuccess() {
            if(this.deliveryid==0){
                this.$Message.error("请填写收货人信息");
                return;
            }
            if(this.payType==1){
                goods.orderSubmitAction(this, this.deliveryid,"wxpay");
            }else{
                goods.orderSubmitAction(this, this.deliveryid,"alipay");
            }
//            this.$router.replace('paySuccess')
        },
        changeNum(){
            this.totalPrice = 0;
            this.totalCoin = 0;
            var _this = this;
            var list = this.list;
            $(list).each(function(index,item){
                _this.totalPrice +=item.rmb*item.num;
                _this.totalCoin += parseFloat((item.hlb*item.num).toFixed(2));
            });
        }
    },
    activated(){
        var addressid =  this.$route.query.addressid;
        if(addressid){
            this.deliveryid = addressid;
            address.useAddress(this,this.deliveryid);
        }else{
            address.useAddress(this);
        }
        goods.loadCartGoods(this);

    },
    mounted() {
        this.$nextTick(function () {
            var headerHeight = this.appUtil.getHeaderHeight();
            var height = $(window).height()-headerHeight;
            $(".businessOrder").css("min-height",height);
        })
    }
}
</script>

<style lang="scss">
.businessOrder {
background-color: #F5F5F5;
padding-bottom:125px;
.cartPic img{max-width:100%;width:100%}
.title{font-size: 32px;
padding: 0px 0 10px 20px;
color: #333;}
.address{display: flex;
justify-content:center;
align-items:Center;overflow:hidden;color:#333;padding:20px;border-bottom:#f5f5f5 solid 15px;background-color:#fff}
.address .juli{font-size:32px;width:5%}
.address .msg{width:90%;padding-left:20px;font-size:24px;}
.address .msg p{margin-bottom:10px;}
.address .icon{width:5%;transform: rotate(180deg);}
.wordPic{padding:20px;overflow:hidden;background-color:#fff}
.smallPic{width:35%;}
.smallPic img{width:100%;}
.wordPic .pull-right{width:63%}
.wordPic .bi{font-size:24px;color:#666;padding-left:20px;}
.wordPic .bi span{color:#F8C513}
.totals{border-bottom:#f5f5f5 solid 15px;border-top:#f5f5f5 solid 1px;background-color:#fff;padding:20px;text-align:right;color:#333}
.payStyle{font-size:24px;color:#666;padding-left:20px;}
.goods-te{color:#666;font-size: 32px;overflow:hidden;
padding:20px 20px 20px 20px;border-top:#ddd solid 15px;border-bottom:#ddd solid 15px;}
.payStylelist{color:#666;font-size:30px;overflow:hidden;background-color:#fff}
.payList{overflow:hidden;border-bottom:#f5f5f5 solid 1px;padding:20px;}
.goods-price{ font-size: 34px;
line-height: 34px;
padding: 0 20px 10px 20px;
color: #ff0000;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;}
.word{color:#333;font-size:28px;line-height:50px; padding: 20px 20px 20px 20px;}
.bottomBtn{
            position: fixed;
            bottom: 0;
            left: 0;
            overflow:hidden;
            width:100%;
            text-align:center;
            font-size:34px;
            color:#000;
            background-color:#404148;
            .leftBox{display:flex;align-items:Center;
             padding:20px;color:#fff;width:70%;
             .pull-left{color:#F8C513!important}
              .pull-right{font-size:24px;color:#F8C513;float:right;margin-left:200px;}
            }
            .rightBox{background-color: #F8C513;padding:30px;color: #000;width:30%;}
        }
}
</style>
