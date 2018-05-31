<template>
    <svg class="icons" aria-hidden="true">
        <use :xlink:href="'#icon-'+name"></use>
    </svg>
</template>

<script>
    import '../assets/font'
    import '../assets/font-colorful'
    
    export default {
        name: 'icon',
        props: [ 'name' ]
    }
</script>

<style lang="scss">
    .icons {
        width: 1em;
        height: 1em;
        vertical-align: -0.1em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
