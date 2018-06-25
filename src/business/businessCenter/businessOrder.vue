<template>
    <div class="businessOrder"> 
       <div class="address">
         <div class="pull-left juli"><l-icon name="juli1"/></div>
         <div class="pull-left msg">
           <p>收货人：李大陆</p>
           <p>联系电话：18577890456</p>
           <p>收货地址：湖南长沙岳麓区梅溪湖街道</p>
         </div>
         <div class="pull-right icon" @click='businessAddress'><l-icon name="fanhui" class="link-icons" /></div>
       </div>
       <div class="wordPic" v-for="item in list">
         <div class="smallPic pull-left"><img src="static/img/goods/44.gif"></div>
         <div class="pull-right">
          <div class="title">夏季低帮篮球鞋男鞋鸳鸯4 音速驭帅11运</div>
          <div class="goods-price">￥200</div>
         <div class="bi">还需支付 <span>{{ item.hlb }}活力币</span></div>
          <div class="bi">数量:{{ item.num }}</div>
         </div>
       </div>
       <div class="totals">共1件商品</div>
       <div class="payStylelist">
       <div class="payList">
         <div class="pull-left"><l-icon name="wechat"/> 微信支付</div>
         <div class="pull-right"><l-icon name="weigouxuan"/></div>
         </div>
         <div class="payList">
         <div class="pull-left"><l-icon name="Shape"/> 支付宝支付</div>
         <div class="pull-right"><l-icon name="weigouxuan"/></div>
         </div>
       </div>
        <div class="bottomBtn">
            <div class="pull-left leftBox">
            <div class="pull-left">
               合计
            </div>
            <div class="pull-right">
              <p>人民币：256</p>
              <p>活跃币：256</p>
            </div>
            </div>
            <div class="pull-right rightBox" >提交</div>
        </div>
    </div>
</template>

<script>
let _this
    export default {
        name: 'businessOrder',
        data() {
            return {
                router: 'businessOrder',
                 list: [
                    {
                        pic: 'static/img/goods/44.gif',
                        name: '旋风无敌小队队队',
                        rmb: 12350,
                        hlb: 8987,
                        num: 3,
                    }
                    ]
            }
        },
        methods: {
        businessAddress() {
            _this.$router.push('businessAddress')
        }
     },
     mounted() {
        _this = this
     }
    }
</script>

<style lang="scss">
.businessOrder {
background-color: #F5F5F5;
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
            .leftBox{display:flex;align-items:Center;
             background-color:#404148;padding:20px;color:#fff;width:70%;
             .pull-left{color:#F8C513!important}
              .pull-right{font-size:24px;color:#F8C513;float:right;margin-left:200px;}
            }
            .rightBox{background-color: #F8C513;padding:30px;color: #000;width:30%;}
        }
}
</style>
