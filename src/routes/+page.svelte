<script>
	// @ts-nocheck
	import { ArticleCard } from '$lib/components/index';

	export let data;

	// call fetch to POST an article to api/articles
	function postArticles(contentType, key, body) {
		return fetch('/api/articles', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				Key: key,
				Body: body,
				ContentType: contentType
			})
		});
	}

	async function uploadS3() {
		// Upload markdown
		const responseMd = await postArticles(
			'text/markdown',
			`${articleData.contentLink}/markdown.md`,
			markdown
		);

		// Upload metadata
		const responseMeta = await postArticles(
			'application/json',
			`${articleData.contentLink}/metadata.json`,
			articleData
		);
	}

	let markdown = '# Header1 \n yolo';

	let articleData = {
		title: 'Markdown Result Component',
		description: 'This is a test description',
		image: {
			url: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459__340.png',
			alt: 'Test Image'
		},
		author: 'Brian R. Feldman',
		date: new Date().toLocaleDateString(),
		tags: ['BigBootyBitches', 'Ice Cold', 'Buziness'],
		contentLink: 'Markdown-Result-Component'
	};
</script>

<div class="homepage">
	<!-- Latest Article Section -->
	<div class="">
		<h3 class="sectionTitle">The Juiciest</h3>
		<div class="articleGrid articleGridOuter">
			{#each data.articles as article}
				<ArticleCard {article} />
			{/each}
		</div>
	</div>
</div>

<style>
	.homepage {
		display: flex;
		flex-direction: column;
	}

	.sectionTitle {
		margin-bottom: 1.1429em;
		padding-bottom: 0.2858em;

		font-size: 0.875rem;
		line-height: 1.7143;
		font-weight: 700;
		letter-spacing: 0.02em;

		border-bottom: 1px solid;
	}

	.articleGrid {
		display: grid;
		grid-template-columns: 1fr;
		/* gap: 1em 1.25em; */
	}
</style>
