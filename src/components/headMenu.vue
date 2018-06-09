<template>
    <div class="header-menu">
        <div class="header-title">
            <div class="title-icons left-icons">
                <slot name="left-item"/>
            </div>
            <div class="text-center">
                <slot/>
            </div>
            <div class="title-icons right-icons">
                <slot name="right-item"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'header-menu'
    }
</script>

<style lang="scss">
    .header-menu {
        .header-title {
            height: 80px;
            line-height: 80px;
            font-size: 34px;
            background: #404049;
            position: relative;
            .title-icons {
                position: absolute;
                z-index: 2;
                top: 25px;
                width: inherit;
                height: 30px;
                line-height: 30px;
                min-width: 30px;
                &.right-icons {
                    right: 20px;
                    .icons {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 30px;
                        height: 30px;
                    }
                }
                &.left-icons {
                    left: 20px;
                    .icons {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 30px;
                        height: 30px;
                    }
                }
            }
        }
    }
</style>
