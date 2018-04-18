<template>

    <div>
        <figure class="image" v-if="branding">
            <img :src="branding.LogoPath" :alt="branding.Client.ClientName + ' logo'" style="padding: 0 1.5rem 3rem 1.5rem;">
        </figure>
        <div class="card">
            <header class="card-header" style="rgb(245,245,245);">
                <h1 class="card-header-title has-text-centered" style="display:block;">
                    Login
                </h1>
            </header>
            <div class="card-content">
                <div class="content">
                    <form @submit.prevent="formSubmit">

                        <div class="field">
                            <label class="label">Username</label>
                            <div :class="{'control is-expanded has-icons-left': true, 'has-icons-right': errors.has('username')}">
                                <div class="is-fullwidth">
                                    <input autofocus v-validate="'required'" id="username" type="username" :class="{'input': true, 'is-danger': errors.has('username')}" name="username" placeholder="Username" v-model="loginInfo.username"></input>
                                </div>
                                <span class="icon is-small is-left">
                                    <i class="fa fa-user"></i>
                                </span>
                                <span v-if="errors.has('username')" class="icon is-small is-right">
                                    <i class="fa fa-exclamation-triangle has-text-danger" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                        <transition name="slide-fade" mode="out-in">
                            <span v-show="errors.has('username')" class="help is-danger" style="margin-bottom:0.25rem;margin-top:-0.5rem;">
                                {{ errors.first('username') }}
                            </span>
                        </transition>

                        <div :class="{ 'field': true, 'has-addons': allowPassReveal }">
                            <div :class="{'control is-expanded has-icons-left': true, 'has-icons-right': errors.has('password')}">
                                <div v-if="!showPassword" class="is-fullwidth">
                                    <input v-validate="'required'" id="password" type="password" :class="{'input': true, 'is-danger': errors.has('password')}" name="password" placeholder="Password" v-model="loginInfo.password"></input>
                                </div>
                                <div v-else class="is-fullwidth">
                                    <input v-validate="'required'" id="password" type="text" :class="{'input': true, 'is-danger': errors.has('password')}" name="password" placeholder="Password" v-model="loginInfo.password"></input>
                                </div>
                                <span class="icon is-small is-left">
                                    <i class="fa fa-lock"></i>
                                </span>
                                <span v-if="errors.has('password')" class="icon is-small is-right">
                                    <i class="fa fa-exclamation-triangle has-text-danger" aria-hidden="true"></i>
                                </span>
                            </div>
                            <div class="control" v-if="allowPassReveal">
                                <button type="button" class="button is-info is-outlined" @click="showPassword = !showPassword" title="Toggle Password Visibility">
                                    <i class="fa fa-eye" aria-hidden="true" v-if="!showPassword"></i>
                                    <i class="fa fa-eye-slash" aria-hidden="true" v-else></i>
                                </button>
                            </div>
                        </div>
                        <transition name="slide-fade" mode="out-in">
                            <span v-show="errors.has('password')" class="help is-danger" style="margin-bottom:0.25rem;margin-top:-0.5rem;">
                                {{ errors.first('password') }}
                            </span>
                        </transition>

                        <button type="submit" :class="{ 'button is-info is-fullwidth': true, 'is-loading': loading }">Submit</button>

                    </form>
                </div>
            </div>
        </div>
        <div class="has-text-centered" style="padding-top:0.75rem;">
            <a v-if="resetUrl" :href="resetUrl" title="Reset your password">Forgot your password?</a>
        </div>
    </div> 

</template>




<script>

    import axios from 'axios';
    import { rootPath } from '../mixins/index.js';

    export default {
        mixins: [rootPath],
        props: {
            branding: {
                type: Object,
                required: false,
                validator(value) {
                    // Build toggle variable
                    var errors = false;
                    // If LogoPath doesn't exist or isn't a string, throw an error:
                    if ( !value.LogoPath || typeof value.LogoPath !== 'string' ) {
                        console.error('[STSLogin] Error: Branding LogoPath property does not exist or is not in the correct format. Please specify a String.');
                        errors = true;
                    }
                    // If Client doesn't exist, throw an error:
                    if ( !value.Client ) {
                        console.error('[STSLogin] Error: Branding Client property does not exist.');
                        errors = true;
                    }
                    // If Client.ClientName doesn't exist or isn't a string, throw an error:
                    if ( !value.Client.ClientName || typeof value.Client.ClientName !== 'string' ) {
                        console.error('[STSLogin] Error: Branding Client.ClientName property does not exist or is not in the correct format. Please specify a String.');
                        errors = true;
                    }
                    // If errors is true, show Vue error
                    if (errors) {
                        return false;
                    }
                    return true;
                }
            },
            postUrl: {
                type: String,
                required: true
            },
            resetUrl: {
                type: String,
                required: false
            },
            redirectUrl: {
                type: String,
                required: true
            },
            allowPassReveal: {
                type: Boolean,
                default: true,
                required: false
            }
        },
        data() {
            return {
                loading: false,
                loginInfo: {
                    username: null,
                    password: null
                },
                showPassword: false
            }
        },
        methods: {
            formReset() {
                // Reset password
                this.loginInfo.password = null;
                this.loading = false;
                // Clear validator errors
                this.$validator.clean();
                this.errors.clear();
                // Emit reset message, in case we want to do something with it
                this.$emit('reset');
            },
            formSubmit() {
                // Run form validation
                this.$validator.validateAll().then(success => {
                    // Set loader to true
                    this.loading = true;
                    // If no errors, submit data, emit data for modal and clear form
                    if (success) {
                        var self = this;
                        // Submit data to server:
                        axios.post(
                            self.globalRootPath + self.postUrl, // POST URL
                            self.loginInfo // Data to send
                        ).then(function (response) {
                            // If username/password is wrong:
                            if (!response.data) {
                                // Fire modal
                                self.$emit(
                                    'submit', // Name of emit
                                    '<h1 style="color:red">Error</h1><p>The user name or password was not correct. <strong>Please try again.</strong></p>', // Modal message
                                );
                                // Reset form
                                self.formReset();
                            // Else, redirect to redirectUrl:
                            } else {
                                window.location = self.globalRootPath + self.redirectUrl;
                            }
                        // If error sending data:
                        }).catch(function (error) {
                            // Emit alert modal
                            self.$emit(
                                'submit',
                                '<h1 style="color:red">Error</h1>' + error.message + '. <strong>Please try again later.</strong>'
                            );
                            //Reset loading icon
                            self.loading = false;
                        });
                    // If validation errors:
                    } else {
                        // Emit alert
                        this.$emit('alert', 'Please fix the highlighted error(s)');
                        // Scroll to top of app, reset loading icon
                        this.loading = false;
                    }
                });
            }
        }
    }

</script>




<style lang="scss" scoped>



</style>