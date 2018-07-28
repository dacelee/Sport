<template>
    <div class="share-news">
        <div class="share-news-item">
            <div class="left-label pull-left">标题</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="请输入">
            </div>
        </div>
        <div class="share-news-item text-area">
            <div class="left-label pull-left">内容</div>
            <div class="right-input pull-left">
                <textarea placeholder="在此输入分享内容"></textarea>
            </div>
        </div>
        <div class="share-news-item">
            <div class="left-label pull-left">视频</div>
            <div class="right-input pull-left">
                <input type="text" placeholder="输入视频地址">
            </div>
        </div>
        <div class="select-pic text-center">
            <l-imageUpload :limit="4" :action="'http://api.bozhiyue.com/my/uploadimg'" :onSuccess="uploadPhotosSuccess"
                           :onRemove="removePhotos"/>
        </div>
        <div class="save-btn text-center" @click="submitData">分享</div>
    </div>
</template>

<script>
    export default {
        name: 'share-news',
        methods: {
            submitData() {
            
            }
        }
    }
</script>

<style lang="scss">
    .share-news {
        width: 100%;
        .share-news-item {
            width: 750px;
            overflow: hidden;
            margin-bottom: 0;
            background-color: #33333a;
            height: 90px;
            &:nth-child(1) {
                height: 130px;
                padding-top: 40px;
            }
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
        .select-pic {
            margin-bottom: 0;
            background-color: #33333a;
            padding: 30px 0 140px 30px;
        }
        .save-btn {
            font-size: 34px;
            line-height: 34px;
            padding: 33px 0;
            background-color: #F8C513;
            color: #000;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 750px;
        }
    }
</style>
