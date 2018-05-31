<template>
    <div class="banner">
        <ul class="banner-images">
            <li class="banner-images-list pull-left" v-for="item in list" :title="item.bannerName">
                <img :src="item">
            </li>
        </ul>
        <ul class="banner-num">
        </ul>
    </div>
</template>

<script>
    let t, _this, promise, promiseService, width, height
    export default {
        name: 'banner',
        data() {
            return {
                list: [],
                currentNum: 0,
                imgBaseUrl: ''
            }
        },
        mounted() {
            if (t) {
                clearInterval(t)
            }
            this.getBannerData()
        },
        methods: {
            getBannerData() {
                _this = this
                _this.list = [ 'static/img/home/head.png', 'static/img/home/head.png', 'static/img/home/head.png' ]
                setTimeout(function () {
                    _this.setBannerInfo()
                }, 50)
            },
            setBannerInfo() {
                let _this = this
                // 设置小圆点
                for (let i = 0; i < _this.list.length; i++) {
                    $('.banner .banner-num').append('<li></li>')
                }
                setTimeout(function () {
                    $('.banner .banner-num li').eq(0).addClass('on')
                }, 10)
                t = setInterval(function () {
                    _this.currentNum++
                    _this.setBannerMoving()
                }, 3500)
            },
            /**
             * @description Banner图动起来
             */
            setBannerMoving() {
                let _this = this
                if (_this.currentNum === _this.list.length) {
                    _this.currentNum = 0
                }
                $('.banner .banner-images').stop().animate({left: -_this.currentNum * 10 + 'rem'}, 500)
                $(this).stop().addClass('on').siblings().removeClass('on')
                $('.banner .banner-num li').eq(_this.currentNum).addClass('on').siblings().removeClass('on')
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
