<template>
    <div class="step-details">
        <div class="menu-step-way">
            <l-shortMenu :currentRoute="currentMenu" :list="menuList" @change="changeTabs"/>
        </div>
        <div class="step-detail">
            <component :is="currentMenu"/>
        </div>
        <div class="track-share-container" @click="showShareList = false" v-if="showShareList">
            <div class="track-share">
                <div v-for="item in shareList" class="track-share-item text-center">
                    <l-icon :name="item.icon"/>
                    <div class="share-label">{{ item.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import stepStatistics from './stepStatistics'
    import trackMotion from './trackMotion'
    
    export default {
        name: 'step-details',
        components: {
            stepStatistics,
            trackMotion
        },
        data() {
            return {
                currentMenu: 'stepStatistics',
                menuList: [
                    {
                        id: 'stepStatistics',
                        name: '步数统计'
                    },
                    {
                        id: 'trackMotion',
                        name: '运动轨迹'
                    }
                ],
                showShareList: false,
                shareList: [
                    {
                        icon: 'weixin',
                        name: '微信'
                    },
                    {
                        icon: 'pengyouquan',
                        name: '朋友圈'
                    },
                    {
                        icon: 'QQ',
                        name: 'QQ'
                    },
                    {
                        icon: 'weibo',
                        name: '微博'
                    }
                ]
            }
        },
        methods: {
            changeTabs(res) {
                this.currentMenu = res;
            },
            backToHome() {
                this.$router.push('/')
            },
            editEvent() {
                this.showShareList = true
            }
        }
    }
</script>

<style lang="scss">
    .step-details {
        .menu-step-way {
            margin-top: 20px;
        }
        .track-share-container {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            .track-share {
                position: fixed;
                display: flex;
                flex-wrap: nowrap;
                bottom: 0;
                left: 0;
                width: 750px;
                z-index: 3;
                background-color: #33333a;
                justify-content: space-between;
                padding: 80px 80px;
                .track-share-item {
                    width: 100px;
                    .icons {
                        width: 100px;
                        height: 100px;
                    }
                    .share-label {
                        color: #ffd554;
                        margin-top: 20px;
                        font-size: 30px;
                        line-height: 30px;
                    }
                }
            }
        }
    }
</style>
