import Vue from 'vue'
import Router from 'vue-router'
import home from '@/business/home/home.vue'
import stepDetails from '@/business/home/stepDetails.vue'
import tradingCenter from '@/business/tradingCenter/tradingCenterList.vue'
import personalCenter from '@/business/personalCenter/personalCenter.vue'
import personalSetting from '@/business/personalCenter/personalSetting.vue'
import tradingPassword from '@/business/personalCenter/tradingPassword.vue'
import loginPassword from '@/business/personalCenter/loginPassword.vue'
import feedbackList from '@/business/personalCenter/feedbackList.vue'
import feedback from '@/business/personalCenter/feedback.vue'
import businessCenter from '@/business/businessCenter/businessCenterList.vue'
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
//import faceapp from '@/business/face/faceapp.vue'
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
                title: false
            }
        },
        {
            path: '/register',
            name: 'register',
            component: register,
            meta: {
                title: false
            }
        },
        {
            path: '/register/selectGender',
            name: 'selectGender',
            component: selectGender,
            meta: {
                title: 'false'
            }
        },
        {
            path: '/register/forgetPassword',
            name: 'forgetPassword',
            component: forgetPassword,
            meta: {
                title: false
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
                title: '今日步数',
                back: '/'
            }
        },
        {
            path: '/teamList',
            name: 'teamList',
            component: teamList,
            meta: {
                title: '组队',
                back: '/',
                rightTitle: '创建'
            }
        },
        {
            path: '/createTeam',
            name: 'createTeam',
            component: createTeam,
            meta: {
                title: '创建组队',
                back: 'teamList'
            }
        },
        {
            path: '/newsList',
            name: 'newsList',
            component: newsList,
            meta: {
                title: '资讯',
                back: '/'
            }
        },
        {
            path: '/newsList/newsDetails/:id',
            name: 'newsDetails',
            component: newsDetails,
            meta: {
                title: '详情',
                back: '-1'
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
                title: '商圈',
                rightIcon: 'gouwuche'
            }
        },
        {
            path: '/club',
            name: 'club',
            component: club,
            meta: {
                title: '俱乐部',
                rightTitle: '创建'
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
                title: '活动',
                back: '/'
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
                title: '我的',
                rightIcon: 'shezhi'
            }
        },
        {
            path: '/personalSetting',
            name: 'personalSetting',
            component: personalSetting,
            meta: {
                title: '设置',
                back: '/personalCenter'
            }
        },
        {
            path: '/tradingPassword',
            name: 'tradingPassword',
            component: tradingPassword,
            meta: {
                title: '修改交易密码',
                back: '/personalSetting'
            }
        },
        {
            path: '/loginPassword',
            name: 'loginPassword',
            component: loginPassword,
            meta: {
                title: '修改登录密码',
                back: '/personalSetting'
            }
        },
        {
            path: '/feedbackList',
            name: 'feedbackList',
            component: feedbackList,
            meta: {
                title: '问题反馈',
                back: '/personalSetting'
            }
        },
        {
            path: '/feedback',
            name: 'feedback',
            component: feedback,
            meta: {
                title: '提问',
                back: '/feedbackList'
            }
        },
        {
            path: '/activity',
            name: 'activity',
            component: activity,
            meta: {
                title: '活动',
                back: '/'
            }
        },
        {
            path: '/task',
            name: 'task',
            component: task,
            meta: {
                title: '任务',
                back: '/'
            }
        },
        //{
        //    path: '/face/faceapp',
        //    name: 'faceapp',
        //    component: faceapp,
        //    meta: {
        //        title: '人脸识别'
        //    }
        //},
    ]
    , scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return {x: 0, y: 0}
    }
})
