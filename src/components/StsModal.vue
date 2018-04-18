<template>

    <transition name="fade" mode="out-in">
        <div ref="modalContainer" tabindex="0" class="modal is-active" @keydown.esc="$emit('close')" v-if="message">
            <div class="modal-background" @click="$emit('close')"></div>
            <div class="modal-content">
                <section class="section">
                    <div class="content" v-html="message"></div>
                    <button class="button is-info is-outlined is-fullwidth" @click="$emit('close')">Close</button>
                </section>
            </div>
            <button aria-label="Close" title="Close" class="modal-close is-large" @click="$emit('close')"></button>
        </div>
    </transition>

</template>




<script>

    export default {
        props: {
            message: {
                type: String,
                required: true
            }
        },
        mounted() {
            // Focus on modal component, when it opens (for accessibility)
            this.$refs.modalContainer.focus();
        }
    }

</script>




<style lang="scss" scoped>

    .modal {
        z-index: 2000;

		.modal-content {
			margin: 0 !important;

			 .section {
				background: #FFF;
			}
		}

		.modal-close {
			max-height: 3rem;
			max-width: 3rem;
			min-height: 3rem;
			min-width: 3rem;
		}
    }

</style>