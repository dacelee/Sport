<template>
    <div class="clubTeams">
        <div class="search-area">
            <l-search placeholder="搜索" v-model="filterName"   @change="change"/>
        </div>
        <div class="club-list-container">
            <CheckboxGroup v-model="memberids" >
            <div class="club-list-item" v-for="item in list">
                <div class="left-img pull-left" >
                    <img :src="item.imgPath" alt="">
                </div>
                <div class="right-container pull-left">
                    <div class="left-basic-info text-white pull-left">
                        <div class="name">{{ item.name }}
                            <l-icon
                                :name="item.level === 1 ? 'chuangjianren' : ''"/>
                        </div>
                        <div class="club-num-info">
                       <div class="chengyuan-people pull-left"> 
                       <l-icon :name="item.chengyuanIcon" class="text-center"/></div>
                            <div class="people-count pull-left">会员等级:{{ item.rank }}</div>
                            <div class="activity-count pull-left">活跃度:{{ item.activity }}</div>
                            <div class="already pull-left">{{ item.already }}</div>
                        </div>
                    </div>
                   <div class="right-deletes text-center pull-right" v-if="delModel&&item.mgrid!=item.memberid">
                       <Checkbox :label="item.memberid"  v-if="delModel"><span></span></Checkbox>
                    </div>
                </div>
            </div>
           </CheckboxGroup>
            <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
                 <span slot="no-more">
                      暂无更多数据
                 </span>
            </infinite-loading>
        </div>
        
    </div>
</template>

<script>
    import club from '../../api/club.js'
    import InfiniteLoading from 'vue-infinite-loading';
    export default {
        name: 'clubTeams',
        components: {
            InfiniteLoading,
        },
        data() {
            return {
                page: 1,
                memberids:[],
                delModel:false,
                filterName: '',
                list: [
//                    {
//                        imgPath: 'static/img/club/1.jpg',
//                        name: '如果回忆会心痛',
//                        chengyuanIcon:'chengyuan-nv',
//                        rank: 12350,
//                        activity: 8987,
//                        already:'',
//                        level: 0,
//
//                    },
//                    {
//                        imgPath: 'static/img/club/2.jpg',
//                        name: '夜跑都市人',
//                        chengyuanIcon:'chengyuan-nv',
//                        rank: 4210,
//                        activity: 3511,
//                        already:'已组队',
//                        level: 1,
//
//                    },
//                    {
//                        imgPath: 'static/img/club/3.jpg',
//                        name: '酷跑狂人',
//                        chengyuanIcon:'chengyuan-nv',
//                        rank: 147,
//                        activity: 131,
//                        already:'已组队',
//                        level: 2,
//
//                    },
//                    {
//                        imgPath: 'static/img/club/4.jpg',
//                        name: '减肥跑步俱乐部',
//                        chengyuanIcon:'chengyuan-nan',
//                        rank: 312,
//                        activity: 224,
//                        already:'',
//                        level: 3,
//                    }
                ]
            }
        },

        methods: {
            change(){
                this.page = 1;
                var clubid = this.$route.query.id;
                club.loadMemberList(this,clubid,this.filterName);
            },
            editEvent(){
                if(this.delModel){
                    if (this.memberids.length == 0) {
                        this.delModel = false;
                        this.$emit('changeRightTitle', "管理");
                        return;
                    }
                    var clubid = this.$route.query.id;
                    club.delMemberAction(this,clubid,this.memberids.toString());
                }else{
                    this.delModel = true;
                    this.$emit('changeRightTitle',"删除");
                }
            },
            init(){
                this.filterName = "";
                this.page = 1;
                this.delModel = false;
                this.list = [];
                this.memberids = [];
            },
            infiniteHandler($state) {
                var clubid = this.$route.query.id;
                club.loadMemberList(this,clubid,this.filterName,$state);
            }
        },
        mounted() {
            this.page = 1
            this.scrollHeight = $(window).height() - $('header').outerHeight(true) - $('.search-area').outerHeight(true)
            $(".club-list-container").height(this.scrollHeight);
        },
        activated() {
            this.init();
            this.$nextTick(function() {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            });
        }
    }
</script>

<style lang="scss">
    .clubTeams {
        .head-title {
            height: 80px;
            line-height: 80px;
            font-size: 34px;
            background: #404049;
            position: relative;
            .btn {
                position: absolute;
                height: 30px;
                line-height: 30px;
                font-size: 30px;
                z-index: 2;
                top: 25px;
                right: 30px;
            }
        }
        .search-area {
            margin: 20px auto;
        }
        .club-list-container {
            width: calc(100% - 60px);
            margin: 0 auto;
           overflow-y:scroll;
            .club-list-item {
                width: 100%;
                height: 159px;
                background: #333339;
                margin: 0 auto 20px;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
                padding: 30px 25px 30px 30px;
                .left-img {
                    width: 100px;
                    height: 100px;
                    img {
                        width: 100px;
                        height: 100px;
                        -webkit-border-radius: 100%;
                        -moz-border-radius: 100%;
                        border-radius: 100%;
                    }
                }
                .right-container {
                    margin-left: 20px;
                    width: calc(100% - 160px);
                    .left-basic-info {
                        
                        .name {
                            font-size: 32px;
                            line-height: 32px;
                            margin-top: 12px;
                            .icons {
                                width: 100px;
                                height: 32px;
                                margin-left: 10px;
                            }
                        }
                        .club-num-info {
                            font-size: 24px;
                            line-height: 24px;
                            color: #999999;
                            margin-top: 20px;
                            .activity-count {
                                margin-left: 30px;
                            }
                            .chengyuan-people{margin-right:30px;}
                            .already{margin-left: 40px;color:#F8C513}
                        }
                    }
                    .right-deletes {
                        position:absolute;
                        right:10%;
                        width: 40px;
                        margin-left: 0;
                        .icons {
                            width: 30px;
                            height: 30px;
                            color: #ffffff;
                            margin-top: 36px;
                        }
                        
                    }
                }
            }
        }
    }
</style>
