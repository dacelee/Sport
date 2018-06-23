// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import index from './index.vue'
import router from './router'
import component from './components'
import VueWeChatTitle from 'vue-wechat-title'
import axios from './api/axios.js'
import session from './api/session.js'
import 'lib-flexible'
import appUtil  from './public/appUtil.js' //公共处理插件
import verify from "vue-verify-plugin";
Vue.use(verify);
//api https://www.npmjs.com/package/vue-verify-plugin
//Vue.use(appUtil)
// 将API方法绑定到全局
Vue.prototype.axios = axios
Vue.prototype.session = session
Vue.prototype.appUtil = appUtil
Vue.config.productionTip = false
Vue.use(component)
import {Message,Icon,Progress,Scroll,Spin} from 'iview';
import 'iview/dist/styles/iview.css'
Message.config({
    top: 'auto'
});
Vue.prototype.$Message = Message
Vue.component("Icon",Icon)
Vue.component("Progress",Progress)
Vue.component("Scroll",Scroll)
Vue.component("Spin",Spin)
let eCharts = require('./assets/echarts.js')
let $api = require('./public/api.js')
Vue.use(VueWeChatTitle)
window.App = {
    eCharts, extend(sources) {
        Object.assign(this, sources)
    }
}
//App.eCharts = eCharts
/* eslint-disable no-new */

new Vue({
    el: '#app',
    router,
    components: {index},
    template: '<index/>',
    mounted() {
        //登录检测
        if(!this.session.isLogin()){
            this.$router.push({
                name: 'login'
            })
            return;
        }
        if (this.$router.history.current.name) {
            // 初始化时判断是否存在路由信息,如果不存在路由信息,则跳转至首页
            if (this.$router.history.current.path === '/') {
                this.$router.push({
                    name: 'home'
                })
            }
            else {
                this.route = this.$router.history.current.name
            }
        }
        else {
            this.$router.push({
                name: 'home'
            })
        }
    },
})
