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

<div />

<style>
</style>
