<script>
	import { unified } from 'unified';
	import remarkParse from 'remark-parse';
	import remarkFrontmatter from 'remark-frontmatter';
	import remarkRehype from 'remark-rehype';
	import rehypeStringify from 'rehype-stringify';

	export let data;
	let markdown = data.markdown;
	let articleData = data.metadata;

	let articleHtml = unified()
		.use(remarkParse)
		.use(remarkFrontmatter, ['yaml']) // Parse frontmatter
		.use(remarkRehype)
		.use(rehypeStringify)
		.process(markdown);
</script>

<!-- https://www.verywellmind.com/relationships-survey-7104667 -->
<!-- Super Cool ^^^ The website uses a grid sizing of grid-template-columns: minmax(0, 37.5rem) 18.75rem
	Meaning that the maxwidth will be 37.5rem = 600px of the article side and the remaining right side is used for ads.
	It also has infinite scroll on the right side so ads keep spawning as you scroll down.
 -->

<svelte:head>
	<title>{articleData.title}</title>
	<meta name="description" content={articleData.description} />
</svelte:head>

<div class="article-container">
	<div class="article-titles">
		<h1>{articleData.title}</h1>
		<p class="description">{articleData.description}</p>
		<img src={articleData.image.url} alt={articleData.image.alt} loading="lazy" />
		<div class="article-meta">
			<a href="/author/{articleData.author}">{articleData.author}</a>
			<span class="I-seperator">|</span>
			<div>Updated on {articleData.date}</div>
		</div>
	</div>

	<!-- Todo - Table of Contents based on the headers within the body -->
	{#await articleHtml then value}
		<div class="articleContent">
			{@html value}
		</div>
	{/await}
</div>

<style>
	/* Todo - Pick font family for title and headers */
	/* Todo - Pick font family that allows modifying the weights */

	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
	a {
		outline: none;
		text-decoration: underline;
	}

	h1 {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 2.125rem;
		font-weight: 600;
		line-height: 1.1;

		margin: 0px;
		padding: 0px;

		color: #212121;
	}

	h2 {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 1.75rem;
		font-weight: 600;
		line-height: 1.15;

		margin: 0px;
		margin-top: 2rem;
		padding: 0px;

		color: #212121;
	}

	img {
		aspect-ratio: 600 / 450;
		/* width: 100%; */
		max-width: 100%;

		margin: 0px;
		padding: 0px;
	}

	p {
		font-family: 'Merriweather', 'serif';
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5625;

		margin: 1em 0px;
		padding: 0px;

		color: #212121;
	}

	.article-container {
	}

	.article-titles {
		/* display: flex;
		flex-direction: column; */
	}

	/* author, last date edited, and tags */
	.article-meta {
		font-size: 0.875rem;
		font-weight: 600;
		line-height: 1;

		margin: 0px;
		margin-bottom: 2em;
		padding: 1em 0;

		display: flex;
		flex-direction: row;
		justify-content: space-between;

		color: #646464;
	}

	.I-seperator {
		color: #646464;
	}

	.article-meta a {
		color: inherit;
	}

	.description {
		margin-top: 0.6em;
		margin-bottom: 1em;
	}
</style>
