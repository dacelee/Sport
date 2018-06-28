<template>
    <div class="businessAddress">
        <div class="addressMsg" v-for="item in list">
       <div class="address">
           <p>{{ item.name }}</p>
           <p>{{ item.phone }}</p>
           <p>{{ item.address }}</p>
         </div>
         <div class="aset">
           <div class='pull-left'>
             <l-icon name="weigouxuan"/> <div class="left-label">设以默认地址</div>
           </div>
           <div class='pull-right'>
              <l-icon name="bianji"/><span class="right-label">编辑</span><span class="right-label"></span>
              <l-icon name="shanchu"/><span class="right-label">删除</span>
           </div>
         </div>
         </div>
        <div class="save-btn text-center" @click="businessAddressAdd">新增</div>
    </div>
</template>

<script>
let _this
    export default {
        name: 'businessAddress',
        data() {
            return {
                router: 'businessAddress',
                list: [
                    {
                        name: '李大陆',
                        phone: 18577890456,
                        address: '湖南长沙岳麓区梅溪湖街道',
                    },
                    {
                        name: '李大大',
                        phone: 18577890456,
                        address: '湖南长沙岳麓区梅溪湖街道',
                    }
                
                ]
            }
        },
        methods: {
        businessAddressAdd() {
            _this.$router.push('businessAddressAdd')
        }
     },
     mounted() {
        _this = this
     }
    }
</script>

<style lang="scss">
.businessAddress {
background-color: #F5F5F5;
.addressMsg{background-color: #fff;color:#333;margin-bottom:20px;}
.addressMsg .address{padding:20px;border-bottom:solid #f5f5f5 1px;font-size:28px;}
.addressMsg .address p:first-child {font-size:34px;margin-bottom:15px;}
.addressMsg .aset{padding:20px;overflow:hidden;font-size:24px;}
.addressMsg .aset .pull-right .icons:nth-child(2){margin-left:40px;}
.addressMsg .aset .pull-right{}
.left-label{padding-left:40px;}
.right-label{padding-left:40px;}
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
  .icons{font-size:32px;position:absolute;margin-right:15px;}
}  
</style>
