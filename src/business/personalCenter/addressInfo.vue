<template>
    <div class="address-manage">
        <div class="address-list">
            <div class="address-list-item" v-for="item in list">
                <div class="user-info">
                    <div class="user-name">
                        {{ item.userName }}
                    </div>
                    <div class="user-phone">
                        {{ item.phone }}
                    </div>
                </div>
                <div class="address-details">
                    {{ item.address }}
                </div>
                <div class="operation">

                    <div class="pull-left default"  v-if="item.isDefault">
                        默认地址
                    </div>
                    <!--<div class="pull-left"  v-if="!item.isDefault" @click="setDefault(item.id)">设置成默认地址</div>-->
                    <div class="pull-right">
                        <div class="pull-left btn btn-edit" @click="editAddress(item.id)">
                            <l-icon name="bianji"/>
                            编辑
                        </div>
                        <div class="pull-left btn btn-delete" @click="delAddress(item.id)">
                            <l-icon name="shanchu"/>
                            删除
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="add-address text-center" @click="addAddress">
            新增
        </div>
    </div>
</template>

<script>
    import address from '../../api/address.js'
    export default {
        name: 'address-manage',
        data() {
            return {
                list: [
//                    {
//                        id: '3213213',
//                        userName: 'Louis',
//                        phone: '133-3213-2131',
//                        address: '北京市朝阳区朝阳街道朝阳楼朝阳栋朝阳层朝阳号',
//                        isDefault: true
//                    },
//                    {
//                        id: '3213213',
//                        userName: 'Louis',
//                        phone: '133-3213-2131',
//                        address: '北京市朝阳区朝阳街道朝阳楼朝阳栋朝阳层朝阳号'
//                    }
                ]
            }
        },
        methods: {
            editAddress(id) {
                this.$router.push({name: 'addressOperation', query: {id: id}})
            },
            addAddress() {
                this.$router.push({name: 'addressOperation'})
            },
            delAddress(id){
                address.delAddress(this,id);
            },
            setDefault(id){
                address.setDefault(this,id);
            }
        },
        activated () {
            address.loadList(this);
        },
        mounted() {
            this.$nextTick(function () {

            })
        }
    }
</script>

<style lang="scss">
    .address-manage {
        width: 100%;
        position: relative;
        .address-list {
            .address-list-item {
                margin: 20px auto;
                background-color: #333339;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                .user-info {
                    width: 100%;
                    padding: 30px 30px 30px;
                    font-size: 30px;
                    line-height: 30px;
                    display: flex;
                    justify-content: flex-start;
                    .user-phone {
                        margin-left: 20px;
                    }
                }
                .address-details {
                    padding: 0 30px 30px 30px;
                    font-size: 24px;
                    line-height: 34px;
                    border-bottom: 1px solid #25252b;
                }
                .operation {
                    padding: 30px 30px 30px;
                    font-size: 30px;
                    line-height: 30px;
                    width: 100%;
                    overflow: hidden;
                    .default {
                        color: #f8c513;
                    }
                    .btn {
                        margin: 0 0 0 30px;
                        .icons {
                            width: 30px;
                            height: 30px;
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
        .add-address {
            position: fixed;
            bottom: 0;
            background-color: #f8c513;
            width: 100%;
            font-size: 32px;
            line-height: 32px;
            left: 0;
            padding: 30px 30px 30px;
            color: #25252b;
        }
    }
</style>
