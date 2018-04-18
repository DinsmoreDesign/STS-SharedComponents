<template>

    <div class="field" v-if="showField">
        <label class="label" :for="field.name">{{ field.label }}<span class="required" v-if="isRequired"> REQUIRED</span></label>
        <div class="field has-addons" style="margin-bottom:0">
            <div :class="{'control is-expanded': true, 'has-icons-right': hasError}">
                <div v-if="!showPassword" class="is-fullwidth">
                    <input :key="'field-' + _uid" v-if="field.model" :id="field.model" type="password" :class="{'input': true, 'is-danger': hasError}" :name="field.name" :placeholder="field.placeholder" v-model="fieldModels[field.model]"></input>
                    <input :key="'field-' + _uid" v-else type="password" :class="{'input': true, 'is-danger': hasError}" :name="field.name" :placeholder="field.placeholder" v-model="confirmModel"></input>
                </div>
                <div v-else class="is-fullwidth">
                    <input :key="'field-' + _uid" v-if="field.model" :id="field.model" type="text" :class="{'input': true, 'is-danger': hasError}" :name="field.name" :placeholder="field.placeholder" v-model="fieldModels[field.model]"></input>
                    <input :key="'field-' + _uid" v-else type="text" :class="{'input': true, 'is-danger': hasError}" :name="field.name" :placeholder="field.placeholder" v-model="confirmModel"></input>
                </div>
                <span v-if="hasError" class="icon is-small is-right has-text-danger">
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                </span>
            </div>
            <div class="control">
                <button type="button" class="button is-info is-outlined" @click="showPassword = !showPassword" title="Toggle Password Visibility">
                    <i class="fa fa-eye" aria-hidden="true" v-if="!showPassword"></i>
                    <i class="fa fa-eye-slash" aria-hidden="true" v-else></i>
                </button>
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
                showPassword: false,
                timeoutId: null,
                confirmModel: null,
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
            },
            evalCondition(model, condition) {
                return eval('this.fieldModels.' + model + condition);
            }
        },
        watch: {
            dataReset() {
                if (this.dataReset) {
                    this.confirmModel = null;
                }
            },
            model: function(value) {
                if (this.dataReset) {
                    this.$emit('reset');
                } else {
                    this.timeOut(value);
                }
            },
            confirmModel: function(value) {
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