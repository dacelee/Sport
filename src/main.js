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
import pedometer from './api/pedometer.js'
import amap from './api/amap.js'
import verify from "vue-verify-plugin";
import db from './api/db.js'
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
Vue.use(verify);
//api https://www.npmjs.com/package/vue-verify-plugin
//Vue.use(appUtil)
// 将API方法绑定到全局
Vue.prototype.axios = axios
Vue.prototype.db = db
Vue.prototype.session = session
Vue.prototype.appUtil = appUtil
Vue.prototype.pedometer = pedometer
Vue.prototype.amap = amap
Vue.config.productionTip = false
Vue.use(component)
import iView from 'iview';
//import {Message,Icon,Progress,Scroll,Spin,Radio,
//    RadioGroup,Checkbox,CheckboxGroup,InputNumber} from 'iview';
import 'iview/dist/styles/iview.css';
import './style/iview_theme.less'

Vue.use(iView, {
    transfer: true,
    size: 'large'
});
//Vue.prototype.$Message = Message
//Vue.component("Icon",Icon)
//Vue.component("Progress",Progress)
//Vue.component("Scroll",Scroll)
//Vue.component("RadioGroup",RadioGroup)
//Vue.component("Radio",Radio)
//Vue.component("CheckboxGroup",CheckboxGroup)
//Vue.component("Checkbox",Checkbox)
//Vue.component("Spin",Spin)
//Vue.component("InputNumber",InputNumber)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
let $api = require('./public/api.js')
//Vue.use(VueWeChatTitle)
//window.App = {
//    eCharts, extend(sources) {
//        Object.assign(this, sources)
//    }
//}
//App.eCharts = eCharts
/* eslint-disable no-new */
VueAMap.initAMapApiLoader({
    key: 'b29b4cb5d7b7e045710f87794f9d6597',
    plugin: ['AMap.GraspRoad','AMap.Map','AMap.GeometryUtil','AMap.Geocoder'],
    v: '1.4.7'
});
new Vue({
    el: '#app',
    router,
    components: {index},
    template: '<index/>',
    mounted() {
        this.$Message.config({
            top: 'auto'
        });
        return;
        //if (this.$router.history.current.name) {
        //    // 初始化时判断是否存在路由信息,如果不存在路由信息,则跳转至首页
        //    if (this.$router.history.current.path === '/') {
        //        this.$router.push({
        //            name: 'home'
        //        })
        //    }
        //    else {
        //        this.route = this.$router.history.current.name
        //    }
        //}
        //else {
        //    this.$router.push({
        //        name: 'home'
        //    })
        //}

    }
})
