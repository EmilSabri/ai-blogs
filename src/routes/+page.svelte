<script>
	// @ts-nocheck
	import { Homepage } from '$lib/components/index';

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
		author: 'Brian R. Foggy',
		date: new Date().toLocaleDateString(),
		tags: ['BigBootyBitches', 'Ice Cold', 'Buziness'],
		contentLink: 'Markdown-Result-Component'
	};

	async function generateArticle() {
		const keyword = 'hypothyroidism brain fog';
		const respKeywords = await fetch('/api/keywords');
		const keywords = await respKeywords.json();

		for (let i = 0; i < keywords.length; i++) {
			const respOpenAi = await fetch('/api/openai', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					keyword: keywords[i]
				})
			});

			let body = await respOpenAi.json();

			console.log(i, keywords[i], body.metadata.contentLink);

			// Gotta set these before calling to uploadS3
			// Should prolly just pass these values into the function
			markdown = body.markdown;
			articleData = body.metadata;
			uploadS3();
		}
	}
</script>

<div class="home-wrapper">
	<Homepage {data} />
</div>

<style>
	.home-wrapper {
		margin: 1em;
	}
</style>
