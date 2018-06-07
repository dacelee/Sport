import Vue from 'vue'
import Router from 'vue-router'
import home from '@/business/home/home.vue'
import stepDetails from '@/business/home/stepDetails.vue'
import tradingCenter from '@/business/tradingCenter/tradingCenterList.vue'
import personalCenter from '@/business/personalCenter/personalCenter.vue'
import businessCenter from '@/business/businessCenter/businessCenterList.vue'
import club from '@/business/club/clubList.vue'
import teamList from '@/business/team/teamList.vue'
import createTeam from '@/business/team/createTeam.vue'
import newsList from '@/business/news/news.vue'
import newsDetails from '@/business/news/newsDetails.vue'
import login from '@/business/login/login.vue'
import register from '@/business/register/register.vue'
import forgetPassword from '@/business/register/forgetPassword.vue'
import selectGender from '@/business/register/selectGender.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: {
                title: '登录'
            }
        },
        {
            path: '/register',
            name: 'register',
            component: register,
            meta: {
                title: '注册'
            }
        },
        {
            path: '/register/selectGender',
            name: 'selectGender',
            component: selectGender,
            meta: {
                title: '选择性别'
            }
        },
        {
            path: '/register/forgetPassword',
            name: 'forgetPassword',
            component: forgetPassword,
            meta: {
                title: '忘记密码'
            }
        },
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
            path: '/teamList',
            name: 'teamList',
            component: teamList,
            meta: {
                title: '组队'
            }
        },
        {
            path: '/createTeam',
            name: 'createTeam',
            component: createTeam,
            meta: {
                title: '创建队伍'
            }
        },
        {
            path: '/newsList',
            name: 'newsList',
            component: newsList,
            meta: {
                title: '资讯'
            }
        },
        {
            path: '/newsList/newsDetails/:id',
            name: 'newsDetails',
            component: newsDetails,
            meta: {
                title: '详情'
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
