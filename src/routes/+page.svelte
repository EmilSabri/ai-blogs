<script>
	// @ts-nocheck

	// call fetch to POST to api/articles

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

	let articleData = {
		title: 'Markdown Result Component',
		description: 'This is a test description',
		image: {
			url: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459__340.png',
			alt: 'Test Image'
		},
		author: '$user.name',
		date: new Date().toLocaleDateString(),
		tags: ['BigBootyBitches', 'Ice Cold', 'Buziness'],
		contentLink: 'Markdown-Result-Component'
	};

	let markdown = '# Header1 \n yolo';

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
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<h2>whats up</h2>

<div>
	<btn class="p-2 bg-green-700" on:click={uploadS3}>UPLOAD TO S3</btn>
</div>
