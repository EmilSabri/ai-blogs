<script>
	// @ts-nocheck

	export let articleData;
</script>

<div class="articleContainer">
	<h1 class="title">
		{articleData.title}
	</h1>
	<h2 class="subTitle">{articleData.description}</h2>
	<img class="thumbnail" src={articleData.image.url} alt={articleData.image.alt} loading="lazy" />

	<!-- Area for Author and Tags/Categories  -->
	<div class="articleInfo">
		<div class="articleInfoInterior">{articleData.author}</div>

		<div class="articleInfoInterior">{articleData.date}</div>
	</div>

	<div class="articleContent">
		<slot />
	</div>
</div>

<style>
	.articleContainer {
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		/* padding: 26px 0; */
	}

	.title {
		margin-bottom: 0.2223em;
		font-size: 1.75rem;
		line-height: 1.3571;
		font-weight: 900;
	}

	.subTitle {
		margin: 0.65em 0 1.5em;
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;

		font-family: 'Roboto', sans-serif;
	}

	.articleInfo {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5em 0;
		border-bottom: 1px solid #eaf0f6;

		font-size: 1rem;
		line-height: 1.5;
		font-weight: 400;
	}

	.articleInfoInterior {
		padding: 8px 0;
	}

	.thumbnail {
		width: 100%;
		max-width: 100%;
		margin: 0;
		height: auto;
		aspect-ratio: 600 / 450;
	}

	.articleContent {
		padding-top: 24px;
	}

	.articleContent :global(p) {
		margin-bottom: 16px;
		font-size: 16px;
		line-height: 1.75;
		font-weight: 400;
		font-family: 'Roboto', sans-serif;
		font-style: normal;
	}

	.articleContent :global(h3) {
		margin-bottom: 0.5rem;
		font-family: 'Oswald', sans-serif;
		font-size: 1.5rem;
		line-height: 1.2;
		font-weight: bolder;
	}

	.articleContent :global(h2) {
		margin-bottom: 0.5rem;
		font-family: 'Oswald', sans-serif;
		font-size: 1.8rem;
		line-height: 1.2;
		font-weight: bolder;
	}

	.articleContent :global(img) {
		margin-bottom: 16px;
	}

	@media (min-width: 600px) {
		.articleInfo {
			padding: 0.75em 0;
		}
	}

	@media (min-width: 990px) {
		.articleContainer {
			padding: 40px 0;
		}

		.title {
			margin-bottom: 0.1667em;
			font-size: 3rem;
			line-height: 1.2084;
		}

		.subTitle {
			margin-top: 1em;
		}

		.articleContent {
			padding-top: 30px;
		}
	}
</style>
