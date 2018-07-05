<template>
    <div class="businessSettlement">
        <CheckboxGroup v-model="goodsId" >
          <div class="SettlementList" v-for="item in list">
            <div class="icon pull-left">
                <Checkbox :label="item.id"  v-if="delModel"><span></span></Checkbox>
          </div>
           <div class="wordPic pull-right">
            <div class="smallPic pull-left"><img :src="item.pic"></div>
             <div class="pull-right">
              <div class="title">{{ item.name }}</div>
              <div class="goods-price">￥ {{ item.rmb }}</div>
              <div class="bi">还需支付 <span>{{ item.hlb }}糖果</span></div>
              <div class="bi">数量: <span  v-if="!delModel">{{ item.num }}</span>
                  <InputNumber  v-if="delModel" :value="item.num" v-model="item.num" :max="10" :min="1" @on-change="changeNum()"></InputNumber>
              </div>
             </div>
           </div>
           </div>
      </CheckboxGroup>
       <div class="bottomBtn">
            <div class="pull-left leftBox">
                <div class="pull-left"  @click="selectAll"   v-if="delModel">
                    <div>
                          <l-icon :name="all?'gouxuan':'weigouxuan'"/>
                           全选
                    </div>
                </div>
                <div class="pull-left"   v-if="!delModel">
                   合计
                </div>
                <div class="pull-right">
                  <p>人民币：{{totalPrice}}</p>
                  <p >糖果：{{totalCoin}}</p>
                </div>
            </div>
            <div class="pull-right rightBox" @click="businessOrder" v-if="!delModel">结算</div>
            <div class="pull-right delBox" @click="delGoods" v-if="delModel">删除</div>
        </div>
    </div>
</template>

<script>
    import goods from '../../api/goods.js'
    export default {
        name: 'businessSettlement',
        data() {
            return {
                all: false,
                goodsId:[],
                delModel:false,
                totalPrice:0,
                totalCoin:0,
                list: [
//                    {
//                        id:1,
//                        pic: 'static/img/goods/44.gif',
//                        name: '旋风无敌小队队队',
//                        rmb: 12350,
//                        hlb: 8987,
//                        num: 3,
//                    },
//                    {
//                        id:2,
//                        pic: 'static/img/goods/44.gif',
//                        name: '旋风无敌小队队队',
//                        rmb: 12350,
//                        hlb: 8987,
//                        num: 3,
//                    },
//                    {
//                        id:3,
//                        pic: 'static/img/goods/44.gif',
//                        name: '旋风无敌小队队队',
//                        rmb: 12350,
//                        hlb: 8987,
//                        num: 3,
//                    },

                ]
            }
        },
        methods: {
            businessOrder() {
                this.$router.push('businessOrder')
            },
            selectAll(){
                if(this.all){
                    this.all = false;
                    this.goodsId = [];
                }else{
                    this.goodsId = [];
                    var _this = this;
                    $(this.list).each(function(index,item){
                        _this.goodsId.push(item.id);
                    });
                    this.all = true;
                }
            },
            editEvent(){
                if(this.delModel){
                    this.delModel = false;
                    this.$emit('changeRightTitle',"管理");
                    this.updateNum();
                }else{
                    this.delModel = true;
                    this.$emit('changeRightTitle',"完成");
                }
            },
            delGoods(){
                if(this.goodsId.length==0){
                    this.$Message.error("请选择要删除的商品");
                    return;
                }
                goods.delCartAction(this,this.goodsId.toString());

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
            },
            updateNum(){
                var list = this.list;
                var _this = this;
                $(list).each(function(index,item){
                   if(item.num!=item.oldnum){
                       item.oldnum = item.num;
                       //更新购物车
                       goods.updateCartAction(_this,item.id,item.num);
                   }
                });
            },
            initData(){
                this.delModel = false;
                this.all= false;
                this.goodsId=[];
                this.totalPrice=0;
                this.totalCoin=0;
            }
        },
        activated(){
            this.initData();
            goods.loadCartGoods(this);
        },
        mounted() {
            this.$nextTick(function () {
                var headerHeight = this.appUtil.getHeaderHeight();
                var height = $(window).height()-headerHeight+40;
                $(".businessSettlement").height(height);
            })

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
    background-color:#404148;
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
            .delBox{background-color: #ff4816;padding:30px;color: #fff;width:30%;}
        }
}
</style>
