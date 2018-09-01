<template>
    <div class="footer-menu">
        <div v-for="item in menuList" class="menu-list-item text-center"
             :class="{'active':currentRoute === item.id}" @click="changeRoute(item.id)">
            <div class="footer-menu-icons">
                <l-icon :name="currentRoute === item.id ? item.icons + '-active':item.icons"/>
            </div>
            <div class="footer-menu-name">{{item.name}}</div>
        </div>
    </div>
</template>

<script>
    let _this
    export default {
        name: 'footerMenu',
        props: {
            currentRoute: {
                type: String,
                default: 'home'
            }
        },
        data() {
            return {
                menuList: [],
                route: 'home'
            }
        },
        mounted() {
            _this = this
            _this.getMenuList()
        },
        methods: {
            getMenuList() {
                _this.menuList = [
                    {
                        id: 'home',
                        icons: 'home',
                        name: '主页'
                    },
                    {
                        id: 'tradingCenter',
                        icons: 'tradingCenter',
                        name: '交易中心'
                    },
                    {
                        id: 'businessCenter',
                        icons: 'businessCenter',
                        name: '商圈'
                    },
                    {
                        id: 'club',
                        icons: 'club',
                        name: '俱乐部'
                    },
                    {
                        id: 'personalCenter',
                        icons: 'personal',
                        name: '我的'
                    }
                ]
            },
            changeRoute(route) {
                this.$router.push({name: route})
            }
        }
    }
</script>

<style lang="scss">
    .footer-menu {
        position: fixed;
        bottom: 0;
        padding: 10px 40px 10px;
        width: 100%;
        background: #404049;
        z-index: 10;
        .menu-list-item {
            width: 20%;
            display: inline-block;
            .icons {
                font-size: 44px;
                height: 44px;
                line-height: 44px;
            }
            .footer-menu-name {
                font-size: 24px;
                line-height: 24px;
                padding-top: 10px;
                -webkit-transform: scale(10/12);
                -ms-transform: scale(10/12);
                transform: scale(10/12);
            }
            &.active {
                color: #FFD554;
            }
        }
    }
</style>
