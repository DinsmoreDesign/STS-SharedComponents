<template>

    <a :href="url" :class="{ 'navbar-item': true, 'is-active': isActive }" :title="description">
        <span>{{ name }}</span>
    </a>

</template>




<script>

    export default {
        props: {
            url: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            isActive: {
                type: Boolean,
                required: false,
                default: false
            }
        }
    }

</script>




<style lang="scss" scoped>



</style>