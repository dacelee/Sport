<template>
    <div class="createClubSuccess">
        <l-head>
            <l-icon name="fanhui" @click.native="$router.push('club')" slot="left-item"/>
            创建成功
        </l-head>
       <div class='createClubSuccess-top'>
           <l-icon name="camera" class="text-center"/>
           <div class="text-center">恭喜，俱乐部创建成功</div>
       </div>
       <div class=''>
       <div class="select-upload-label text-center">您可以对俱乐部进行实体店认证 认证后可以享受更多权益</div>
        <div class="save-btn text-center">实体店认证</div>
        </div>
    </div>
</template> 

<script>
    export default {
        name: 'createClubSuccess'
    }
</script>

<style lang="scss">
.createClubSuccess{
    .createClubSuccess-top{
        margin:120px auto 30px;
        font-size:17px;
    }
}
</style>