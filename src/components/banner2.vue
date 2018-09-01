
<template>
    <div class="banner">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(slide, index) in list" :key="index" >
                <img :src="slide.logo" @click="showDetail(slide.id)">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
    import { swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'
    import citys from '../api/citys.js'
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
        activated() {
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
                if( this.list.length!=0){
                    return;
                }
                if(this.action=="/msg/flash"){
                    _this.axios.post(_this.action, {
                        'topN': 3,
                    }, function (json) {
                        var flash = json.dataList;
                        _this.list = [];
                        $(flash).each(function (index, item) {
                            _this.list.push(item);
                        })
                        _this.swiper.init();
                    }, function (json) {
                        _this.$Message.error(json.msg)
                    });
                    setTimeout(function(){
                        citys.bulidJSONCity(function (json) {
                            if (json.code == 1) {
                                _this.amap.getLocation(_this, function (ret) {
                                    if (!ret.status) {
//                                        _this.$Message.error("定位失败");
                                        return;
                                    }
                                    var dbData = citys.locationToDBData(_this, ret);
                                    if (dbData != null) {
                                        _this.axios.post(_this.action, {
                                            'topN': 3,
                                            cityid: dbData.cityid
                                        }, function (json) {
                                            var flash = json.dataList;
                                            _this.list = [];
                                            $(flash).each(function (index, item) {
                                                _this.list.push(item);
                                            })
                                            _this.swiper.init();
                                            _this.editmemberposition(dbData,ret.lon,ret.lat);
                                        }, function (json) {
                                            _this.$Message.error(json.msg)
                                        })
                                    }
                                }, true)
                            }
                        });
                    },1300);
                }else{
                    this.axios.post(this.action, {'topN': 3}, function (json) {
                        var flash = json.dataList;
                        _this.list = [];
                        $(flash).each(function (index, item) {
                            _this.list.push(item);
                        })
                        _this.swiper.init();
                    },function(json){
                        _this.$Message.error(json.msg)
                    })
                }

            },
            showDetail(id){
               this.$router.push({name: 'guide', params: {id: id}})
            },
            editmemberposition(dbData,lon,lat){
                var _this = this;
                _this.axios.post("/member/editmemberposition", {
                    'reg_x': lat,
                    'reg_y': lon,
                    'reg_proid':dbData.proid,
                    'reg_cityid': dbData.cityid,
                    'reg_areaid':dbData.areaid
                }, function (json) {

                }, function (json) {
                })
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
