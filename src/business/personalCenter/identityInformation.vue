<template>
    <div class="identity-information">
        <div class="identity-list-item" v-for="item in list">
            <div class="label" :class="{'is':item.passed === 1}">{{ item.name }}</div>
            <div class="pass" v-if="item.passed === 1">
                <l-icon name="shenfenxinxirenzheng"/>
            </div>
        </div>
    </div>
</template>

<script>
    import users from '../../api/users.js'
    export default {
        name: 'identity-information',
        data() {
            return {
                list: [
//                    {
//                        name: '圈主',
//                        passed: 0
//                    },
//                    {
//                        name: '星级达人',
//                        passed: 0
//                    },
//                    {
//                        name: '商家',
//                        passed: 0
//                    },
//                    {
//                        name: '城市代理',
//                        passed: 0
//                    }

                ]
            }
        },
        mounted(){
            this.loadData();
        },
        methods:{
            loadData(){
                users.myIdentityLoad(this);
            }
        }
    }
</script>

<style lang="scss">
    .identity-information {
        width: calc(100% - 60px);
        margin: 0 auto;
        .identity-list-item {
            display: flex;
            justify-content: space-between;
            background-color: #333339;
            width: 100%;
            margin: 20px auto 0;
            padding: 45px 45px 45px;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            .icons {
                width: 43px;
                height: 50px;
            }

            .label {
                color: #808080;
                font-size: 32px;
                line-height: 32px;
                margin-top: 9px;
            }
            .is{color: #FFF}
        }
    }
</style>
