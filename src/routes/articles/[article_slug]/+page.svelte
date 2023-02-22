<script>
	// @ts-nocheck

	import { unified } from 'unified';
	import remarkParse from 'remark-parse';
	import remarkFrontmatter from 'remark-frontmatter';
	import remarkRehype from 'remark-rehype';
	import rehypeStringify from 'rehype-stringify';
	import TableContent from '$lib/components/TableContent.svelte';
	import { affiliate } from '$lib/data';
	import ProductCard from '$lib/components/ProductCard.svelte';

	export let data;
	let markdown = data.markdown;
	let articleData = data.metadata;

	const headers = [];
	let testTree;
	function tableOfContents(options) {
		return function (tree, file) {
			testTree = tree;

			for (let i = 0; i < tree.children.length; i++) {
				let node = tree.children[i];
				if (node.type === 'element' && node.tagName === 'h2') {
					const title = node.children[0].value;
					headers.push({
						text: title,
						id: title.replaceAll(' ', '-')
					});
					tree.children[i].properties = {
						id: node.children[0].value.replaceAll(' ', '-')
					};
				}
			}
		};
	}

	let articleHtml = unified()
		.use(remarkParse)
		.use(remarkFrontmatter, ['yaml']) // Parse frontmatter
		.use(remarkRehype)
		.use(tableOfContents)
		.use(rehypeStringify)
		.process(markdown);

	// console.log(testTree);
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
			<a href="/author/{articleData.author}">{articleData.author || 'Brian R. Foggy'}</a>
			<span class="I-seperator">|</span>
			<div>Updated on {new Date(articleData.date).toLocaleString().split(',')[0]}</div>
		</div>
	</div>

	<div>
		<!-- Todo - turn into a product's list component -->
		<!-- Todo - Suggest products based on keywords in article  -->
		<!-- Todo - Think about testing having this component versus spacing out the links in the body -->
		<div>
			<!-- <div class="productListName">Instant Relief</div>
			<div class="productList">
				{#each Object.entries(affiliate.product_map) as [key, value]}
					{#if value.length > 0}
						<div class="productCard">
							<ProductCard name={key} amznHtml={value[0]} />
						</div>
					{/if}
				{/each}
			</div> -->
		</div>
	</div>
	<TableContent {headers} />
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

	.productListName {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 1.75rem;
		font-weight: 600;
		line-height: 1.15;
		width: 100%;
		margin: 0 auto;
		padding: 0px;

		color: #212121;
	}

	.productList {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.productCard {
		width: 100%;
		max-width: 300px;
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
