<template>
    <div class="basic-information ">
        <div class="basic-information-item isImg">
            <div class="label">头像</div>
            <div class="right">
                <div class="photo" >
                    <img :src="baseData.photos" alt="">
                    <l-imageUpload   :limit="1"  :action="'http://api.bozhiyue.com/my/uploadimg'"  :onSuccess="uploadPhotosSuccess"  :onRemove = "removePhotos"/>
                </div>
                <l-icon name="fanhui"/>
            </div>
        </div>
        <div class="basic-information-item" @click="changePage(item)" v-for="item in list"
             :class="{'split':item.split,'isImg':item.imgPath}">
            <div class="label">{{ item.name }}</div>
            <div class="right">
                <div class="photo" v-if="item.imgPath">
                    <img :src="item.imgPath" alt="">
                </div>
                <div class="value" >{{ showBaseData(item.base) }}</div>
                <!--<div class="value" v-if="item.isSex">{{ currentSex.name}}</div>-->
                <l-icon name="fanhui" v-if="item.showIcons"/>
            </div>
        </div>
        <l-selectOption :list="sexList" :selected="currentSex" @change="changeSex" v-if="showSexSelect"/>
    </div>
</template>

<script>
    import users from '../../api/users.js'
    export default {
        name: 'basic-information',
        data() {
            return {
                showSexSelect: false,
                baseData:{
                    photos: '/static/img/personal/default.jpg',
                    sex:"",
                    id: '12031203213',
                    nikename:"",
                    personality:"",
                    wxpay:"",
                },
                sexList: [
                    {
                        id: 1,
                        name: '帅哥'
                    },
                    {
                        id: 2,
                        name: '美女'
                    }
                ],
                currentSex:{
                    id: 1,
                    name: '帅哥'
                },
                list: [
                    {
                        name: 'ID',
                        base:"id",
                    },
                    {
                        name: '昵称',
                        showIcons: true,
                        base:"nikename",
                        split: true
                    },
                    {
                        name: '个性签名',
                        showIcons: true,
                        base:"personality",
                    },
                    {
                        name: '性别',
                        showIcons: true,
                        base:"sex",
                        isSex: true
                    },
                    {
                        name: '微信号',
                        showIcons: true,
                        base:"wxpay",
                        split: true
                    }
                ]
            }
        },
        activated(){
            this.loadData();
        },
        methods: {
            changeSex(data) {
                this.currentSex = data
                this.showSexSelect = false
                this.baseData.sex = data.name;
                this.currentSex = {
                    id: data.id,
                    name: data.name
                };
                users.editInfo(this, "sex", data.name,true);
            },
            changePage(data) {
                if(data.base=="id"){
                    return;
                }
                if (data.isSex) {
                    this.showSexSelect = true

                }
                else {
                    var val = eval("this.baseData."+data.base)?eval("this.baseData."+data.base):"";
                    this.$router.push({name:"editField",query:{name:data.name,"base":data.base,"val":val}})
                }
            }, showBaseData(base){
                return eval("this.baseData."+base)?eval("this.baseData."+base):"";
            },loadData(){
                users.myInfo(this);
            }
            ,uploadPhotosSuccess(res){
                this.baseData.photos = res;
                users.editInfo(this, "logo", res,true);
            },
            removePhotos(res){
                this.baseData.photos = res;
            }
        }
    }
</script>

<style lang="scss">
    .basic-information {
        width: 100%;
        .basic-information-item {
            padding: 30px 30px 30px;
            position: relative;
            display: flex;
            justify-content: space-between;
            background-color: #333339;
            color: #999999;
            font-size: 30px;
            line-height: 30px;
            border-bottom: 1px solid #000000;
            .right {
                display: flex;
                justify-content: space-between;
            }
            &.isImg {
                line-height: 160px;
                height: 220px;
                img {
                    margin-right: 30px;
                    width: 160px;
                    height: 160px;
                    -webkit-border-radius: 100%;
                    -moz-border-radius: 100%;
                    border-radius: 100%;
                }
                .icons {
                    margin-top: 65px;
                }
            }
            .photo{position: relative;}
            .value {
                color: #ffffff;
            }
            .icons {
                transform: rotate(180deg);
            }
            &.split {
                margin-top: 20px;
            }
        }
    }
</style>
