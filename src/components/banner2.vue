
<template>
    <div class="banner">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(slide, index) in list" :key="index" >  <img :src="slide.logo" @click="showDetail(slide.id)"></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
    import { swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'
    export default {
        name: 'banner',
        components: {
            swiper,
            swiperSlide
        },
        props: {
            action:{
                type:String,
                default:"/msg/flash"
            },
        },
        data() {
            return {
                swiperOption: {
                    init: false,
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },

                    // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
                    speed: 400,
//                    on: {
//                        click: function () {
//                            console.log(this.activeIndex);
//                        }
//                    },

                },
                list: [],
            }
        },
        mounted() {
            this.getBannerData()
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        methods: {
            getBannerData() {
                var _this = this;
//                _this.list = [ 'static/img/home/head.png', 'static/img/home/head2.png', 'static/img/home/head.png' ]
//                _this.swiperOption.loopedSlides =  _this.list.length;
//                this.swiper.init();
                this.axios.post(this.action, {'topN': 3}, function (json) {
                    var flash = json.dataList;
                    _this.list = [];
                    $(flash).each(function (index, item) {
                        _this.list.push(item);
                    })
                    _this.swiper.init();
//
                })
            },
            showDetail(id){
               this.$router.push({name: 'articleDetails', params: {id: id}})
            }

        }
    }
</script>

<style lang="scss">
    .banner {
        width: 10rem;
        height: 5rem;
        position: relative;
        overflow: hidden;
        margin: 0 auto;
        .swiper-slide{height: 5rem;img{height: 100%;width: 100%}}
        .banner-images {
            width: 999999999rem;
            position: relative;
            height: 5rem;
            .banner-images-list {
                height: 3.9rem;
                width: 9.5rem;
                margin: 0 0.25rem;
                img {
                    width: 9.5rem;
                    height: 5rem;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
            }
        }
        .banner-num {
            position: absolute;
            bottom: 20px;
            left: 0;
            font-size: 0;
            width: 10rem;
            text-align: center;
            li {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #8f8f89;
                margin: 0 4px;
                display: inline-block;
                &.on {
                    background: #3673ff;
                }
            }
        }
    }
</style>
