<template>

    <transition name="fade" mode="out-in">
        <div ref="alertContainer" tabindex="0" :class="{'notification fixed-alert ': true, 'is-danger': isSuccess === false, 'is-success': isSuccess === true}">
            <div class="columns is-mobile level has-text-centered">
                <div class="column is-2 level-item">
                    <span class="icon is-medium" >
                        <i class="fa fa-check-circle" aria-hidden="true" v-if="isSuccess"></i>
                        <i class="fa fa-exclamation-triangle" aria-hidden="true" v-else></i>
                    </span>
                </div>
                <div class="column is-8 level-item">
                    <span v-html="message"></span>
                </div>
                <div class="column is-2 level-item">
                    <button class="delete" @click="$emit('close')" aria-label="Close alert" title="Close alert"></button>
                </div>
            </div>
        </div>
    </transition>

</template>




<script>

    export default {
        props: {
            message: {
                type: [String, Number],
                required: false,
                default: 'Sorry, there was an error processing your request. Please try again.'
            },
            isSuccess: {
                type: Boolean,
                required: false,
                default: false
            },
            resetTime: {
                type: Number,
                required: false,
                default: 5000
            },
            scrollToTop: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                timeoutId: null
            }
        },
        mounted() {
            // Focus on component, set timeOut and scroll to top of page
            this.runAlert()
        },
        updated() {
            // Focus on component, set timeOut and scroll to top of page
            this.runAlert()
        },
        methods: {
            scrollUp() {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            },
            timeOut() {
                var self = this;
                // Create function for timeout, which sets its value to the timeoutId data property
                function createTimeout() {
                    self.timeoutId = setTimeout(function () {
                        self.$emit('close');
                    }, self.resetTime);
                }
                // Create function to reset timeout
                function stopTimeout() {
                    clearTimeout(self.timeoutId);
                }
                // Clear timeout
                stopTimeout();
                // Run new timeout
                createTimeout();
            },
            runAlert() {
                // Focus on modal component, when it opens (for accessibility)
                this.$refs.alertContainer.focus();
                // Set timeout if resetTime !== 0
                if (this.resetTime > 0) {
                    this.timeOut();
                }
                // Scroll to top of page
                if (this.scrollToTop) {
                    this.scrollUp();
                }
            }
        }
    }

</script>




<style lang="scss" scoped>

    .fixed-alert {
        position: fixed;
        top: 0;
        margin: 0;
        right: 0;
        width: 100%;
        z-index: 1000;

        .delete {
            background-color: transparent;
            max-height: 1.5rem;
            max-width: 1.5rem;
            min-width: 1.5rem;
            min-height: 1.5rem;
            height: 3rem;
            width: 3rem;
            padding: 0;

            &:hover {
                opacity: 0.7;
            }

            &:before {
                height: 2px;
                width: 100%;
            }

            &:after {
                height: 100%;
                width: 2px;
            }

        }

    }

</style>