<template>

    <div class="field" v-if="showField">
        <label class="label" :for="field.model">{{ field.label }} <span class="required" v-if="isRequired"> REQUIRED</span></label></label>
        <div :class="{'control': true, 'has-icons-right': hasError}">
            <input :key="'field-' + _uid" :id="field.model" type="text" :class="{'input': true, 'is-danger': hasError}" :name="field.name" :placeholder="field.placeholder" v-model.trim="fieldModels[field.model]" :disabled="field.disabled"></input>
            <span v-if="hasError" class="icon is-small is-right has-text-danger">
                <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            </span>
        </div>
        <transition name="slide-fade" mode="out-in">
            <span v-if="hasError" class="help is-danger">
                {{ errorMessage }}
            </span>
        </transition>
    </div>

</template>




<script>

    import flatpickr from "flatpickr";

    export default {
        data() {
            return {
                timeoutId: null,
                isRequired: false
            }
        },
        props: {
            field: {
                type: Object,
                required: true
            },
            fieldModels: {
                type: Object,
                required: true
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
        created() {
            // If the field has validation
            if (this.field.validation) {
                // Split the validation rules by the pipe
                var splitVal = this.field.validation.split('|');
                // If the split rules contain required in the array, set isRequired to true
                if (splitVal.includes('required')) {
                    this.isRequired = true;
                }
                // Else do nothing
                return;
            }
        },
        mounted() {
            if (this.field.type === 'date') {
                // Set fieldName equal to the selected element's ID
                var fieldName = '#' + this.field.model;
                // Set defaults
                var dateFormat = 'm/d/Y';
                var mode = 'single';
                var minDate = null;
                var maxDate = null;
                var defaultDate = null;
                var disable = [];
                // Define options variable
                var options = this.field.options;
                // If options, change the defaults from above
                if (options) {
                    if (options.dateFormat) {
                        dateFormat = options.dateFormat;
                    }
                    if (options.mode) {
                        mode = options.mode;
                    }
                    if (options.minDate) {
                        minDate = options.minDate;
                    }
                    if (options.maxDate) {
                        maxDate = options.maxDate;
                    }
                    if (options.defaultDate) {
                        defaultDate = options.defaultDate;
                    }
                    if (options.disable) {
                        disable = options.disable;
                    }
                }
                // Initialize flatpickr on element and insert all the options
                flatpickr(fieldName, {
                    dateFormat: dateFormat,
                    mode: mode,
                    minDate: minDate,
                    maxDate: maxDate,
                    defaultDate: defaultDate,
                    disable: disable
                });
            }
        },
        computed: {
            model: function() {
                return this.fieldModels[this.field.model];
            },
            showField: function () {
                if ( // If the field doesn't have a conditionalModel, or the conditionalModel validates on the renderCondition, show the field
                        !this.field.conditionalModel || 
                        this.field.conditionalModel && 
                        this.evalCondition(this.field.conditionalModel, this.field.renderCondition)
                ) {
                    return true;
                } else { // Else don't show it and emit a detach
                    this.$emit('detach', this.field.name);
                    return false;
                }
            }
        },
        methods: {
            timeOut(value) {
                var self = this;
                // Create function for timeout, which sets its value to the timeoutId data property
                function createTimeout() {
                    self.timeoutId = setTimeout(function () {
                        self.$emit('input', value);
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
            }
        },
        watch: {
            model: function(value) {
                if (this.dataReset) {
                    this.$emit('reset');
                } else {
                    this.timeOut(value);
                }
            }
        }
    }

</script>




<style lang="scss" scoped>

    @import '/node_modules/flatpickr/dist/flatpickr.css';

</style>