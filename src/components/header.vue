<template>
    <header class="head-title text-center"  v-if="meta.title">
        <div class="content">
            <l-icon name="fanhui" @click.native="native" class="left-icons"  v-if="meta.back"/>
            {{ meta.title }}
            <div class="create"  v-if="meta.rightTitle" @click="myEvent">
                {{ meta.rightTitle }}
            </div>
            <div class="create"  v-else-if="meta.rightIcon" @click="myEvent">
                <l-icon class="right-icons"  @click="myEvent" :name="meta.rightIcon" />
            </div>
        </div>
    </header>
</template>
<script>
    export default {
        props: {
            meta:{
                type: Object
            }
        },

        data() {
            return {
                name:""
            };
        },
        mounted() {
        },
        methods: {
            native:function(){
                if(this.meta.back==="leftBtnEvent"){
                    this.$emit('leftBtnEvent')
                }else if(this.meta.back==="-1"){
                    this.$router.go(-1);
                }else{
                    this.$router.push(this.meta.back);
                }

            },
            myEvent(){
                this.$emit('rightBtnEvent')//触发父组件事件
            },

        }
    }
</script>

