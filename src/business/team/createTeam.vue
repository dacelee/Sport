<template>
    <div class="create-team">
        <l-head>
            <l-icon name="fanhui" @click.native="$router.push('teamList')" slot="left-item"/>
            创建组队
        </l-head>
        <div class="team-item mt-20">
            <div class="left-label pull-left">名称</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入队伍名称">
            </div>
        </div>
        <div class="team-item">
            <div class="left-label pull-left">地区</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入地区名称(xx市xx区)">
            </div>
        </div>
        <div class="team-item text-area">
            <div class="left-label pull-left">简介</div>
            <div class="right-input pull-left">
                <textarea placeholder="请输入队伍简介"></textarea>
            </div>
        </div>
        <div class="save-btn text-center">提交</div>
    </div>
</template>

<script>
    export default {
        name: 'create-team'
    }
</script>

<style lang="scss">
    .create-team {
        padding-bottom: 60px;
        .team-item {
            width: 750px;
            overflow: hidden;
            margin-bottom: 20px;
            background-color: #33333a;
            height: 90px;
            .left-label {
                width: 100px;
                font-size: 30px;
                line-height: 30px;
                margin: 30px 0 30px 30px;
            }
            .right-input {
                width: 590px;
                margin-top: 10px;
                input {
                    width: 590px;
                    height: 70px;
                    background-color: #25252B;
                    color: #ffffff;
                    padding: 0 20px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
            }
            &.text-area {
                height: inherit;
                padding: 0 0 100px 0;
                textarea {
                    width: 590px;
                    height: 400px;
                    background-color: #25252B;
                    color: #ffffff;
                    padding: 10px 20px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
            }
        }
        .save-btn {
            font-size: 34px;
            line-height: 34px;
            padding: 33px 0;
            background-color: #ffd554;
            color: #000;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 750px;
        }
        .mt-20 {
            margin-top: -20px;
        }
    }
</style>
