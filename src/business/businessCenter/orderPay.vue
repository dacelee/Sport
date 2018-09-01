<template>
    <div class="orderDetailPay">
       <div class="address-info"  >
         <div class="pull-left juli"><l-icon name="juli1"/></div>
       <div class="address-details">
           <div class="address-item" v-for="item in addressList">
               <div class="left-label pull-left text-right">{{ item.label }}</div>
               <div class="right-info pull-left">{{ item.value }}</div>
           </div>
       </div>
       </div>
       <div class="wordPic" v-for="item in goodsList">
         <div class="smallPic pull-left"><img :src="item.imgPath"></div>
         <div class="pull-right">
          <div class="title">{{ item.name }}</div>
          <div class="goods-price">{{ item.unitPrice }}</div>
         <div class="bi">还需支付 <span>{{ item.candy }} 糖果</span></div>
          <div class="bi">数量:{{ item.num }}</div>
         </div>
       </div>
       <div class="totals">共{{goodsList.length}}件商品</div>
        <RadioGroup v-model="payType"  >
            <div class="payStylelist">
                <!--<div class="payList">-->
                    <!--<div class="pull-left">-->
                        <!--<l-icon name="wechat"/>-->
                        <!--微信支付-->
                    <!--</div>-->
                    <!--<div class="pull-right">-->
                        <!--<Radio label="1"><l-icon :name="payType!=1?'weigouxuan':'gouxuan'" /></Radio>-->
                    <!--</div>-->
                <!--</div>-->
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
              <p><label>人民币：</label>￥{{totalPrice}}</p>
              <p><label>糖果：</label>{{totalCoin}}</p>
            </div>
            </div>
            <div class="pull-right rightBox"  @click="pay">支付</div>
        </div>
    </div>
</template>

<script>
import goods from '../../api/goods.js'
import address from '../../api/address.js'
import pay from '../../api/pay.js'
export default {
    name: 'orderDetailPay',
    data() {
        return {
            totalPrice:0,
            totalCoin:0,
            payType:2,
            orderId:"",
            orderno:"",
            unorderno:"",//重新支付
            addressList: [],
            goodsList: []
        }
    },
    methods: {
        getAddress(){
            this.$router.push({name:'businessAddress',query:{id:this.orderId}})
        },
        pay() {
            if(this.payType==1){
                this.wxpay();
            }else{
                this.alipay();
            }
//            this.$router.replace('paySuccess')
        },
        wxpay(){
            this.$Message.info("微信支付");
        },
        alipay(){
            var body = "购买";
            $(this.goodsList).each(function(index,item){
                body+=item.name+"|";
            });
            pay.aliPay(this,this.orderno,"趣步商品支付",body,this.totalPrice);
        },
    },
    activated(){
        var orderId =  this.$route.query.id;
        if(this.orderId!=orderId){
            this.orderId =  orderId;
            goods.loadOrderDetail(this,orderId);
        }
    },
    mounted() {
        this.$nextTick(function () {
            var headerHeight = $("header").outerHeight();
            var height = $(window).height()-headerHeight;
            $(".orderDetailPay").css("min-height",height);
        })
    }
}
</script>

<style lang="scss">
.orderDetailPay {
background-color: #F5F5F5;
padding-bottom:125px;
.cartPic img{max-width:100%;width:100%}
.title{font-size: 32px;
padding: 0px 0 10px 20px;
color: #333;}
.address-info {
    color: #333333;
    background-color: #ffffff;
    padding: 40px 35px 40px 35px;
    margin-top: 10px;
    display: inline-block;
    width: 100%;
    position: relative;
.icons {
    width: 35px;
    height: 35px;
    position: absolute;
    top: 50%;
    margin-top: -17.5px;
}
.address-details {
    float: left;
    margin-left: 30px;
    width: calc(100% - 65px);
.address-item {
    width: 100%;
    margin-bottom: 20px;
    display: inline-block;
    font-size: 24px;
    line-height: 24px;
.left-label {
    width: 120px;
}
.right-info {
    width: calc(100% - 130px);
    margin-left: 10px;
}
&:nth-last-child(1) {
     margin-bottom: 0;
 }
}
}
}
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
            .leftBox{align-items:Center;
             padding:20px;color:#fff;width:70%;
             .pull-left{color:#F8C513!important}
              .pull-right{font-size:24px;color:#F8C513;float:right;text-align:left;
                  label{display: inline-block;width: 130px;text-align: right;}
              }
            }
            .rightBox{background-color: #F8C513;padding:30px;color: #000;width:30%;}
        }
}
</style>
