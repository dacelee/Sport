<template>
    <div class="share-container">
        <div class="share-list-item" v-for="item in list">
            <div class="news-left-img pull-left">
                <img :src="item.imgPath" alt="">
            </div>
            <div class="news-right-container pull-left" @click="toDetails(item)">
                <div class="title">{{ item.name }}</div>
                <div class="description">{{ item.description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'news-list',
        data() {
            return {
                list: [
                    {
                        id: 1,
                        name: '跑步后膝盖疼怎么恢复',
                        imgPath: 'static/img/news/1.jpg',
                        description: '跑步后膝盖疼怎么恢复?不规范的跑步姿势以及过度的跑步强度都可能引发膝盖疼。针对跑步膝盖疼的不同原因，小编整理了跑完步膝盖疼的恢复和缓解方案，对于许多喜欢跑步的朋友来说，知道这些预防和缓解跑步膝盖疼的方法是很有好处的。'
                    },
                    {
                        id: 2,
                        name: '跑步岔气怎么办 跑步时的注意事项',
                        imgPath: 'static/img/news/2.jpg',
                        description: '很多人都有跑步的习惯，但是在跑步的时候很多人都会出现腹部突然疼痛的情况，也就是岔气。那跑步岔气应该怎么办呢？怎样做才能防止跑步岔气？'
                    },
                    {
                        id: 3,
                        name: '跑步后膝盖疼怎么恢复',
                        imgPath: 'static/img/news/1.jpg',
                        description: '跑步后膝盖疼怎么恢复?不规范的跑步姿势以及过度的跑步强度都可能引发膝盖疼。针对跑步膝盖疼的不同原因，小编整理了跑完步膝盖疼的恢复和缓解方案，对于许多喜欢跑步的朋友来说，知道这些预防和缓解跑步膝盖疼的方法是很有好处的。'
                    },
                    {
                        id: 4,
                        name: '跑步岔气怎么办 跑步时的注意事项',
                        imgPath: 'static/img/news/2.jpg',
                        description: '很多人都有跑步的习惯，但是在跑步的时候很多人都会出现腹部突然疼痛的情况，也就是岔气。那跑步岔气应该怎么办呢？怎样做才能防止跑步岔气？'
                    },
                    {
                        id: 5,
                        name: '跑步后膝盖疼怎么恢复',
                        imgPath: 'static/img/news/1.jpg',
                        description: '跑步后膝盖疼怎么恢复?不规范的跑步姿势以及过度的跑步强度都可能引发膝盖疼。针对跑步膝盖疼的不同原因，小编整理了跑完步膝盖疼的恢复和缓解方案，对于许多喜欢跑步的朋友来说，知道这些预防和缓解跑步膝盖疼的方法是很有好处的。'
                    },
                    {
                        id: 6,
                        name: '跑步岔气怎么办 跑步时的注意事项',
                        imgPath: 'static/img/news/2.jpg',
                        description: '很多人都有跑步的习惯，但是在跑步的时候很多人都会出现腹部突然疼痛的情况，也就是岔气。那跑步岔气应该怎么办呢？怎样做才能防止跑步岔气？'
                    },
                    {
                        id: 7,
                        name: '跑步后膝盖疼怎么恢复',
                        imgPath: 'static/img/news/1.jpg',
                        description: '跑步后膝盖疼怎么恢复?不规范的跑步姿势以及过度的跑步强度都可能引发膝盖疼。针对跑步膝盖疼的不同原因，小编整理了跑完步膝盖疼的恢复和缓解方案，对于许多喜欢跑步的朋友来说，知道这些预防和缓解跑步膝盖疼的方法是很有好处的。'
                    },
                    {
                        id: 8,
                        name: '跑步岔气怎么办 跑步时的注意事项',
                        imgPath: 'static/img/news/2.jpg',
                        description: '很多人都有跑步的习惯，但是在跑步的时候很多人都会出现腹部突然疼痛的情况，也就是岔气。那跑步岔气应该怎么办呢？怎样做才能防止跑步岔气？'
                    }
                ]
            }
        },
        methods: {
            toDetails(item) {
                let _this = this
                _this.$router.push({name: 'newsDetails', params: {id: item.id}})
            }
        }
    }
</script>

<style lang="scss">
    .share-container {
        height: 100%;
        background-color: #ffffff;
        padding-bottom: 0 !important;
        .share-list-item {
            width: 690px;
            height: 180px;
            border-bottom: 2px solid #999999;
            margin: 0 auto;
            padding: 10px 0;
            overflow: hidden;
            .news-left-img {
                width: 160px;
                height: 160px;
                margin: 0 10px 0 0;
                img {
                    width: 160px;
                    height: 160px;
                }
            }
            .news-right-container {
                width: 510px;
                height: 160px;
                .title {
                    font-size: 40px;
                    line-height: 40px;
                    height: 40px;
                    overflow: hidden;
                    word-wrap: normal;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: #000000;
                }
                .description {
                    font-size: 26px;
                    line-height: 36px;
                    height: 110px;
                    margin-top: 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-wrap: normal;
                    color: #666666;
                }
            }
        }
        .share-list-item:nth-last-child(1) {
            border-bottom: none;
        }
    }
</style>
