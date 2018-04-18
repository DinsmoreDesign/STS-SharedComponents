<template>

    <transition name="slide-fade" mode="out-in">
        <form @submit.prevent="formSubmit">
            <div :class="{ 'columns is-multiline': hasColumns }">

                <div v-for="(field, index) in formFields" :key="index"
                    :class="[{ 'column': field.size, 'pad-bottom': !hasColumns }, 'is-' + field.size ]"
                >

                    <StsNumberField v-if=" field.type === 'number' || field.type === 'tel' "
                        :key="'field_component-' + index"
                        :field="field"
                        :field-models="fieldModels"
                        :field-size="field.size"
                        v-validate
                        :data-vv-name="field.name"
                        :data-vv-rules="field.validation"
                        :has-error="errors.has(field.name)"
                        :error-message="errors.first(field.name)"
                        data-vv-value-path="model"
                        :data-reset="dataReset"
                        @reset="fieldReset"
                        @detach="detachValidator"
                    ></StsNumberField>

                    <StsEmailField v-else-if=" field.type === 'email' "
                        :key="'field_component-' + index"
                        :field="field"
                        :field-models="fieldModels"
                        :field-size="field.size"
                        v-validate
                        :data-vv-name="field.name"
                        :data-vv-rules="field.validation"
                        :has-error="errors.has(field.name)"
                        :error-message="errors.first(field.name)"
                        data-vv-value-path="model"
                        :data-reset="dataReset"
                        @reset="fieldReset"
                        @detach="detachValidator"
                    ></StsEmailField>
                
                    <StsPasswordField v-else-if=" field.type === 'password' && field.model "
                        :key="'field_component-' + index"
                        :field="field"
                        :field-models="fieldModels"
                        :field-size="field.size"
                        v-validate
                        :data-vv-name="field.name"
                        :data-vv-rules="field.validation"
                        :has-error="errors.has(field.name)"
                        :error-message="errors.first(field.name)"
                        data-vv-value-path="model"
                        :data-reset="dataReset"
                        @reset="fieldReset"
                        @detach="detachValidator"
                    ></StsPasswordField>

                    <StsPasswordField v-else-if=" field.type === 'password' && !field.model "
                        :key="'field_component-' + index"
                        :field="field"
                        :field-models="fieldModels"
                        :field-size="field.size"
                        v-validate
                        :data-vv-name="field.name"
                        :data-vv-rules="field.validation"
                        :has-error="errors.has(field.name)"
                        :error-message="errors.first(field.name)"
                        data-vv-value-path="confirmModel"
                        :data-reset="dataReset"
                        @reset="fieldReset"
                        @detach="detachValidator"
                    ></StsPasswordField>

                    <StsTextField v-else-if=" field.type === 'text' || field.type === 'date' "
                        :key="'field_component-' + index"
                        :field="field"
                        :field-models="fieldModels"
                        :field-size="field.size"
                        v-validate
                        :data-vv-name="field.name"
                        :data-vv-rules="field.validation"
                        :has-error="errors.has(field.name)"
                        :error-message="errors.first(field.name)"
                        data-vv-value-path="model"
                        :data-reset="dataReset"
                        @reset="fieldReset"
                        @detach="detachValidator"
                    ></StsTextField>

                    <StsTextArea v-else-if=" field.type === 'textarea' "
                        :key="'field_component-' + index"
                        :field="field"
                        :field-models="fieldModels"
                        :field-size="field.size"
                        v-validate
                        :data-vv-name="field.name"
                        :data-vv-rules="field.validation"
                        :has-error="errors.has(field.name)"
                        :error-message="errors.first(field.name)"
                        data-vv-value-path="model"
                        :data-reset="dataReset"
                        @reset="fieldReset"
                        @detach="detachValidator"
                    ></StsTextArea>

                    <StsSelect v-else-if=" field.type === 'select' "
                        :key="'field_component-' + index"
                        :field="field"
                        :field-models="fieldModels"
                        :field-size="field.size"
                        v-validate
                        :data-vv-name="field.name"
                        :data-vv-rules="field.validation"
                        :has-error="errors.has(field.name)"
                        :error-message="errors.first(field.name)"
                        data-vv-value-path="model"
                        :data-reset="dataReset"
                        @reset="fieldReset"
                        @detach="detachValidator"
                    ></StsSelect>

                    <StsCheckbox v-else-if=" field.type === 'checkbox' "
                        :key="'field_component-' + index"
                        :field="field"
                        :field-models="fieldModels"
                        :field-size="field.size"
                        v-validate
                        :data-vv-name="field.name"
                        :data-vv-rules="field.validation"
                        :has-error="errors.has(field.name)"
                        :error-message="errors.first(field.name)"
                        data-vv-value-path="model"
                        :data-reset="dataReset"
                        @reset="fieldReset"
                        @detach="detachValidator"
                    ></StsCheckbox>

                    <StsCheckGroup v-else-if=" field.type === 'check-group' "
                        :key="'field_component-' + index"
                        :field="field"
                        :field-models="fieldModels"
                        :field-size="field.size"
                        v-validate
                        :data-vv-name="field.name"
                        :data-vv-rules="field.validation"
                        :has-error="errors.has(field.name)"
                        :error-message="errors.first(field.name)"
                        data-vv-value-path="model"
                        :data-reset="dataReset"
                        @reset="fieldReset"
                        @detach="detachValidator"
                    ></StsCheckGroup>

                    <StsRadioButton v-else-if=" field.type === 'radio' "
                        :key="'field_component-' + index"
                        :field="field"
                        :field-models="fieldModels"
                        :field-size="field.size"
                        v-validate
                        :data-vv-name="field.name"
                        :data-vv-rules="field.validation"
                        :has-error="errors.has(field.name)"
                        :error-message="errors.first(field.name)"
                        data-vv-value-path="model"
                        :data-reset="dataReset"
                        @reset="fieldReset"
                        @detach="detachValidator"
                    ></StsRadioButton>

                </div>
            </div>

            <div class="field" v-if="hasCaptcha">
                <StsReCaptcha
                    :site-key="captchaKey"
                    v-validate
                    data-vv-name="captcha"
                    data-vv-rules="required"
                    :has-error="errors.has('captcha')"
                    :error-message="errors.first('captcha')"
                    data-vv-value-path="validationToken"
                    :data-reset="dataReset"
                    @input="disableSubmit = !disableSubmit"
                ></StsReCaptcha>
            </div>

            <div class="columns">
                <div class="column" v-if="allowCancel">
                    <button type="button" :class="{ 'button is-danger is-outlined': true, 'is-fullwidth': fullwidthButtons, 'is-loading': loading }" @click="formReset">
                        Cancel
                    </button>
                </div>
                <div class="column">
                    <button type="submit" :class="[ submitStyles, { 'is-loading': loading, 'is-fullwidth': fullwidthButtons } ]" :disabled="disableSubmit">
                        {{ submitText }}
                    </button>
                </div>
            </div>

        </form>
    </transition>

</template>




<script>

    import axios from 'axios';
    import { rootPath } from '../mixins/index.js';

    import components from './Fields/index.js';

    export default {
        mixins: [rootPath],
        components: components,
        data() {
            return {
                dataReset: false,
                fieldModels: null,
                loading: false,
                axiosObject: {},
                timeoutId: null,
                submitStyles: {
                    'button':				true,
                    'is-white':				this.submitColor			===			'white',
                    'is-light':				this.submitColor			===			'light'				||
                                            this.submitColor			===			'gray'				||
                                            this.submitColor			===			'grey',
                    'is-dark':				this.submitColor			===			'dark',
                    'is-black':				this.submitColor			===			'black',
                    'is-primary':			this.submitColor			===			'primary',
                    'is-link':				this.submitColor			===			'link',
                    'is-info':				this.submitColor			===			'info'				||
                                            this.submitColor			===			'blue',
                    'is-success':			this.submitColor			===			'success'			||
                                            this.submitColor			===			'green',
                    'is-warning':			this.submitColor			===			'warning'			||
                                            this.submitColor			===			'yellow',
                    'is-danger':			this.submitColor			===			'danger'			||
                                            this.submitColor			===			'red'
                },
                captchaError: 'There was a problem validating your Captcha response. Try again.',
                disableSubmit: false
            }
        },
        props: {
            formFields: {
                type: Array,
                required: true,
                validator(value) {
                    // Build valid field types array:
                    var validFields = [
                        'text',
                        'textarea',
                        'date',
                        'email',
                        'number',
                        'password',
                        'tel',
                        'radio',
                        'checkbox',
                        'check-group',
                        'select'
                    ];
                    // Error var for toggling
                    var errors = false;
                    // Loop through all the fields
                    for (var field in value) {
                        // If name or label aren't present or are empty, throw a console error:
                        if ( !value[field].name ) {
                            console.error('[STSForm] Error: Field [' + field + '] does not specify a valid name property.');
                            errors = true;
                        }
                        if ( !value[field].label ) {
                            console.error('[STSForm] Error: Field [' + field + '] does not specify a valid label property.');
                            errors = true;
                        }
                        // If the type isn't present in the validFields array above, throw a console error:
                        if ( validFields.indexOf(value[field].type) === -1 ) {
                            console.error('[STSForm] Error: Type "' + value[field].type + '" in field [' + field + '] is not a valid field type.\n\n Please specify one of the following:\n\n' + JSON.stringify(validFields, null, 4));
                            errors = true;
                        }
                        // If errors is true, show Vue error
                        if (errors) {
                            return false;
                        }
                        return true;
                    }
                }
            },
            formModels: {
                type: Object,
                required: true
            },
            postUrl: {
                type: String,
                required: true
            },
            postData: {
                type: [Object, Array],
                required: false
            },
            jsonObjectName: {
                type: String,
                required: false
            },
            allowCancel: {
                type: Boolean,
                required: false,
                default: true
            },
            fullwidthButtons: {
                type: Boolean,
                required: false,
                default: true
            },
            submitText: {
                type: String,
                required: false,
                default: 'Submit'
            },
            submitColor: {
                type: String,
                required: false,
                default: 'info'
            },
            scrollToTop: {
                type: Boolean,
                required: false,
                default: true
            },
            hasColumns: {
                type: Boolean,
                required: false,
                default: false
            },
            hasCaptcha: {
                type: Boolean,
                required: false,
                default: false
            },
            captchaKey: {
                type: String,
                required: false
            }
        },
        created() {
            // Change disableSubmit to true if hasCaptcha is true.
            if (this.hasCaptcha) {
                this.disableSubmit = true;
            }
            // Create mutable data model from formModels
            this.fieldModels = JSON.parse(JSON.stringify(this.formModels));
            // If form has columns and a field doesn't have a size, set it to 12 by default
            if (this.hasColumns) {
                for (var field in this.formFields) {
                    if (!this.formFields[field].size) {
                        this.formFields[field].size = 12;
                    }
                }
            } else {
                for (var field in this.formFields) {
                    this.formFields[field].size = null;
                }
            }
        },
        methods: {
            scrollUp() {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            },
            fieldReset() {
                var self = this;
                // Create function for timeout, which sets its value to the timeoutId data property
                function createTimeout() {
                    self.timeoutId = setTimeout(function () {
                        self.dataReset = false
                    }, 400);
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
            formReset() {
                // Reset data
                this.fieldModels = JSON.parse(JSON.stringify(this.formModels));
                // Turn dataReset on
                this.dataReset = true;
                // Clear validator errors
                this.$validator.clean();
                // Scroll to top of app
                if (this.scrollToTop) {
                    this.scrollUp();
                }
                // Emit cancel message, in case we want to do something with it
                this.$emit('cancel');
            },
            buildData() {
                if (this.jsonObjectName) {
                    // If postData was sent to the component, fill axiosObject with that data
                    if (this.postData) {
                        this.axiosObject[this.jsonObjectName] = this.postData;
                    // Else set it to fieldModels
                    } else {
                        this.axiosObject[this.jsonObjectName] = this.fieldModels;
                    }
                } else { // Else do the same thing, without the jsonObjectName
                    if (this.postData) {
                        this.axiosObject = this.postData;
                    } else {
                        this.axiosObject = this.fieldModels;
                    }
                }
            },
            formSubmit() {
                // Run form validation
                this.$validator.validateAll().then(success => {
                    // Set loader to true
                    this.loading = true;
                    // Build data object
                    this.buildData();
                    // If no errors, submit data, emit data for modal and clear form
                    if (success) {
                        // Build postPath from globalRootPath and postUrl
                        var postPath = this.globalRootPath + this.postUrl;
                        // Find index of double slashes
                        var slashIndex = postPath.indexOf('//');
                        // If an index greater than -1 exists, return the postPath without the duplicated slash
                        if (slashIndex !== -1) {
                            postPath = postPath.slice(0, slashIndex) + postPath.slice(slashIndex + 1);
                        }
                        var self = this;
                        // Submit data to server:
                        axios.post(
                            postPath, // POST URL
                            self.axiosObject // Data to send
                        ).then(function (response) {
                            // Emit submit message
                            self.$emit(
                                'submit', // Name of emit
                                response.data, // Send data, so we can check if it's a valid response
                                '<h1>Success</h1><p><strong>Thank you.</strong> Your form has been successfully submitted!</p>', // Default success message
                                '<h1>Error</h1><p><strong>There was an issue sending your request. </strong>Please try again later.</p>' // Default error message
                            );
                            // Reset data fields and loading icon
                            self.formReset();
                            self.errors.clear();
                            self.loading = false;
                        // If error sending data:
                        }).catch(function (error) {
                            // Emit alert modal
                            self.$emit(
                                'submit', // Name of emit
                                false, // Sending was not successful, so response is false
                                null, // No default success message, this only fires when there's an error
                                '<h1 style="color:red">Error</h1>' + error.message + '. <strong>Please try again later.</strong>' // Defaul error message
                            );
                            // Scroll to top of app, reset loading icon
                            if (self.scrollToTop) {
                                self.scrollUp();
                            }
                            self.loading = false;
                        });
                    // If validation errors:
                    } else {
                        // Emit alert
                        this.$emit('alert', 'Please fix the highlighted error(s)');
                        // Scroll to top of app, reset loading icon
                        if (this.scrollToTop) {
                            this.scrollUp();
                        }
                        this.loading = false;
                    }
                });
            },
            detachValidator(name) {
                this.$validator.detach(name);
            }
        }
    }

</script>




<style lang="scss">

    ::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: #DDD;
    }

    :-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #DDD;
        opacity: 1;
    }

    ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #DDD;
        opacity: 1;
    }

    :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #DDD;
    }

    ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #DDD;
    }

    .form-group:last-child {
        margin-bottom: 0;
    }

    .checkbox.spaced,
	.radio.spaced {
        width: 100%;
        padding: 0.75rem;
    }

	.radio.spaced+.radio.spaced {
		margin-left: 0;
	}

	.radio.one-line {
        margin: 1rem 0 0 0;
    }

	.validator-box {
        padding: 0.75rem;

		.field>:first-child label {
			padding-top: 0;
		}

		.field>:last-child label {
			padding-bottom: 0;
		}

    }

    @media screen and (min-width: 769px), print {
        .field-label .check-right {
            float: right;
        }

    }

	.dataTable-input {
		border-color: initial;
	}

	legend {
		padding: 0;
		display: table;
    }
    
	fieldset {
		border: 0;
		padding: 0.01em 0 0 0;
		margin: 0;
		min-width: 0;
	}

</style>