<template>

    <div class="card">
        <div class="card-image" v-if="image && !image.footer">
            <figure :class="imageStyles">
                <img :src="image.src" :alt="image.alt">
            </figure>
        </div>
        <header class="card-header">
            <a v-if="canCollapse" class="card-header-icon" style="width:100%" aria-label="more options" @click="collapsed = !collapsed">
                <p class="card-header-title" style="padding:0">
                    {{ title }}
                </p>
                <span class="icon">
                    <i class="fa fa-angle-down" aria-hidden="true" v-if="!collapsed"></i>
                    <i class="fa fa-angle-up" aria-hidden="true" v-else></i>
                </span>
            </a>
            <p v-else class="card-header-title">
                {{ title }}
            </p>
        </header>
        <transition name="fade" mode="out-in">
            <div v-if="!collapsed">
                <div class="card-image" v-if="image && image.footer">
                    <figure :class="imageStyles">
                        <img :src="image.src" :alt="image.alt">
                    </figure>
                </div>
                <div class="card-content" v-if="$slots.default">
                    <div class="content">
                        <slot></slot>
                    </div>
                </div>
                <footer class="card-footer" v-if="footerItems">
                    <span v-for="(item, index) in footerItems" :key="index">
                        <a v-if="item.url" :href="item.url" :title="item.title" target="_blank" class="card-footer-item">
                            {{ item.title }}
                        </a>
                        <div v-else class="card-footer-item" v-html="item.title || item"></div>
                    </span>
                </footer>
            </div>
        </transition>
    </div>

</template>




<script>

    export default {
        data() {
            return {
                collapsed: false,
                imageStyles: {
                    'image':		true,
                    'is-1by1':		this.imageRatio	===		'1x1',
                    'is-4by3':		this.imageRatio	===		'4x3',
                    'is-3by2':		this.imageRatio	===		'3x2',
                    'is-16by9':		this.imageRatio	===		'16x9',
                    'is-2by1':		this.imageRatio	===		'2x1'
                }
            }
        },
        props: {
            image: {
                type: Object,
                required: false,
                validator(value) {
                    // Set error variable to toggle
                    var errors = false;
                    // If no src or alt properties, throw an error:
                    if ( !value.src ) {
                        console.error('[STSCard] Error: Image does not specify a valid src property.')
                        errors = true;
                    }
                    if ( !value.alt ) {
                        console.error('[STSCard] Error: Image does not specify a valid alt property.')
                        errors = true;
                    }
                    // If footer property exists and it's not true or false, throw an error:
                    if ( value.footer && typeof value.footer !== "boolean" ) {
                        console.error('[STSCard] Error: Image footer must return a boolean value.')
                        errors = true;
                    }
                    // If errors is set to true, show Vue error, else show nothing
                    if (errors) {
                        return false;
                    }
                    return true;
                }
            },
            imageRatio: {
                type: String,
                required: false,
                default: null,
                validator(value) {
                    // Build valid ratio styles array
                    var ratioStyles = [
                        '1x1',
                        '4x3',
                        '3x2',
                        '16x9',
                        '2x1'	
                    ]
                    // If the card has an imageRatio and it's not listed in the array above, throw an error
                    if ( value && ratioStyles.indexOf(value) === -1 ) {
                        console.error('[STSCard] Error: Image ratio "' + value + '" is not an acceptable value.\n\n Please specify one of the following:\n\n' + JSON.stringify(ratioStyles, null, 4));
                        return false;
                    }
                    return true;
                }
            },
            title: {
                type: String,
                required: true
            },
            footerItems: {
                type: Array,
                required: false
            },
            canCollapse: {
                type: Boolean,
                required: false,
                default: true
            },
            isCollapsed: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        created() {
            // Set collapsed to true if it exists in the prop (we have to set these as separate data sources so we don't mutate the prop directly)
            if (this.isCollapsed === true) {
                this.collapsed = true
            }
        }
    }

</script>




<style lang="scss">

    .horiz-card {

		&:hover {
			opacity: 0.7;
		}

		.icon {
			color: #FFF;
		}

	}

	.columns.is-mobile.horiz-card > .column {
		padding: 0.75rem;
	}

</style>