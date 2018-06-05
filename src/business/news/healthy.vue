<template>
    <div class="healthy-container">
        <div class="healthy-list-item" v-for="item in list">
            <div class="news-left-img">
                <img :src="item.imgPath" alt="">
            </div>
            <div class="news-right-container">
                <div class="title">{{ item.name }}</div>
                <div class="description">{{ item.description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'news-list',
        data() {
            return {
                list: []
            }
        }
    }
</script>

<style scoped>

</style>
