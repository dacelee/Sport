import Vue from 'vue'
import Router from 'vue-router'
import home from '@/business/home/home.vue'
import stepDetails from '@/business/home/stepDetails.vue'
import tradingCenter from '@/business/tradingCenter/tradingCenterList.vue'
import personalCenter from '@/business/personalCenter/personalCenter.vue'
import businessCenter from '@/business/businessCenter/businessCenterList.vue'
import businessProduct from '@/business/businessCenter/businessProduct.vue'
import businessDetail from '@/business/businessCenter/businessDetail.vue'
import businessCart from '@/business/businessCenter/businessCart.vue'
import businessSettlement from '@/business/businessCenter/businessSettlement.vue'
import businessOrder from '@/business/businessCenter/businessOrder.vue'
import businessAddress from '@/business/businessCenter/businessAddress.vue'
import businessAddressAdd from '@/business/businessCenter/businessAddressAdd.vue'
import club from '@/business/club/clubList.vue'
import createClub from '@/business/club/createClub.vue'
import createClubSuccess from '@/business/club/createClubSuccess.vue'
import clubCertification from '@/business/club/clubCertification.vue'
import clubCertificationSuccess from '@/business/club/clubCertificationSuccess.vue'
import clubDetails from '@/business/club/clubDetails.vue'
import clubTeams from '@/business/club/clubTeams.vue'
import activityList from '@/business/club/activityList.vue'
import publishActivity from '@/business/club/publishActivity.vue'
import teamList from '@/business/team/teamList.vue'
import createTeam from '@/business/team/createTeam.vue'
import newsList from '@/business/news/news.vue'
import newsDetails from '@/business/news/newsDetails.vue'
import login from '@/business/login/login.vue'
import register from '@/business/register/register.vue'
import forgetPassword from '@/business/register/forgetPassword.vue'
import selectGender from '@/business/register/selectGender.vue'
import activity from '@/business/activity/activity.vue'
import task from '@/business/task/task.vue'

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
            path: '/businessProduct',
            name: 'businessProduct',
            component: businessProduct,
            meta: {
                title: '商圈产品'
            }
        },
        {
            path: '/businessDetail',
            name: 'businessDetail',
            component: businessDetail,
            meta: {
                title: '产品详情'
            }
        },
        {
            path: '/businessCart',
            name: 'businessCart',
            component: businessCart,
            meta: {
                title: '加入购物车'
            }
        },
        {
            path: '/businessSettlement',
            name: 'businessSettlement',
            component: businessSettlement,
            meta: {
                title: '结算'
            }
        },
        {
            path: '/businessOrder',
            name: 'businessOrder',
            component: businessOrder,
            meta: {
                title: '提交订单'
            }
        },
        {
            path: '/businessAddress',
            name: 'businessAddress',
            component: businessAddress,
            meta: {
                title: '选择收货地址'
            }
        },
        {
            path: '/businessAddressAdd',
            name: 'businessAddressAdd',
            component: businessAddressAdd,
            meta: {
                title: '新增收货地址'
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
            path: '/createClub',
            name: 'createClub',
            component: createClub,
            meta: {
                title: '创建俱乐部'
            }
        },
         {
            path: '/createClubSuccess',
            name: 'createClubSuccess',
            component: createClubSuccess,
            meta: {
                title: '创建成功'
            }
        },
        {
            path: '/clubCertification',
            name: 'clubCertification',
            component: clubCertification,
            meta: {
                title: '实体店认证'
            }
        },
        {
            path: '/clubCertificationSuccess',
            name: 'clubCertificationSuccess',
            component: clubCertificationSuccess,
            meta: {
                title: '实体店认证成功'
            }
        },
        {
            path: '/clubDetails',
            name: 'clubDetails',
            component: clubDetails,
            meta: {
                title: '俱乐部详情'
            }
        },
        {
            path: '/clubTeams',
            name: 'clubTeams',
            component: clubTeams,
            meta: {
                title: '成员'
            }
        },
        {
            path: '/activityList',
            name: 'activityList',
            component: activityList,
            meta: {
                title: '活动'
            }
        },
        {
            path: '/publishActivity',
            name: 'publishActivity',
            component: publishActivity,
            meta: {
                title: '发布活动'
            }
        },
        {
            path: '/personalCenter',
            name: 'personalCenter',
            component: personalCenter,
            meta: {
                title: '我的'
            }
        },
        {
            path: '/activity',
            name: 'activity',
            component: activity,
            meta: {
                title: '活动'
            }
        },
        {
            path: '/task',
            name: 'task',
            component: task,
            meta: {
                title: '任务'
            }
        }
    ]
})
