<template>
    <div class="businessDetail">
       <div class="detailPic"><img :src="logo" v-if="logo!=''"></div>
       <div class="detailTitle">{{title}}</div>
       <div class="goods-price">￥{{price}}</div>
       <div class="goods-te">
           <div class="pull-left">等值糖果：{{coin}}</div>
           <div class="pull-right">今日币价：{{coinPrice}} 美元</div>
       </div>
       <div class="word" v-html="word">
       </div>
        <div class="businessCart" v-show="carShow">
            <div class="hideCart" @click="hideCart"></div>
            <div class="contentCart">
                <div class="wordPic">
                    <div class="smallPic pull-left"><img :src="logo"></div>
                    <div class="pull-right">
                        <div class="title">{{title}}</div>
                        <div class="goods-price">￥{{price}}</div>
                        <div class="bi">等值 <span>{{coin}}糖果</span></div>
                    </div>
                </div>
                <div class="payStyle">选择付款方式</div>
                <RadioGroup v-model="payType"  >
                    <div class="payStylelist">
                        <div class="pull-left">人民币</div>
                        <div class="pull-right"><Radio label="1"><l-icon :name="payType!=1?'weigouxuan':'gouxuan'" /></Radio></div>
                    </div>
                    <div class="payStylelist">
                        <div class="pull-left">糖果兑换</div>
                        <div class="pull-right"><Radio label="2"><l-icon :name="payType!=2?'weigouxuan':'gouxuan'" /></Radio></div>
                    </div>
                    <div class="payStylelist">
                        <div class="pull-left">人民币＋糖果</div>
                        <div class="pull-right"><Radio label="3"><l-icon :name="payType!=3?'weigouxuan':'gouxuan'" /></Radio></div>
                    </div>
                </RadioGroup>
                <div class="inputText" v-show="payType==3">
                    <input type="number"  placeholder='输入人民币' v-model="rmbPay" @keyup="changeRmbPay"> +
                    <input type=""  placeholder='输入糖果' v-model="coinPay" readonly>
                </div>
                <div class="bottomBtn">
                    <div @click="businessSettlement">确定</div>
                </div>
            </div>
        </div>
        <!--<div class="detailPic"><img src="static/img/goods/45.gif"></div>-->
        <div class="bottomBtn">
            <div class="pull-left" @click="buy(1)">加入购物车</div>
            <div class="pull-right"  @click="buy(2)">立即购买</div>
        </div>
    </div>
</template>

<script>
    import goods from '../../api/goods.js'
    export default {
        name: 'businessDetail',
        data() {
            return {
                logo: '',
                title:'',
                price:0,
                coin:0,
                coinPrice:0,
                word:"",
                cartCoin:0,
                carShow:false,
                payType:1,
                rmbPay:"",
                type:0,
                coinPay:""
            }
        },
        deactivated(){
            this.logo='',
            this.title='',
            this.price=0,
            this.coin=0,
            this.coinPrice=0,
            this.word="",
            this.cartCoin=0,
            this.carShow=false,
            this.payType=1,
            this.rmbPay="",
            this.type=0,
            this.coinPay=""
            $(".view-container")[0].scrollTop = 0;
        },
        activated () {
            var id = this.$route.params.id;
            goods.loadGoodDetail(this,id);
        },
        methods: {
            buy(type) {
                this.carShow = true;
                this.type = type;
//               this.$router.push('businessCart')
           },
            businessSettlement() {
//                this.$router.push("businessSettlement");
//                return;
                if(this.payType==3){
                    if(this.rmbPay==""){
                        this.$Message.error("请输入人民币支付金额");
                        return;
                    }
                }else if(this.payType==1){
                    this.rmbPay = this.price;
                    this.coinPay = 0;
                }else if(this.payType==2){
                    this.coinPay = this.coin;
                    this.rmbPay = 0;
                }
                var goodid = this.$route.params.id;
                goods.addGoodToCart(this,goodid,1,this.rmbPay,this.coinPay,this.type);
            },

            hideCart(){
                this.carShow = false;
            },
            changeRmbPay(){
                if(isNaN(this.rmbPay)){
                    this.rmbPay = 0;
                }
                if(this.rmbPay>this.price){
                    this.rmbPay = this.price;
                }
                this.coinPay = ((this.price - this.rmbPay) / this.price * this.coin).toFixed(2);

            }
     },
     mounted() {
     }
    }
</script>

<style lang="scss">
        .businessDetail {
        background-color: #F5F5F5;
        .detailPic img{max-width:100%;width:100%}
        .detailTitle{font-size: 32px;
        padding: 20px 20px 20px 20px;
        color: #333;}
        .goods-te{color:#666;font-size: 32px;overflow:hidden;
        padding:20px 20px 20px 20px;border-top:#ddd solid 15px;border-bottom:#ddd solid 15px;}
        .goods-price{ font-size: 34px;
        line-height: 34px;
        padding: 0 20px 20px 20px;
        color: #ff0000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;}
        .word{color:#333;font-size:28px;line-height:50px; padding: 20px 20px 20px 20px;min-height: 50vh;
         img{max-width: 100%;}
        }
        .bottomBtn{
            position: fixed;
            bottom: 0;
            left: 0;
            overflow:hidden;
            width:100%;
            text-align:center;
            div{font-size: 34px;
            line-height: 34px;
            padding: 33px 0;
            background-color: #F8C513;
            color: #000;width:50%;}
            .pull-left{background-color: #404148; color: #F8C513;}
        }

    }
        .businessCart {
            position: fixed;
            bottom: 0px;
            left: 0px;
            z-index: 999;
            height: 100%;
            width: 100%;
            background-color: rgba(0,0,0,0.6);
            .title{font-size: 32px;
            padding: 0px 0 20px 20px;
            color: #333;}
            .contentCart{background: #FFF;bottom: 0px;position: absolute;left: 0px;width: 100%;padding-bottom: 120px;}
            .hideCart{height:100%;background: transparent;width:100%;}
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
        .inputText{padding: 20px;color:#333;padding-bottom: 0px}
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
