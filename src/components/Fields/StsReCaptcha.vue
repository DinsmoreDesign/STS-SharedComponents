<template>

    <div :id="wrapperId">
        <div :id="instanceId"></div>
        <transition name="slide-fade" mode="out-in">
            <span v-if="hasError" class="help is-danger">
                {{ errorMessage }}
            </span>
        </transition>
    </div>

</template>




<script>

    export default {
        data() {
            return {
                validationToken: '',
                wrapperId: 'captcha-wrapper-' + this._uid,
                instanceId: 'captcha-' + this._uid
            }
        },
        props: {
            siteKey: {
                type: String,
                required: false,
                default: '6LdgpTsUAAAAADNaVqwKc-HItyPjtKPnIKLD5oFU' // Localhost & SwitchThink key
            },
            dataReset: {
                type: Boolean,
                required: false,
                default: false
            },
            hasError: {
                type: Boolean,
                required: true
            },
            errorMessage: {
                required: true
            }
        },
        mounted() {
            // Create script tag for reCaptcha and append it as the first child in the #captcha div
            var	captchaScript = document.createElement('script');
                captchaScript.setAttribute( 'type', 'text/javascript' );
                captchaScript.setAttribute( 'src', 'https://www.google.com/recaptcha/api.js?render=explicit' );
                captchaScript.setAttribute( 'async', '' );
                captchaScript.setAttribute( 'defer', '' );
            document.getElementById(this.wrapperId).appendChild(captchaScript);

            this.initCaptcha();
        },
        methods: {
            initCaptcha() {
                var self = this;
                setTimeout(function() {
                    if(typeof grecaptcha === 'undefined') {
                        self.initCaptcha();
                    }
                    else {
                        grecaptcha.render(self.instanceId, {
                            sitekey: self.siteKey,
                            callback: self.verify,
                            'expired-callback': self.verify
                        });
                    }
                }, 100);
            },
            verify(token) {
                this.validationToken = token;
            }
        },
        watch: {
            validationToken(value) {
                this.$emit('input', value);
            },
            dataReset() {
                if (this.dataReset) {
                    grecaptcha.reset();
                    this.validationToken = '';
                }
            }
        }
    }

</script>




<style lang="scss" scoped>



</style>