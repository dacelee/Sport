import Vue from 'vue'
import Router from 'vue-router'
import home from '@/business/home/home.vue'
import stepDetails from '@/business/home/stepDetails.vue'
import tradingCenter from '@/business/tradingCenter/tradingCenterList.vue'
import personalCenter from '@/business/personalCenter/personalCenter.vue'
import businessCenter from '@/business/businessCenter/businessCenterList.vue'
import club from '@/business/club/clubList.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
            meta: {
                title: '首页'
            }
        },
        {
            path: '/stepDetails',
            name: 'stepDetails',
            component: stepDetails,
            meta: {
                title: '今日步数'
            }
        },
        {
            path: '/tradingCenter',
            name: 'tradingCenter',
            component: tradingCenter,
            meta: {
                title: '交易中心'
            }
        },
        {
            path: '/businessCenter',
            name: 'businessCenter',
            component: businessCenter,
            meta: {
                title: '商圈'
            }
        },
        {
            path: '/club',
            name: 'club',
            component: club,
            meta: {
                title: '俱乐部'
            }
        },
        {
            path: '/personalCenter',
            name: 'personalCenter',
            component: personalCenter,
            meta: {
                title: '我的'
            }
        }
    ]
})
