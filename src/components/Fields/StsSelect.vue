<template>

    <div class="field" v-if="showField">
        <label class="label" :for="field.model">
            {{ field.label }} <span class="required" v-if="isRequired"> REQUIRED</span>
        </label>
        <div :class="{'select is-fullwidth': true, 'is-danger': hasError }">
            <div class="control">
                <select :key="'field-' + _uid" :id="field.model" :name="field.name" v-model="fieldModels[field.model]" :disabled="field.disabled">
                    <option disabled value="" v-if="field.placeholder" :label="field.placeholder">
                        {{ field.placeholder }}
                    </option>
                    <option disabled value="" v-else label="Select an Option">
                        Select an Option
                    </option>
                    <span v-for="(option, index) in field.options" :key="index">
                        <option v-if="!option.renderCondition || option.renderCondition && evalCondition(option.conditionalModel, option.renderCondition)" :value="option.value" :label="option.label">
                            {{ option.label }}
                        </option>
                    </span>
                </select>
            </div>
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
                    this.$emit('input', value);
                }
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
        methods: {
            evalCondition(model, condition) {
                return eval('this.fieldModels.' + model + condition);
            }
        }
    }

</script>




<style lang="scss" scoped>



</style>