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
import Mui from 'vue-awesome-mui'
import 'vue-awesome-mui/mui/dist/css/mui.css'
// mount with global
Vue.use(Mui)
//import {Alert, Confirm, Toast} from 'wc-messagebox'
//import 'wc-messagebox/style.css'
//var options = {
//    title: '',  // 默认标题为 '提示'
//    btn: {
//        text: '',
//        style: {} // 可以通过 style 来修改按钮的样式, 比如说粗细, 颜色
//    },
//    durtaion: 300,
//    location: 'center',
//    toastStyle:{'padding': '20px 10px','font-size':"0.4rem","line-height":"0.6rem"}
//}
//Vue.use(Alert, options)
//Vue.use(Confirm, options)
//Vue.use(Toast,options)
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
