// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import index from './index.vue'
import router from './router'
import component from './components'
import VueWeChatTitle from 'vue-wechat-title'
import 'lib-flexible'

Vue.config.productionTip = false
Vue.use(component)
Vue.use(VueWeChatTitle)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {index},
    template: '<index/>',
    mounted() {
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
