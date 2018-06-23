<template>
    <div class="clubCertificationSuccess">
        <div class='createClubSuccess-top'>
            <l-icon name="chenggong" class="text-center"/>
            <div class="label text-center">提交成功</div>
        </div>
        <div class='createClubSuccessM'>
            <div class="select-upload-label text-center">您的俱乐部实体认证资料已提交 我们工作人员会尽快审核</div>

        </div>
    </div>
</template>

<script>
    let _this
    export default {
        name: 'clubCertificationSuccess',
        methods: {
            reset() {
                console.log(this.filterName)
            },
        },
        mounted() {
            _this = this
        }
    }
</script>

<style lang="scss">
    .clubCertificationSuccess{
    .createClubSuccess-top{
        margin:120px auto 30px;
        font-size:34px;
    .icons{
        display: flex;
        justify-content:center;
        align-items:Center;
        width:100px;
        height:100px;
        margin:300px auto 30px;
    }
    }
    .createClubSuccessM{
        margin:100px auto 30px;
    .select-upload-label{
        width:400px;
        margin:0 auto ;
        font-size:28px;
        line-height:45px;
        color:#999;
    }
    .save-btn{
        width:400px;
        height:90px;
        color:#FF25252B;
        background-color: #F8C513;
        color: #000;
        font-size: 34px;
        display: flex;
        justify-content:center;
        align-items:Center;
        margin:50px auto 0;
        border-radius:50px;
    }
    }
    }
</style>