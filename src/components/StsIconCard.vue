<template>

    <a :href="url" target="_blank">
        <div class="columns is-mobile level is-gapless horiz-card">
            <div class="column is-narrow">
                <span class="icon is-large">
                    <i v-if="icon" :class="'fa ' + [icon]" aria-hidden="true"></i>
                    <i v-else class="fa icon-sts" aria-hidden="true"></i>
                </span>
            </div>
            <div class="column">
                <h5 class="title is-5 has-text-centered">{{ name }}</h5>
            </div>
        </div>
    </a>

</template>




<script>

    export default {
        props: {
            name: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: false
            }
        }
    }

</script>




<style lang="scss" scoped>

    .columns.is-mobile.horiz-card > .column {
        padding: 0.75rem !important;
    }

    .icon.is-large i {
        font-size: 3rem;
    }

</style>