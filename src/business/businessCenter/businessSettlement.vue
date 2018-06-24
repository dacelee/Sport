<template>
    <div class="businessSettlement">
        <l-head>
         <l-icon name="fanhui" @click.native="$router.push('businessCenter')" slot="left-item"/>
            结算 
        </l-head>
      <div class="SettlementList" v-for="item in list">
        <div class="icon pull-left"><l-icon name="gouxuan"/></div>
       <div class="wordPic pull-right">
        <div class="smallPic pull-left"><img :src="item.pic"></div>
         <div class="pull-right">
          <div class="title">{{ item.name }}</div>
          <div class="goods-price">￥ {{ item.rmb }}</div>
          <div class="bi">还需支付 <span>{{ item.hlb }}活力币</span></div>
          <div class="bi">数量:{{ item.num }}</div>
         </div>
       </div>
       </div>
       <div class="bottomBtn">
            <div class="pull-left leftBox">
            <div class="pull-left">
              <l-icon name="gouxuan"/>
               全选
            </div>
            <div class="pull-right">
              <p>人民币：256</p>
              <p>活跃币：888</p>
            </div>
            </div>
            <div class="pull-right rightBox" @click="businessOrder">结算</div>
        </div>
    </div>
</template>

<script>
let _this
    export default {
        name: 'businessSettlement',
        data() {
            return {
                router: 'businessSettlement',
                list: [
                    {
                        pic: 'static/img/goods/44.gif',
                        name: '旋风无敌小队队队',
                        rmb: 12350,
                        hlb: 8987,
                        num: 3,
                    },
                    {
                        pic: 'static/img/goods/44.gif',
                        name: '旋风无敌小队队队',
                        rmb: 12350,
                        hlb: 8987,
                        num: 3,
                    },
                    {
                        pic: 'static/img/goods/44.gif',
                        name: '旋风无敌小队队队',
                        rmb: 12350,
                        hlb: 8987,
                        num: 3,
                    },
                
                ]
            }    
        },
      methods: {
        businessOrder() {
            _this.$router.push('businessOrder')
        }
     },
     mounted() {
        _this = this
     }
    }
</script>

<style lang="scss">
.businessSettlement {
background-color: #f5f5f5;
.SettlementList{margin:0 0 20px 0;background:#fff;overflow:hidden;padding:20px;padding-left:0; 
  display: flex;
          justify-content:center;
          align-items:Center;}
.cartPic img{max-width:100%;width:100%}
.title{font-size: 32px;
padding: 0px 0 20px 20px;
color: #333;}
.SettlementList .icon{width:8%;font-size:32px;}
.wordPic{width:87%;padding:0 0 0 0;overflow:hidden}
.smallPic{width:35%;}
.smallPic img{width:100%;}
.wordPic .pull-right{width:63%}
.wordPic .bi{font-size:24px;color:#666;padding-left:20px;}
.wordPic .bi span{color:#F8C513}
.payStyle{font-size:24px;color:#666;padding-left:20px;}
.goods-te{color:#666;font-size: 32px;overflow:hidden;
padding:20px 20px 20px 20px;border-top:#ddd solid 15px;border-bottom:#ddd solid 15px;}
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
