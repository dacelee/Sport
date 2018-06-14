<template>
    <header class="head-title text-center"  v-if="meta.title">
        <div class="content">
            <l-icon name="fanhui" @click.native="native" class="left-icons"  v-if="meta.back"/>
            {{ meta.title }}
            <div class="create"  v-if="meta.rightTitle" @click="myEvent">
               {{ meta.rightTitle }}
            </div>
            <div class="create"  v-else-if="meta.rightIcon" @click="myEvent">
                <l-icon class="right-icons"  @click="myEvent" :name="name" />
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
        },mounted(){
            if (this.meta.rightIcon) {
                this.name = this.meta.rightIcon;
            }
        },updated(){
            if (this.meta.rightIcon) {
                this.name = this.meta.rightIcon;
            }
        } , methods: {
            native:function(){
                this.$router.push(this.meta.back);
            },
            myEvent(){
                this.$emit('my-event')//触发父组件事件
            }
        }
    }
</script>

