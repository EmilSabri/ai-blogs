<script>
	// @ts-nocheck

	import '/src/app.css';
	export let articles = [];
</script>

<div class="title">Related Articles</div>
<div class="related-articles">
	<div class="related-articles-container">
		{#each articles as article}
			<!-- RelatedArticleCard -->
			<!-- Todo - Try using svelte reactivity to update page instead of a hard reload  -->

			<a class="related-article-card" href="/articles/{article.contentLink}" data-sveltekit-reload>
				<div class="flex related-article-container">
					<div class="relatedImg-container ">
						<img
							class="relatedImg"
							src={article.image?.url}
							alt={article.image.alt}
							loading="lazy"
						/>
					</div>

					<div class="w-full flex flex-col justify-evenly card-content">
						<div class="text-lg font-bold leading-7 mb-6">{article.title}</div>
						<div class="text-sm text-gray-700">By {article.author}</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.related-articles {
		padding: 0 1rem;
		/* background: */
	}
	.related-article-card {
		box-sizing: border-box;
		width: 100%;
		display: block;
		padding: 1rem 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	}
	.title {
		font-size: 1.25rem;
		line-height: 1.3571;
		font-weight: 700;
		margin-top: 0.5em;
		margin-left: 1rem;

		/* border-bottom: 1px solid #212121; */
		/* padding-bottom: 0.5em; */
		@apply text-2xl font-bold mb-4;
	}

	.relatedImg {
		aspect-ratio: auto 282 / 188;
		object-fit: cover;
		/* max-width: 180px; */
		max-width: 282px;

		padding-right: 0.5em;

		@apply w-full;
	}

	@media (min-width: 800px) {
		.title {
		}
		.related-articles {
			/* padding: 0; */
			background-image: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05));
		}
		.related-articles-container {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 1.5rem;
			background-image: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05));
		}
		.related-article-container {
			display: flex;
			flex-direction: column;
		}

		.related-article-card {
			padding: 0;
			background-color: white;
			border-bottom: none;
		}

		.relatedImg-container {
			background-image: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05));
		}

		.relatedImg {
			max-width: none;
			padding: 0;
		}

		.card-content {
			padding: 0.75rem;
		}

		.card-content div:first-child {
			font-size: 1.5rem;
		}

		/* .card-content div:last-child {
			font-size: 1rem;
		} */
	}

	@media (min-width: 1050px) {
		.related-articles-container {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
