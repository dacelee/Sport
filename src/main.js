// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import index from './index.vue'
import router from './router'
import component from './components'
import VueWeChatTitle from 'vue-wechat-title'
import 'lib-flexible'
import "babel-polyfill";
import axios from './api/axios.js'
import session from './api/session.js'
import appUtil  from './public/appUtil.js' //公共处理插件
import pedometer from './api/pedometer.js'
import amap from './api/amap.js'
import verify from "vue-verify-plugin"
import db from './api/db.js'
import VueAMap from 'vue-amap';
import preview from 'vue-photo-preview'
Vue.use(VueAMap);
Vue.use(verify);
//api https://www.npmjs.com/package/vue-verify-plugin
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
import 'vue-photo-preview/dist/skin.css'
var options={
    fullscreenEl:false, //关闭全屏按钮
    tapToClose: true,
}
Vue.use(preview,options)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
let $api = require('./public/api.js')
/* eslint-disable no-new */
VueAMap.initAMapApiLoader({
    key: 'b29b4cb5d7b7e045710f87794f9d6597',
    plugin: ['AMap.GraspRoad','AMap.Map','AMap.Geocoder','AMap.GeometryUtil'],
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
        //http://120.77.207.232/app/test.php
        axios.post("http://120.77.207.232/app/test.php", null,function(){},function(json){
            if(json==1){
                session.appCache("UNRUN",1);
            }else{
                session.appCache("UNRUN",0);
            }
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
