<template>

    <nav :class="{ 'navbar': true, 'fixed': isFixed }">

        <!-- Nav Brand and Burger Menu -->
            <div class="navbar-brand">
                <a class="navbar-item" :href="brandUrl">
                    <slot name="brand"></slot>
                </a>
                <div :class="{ 'navbar-burger burger': true, 'is-active': showNav }" @click="showNav = !showNav">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

        <!-- Desktop Header Nav -->
            <div class="navbar-end is-hidden-touch">

                <StsNavLink v-for="(link, index) in links" v-if="showDesktop"
                    :key="index"
                    :url="link.url"
                    :name="link.name"
                    :description="link.description"
                    :is-active="link.isActive"
                ></StsNavLink>

                <slot name="desktop"></slot>

            </div>

        <!-- Mobile Nav Items -->
            <transition name="slide-down" mode="out-in">
                <div id="navMenu" class="navbar-menu navbar-end is-hidden-desktop is-active" v-if="showNav">

                    <StsNavLink v-for="(link, index) in links" v-if="showMobile"
                        :key="index"
                        :url="link.url"
                        :name="link.name"
                        :description="link.description"
                        :is-active="link.isActive"
                    ></StsNavLink>

                    <slot name="mobile"></slot>

                </div>
            </transition>

    </nav>

</template>




<script>

    import StsNavLink from './StsNavLink.vue';

    export default {
        components: {
            StsNavLink
        },
        props: {
            brandUrl: {
                type: String,
                required: false,
                default: '#'
            },
            isFixed: {
                type: Boolean,
                required: false,
                default: false
            },
            showDesktop: {
                type: Boolean,
                required: false,
                default: true
            },
            showMobile: {
                type: Boolean,
                required: false,
                default: true
            },
            links: {
                type: Array,
                required: false,
                validator(value) {
                    // Error var for toggling
                    var errors = false;
                    // Loop through array for inner values
                    for (var link in value) {
                        // If title, icon or url aren't present or are empty or aren't a string, throw a console error:
                        if ( !value[link].url || typeof value[link].url !== 'string' ) {
                            console.error('[STSNavbar] Error: Prop [links[' + link + '].url] does not specify a valid String.');
                            errors = true;
                        }
                        if ( !value[link].name || typeof value[link].name !== 'string' ) {
                            console.error('[STSNavbar] Error: Prop [links[' + link + '].name] does not specify a valid String.');
                            errors = true;
                        }
                        if ( !value[link].description || typeof value[link].description !== 'string' ) {
                            console.error('[STSNavbar] Error: Prop [links[' + link + '].description] does not specify a valid String.');
                            errors = true;
                        }
                        // If isIcon exists and it's not boolean, throw a console error:
                        if ( value[link].isActive && typeof value[link].isActive !== 'boolean' ) {
                            console.error('[STSNavbar] Error: Prop [links[' + link + '].isActive] must specify true or false.');
                            errors = true;
                        }
                    }
                    // If errors is true, show Vue error
                    if (errors) {
                        return false;
                    }
                    return true;
                }
            }
        },
        data() {
            return {
                showNav: false
            }
        }
    }

</script>




<style lang="scss">

    nav.navbar {
        box-shadow: 0 3px 5px rgba(0,0,0,0.2);
		z-index: 999;

		&.fixed {
			position: fixed;
			width: 100%;
			top: 0;
		}
		
		img {
			max-height: calc(52px - 1rem);
		}

    }

    a.navbar-item.is-active:not(:hover),
    .navbar-link.is-active:not(:hover) {
        background-color: #f5f5f5;
    }

</style>