<template>
    <div class="businessCart">
        <l-head>
         <l-icon name="fanhui" @click.native="$router.push('businessCenter')" slot="left-item"/>
            购物车 
            <l-icon name="gouwuche" slot="right-item"/>
        </l-head>
       <div class="cartPic"><img src="static/img/goods/44.gif"></div>
       <div class="wordPic">
         <div class="smallPic pull-left"><img src="static/img/goods/44.gif"></div>
         <div class="pull-right">
          <div class="title">夏季低帮篮球鞋男鞋鸳鸯4 音速驭帅11运</div>
          <div class="goods-price">￥200</div>
          <div class="bi">等值 <span>100活力币</span></div>
         </div>
       </div>
       <div class="payStyle">选择付款方式</div>
       <div class="payStylelist">
         <div class="pull-left">人民币</div>
         <div class="pull-right"><l-icon name="weigouxuan"/></div>
       </div>
       <div class="payStylelist">
         <div class="pull-left">糖果购买</div>
         <div class="pull-right"><l-icon name="weigouxuan"/></div>
       </div>
       <div class="payStylelist">
         <div class="pull-left">人名币＋糖果</div>
         <div class="pull-right"><l-icon name="gouxuan"/></div>
       </div>
      <div class="inputText"><input type="" name="" placeholder='输入人民币'> +
       <input type="" name="" placeholder='输入糖果'></div>
        <div class="bottomBtn">
            <div @click="businessSettlement">确定</div> 
        </div>
    </div>
</template>

<script>
let _this
    export default {
        name: 'businessCart',
        data() {
            return {
                router: 'businessCart',
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
.businessCart {
background-color: #F5F5F5;
.cartPic img{max-width:100%;width:100%}
.title{font-size: 32px;
padding: 0px 0 20px 20px;
color: #333;}
.wordPic{padding:20px;overflow:hidden}
.smallPic{width:35%;}
.smallPic img{width:100%;}
.wordPic .pull-right{width:63%}
.wordPic .bi{font-size:24px;color:#666;padding-left:20px;}
.wordPic .bi span{color:#F8C513}
.payStyle{font-size:24px;color:#666;padding-left:20px;}
.goods-te{color:#666;font-size: 32px;overflow:hidden;
padding:20px 20px 20px 20px;border-top:#ddd solid 15px;border-bottom:#ddd solid 15px;}
.payStylelist{color:#666;font-size:30px;overflow:hidden;padding:20px  20px 0 20px;}
.inputText{padding: 20px;color:#333}
.inputText input{padding:0 20px;width:300px;border:#ddd solid 1px;
                    height: 70px;
                    color: #666;
                    padding: 0 20px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;}
.goods-price{ font-size: 34px;
line-height: 34px;
padding: 0 20px 20px 20px;
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
    div{font-size:34px;
    line-height:34px;
    padding:33px 0;
    background-color: #F8C513;
    color: #000;width:100%;background-color: #404148; color: #fff;}
}
}
</style>
