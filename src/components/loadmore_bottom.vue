<template>
     <div class="load-more">
        <div  class="load-more-start" v-if="bottomStatus=='wait'">
            <Icon type="ios-loading" size=18 class="loadmore-spin-icon-load"></Icon>
            <div class="more-loading-text">数据加载中</div>
        </div>
        <div  class="load-more-loading" v-if="bottomStatus=='loading'">
            <Icon type="ios-loading" size=18 class="loadmore-spin-icon-load"></Icon>
            <div class="more-loading-text">加载中</div>
        </div>
        <div  class="load-more-nodata" v-if="bottomStatus=='nodata'" >暂无更多数据</div>
    </div>
</template>
<script>
    export default {
        name: 'loadmore_bottom',
        props: {
            bottomStatus:{
                type:String,
                default:'wait'
            }
        }
    }
</script>

<style lang="scss">
    .load-more {
        .load-more-start, .load-more-loading, .load-more-nodata {
            font-size: 26px;
            color: #7D7D7D;
            text-align: center;
            padding: 20px 0px;
        }

        .loadmore-spin-icon-load {
            animation: ani-demo-spin 1s linear infinite;
        }

        .load-more-start, .load-more-loading {
            color: #2d8cf0;
        }
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>
