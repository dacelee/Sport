<template>
    <div class="edit-nick">
        <input id="text" type="text" placeholder="请输入" v-model="val" v-verify="val">
    </div>
</template>
<script>
    import users from '../../api/users.js'
    export default {
        name: 'edit-nick',
        data(){
            return {
                val:""
            }
        },
        verify: {
            val: [{minLength: 1, message: "必须填写"}],
        },
        activated:function(){
            var name = this.$route.query.name;
            var val = this.$route.query.val;
            this.name = name;
            this.val = val;
            $("#text").attr("placeholder","请输入"+name);
            this.$route.meta.title  = "设置"+name;
        },
        methods: {
            editEvent() {
                if (!this.$verify.check()) {
                    var errMsg = this.appUtil.toastRemind(this.$verify.verifyQueue, this.$verify.$errors);
                    this.$Message.error(this.name+errMsg);
                } else {
                    var base = this.$route.query.base;
                    users.editInfo(this, base, this.val);
                }
            }
        }
    }
</script>

<style lang="scss">
    .edit-nick {
        input {
            width: 100%;
            font-size: 30px;
            line-height: 30px;
            padding: 30px 30px 30px;
            color: #ffffff;
            background-color: #333339;
            margin-top: 20px;
            height: inherit;
        }
    }
</style>
