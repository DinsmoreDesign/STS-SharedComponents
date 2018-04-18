<template>

    <div>
        <div :class="tabStyles">
            <ul>
                <li v-for="(title, index) in titles" :class="{ 'is-active':	title.isActive }" :key="index">
                    <a @click="openTab(index)">{{ title.name }}</a>
                </li>
            </ul>
        </div>
        <div class="container">
            <transition name="slide-fade" mode="out-in">
                <div v-for="(title, index) in titles" v-if="title.isActive" :key="index">
                    <slot :name="title.name"></slot>
                </div>
            </transition>
        </div>
    </div>

</template>




<script>

    export default {
        data() {
            return {
                tabStyles: {
                    'tabs':				true,
                    'is-centered':		this.position		===		'center'		||
                                        this.position		===		'centered'		||
                                        this.position		===		'middle',
                    'is-right':			this.position		===		'right',
                    'is-small':			this.size			===		'small',
                    'is-medium':		this.size			===		'medium',
                    'is-large':			this.size			===		'large',
                    'is-boxed':			this.type			===		'boxed',
                    'is-toggle':		this.type			===		'toggle',
                    'is-fullwidth':		this.fullwidth		===		true
                }
            }
        },
        props: {
            titles: {
                type: Array,
                required: true
            },
            position: {
                type: String,
                required: false,
                validator(value) {
                    // Build accepted positions
                    var validPositions = [
                        '',
                        'left',
                        'center',
                        'centered',
                        'middle',
                        'right'
                    ]
                    // If no valid position, throw console error:
                    if ( validPositions.indexOf(value) === -1 ) {
                        console.error('[STSTabs] Error "' + value + '" is not an acceptable position value.\n\n Please specify one of the following, or do not include the prop in your template:\n\n' + JSON.stringify(validPositions, null, 4))
                        return false;
                    }
                    return true;
                }
            },
            size: {
                type: String,
                required: false,
                validator(value) {
                    // Build accepted sizes
                    var validSizes = [
                        '',
                        'default',
                        'small',
                        'medium',
                        'large'
                    ]
                    // If no valid size, throw console error:
                    if ( validSizes.indexOf(value) === -1 ) {
                        console.error('[STSTabs] Error "' + value + '" is not an acceptable size value.\n\n Please specify one of the following, or do not include the prop in your template:\n\n' + JSON.stringify(validSizes, null, 4))
                        return false;
                    }
                    return true;
                }
            },
            type: {
                type: String,
                required: false,
                validator(value) {
                    // Build accepted types
                    var validTypes = [
                        '',
                        'default',
                        'boxed',
                        'toggle'
                    ]
                    // If no valid type, throw console error:
                    if ( validTypes.indexOf(value) === -1 ) {
                        console.error('[STSTabs] Error "' + value + '" is not an acceptable type value.\n\n Please specify one of the following, or do not include the prop in your template:\n\n' + JSON.stringify(validTypes, null, 4))
                        return false;
                    }
                    return true;
                }
            },
            fullwidth: {
                type: Boolean,
                required: false
            }
        },
        methods: {
            openTab(index) {
                // Set all active states to false
                this.titles.some(function (title) {
                    if (title.isActive !== false) {
                        title.isActive = false;
                    }
                });
                // Then, set only the clicked tab to true and emit event so we can run events on our parent, if necessary
                this.titles[index].isActive = true;
                this.$emit('change-tab', index);
            }
        }
    }

</script>




<style lang="scss" scoped>



</style>