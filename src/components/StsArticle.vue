<template>

    <div class="columns article">

        <div class="column is-narrow has-text-centered article-left" v-if="icon">
            <span class="icon article-icon is-rounded">
                <i aria-hidden="true" :class="[ 'fa', icon ]"></i>
            </span>
        </div>
        <div class="column is-2 article-left" v-else-if="image.isIcon">
            <sts-image
                :image="image"
                :size="image.size"
            ></sts-image>
        </div>

        <div class="column content article-body">
            <h5 v-if="date" class="article-date">
                {{ date }}
            </h5>
            <h3 class="title is-3 article-title" style="margin-top: 0;" v-html="title"></h3>
            <h5 class="subtitle is-5 article-subtitle" v-if="subtitle" v-html="subtitle"></h5>
            <sts-image v-if="image && !image.isIcon" style="margin-bottom: 1rem;"
                :image="image"
                :size="image.size"
            ></sts-image>
            <p v-for="(paragraph, index) in summary" v-html="paragraph" :key="index"></p>
            <slot></slot>
            <a :href="url" class="article-attachment" :title=" 'Read more about' + title " target="_blank" v-if="url">
                <strong>Read More</strong>
                <br/>
                <p class="icon article-icon" v-if="attachment">
                    <i :class="[ 'fa', attachment.icon ]" aria-hidden="true"></i>
                    <small>{{ attachment.title }}</small>
                </p>
            </a>
        </div>

        <div class="column is-3 article-links" v-if="sideLinks">
            <h5 class="title is-5 links-title" v-if="linksTitle">{{ linksTitle }}</h5>
            <a v-for="(link, index) in sideLinks" :href="link.url" :title="link.title" target="_blank" :key="index">
                <p class="icon article-icon">
                    <i :class="[ 'fa', link.icon ]" aria-hidden="true"></i>
                    <small>{{ link.title }}</small>
                </p>
            </a>
        </div>

    </div>

</template>




<script>

    export default {
        props: {
            icon: {
                type: String,
                required: false
            },
            image: {
                type: Object,
                required: false,
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
                        console.error('[STSArticle] Error: Prop [image.src] does not specify a valid String.');
                        errors = true;
                    }
                    if ( !value.description || typeof value.description !== 'string' ) {
                        console.error('[STSArticle] Error: Prop [image.description] does not specify a valid String.');
                        errors = true;
                    }
                    // If the type isn't present in the validSizes array above, throw a console error:
                    if ( validSizes.indexOf(value.size) === -1 ) {
                        console.error('[STSArticle] Error: Value "' + value.size + '" in [image.size] is not a valid size value.\n\n Please specify one of the following:\n\n' + JSON.stringify(validSizes, null, 4));
                        errors = true;
                    }
                    // If isIcon exists and it's not boolean, throw a console error:
                    if ( value.isIcon && typeof value.isIcon !== 'boolean' ) {
                        console.error('[STSArticle] Error: Prop [image.isIcon] must specify true or false.');
                        errors = true;
                    }
                    // If errors is true, show Vue error
                    if (errors) {
                        return false;
                    }
                    return true;
                }
            },
            date: {
                type: String,
                required: false
            },
            title: {
                type: String,
                required: true
            },
            subtitle: {
                type: String,
                required: false
            },
            summary: {
                type: Array,
                required: true
            },
            url: {
                type: String,
                required: false
            },
            attachment: {
                type: Object,
                required: false,
                validator(value) {
                    // Error var for toggling
                    var errors = false;

                    // If title or icon aren't present or are empty or aren't a string, throw a console error:
                    if ( !value.title || typeof value.title !== 'string' ) {
                        console.error('[STSArticle] Error: Prop [attachment.title] does not specify a valid String.');
                        errors = true;
                    }
                    if ( !value.icon || typeof value.icon !== 'string' ) {
                        console.error('[STSArticle] Error: Prop [attachment.icon] does not specify a valid String.');
                        errors = true;
                    }
                    // If errors is true, show Vue error
                    if (errors) {
                        return false;
                    }
                    return true;
                }
            },
            linksTitle: {
                type: String,
                required: false
            },
            sideLinks: {
                type: Array,
                required: false,
                validator(value) {
                    // Error var for toggling
                    var errors = false;
                    // Loop through array for inner values
                    for (var link in value) {
                        // If title, icon or url aren't present or are empty or aren't a string, throw a console error:
                        if ( !value[link].title || typeof value[link].title !== 'string' ) {
                            console.error('[STSArticle] Error: Prop [sideLinks[' + link + '].title] does not specify a valid String.');
                            errors = true;
                        }
                        if ( !value[link].icon || typeof value[link].icon !== 'string' ) {
                            console.error('[STSArticle] Error: Prop [sideLinks[' + link + '].icon] does not specify a valid String.');
                            errors = true;
                        }
                        if ( !value[link].url || typeof value[link].url !== 'string' ) {
                            console.error('[STSArticle] Error: Prop [sideLinks[' + link + '].url] does not specify a valid String.');
                            errors = true;
                        }
                    }
                    // If errors is true, show Vue error
                    if (errors) {
                        return false;
                    }
                    return true;
                }
            }
        }
    }

</script>




<style lang="scss" scoped>

    .article {

		.article-left {

			.article-icon {
				height: 5rem;
				width: 5rem;
				margin-bottom: 1.5rem;

				.fa {
					font-size: 3rem;
					color: #FFF;
				}

			}

		}
		
		.article-body {

			.article-date {
				font-size: .9em;
				font-weight: 700;
				margin-bottom: 0.5em;
			}

			.article-title {
				font-weight: 700;
			}

			.article-subtitle {
				margin-bottom: 0.5em;
			}

			.article-icon {
				padding-top: 1.5rem;
				height: auto;
				width: 10rem;

				i {
					padding-right: 0.75rem;
					font-size: 2.5em;
				}

				small {
					font-size: 70%;
					font-weight: 700;
				}

			}

		}

		.article-links {

			.links-title {
				padding-bottom: 1.25rem;
				margin-bottom: 0;
			}

			.article-icon {
				padding-top: 1.5rem;
				height: auto;
				width: 100%;
				justify-content: left;
				display: block;

				i {
					padding-right: 0.75rem;
					font-size: 2.5em;
				}

				small {
					font-size: 70%;
					font-weight: 700;
				}

			}

		}

	}

</style>