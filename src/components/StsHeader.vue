<template>

    <section :class="headerStyles" :style="{ background: bgStyle }" style="position:relative;">
        <div :class="overlayStyles">

            <div class="hero-head" v-if="$slots.header">
                <slot name="header"></slot>
            </div>

            <div class="hero-body">
                <div :class="{ 'container': true, 'has-text-centered': titleCentered }">
                    <div class="columns" v-if="title || subtitle">
                        <div class="column is-10 is-offset-1">
                            <h1 v-if="title" :class="[ titleStyles, headerColor ]">
                                {{ title }}
                            </h1>
                            <h2 v-if="subtitle" :class="[ subtitleStyles, headerColor ]">
                                {{ subtitle }}
                            </h2>
                        </div>
                    </div>
                    <slot></slot>
                </div>
            </div>

            <div class="hero-foot" v-if="$slots.footer">
                <slot name="footer"></slot>
            </div>

        </div>
    </section>

</template>




<script>

    export default {
        data() {
            return {
                headerStyles: {
                    'hero':						true,
                    'hero-border':				this.hasBorder			===			true,
                    'is-header':				this.color				===			'header',
                    'is-primary':				this.color				===			'primary',
                    'is-info':					this.color				===			'info'					||
                                                this.color				===			'blue',
                    'is-success':				this.color				===			'success'				||
                                                this.color				===			'green',
                    'is-warning':				this.color				===			'warning'				||
                                                this.color				===			'yellow',
                    'is-danger':				this.color				===			'danger'				||
                                                this.color				===			'red',
                    'is-light':					this.color				===			'light'					||
                                                this.color				===			'gray'					||
                                                this.color				===			'grey',
                    'is-dark':					this.color				===			'dark'					||
                                                this.color				===			'black',
                    'is-white':					this.color				===			''						||
                                                this.color				===			'white',
                    'is-bold':					this.gradient			===			true,
                    'is-medium':				this.size				===			'medium',
                    'is-large':					this.size				===			'large',
                    'is-fullheight':			this.size				===			'full'					||
                                                this.color				===			'fill',
                    'has-overlay':				this.hasOverlay			===			true
                },
                overlayStyles: {
                    'hero':						this.hasOverlay			===			true,
                    'is-medium':				this.size				===			'medium',
                    'is-large':					this.size				===			'large',
                    'is-fullheight':			this.size				===			'full'					||
                                                this.color				===			'fill',
                    'dark-overlay':				this.overlayColor		===			'dark',
                    'light-overlay':			this.overlayColor		===			'light',
                    'primary-overlay':			this.overlayColor		===			'primary',
                    'info-overlay':				this.overlayColor		===			'info',
                    'warning-overlay':			this.overlayColor		===			'warning',
                    'danger-overlay':			this.overlayColor		===			'danger',
                    'success-overlay':			this.overlayColor		===			'success'

                },
                titleStyles: {
                    'title':					true,
                    'is-spaced':				this.titleSpaced		===			true
                },
                subtitleStyles: {
                    'subtitle':					true
                },
                headerColor: {
                    'has-text-white':			this.titleColor			===			'white',
                    'has-text-black':			this.titleColor			===			'black',
                    'has-text-light':			this.titleColor			===			'light',
                    'has-text-dark':			this.titleColor			===			'dark',
                    'has-text-primary':			this.titleColor			===			'primary',
                    'has-text-info':			this.titleColor			===			'info',
                    'has-text-success':			this.titleColor			===			'success',
                    'has-text-warning':			this.titleColor			===			'warning',
                    'has-text-danger':			this.titleColor			===			'danger',
                    'has-text-grey-darker':		this.titleColor			===			'grey-darker'			||
                                                this.titleColor			===			'gray-darker',
                    'has-text-grey-dark':		this.titleColor			===			'grey-dark'				||
                                                this.titleColor			===			'gray-dark',
                    'has-text-grey':			this.titleColor			===			'grey'					||
                                                this.titleColor			===			'gray',
                    'has-text-grey-light':		this.titleColor			===			'grey-light'			||
                                                this.titleColor			===			'gray-light',
                    'has-text-grey-lighter':	this.titleColor			===			'grey-lighter'			||
                                                this.titleColor			===			'gray-darker'
                }
            }
        },
        props: {
            title: {
                type: String,
                required: false
            },
            subtitle: {
                type: String,
                required: false
            },
            titleCentered: {
                type: Boolean,
                required: false,
                default: false
            },
            titleSpaced: {
                type: Boolean,
                required: false,
                default: false
            },
            titleColor: {
                type: String,
                required: false
            },
            color: {
                type: String,
                required: false,
                validator(value) {
                    // Build valid data array
                    var validColors = [
                        '',
                        'header',
                        'primary',
                        'info',
                        'blue',
                        'success',
                        'green',
                        'warning',
                        'yellow',
                        'danger',
                        'red',
                        'light',
                        'gray',
                        'grey',
                        'dark',
                        'black',
                        'white'
                    ]
                    // If header has a color and it's not in the array above, throw an error:
                    if ( value && validColors.indexOf(value) === -1 ) {
                        console.error('[STSHeader] Error: "' + value + '" is not an acceptable color value.\n\n Please specify one of the following, or remove this Optional prop from your template:\n\n' + JSON.stringify(validColors, null, 4))
                        return false;
                    }
                    return true;
                },
                default: 'white'
            },
            hasOverlay: {
                type: Boolean,
                required: false,
                default: false
            },
            overlayColor: {
                type: String,
                required: false,
                validator(value) {
                    // Build valid data array
                    var validColors = [
                        '',
                        'info',
                        'primary',
                        'warning',
                        'danger',
                        'success',
                        'light',
                        'dark'
                    ]
                    // If header has a color and it's not in the array above, throw an error:
                    if ( value && validColors.indexOf(value) === -1 ) {
                        console.error('[STSHeader] Error: "' + value + '" is not an acceptable overlay color value.\n\n Please specify one of the following, or remove this Optional prop from your template:\n\n' + JSON.stringify(validColors, null, 4))
                        return false;
                    }
                    return true;
                }
            },
            gradient: {
                type: Boolean,
                required: false
            },
            size: {
                type: String,
                required: false,
                validator(value) {
                    // Build valid data array
                    var validSizes = [
                        '',
                        'medium',
                        'large',
                        'full',
                        'fill'
                    ]
                    // If header has a size and it's not in the array above, throw an error:
                    if ( value && validSizes.indexOf(value) === -1 ) {
                        console.error('[STSHeader] Error: "' + value + '" is not an acceptable size value.\n\n Please specify one of the following, or remove this Optional prop from your template:\n\n' + JSON.stringify(validSizes, null, 4))
                        return false;
                    }
                    return true;
                }
            },
            bgStyle: {
                type: String,
                required: false
            },
            hasBorder: {
                type: Boolean,
                required: false,
                default: false
            }
        }
    }

</script>




<style lang="scss" scoped>

    .hero {
			-webkit-background-size: cover !important;
			-moz-background-size: cover !important;
			-o-background-size: cover !important;
		background-size: cover !important;

		h1, h2, h3,
		h4, h5, p {
			color: #FFF;
        }

    }

</style>