<script>
	import Header from '$lib/components/Header.svelte';

	export let data;
	let markdown = data.markdown;
	// let articleData = data.metadata;

	let articleData = {
		title: 'The Manhattan high-rise that shrunk itself down',
		description:
			'In 1986, a New York zoning activist made a startling discovery: A newly constructed building was over a dozen floors too high. What followed was one of the strangest outcomes in the history of big-city housing.',
		image: {
			url: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459__340.png',
			alt: 'Test Image'
		},
		author: 'Brian Foggy',
		date: 'February 5, 2023',
		tags: ['BigBootyBitches', 'Ice Cold', 'Buziness'],
		contentLink: 'Markdown-Result-Component'
	};
</script>

<div>
	<h1>{articleData.title}</h1>
	<p class="description">{articleData.description}</p>
	<img
		src="https://thehustle.co/wp-content/uploads/2023/02/header.gif"
		alt={articleData.image.alt}
	/>
	<div class="article-meta">
		<a href="/author/{articleData.author}">{articleData.author}</a>
		<span class="I-seperator">|</span>
		<div>Updated on {articleData.date}</div>
	</div>

	<!-- Todo - Table of Contents based on the headers within the body -->

	<h2>Sub title 1</h2>
	<p>
		In the fall of 1992, residents of the Upper East Side of Manhattan could not escape the sense
		that they were witnessing history.
	</p>

	<h2>Sub title 2</h2>
	<p>This is the second body of the article. Here I'll put some more lines</p>
	<p>
		In the fall of 1992, residents of the Upper East Side of Manhattan could not escape the sense
		that they were witnessing history. In the fall of 1992, residents of the Upper East Side of
		Manhattan could not escape the sense that they were witnessing history.
	</p>

	<h2>Sub title 2</h2>
	<p>This is the second body of the article. Here I'll put some more lines</p>
	<p>
		After a five-year legal battle, in which Algin Management begged the city, including then-Mayor
		Ed Koch, for forgiveness, New York imposed the maximum penalty: Ginsberg was going to need to.
	</p>
</div>

<style>
	/* Todo - Pick font family for title and headers */
	/* Todo - Pick font family that allows modifying the weights */
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
		font-size: 1.5rem;
		font-weight: 600;
		line-height: 1.15;

		margin: 0px;
		margin-top: 2rem;
		padding: 0px;

		color: #212121;
	}

	img {
		aspect-ratio: 600 / 450;
		width: 100%;

		margin: 0px;
		padding: 0px;
	}

	p {
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.75;

		margin: 1em 0px;
		padding: 0px;

		color: #212121;
	}

	/* author, last date edited, and tags */
	.article-meta {
		font-size: 0.875rem;
		font-weight: 600;
		line-height: 1;

		margin: 0px;
		margin-bottom: 2em;
		padding: 1em 0px;

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
