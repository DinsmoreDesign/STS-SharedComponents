<template>

    <div class="field" v-if="showField">
        <label class="label" :for="field.model">{{ field.label }} <span class="required" v-if="isRequired"> REQUIRED</span></label>
        <div class="field">
            <div class="control">
                <textarea :key="'field-' + _uid" :id="field.model" :class="{'textarea': true, 'is-danger': hasError}" :name="field.name" :placeholder="field.placeholder" v-model.trim="fieldModels[field.model]" :disabled="field.disabled"></textarea>
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



</style>