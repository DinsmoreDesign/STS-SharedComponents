<template>

    <div class="field" v-if="showField">
        <div :class="{'control has-text-centered validator-box': true, 'is-danger': hasError}">
            <label :for="field.model" class="checkbox">
                <input :id="field.model" :key="'field-' + _uid" type="checkbox" :name="field.name" v-model="fieldModels[field.model]" :disabled="field.disabled">
                <strong>{{ field.label }} <span class="required" v-if="isRequired"> REQUIRED</span></strong>
            </label>
        </div>
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
        watch: {
            model: function(value) {
                if (this.dataReset) {
                    this.$emit('reset');
                } else {
                    // If value is false, emit the value of null, since Vee-Validate can't validate true/false when a checkbox is in a component
                    if (this.model === false) {
                        this.$emit('input', null);
                        // Else emit the actual value
                    } else {
                        this.$emit('input', value);
                    }
                }
            }
        },
        methods: {
            evalCondition(model, condition) {
                return eval('this.fieldModels.' + model + condition);
            }
        }
    }

</script>




<style lang="scss" scoped>



</style>