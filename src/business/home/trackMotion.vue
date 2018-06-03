<template>
    <div class="track-motion">
        <div class="track-motion">
            <img src="static/img/home/map.png" alt="">
        </div>
        <div class="step-num-info text-center">
            <ul>
                <li>
                    <div class="step-label">总步数</div>
                    <div class="step-num">{{ totalStep }}</div>
                </li>
                <li>
                    <div class="step-label">消耗卡路里</div>
                    <div class="step-num">{{ calories }}</div>
                </li>
                <li>
                    <div class="step-label">总公里</div>
                    <div class="step-num">{{ mileage }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'track-motion',
        data() {
            return {
                totalStep: 132,
                calories: 3123,
                mileage: 423
            }
        }
    }
</script>

<style lang="scss">
    .track-motion {
        .track-motion {
            width: 690px;
            margin: 20px auto 0;
            img {
                width: 690px;
            }
        }
        .step-num-info {
            position: fixed;
            bottom: 20px;
            left: 30px;
            width: 690px;
            height: 200px;
            padding: 50px 90px 50px;
            display: flex;
            justify-content: space-between;
            background-color: #33333a;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            li {
                width: 160px;
                display: inline-block;
                .step-label {
                    font-size: 30px;
                    line-height: 30px;
                    color: #999999;
                }
                .step-num {
                    font-size: 48px;
                    line-height: 48px;
                    margin-top: 20px;
                }
            }
        }
    }
</style>
