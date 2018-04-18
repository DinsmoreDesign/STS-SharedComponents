<template>

    <figure :class="wrapperStyles">
        <img :src="image.src" :alt="image.description" :class="image.style">
    </figure>

</template>




<script>

    export default {
        props: {
            image: {
                type: Object,
                required: true,
                validator(value) {
                    // Build valid field types array:
                    var validSizes = [
                        '',
                        '1x1',
                        'square',
                        '4x3',
                        '3x2',
                        '16x9',
                        '2x1'
                    ];
                    // Error var for toggling
                    var errors = false;

                    // If src or description aren't present or are empty or aren't a string, throw a console error:
                    if ( !value.src || typeof value.src !== 'string' ) {
                        console.error('[STSImage] Error: Prop [image.src] does not specify a valid String.');
                        errors = true;
                    }
                    if ( !value.description || typeof value.description !== 'string' ) {
                        console.error('[STSImage] Error: Prop [image.description] does not specify a valid String.');
                        errors = true;
                    }
                    // If the type isn't present in the validSizes array above, throw a console error:
                    if ( validSizes.indexOf(value.size) === -1 ) {
                        console.error('[STSImage] Error: Value "' + value.size + '" in [image.size] is not a valid size value.\n\n Please specify one of the following:\n\n' + JSON.stringify(validSizes, null, 4));
                        errors = true;
                    }
                    // If errors is true, show Vue error
                    if (errors) {
                        return false;
                    }
                    return true;
                }
            },
            size: {
                type: String,
                required: false
            }
        },
        data() {
            return {
                wrapperStyles: {
                    'image':				true,
                    'is-1by1':				this.size				===			'1x1',
                    'is-square':			this.size				===			'square',
                    'is-4by3':				this.size				===			'4x3',
                    'is-3by2':				this.size				===			'3x2',
                    'is-16by9':				this.size				===			'16x9',
                    'is-2by1':				this.size				===			'2x1'
                }
            }
        }
    }

</script>




<style lang="scss" scoped>

    img {
        border: 0;
    }

</style>