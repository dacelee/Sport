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
import candyRecords from '@/business/personalCenter/candyRecords.vue'
import vipLevel from '@/business/personalCenter/vipLevel.vue'
import basicInformation from '@/business/personalCenter/basicInformation.vue'
import editNick from '@/business/personalCenter/editNick.vue'
import editSignature from '@/business/personalCenter/editSignature.vue'
import editWeChat from '@/business/personalCenter/editWeChat.vue'
import editAliPay from '@/business/personalCenter/editAliPay.vue'
import activityRecords from '@/business/personalCenter/activityRecords.vue'
import contributionRecords from '@/business/personalCenter/contributionRecords.vue'
import verifiedForm from '@/business/personalCenter/verifiedForm.vue'
import editUserName from '@/business/personalCenter/editUserName.vue'
import editIdCard from '@/business/personalCenter/editIdCard.vue'
import editPhoneNum from '@/business/personalCenter/editPhoneNum.vue'
import editBankCard from '@/business/personalCenter/editBankCard.vue'
import editAliPayForm from '@/business/personalCenter/editAliPayForm.vue'
import faceRecognition from '@/business/personalCenter/faceRecognition.vue'
import identityInformation from '@/business/personalCenter/identityInformation.vue'
import transaction from '@/business/personalCenter/transaction.vue'
import transactionDetails from '@/business/personalCenter/transactionDetails.vue'
import paySuccess from '@/business/personalCenter/paySuccess.vue'
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
import imageClip from '@/vue-cropper/imageClip.vue'

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
            path: '/imageClip',
            name: 'imageClip',
            component: imageClip,
            meta: {
                title: '裁剪图片',
                back: '-1'
            }
        },
        {
            path: '/createClub',
            name: 'createClub',
            component: createClub,
            meta: {
                title: '创建俱乐部',
                back: '/club',
            }
        },
        {
            path: '/createClubSuccess',
            name: 'createClubSuccess',
            component: createClubSuccess,
            meta: {
                title: '创建成功',
                back: '/-1',
            }
        },
        {
            path: '/clubCertification',
            name: 'clubCertification',
            component: clubCertification,
            meta: {
                title: '实体店认证',
                back: '-1'
            }
        },
        {
            path: '/clubCertificationSuccess',
            name: 'clubCertificationSuccess',
            component: clubCertificationSuccess,
            meta: {
                title: '实体店认证成功',
                back: '-1'
            }
        },
        {
            path: '/clubDetails',
            name: 'clubDetails',
            component: clubDetails,
            meta: {
                title: '俱乐部详情',
                back: '/club',
                rightTitle: '发布活动'
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
                back: '-1',
                rightTitle: '发布活动'
            }
        },
        {
            path: '/publishActivity',
            name: 'publishActivity',
            component: publishActivity,
            meta: {
                title: '发布活动',
                back: '-1'
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
            path: '/candyRecords',
            name: 'candyRecords',
            component: candyRecords,
            meta: {
                title: '糖果明细',
                back: '/personalCenter'
            }
        },
        {
            path: '/vipLevel',
            name: 'vipLevel',
            component: vipLevel,
            meta: {
                title: '会员等级',
                back: '/personalCenter'
            }
        },
        {
            path: '/basicInformation',
            name: 'basicInformation',
            component: basicInformation,
            meta: {
                title: '基础资料',
                back: '/personalCenter'
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
            path: '/editNick',
            name: 'editNick',
            component: editNick,
            meta: {
                title: '设置昵称',
                back: '/basicInformation',
                rightTitle: '完成'
            }
        },
        {
            path: '/editSignature',
            name: 'editSignature',
            component: editSignature,
            meta: {
                title: '设置个性签名',
                back: '/basicInformation',
                rightTitle: '完成'
            }
        },
        {
            path: '/editWeChat',
            name: 'editWeChat',
            component: editWeChat,
            meta: {
                title: '设置微信号',
                back: '/basicInformation',
                rightTitle: '完成'
            }
        },
        {
            path: '/editAliPay',
            name: 'editAliPay',
            component: editAliPay,
            meta: {
                title: '设置支付宝账号',
                back: '/basicInformation',
                rightTitle: '完成'
            }
        },
        {
            path: '/activityRecords',
            name: 'activityRecords',
            component: activityRecords,
            meta: {
                title: '活跃度明细',
                back: '/personalCenter'
            }
        },
        {
            path: '/contributionRecords',
            name: 'contributionRecords',
            component: contributionRecords,
            meta: {
                title: '贡献值明细',
                back: '/personalCenter'
            }
        },
        {
            path: '/verifiedForm',
            name: 'verifiedForm',
            component: verifiedForm,
            meta: {
                title: '实名认证',
                back: '/personalCenter'
            }
        },
        {
            path: '/editUserName',
            name: 'editUserName',
            component: editUserName,
            meta: {
                title: '填写姓名',
                back: '/verifiedForm',
                rightTitle: '完成'
            }
        },
        {
            path: '/editIdCard',
            name: 'editIdCard',
            component: editIdCard,
            meta: {
                title: '填写身份证',
                back: '/verifiedForm',
                rightTitle: '完成'
            }
        },
        {
            path: '/editPhoneNum',
            name: 'editPhoneNum',
            component: editPhoneNum,
            meta: {
                title: '填写手机号码',
                back: '/verifiedForm',
                rightTitle: '完成'
            }
        },
        {
            path: '/editBankCard',
            name: 'editBankCard',
            component: editBankCard,
            meta: {
                title: '填写银行卡号',
                back: '/verifiedForm',
                rightTitle: '完成'
            }
        },
        {
            path: '/editAliPayForm',
            name: 'editAliPayForm',
            component: editAliPayForm,
            meta: {
                title: '填写支付宝账号',
                back: '/verifiedForm',
                rightTitle: '完成'
            }
        },
        {
            path: '/faceRecognition',
            name: 'faceRecognition',
            component: faceRecognition,
            meta: {
                title: '人脸识别',
                back: '/verifiedForm'
            }
        },
        {
            path: '/identityInformation',
            name: 'identityInformation',
            component: identityInformation,
            meta: {
                title: '身份信息',
                back: '/personalCenter'
            }
        },
        {
            path: '/transaction',
            name: 'transaction',
            component: transaction,
            meta: {
                title: '商圈交易',
                back: '/personalCenter'
            }
        },
        {
            path: '/transactionDetails/:id',
            name: 'transactionDetails',
            component: transactionDetails,
            meta: {
                title: '订单信息',
                back: '/transaction'
            }
        },
        {
            path: '/paySuccess',
            name: 'paySuccess',
            component: paySuccess,
            meta: {
                title: '支付成功',
                back: '/personalCenter'
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
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return {x: 0, y: 0}
    }
})
