<template>
    <div id="index">
        <l-alert/>
        <l-header :meta="meta" @rightBtnEvent="rightBtnEvent" @leftBtnEvent="leftBtnEvent"/>
        <div class="view-container">
            <keep-alive>
                <router-view ref="router" @changeRightTitle="changeRightTitle" @changeRightIcon="changeRightIcon"
                             @changeTitle="changeTitle"/>
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
            This = this;
        },
        mounted() {
            This = this;
            this.initStatus();

        }, beforeUpdate() {
            this.$nextTick(function () {
                this.initHeader();
                var meta = this.getMeta();
                $.extend(true, this.meta, meta);
            });
        }, watch: {
            $route(to, from) {
                if (!this.session.isLogin() && to.path != '/login' && to.path != '/register' && to.path != '/register/forgetPassword' && to.path != '/register/selectGender') {
                    this.$router.replace('/login')
                    return;
                }
                if (to.path == '/' || to.path == '/login') {
                    this.quitApp = true
                } else {
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
            changeTitle(title){
                this.meta.title = title
            },
            initStatus() {
                window.apiready = function () {
                    $api.setStorage('appRuntime', true);
                    $api.rmStorage("homeNewShow")
                    This.initHeader();
                    This.exitApp();
                    if(This.session.isLogin()){
                        setTimeout(function(){
                            This.session.openSession(This);
                        },500)
                    }else{
//                        alert("未登入");
                    }
                    api.addEventListener({
                        name:'offline'
                    }, function(ret, err){
                        This.$Message.error('网络断开');
                    });

                    api.addEventListener({
                        name:'resume'
                    }, function(ret, err){
                        This.appUtil.apiCloudEvent("resume",ret, err);
                    });
                    api.addEventListener({
                        name:'pause'
                    }, function(ret, err){
                        $api.rmStorage("homeNewShow")
                    });


//                    var systemType = api.systemType;
//                    if(systemType=="android") {
//                        api.addEventListener({
//                            name: 'pause'
//                        }, function (ret, err) {
//                            api.notification({
//                                notify: {
//                                    title: '运动圈',
//                                    content: '正在后台运行'
//                                }
//                            });
//                        });
//                        api.addEventListener({
//                            name: 'resume'
//                        }, function (ret, err) {
//                            api.cancelNotification({
//                                id: -1
//                            });
//                        });
//                    }
                }
            },
            initHeader() {
                if (this.session.isAPPRuntime()) {
                    setTimeout(function(){
                        if ($("header").length > 0) {
                            var header = $api.dom('header')
                            // 1.修复开启沉浸式效果带来的顶部Header与手机状态栏重合的问题，最新api.js方法已支持适配iPhoneX；
                            // 2.默认已开启了沉浸式效果 config.xml中 <preference name="statusBarAppearance" value="true"/>
                            // 3.沉浸式效果适配支持iOS7+，Android4.4+以上版本
                            var headerHeight = $api.fixStatusBar(header);
                            var height = $(window).height() - headerHeight;
                            if (headerHeight > 0) {
                                $('.view-container').css({'margin-top': headerHeight + 'px', 'height': height})
                            }
                        }
                    },50)
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
                    } else if (ci == 1) {
                        time2 = new Date().getTime()
                        if (time2 - time1 < 3000) {
                            $api.rmStorage("homeNewShow")
                            api.toLauncher();
//                            $api.rmStorage('appRuntime');
//                            api.closeWidget({
//                                id: api.appId,
//                                retData: {
//                                    name: 'closeWidget'
//                                },
//                                silent: true
//                            })
                        } else {
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
        overflow-y: scroll;
        overflow-x: hidden;
        margin-top: 80px;

    }

</style>
