import Vue from 'vue'
import Router from 'vue-router'
import noticeDetails from '@/business/home/noticeDetails.vue'
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
import editField from '@/business/personalCenter/editField.vue'
import editIdCard from '@/business/personalCenter/editIdCard.vue'
import editPhoneNum from '@/business/personalCenter/editPhoneNum.vue'
import editBankCard from '@/business/personalCenter/editBankCard.vue'
import editAliPayForm from '@/business/personalCenter/editAliPayForm.vue'
import faceRecognition from '@/business/personalCenter/faceRecognition.vue'
import identityInformation from '@/business/personalCenter/identityInformation.vue'
import transaction from '@/business/personalCenter/transaction.vue'
import transactionDetails from '@/business/personalCenter/transactionDetails.vue'
import appeal from '@/business/personalCenter/appeal.vue'
import paySuccess from '@/business/personalCenter/paySuccess.vue'
import orderCenter from '@/business/personalCenter/orderCenter.vue'
import orderDetails from '@/business/personalCenter/orderDetails.vue'
import logistics from '@/business/personalCenter/logistics.vue'
import addressInfo from '@/business/personalCenter/addressInfo.vue'
import addressOperation from '@/business/personalCenter/addressOperation.vue'
import userGuide from '@/business/personalCenter/userGuide.vue'
import myArticle from '@/business/personalCenter/myArticle.vue'
import teamManage from '@/business/personalCenter/teamManage.vue'
import teamRecruitment from '@/business/personalCenter/teamRecruitment.vue'
import businessCenter from '@/business/businessCenter/businessCenterList.vue'
import businessProduct from '@/business/businessCenter/businessProduct.vue'
import businessDetail from '@/business/businessCenter/businessDetail.vue'
import businessSettlement from '@/business/businessCenter/businessSettlement.vue'
import businessOrder from '@/business/businessCenter/businessOrder.vue'
import orderPay from '@/business/businessCenter/orderPay.vue'
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
import shareNews from '@/business/news/shareNews.vue'
import articleShare from '@/business/news/articleShare.vue'
import newsDetails from '@/business/news/newsDetails.vue'
import articleList from '@/business/news/articleList.vue'
import articleDetails from '@/business/news/articleDetails.vue'
import guide from '@/business/news/guide.vue'
import login from '@/business/login/login.vue'
import register from '@/business/register/register.vue'
import agree from '@/business/register/agree.vue'
import forgetPassword from '@/business/register/forgetPassword.vue'
import selectGender from '@/business/register/selectGender.vue'
import activity from '@/business/activity/activity.vue'
import task from '@/business/task/task.vue'
import videoRecorder from '@/business/personalCenter/face/videoRecorder.vue'
import toDayStep from '@/business/home/toDayStep.vue'
import nearbyUser from '@/business/team/nearbyUser.vue'
Vue.use(Router)

export default new Router({
    mode: 'hash',
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
            path: '/agree',
            name: 'agree',
            component: agree,
            meta: {
                title: '用户协议',
                back:'-1'
            }
        },
        {
            path: '/register/selectGender',
            name: 'selectGender',
            component: selectGender,
            meta: {
                title: false
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
            path: '/noticeDetails/:id',
            name: 'noticeDetails',
            component: noticeDetails,
            meta: {
                title: '消息详情',
                back: '-1'
            }
        },
        {
            path: '/stepDetails',
            name: 'stepDetails',
            component: stepDetails,
            meta: {
                title: '今日步数',
                back: '-1',
                rightIcon: 'fenxiang'
            }
        },
        {
            path: '/toDayStep',
            name: 'toDayStep',
            component: toDayStep,
            meta: {
                title: '今日步数',
                back: '-1',
                rightIcon: 'fenxiang',
                rightTitle: '分享'
            }
        },
        {
            path: '/teamList',
            name: 'teamList',
            component: teamList,
            meta: {
                title: '组队',
                back: '-1',
                rightTitle: '创建'
            }
        },
        {
            path: '/createTeam',
            name: 'createTeam',
            component: createTeam,
            meta: {
                title: '创建组队',
                back: '-1'
            }
        },
        {
            path: '/newsList',
            name: 'newsList',
            component: newsList,
            meta: {
                title: '资讯',
                back: '-1'
            }
        },
        {
            path: '/shareNews',
            name: 'shareNews',
            component: shareNews,
            meta: {
                title: '我来分享',
                back: '-1'
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
            path: '/articleShare',
            name: 'articleShare',
            component: articleShare,
            meta: {
                title: '分享',
                back: '-1'
            }
        },
        {
            path: '/articleList',
            name: 'articleList',
            component: articleList,
            meta: {
                title: '消息',
                back: '-1'
            }
        },
        {
            path: '/article/articleDetails/:id',
            name: 'articleDetails',
            component: articleDetails,
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
            path: '/businessProduct:id',
            name: 'businessProduct',
            component: businessProduct,
            meta: {
                title: '商圈产品',
                back: '-1'
            }
        },
        {
            path: '/businessDetail:id',
            name: 'businessDetail',
            component: businessDetail,
            meta: {
                title: '产品详情',
                back: '-1'
            }
        },
        //{
        //    path: '/businessCart',
        //    name: 'businessCart',
        //    component: businessCart,
        //    meta: {
        //        title: '加入购物车',
        //        back: 'businessDetail'
        //    }
        //},
        {
            path: '/businessSettlement',
            name: 'businessSettlement',
            component: businessSettlement,
            meta: {
                title: '购物车',
                back: '-1',
                rightTitle: '管理'
            }
        },
        {
            path: '/businessOrder',
            name: 'businessOrder',
            component: businessOrder,
            meta: {
                title: '订单支付',
                back: '-1'
            }
        },
        {
            path: '/orderPay',
            name: 'orderPay',
            component: orderPay,
            meta: {
                title: '订单支付',
                back: '-1'
            }
        },
        {
            path: '/businessAddress',
            name: 'businessAddress',
            component: businessAddress,
            meta: {
                title: '选择收货地址',
                back: 'leftBtnEvent'
            }
        },
        {
            path: '/businessAddressAdd',
            name: 'businessAddressAdd',
            component: businessAddressAdd,
            meta: {
                title: '新增收货地址',
                back: '-1'
            }
        },
        {
            path: '/club',
            name: 'club',
            component: club,
            meta: {
                title: '俱乐部',
                rightTitle: '创建',
            }
        },
        {
            path: '/videoRecorder',
            name: 'videoRecorder',
            component: videoRecorder,
            meta: {
                title: '',
                back: ''
            }
        },
        {
            path: '/createClub',
            name: 'createClub',
            component: createClub,
            meta: {
                title: '创建俱乐部',
                back: '-1',
            }
        },
        {
            path: '/createClubSuccess',
            name: 'createClubSuccess',
            component: createClubSuccess,
            meta: {
                title: '创建成功',
                back: '-1'
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
                title: '成员',
                back: '-1',
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
                back: '-1'
            }
        },
        {
            path: '/candyRecords',
            name: 'candyRecords',
            component: candyRecords,
            meta: {
                title: '糖果明细',
                back: '-1'
            }
        },
        {
            path: '/vipLevel',
            name: 'vipLevel',
            component: vipLevel,
            meta: {
                title: '会员等级',
                back: '-1'
            }
        },
        {
            path: '/basicInformation',
            name: 'basicInformation',
            component: basicInformation,
            meta: {
                title: '基本资料',
                back: '-1'
            }
        },
        {
            path: '/feedback',
            name: 'feedback',
            component: feedback,
            meta: {
                title: '提问',
                back: '-1'
            }
        },
        {
            path: '/editField',
            name: 'editField',
            component: editField,
            meta: {
                title: '设置',
                back: '-1',
                rightTitle: '完成'
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
                back: '-1'
            }
        },
        {
            path: '/contributionRecords',
            name: 'contributionRecords',
            component: contributionRecords,
            meta: {
                title: '贡献值明细',
                back: '-1'
            }
        },
        {
            path: '/verifiedForm',
            name: 'verifiedForm',
            component: verifiedForm,
            meta: {
                title: '实名认证',
                back: '-1'
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
                back: '-1'
            }
        },
        {
            path: '/identityInformation',
            name: 'identityInformation',
            component: identityInformation,
            meta: {
                title: '身份信息',
                back: '-1'
            }
        },
        {
            path: '/transaction',
            name: 'transaction',
            component: transaction,
            meta: {
                title: '我的交易',
                back: '-1'
            }
        },
        {
            path: '/transactionDetails/:id',
            name: 'transactionDetails',
            component: transactionDetails,
            meta: {
                title: '订单信息',
                back: '-1'
            }
        },
        {
            path: '/appeal:id',
            name: 'appeal',
            component: appeal,
            meta: {
                title: '申诉',
                back: '-1'
            }
        },
        {
            path: '/paySuccess',
            name: 'paySuccess',
            component: paySuccess,
            meta: {
                title: '支付成功',
                back: '-1'
            }
        },
        {
            path: '/orderCenter',
            name: 'orderCenter',
            component: orderCenter,
            meta: {
                title: '商圈订单',
                back: '-1'
            }
        },
        {
            path: '/orderDetails/:id',
            name: 'orderDetails',
            component: orderDetails,
            meta: {
                title: '订单详情',
                back: '-1'
            }
        },
        {
            path: '/logistics/:id',
            name: 'logistics',
            component: logistics,
            meta: {
                title: '物流信息',
                back: '-1'
            }
        },
        {
            path: '/addressInfo',
            name: 'addressInfo',
            component: addressInfo,
            meta: {
                title: '收货地址',
                back: '-1'
            }
        },
        {
            path: '/addressOperation',
            name: 'addressOperation',
            component: addressOperation,
            meta: {
                title: '收货地址管理',
                back: '-1'
            }
        },

        {
            path: '/userGuide',
            name: 'userGuide',
            component: userGuide,
            meta: {
                title: '新手指引',
                back: '-1'
            }
        },
        {
            path: '/myArticle',
            name: 'myArticle',
            component: myArticle,
            meta: {
                title: '我的文章',
                back: '-1',
                rightTitle:'我来分享',
                rightIcon:'woxiangfenxiang'
            }
        },
        {
            path: '/guide',
            name: 'guide',
            component: guide,
            meta: {
                title: '新手指引',
                back: '-1'
            }
        },
        {
            path: '/teamManage',
            name: 'teamManage',
            component: teamManage,
            meta: {
                title: '我的团队',
                back: '-1'
            }
        },
        {
            path: '/teamRecruitment',
            name: 'teamRecruitment',
            component: teamRecruitment,
            meta: {
                title: '团队招募',
                back: '-1'
            }
        },
        {
            path: '/activity',
            name: 'activity',
            component: activity,
            meta: {
                title: '活动',
                back: '-1'
            }
        },
        {
            path: '/task',
            name: 'task',
            component: task,
            meta: {
                title: '任务',
                back: '-1'
            }
        },
        {
            path: '/nearbyUser',
            name: 'nearbyUser',
            component: nearbyUser,
            meta: {
                title: '附近的人',
                back: '-1'
            }
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return {x: 0, y: 0}
    }
})
