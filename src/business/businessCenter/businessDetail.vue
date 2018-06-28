<template>
    <div class="businessDetail">
       <div class="detailPic"><img src="static/img/goods/44.gif"></div>
       <div class="detailTitle">夏季低帮篮球鞋男鞋鸳鸯4 音速驭帅11运</div>
       <div class="goods-price">￥200</div>
       <div class="goods-te">
           <div class="pull-left">等值活力币：100</div>
           <div class="pull-right">今日币价：2</div>
       </div>
       <div class="word">
           品牌: Lining/李宁 <br/>
           上市时间: 2016年冬季  <br/>
           吊牌价: 499  <br/>
           性别: 男子  <br/>
           鞋帮高度: 中帮  <br/>
           帮面材质: 纺织品+合成革+TPU  <br/>
           外底材料: 橡胶+EVA  <br/>
           适合场地: 室外水泥地 室内地板  <br/>
           功能: 减震 包裹性  <br/>
           鞋码: 39 39.5 40 41 41.5 42 43 43.5 44 45 46  <br/>
           是否瑕疵: 否  <br/>
           运动系列: 篮球场地鞋
       </div>
        <div class="detailPic"><img src="static/img/goods/45.gif"></div>
        <div class="bottomBtn">
            <div class="pull-left" @click="businessCart">加入购物车</div>
            <div class="pull-right">立即购买</div>
        </div>
    </div>
</template>

<script>
let _this
    export default {
        name: 'businessDetail',
        data() {
            return {
                router: 'businessDetail',
                
            }
        },
       methods: {
        businessCart() {
            _this.$router.push('businessCart')
        }
     },
     mounted() {
        _this = this
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
        .word{color:#333;font-size:28px;line-height:50px; padding: 20px 20px 20px 20px;}
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
</style>
