<template>
    <div class="nearby-team">
        <div class="nearby-team-item" v-for="item in list">
            <div class="nearby-name">{{ item.name }}</div>
            <div class="nearby-info pull-left">
                <div class="nearby-address">
                    <l-icon name="juli"/>
                    {{ item.address }}
                </div>
                <div class="nearby-personal">
                    <l-icon name="zudui"/>
                    {{ item.personalCount }}
                </div>
            </div>
            <div class="nearby-join pull-left">加入</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'nearby-team',
        data() {
            return {
                list: [
                    {
                        name: '一起去跑步',
                        address: '长沙市岳麓区',
                        personalCount: 15
                    },
                    {
                        name: '减肥俱乐部',
                        address: '长沙市天心区',
                        personalCount: 24
                    }
                ]
            }
        }
    }
</script>

<style lang="scss">
    .nearby-team {
        width: 690px;
        margin: 0 auto;
        .nearby-team-item {
            margin-top: 20px;
            height: 190px;
            background-color: #33333a;
            padding: 30px 30px 30px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            .nearby-name {
                font-size: 32px;
                line-height: 32px;
                margin-bottom: 10px;
            }
            .nearby-info {
                width: 500px;
                .nearby-address {
                    margin-top: 15px;
                    font-size: 24px;
                    line-height: 24px;
                    margin-bottom: 10px;
                }
            }
            .nearby-join {
                width: 80px;
                height: 80px;
                border: 2px solid #ffd554;
                -webkit-border-radius: 100%;
                -moz-border-radius: 100%;
                border-radius: 100%;
                line-height: 80px;
                text-align: center;
            }
        }
    }
</style>
