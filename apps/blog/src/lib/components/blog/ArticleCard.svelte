<script lang="ts">
	// import '../../../../app.css';
	import type { Article } from '$lib/mock/mock';
	export let article: Article;
</script>

<div class="articleCard">
	<a href={'/articles/' + article.contentLink}>
		<img class="test-img" src={article.image?.url} alt={article.image.alt} loading="lazy" />
		<h2 class="articleTitle">
			{article.title}
		</h2>
		<p class="articleDescription">{article.description}</p>
		<!-- <p>{article.tags.join(', ')}</p> -->
	</a>
</div>

<style>
	a {
		text-decoration: none;
		color: #062625;
	}

	.articleCard {
		margin-bottom: 1.875em;
	}

	.articleTitle {
		font-size: 1.25rem;
		line-height: 1.3571;
		font-weight: 700;
		/* margin-bottom: 0.1667em; */

		color: #062625;
	}

	.articleDescription {
		font-size: 0.875rem;
		line-height: 1.7143;
		font-weight: 400;
	}

	.test-img {
		width: 100%;
		/* height: auto; */
		aspect-ratio: 600 / 450;
		object-fit: cover;
		backface-visibility: hidden;
		max-width: 100%;
	}
	/* 
	@screen xs {
		.articleCard {
			margin: 0;
			padding: 0.75em 0.625em;
		}
	}

	@screen md {
		.articleCard {
			margin: 0;
			padding: 1em 1.25em;
		}
		.articleTitle {
			font-size: 1.875rem;
			line-height: 1.4667;
		}

		.articleDescription {
			font-size: 1rem;
			line-height: 1.75;
		}
	}

	@screen mdlg {
		.articleCard {
			padding: 1em 0.625em;
		}
	} */
</style>
