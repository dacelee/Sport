<template>
    <div class="transaction-details">
        <div class="transaction-details-item" v-for="item in list" v-if="item">
            <div class="title" v-if="item.title">
                <div class="title-item" >{{ item.title }}</div>
                <div class="label" v-if="item.label">{{ item.label }}</div>
            </div>
            <div class="container-list">
                <div class="container-list-item" v-for="el in item.details"
                     :class="{'hasImg':el.imgPath,'bigImg':el.isBigImg}">
                    <div class="left-label" v-if="el.title">{{ el.title }}</div>
                    <div class="left-img" v-if="el.imgPath">
                        <img :src="el.imgPath" alt="" v-if="el.isBigImg" preview="0">
                        <img :src="el.imgPath" alt="" v-else >
                    </div>
                    <div class="right-info" v-if="el.value">{{ el.value }}</div>
                </div>
            </div>
        </div>
        <div class="transaction-details-item" v-if="status==1&&payment">
            <div class="title">
                <div class="title-item">支付截图</div>
                <div class="label"></div>
            </div>
            <div class="container-list">
                <div class="container-list-item">
                    <div class="upload-box  text-center">
                        <div class="upload-pic ">
                            <l-icon name="shangchuantupian"/>
                        </div>
                        <div class="select-upload-label text-center">上传图片 0/1</div>
                        <l-imageUpload :limit="1" :onSuccess="uploadPhotosSuccess"  :noClip="true"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-operation" v-if="clear||payment||appeal||receivables||confirm">
            <div class="btn-area pull-right">
                <div class="payTime"  v-if="clear"><span v-if="payment">剩余打款时间：</span>{{timer}}</div>
                <div class="btn btn-confirm" @click="payOrder" v-if="payment">确认支付</div>
                <div class="payTime" v-if="confirm">等待卖家确认:{{timer}}</div>
                <div class="payTime" v-if="receivables">等待确认:{{timer}}</div>
                <div class="btn"  v-if="appeal" @click="appealOrder">申诉</div>
                <div class="btn btn-confirm" :class="receivablesdis?'dis':''" @click="paySuccess" v-if="receivables">发送糖果</div>
            </div>
        </div>
    </div>
</template>
<script>
    import coin from '../../api/coin.js'
    export default {
        name: 'transaction-details',
        data() {
            return {
                id:0,
                clear:false,
                payment:false,
                appeal:false,
                receivables:false,
                confirm:false,
                receivablesdis:false,
                status:0,
                timer:'',
                imageClip:false,
                tradescreenshot:'',
                list: [
                    {
                        title: '卖家信息',
                        details: []
                    }
                ]
            }
        },
        methods: {
            clearOrder(){
                var id =  this.$route.params.id;
                coin.editStatusAction(this,id,4);
            },
            payOrder(){
                if(this.tradescreenshot==''){
                    this.$Message.error("请上传支付截图");
                    return;
                }
                var id =  this.$route.params.id;
                coin.uploadPayPhotoAction(this,id,this.tradescreenshot);
            },
            appealOrder() {
                var id =  this.$route.params.id;
                this.id = 0;
                this.$router.push({name: 'appeal', params: {id: id}})
            },
            paySuccess() {
                var _this = this;
                if(this.receivablesdis){//禁止发送糖果
                    return;
                }
                App.confirm({"title":'警告',"content":'是否确认发送糖果?'}).then(function() {
                    var id = _this.$route.params.id;
                    coin.editStatusAction(_this, id, 3);//确认收款
                });
//                this.$router.replace('/paySuccess')
            },
            uploadPhotosSuccess(res,item) {
                this.tradescreenshot = res;
            }
        },
        activated () {
            var id = this.$route.params.id;
            this.tradescreenshot = '';
            coin.loadOrderDetail(this,id);
        },
        mounted() {
        }
    }
</script>

<style lang="scss">
    .view-container .transaction-details {
        padding-bottom: 100px !important;
    }
    
    .transaction-details {
        position: relative;
        .footer-operation {
            position: fixed;
            bottom: 0px;
            left: 0px;
            width: 100%;
            overflow: hidden;
            margin-top: 120px;
            background-color: #333339;
            padding: 20px 30px;
            .btn-area {
                display: flex;
                justify-content: flex-start;
                .payTime{ line-height: 50px;}
                .btn {
                    font-size: 30px;
                    line-height: 30px;
                    padding: 9px 0;
                    width: 200px;
                    text-align: center;
                    margin: 0 0 0 30px;
                    color: #F8C513;
                    -webkit-border-radius: 34px;
                    -moz-border-radius: 34px;
                    border-radius: 34px;
                    border: 2px solid #F8C513;
                    &.btn-confirm {
                        background-color: #F8C513;
                        color: #25252B;
                    }
                    &.dis{background-color: #4d5669;border: 2px solid #4d5669;}
                }
            }
        }
        .transaction-details-item {
            width: calc(100% - 60px);
            background-color: #333339;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            margin: 20px auto 0;
            position: relative;
            overflow: hidden;
            .title {
                padding: 0 30px;
                margin: 25px 0 25px;
                font-size: 30px;
                line-height: 42px;
                display: flex;
                justify-content: space-between;
                border-left: 6px solid #F8C513;
                .label {
                    color: #F8C513;
                }
            }
            .container-list {
                width: calc(100% - 60px);
                padding: 30px 0;
                margin: 0 auto;
                border-top: 1px solid #25252B;
                .container-list-item {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    font-size: 30px;
                    line-height: 30px;
                    margin-bottom: 30px;
                    .left-label {
                        color: #999999;
                    }
                    .left-img {
                        width: 60px;
                        height: 60px;
                        img {
                            width: 60px;
                            height: 60px;
                            -webkit-border-radius: 100%;
                            -moz-border-radius: 100%;
                            border-radius: 100%;
                        }
                    }
                    &.hasImg {
                        line-height: 60px;
                        &.bigImg {
                            width: 210px;
                            height: 210px;
                            img {
                                width: 210px;
                                height: 210px;
                                -webkit-border-radius: 8px;
                                -moz-border-radius: 8px;
                                border-radius: 8px;
                            }
                        }
                    }
                    &:nth-last-child(1) {
                        margin-bottom: 0;
                    }
                    .upload-box{
                        display: inline-block;
                        width: 210px;
                        height: 210px;
                        text-align: center;
                        border: 1px solid transparent;
                        border-radius: 10px;
                        overflow: hidden;
                        background-color: #25252B;
                        position: relative;
                        margin-right: 15px;
                        margin-bottom: 10px;
                        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
                    }
                    .upload-box .icons {
                        width: 60px;
                        height: 52px;
                        color: #999999;

                    }
                    .upload-box .upload-pic{padding-top: 50px;padding-bottom: 5px;}

                    .upload-box img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }

</style>
