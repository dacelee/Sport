<template>
    <div id="index">
        <l-alert/>
        <l-header :meta="meta" @rightBtnEvent="rightBtnEvent" @leftBtnEvent="leftBtnEvent"/>
        <div class="view-container">
            <keep-alive>
                <router-view ref="router" @changeRightTitle="changeRightTitle" @changeRightIcon="changeRightIcon"/>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    let This
    export default {
        name: 'index',
        data() {
            var meta = this.getMeta()
            return {
                meta: meta,
                quitApp: true,
                needReset: false
            }
        },
        activated(){
        },
        updated(){
            this.$nextTick(() => {
               this.initHeader();
            });
        },
        mounted() {
            This = this
            this.initStatus()
//            if (!this.session.isLogin()) {
//                this.$router.push('login');
//                return;
//            }
        }, beforeUpdate() {
            this.$nextTick(() => {
                var meta = this.getMeta()
                $.extend(true, this.meta, meta);
            });
        },watch: {
            $route(to, from) {
                if(!this.session.isLogin()&&to.path != '/login'&&to.path != '/register'&&to.path != '/register/forgetPassword'){
                    this.$router.replace('/login')
                    return;
                }
                if (to.path == '/' || to.path == '/login') {
                    this.quitApp = true
                }else {
                    this.quitApp = false
                }
            }
        },
        methods: {
            rightBtnEvent() {
                if (this.meta.rightTitle || this.meta.rightIcon) {
                    if (this.$refs.router.editEvent) {
                        this.$refs.router.editEvent() //调用子组件方法
                    }
                }
            },
            leftBtnEvent() {
                if (this.meta.back) {
                    if (this.$refs.router.leftBtnEvent) {
                        this.$refs.router.leftBtnEvent() //调用子组件方法
                    }
                }
            },
            getMeta() {
                return {
                    title: this.$route.meta.title,
                    back: this.$route.meta.back ? this.$route.meta.back : false,
                    rightTitle: this.$route.meta.rightTitle ? this.$route.meta.rightTitle : false,
                    rightIcon: this.$route.meta.rightIcon ? this.$route.meta.rightIcon : false
                }
            },
            changeRightTitle(rightTitle) {
                this.meta.rightTitle = rightTitle
            },
            changeRightIcon(rightIcon) {
                this.meta.rightIcon = rightIcon
            },
            initStatus() {
                window.apiready = function () {
                    $api.setStorage('appRuntime', true)
                    This.initHeader()
                    This.exitApp()
                }
            },
            initHeader() {
                if (this.session.isAPPRuntime()) {
                    if($("header").length>0){
//                        alert($("header").length)
                        var header = $api.dom('header')
                        // 1.修复开启沉浸式效果带来的顶部Header与手机状态栏重合的问题，最新api.js方法已支持适配iPhoneX；
                        // 2.默认已开启了沉浸式效果 config.xml中 <preference name="statusBarAppearance" value="true"/>
                        // 3.沉浸式效果适配支持iOS7+，Android4.4+以上版本
                        var headerHeight = $api.fixStatusBar(header)
                        if (headerHeight > 0) {
                            $('.view-container').css('margin-top', headerHeight + 'px')
                        }
                    }
                }
            },
            exitApp() {
                var ci = 0
                var time1, time2
                api.addEventListener({
                    name: 'keyback'
                }, function (ret, err) {
                    if (!This.quitApp) {
                        This.$router.go(-1)
                        return true
                    }
                    if (ci == 0) {
                        time1 = new Date().getTime()
                        ci = 1
                        This.$Message.info('再按一次返回键退出')
                    }else if (ci == 1) {
                        time2 = new Date().getTime()
                        if (time2 - time1 < 3000) {
                            api.closeWidget({
                                id: api.appId,
                                retData: {
                                    name: 'closeWidget'
                                },
                                silent: true
                            })
                        }else {
                            ci = 0
                            This.$Message.info('再按一次返回键退出')
                        }
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
    @import "./style/common.scss";
    
    .view-container {
        overflow: hidden;
        margin-top: 80px;
        
    }

</style>
