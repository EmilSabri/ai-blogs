<script>
	// @ts-nocheck
	import { afterUpdate } from 'svelte';
	import { unified } from 'unified';
	import remarkParse from 'remark-parse';
	import remarkRehype from 'remark-rehype';
	import rehypeStringify from 'rehype-stringify';
	import MarkdownResult from '$lib/components/MarkdownResult.svelte';

	export let prefix;

	export let articleData = {
		title: 'Markdown Result Component',
		description: 'This is a test description',
		image: {
			url: 'https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459__340.png',
			alt: 'Test Image'
		},
		author: 'joe bloe',
		date: new Date().toLocaleDateString(),
		tags: ['BigBootyBitches', 'Ice Cold', 'Buziness'],
		contentLink: 'Markdown-Result-Component',
		keyword: 'keyword'
	};

	export let markdown = '';
	let articleHtml;

	afterUpdate(() => {
		articleHtml = unified()
			.use(remarkParse)
			.use(remarkRehype)
			.use(rehypeStringify)
			.process(markdown);
	});

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
				ContentType: contentType,
				prefix: prefix
			})
		});
	}

	// Todo - Modify date object when uploading to S3 to be date now() since that's the last time it's been edited
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
			{ ...articleData, contentLink: articleData.contentLink.toLocaleLowerCase() }
		);
	}

	async function swapVisibility(noMarkdown = false) {
		fetch('/api/articles', {
			method: 'PUT',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				Key: `${articleData.contentLink}/markdown.md`,
				Body: markdown,
				ContentType: 'text/markdown',
				prefix: prefix,
				noMarkdown: noMarkdown
			})
		});

		fetch('/api/articles', {
			method: 'PUT',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				Key: `${articleData.contentLink}/metadata.json`,
				Body: articleData,
				ContentType: 'application/json',
				prefix: prefix,
				noMarkdown: noMarkdown
			})
		});

		prefix = prefix === 'private' ? 'public' : 'private';
	}
</script>

<div class="">
	<h1>Upload/Update Article</h1>
	<div>
		<btn class="uploadS3" on:click={uploadS3}>Save Article</btn>
	</div>
	<div class="swap">
		<div>Currently {prefix}</div>
		<btn class="uploadS3" on:click={() => swapVisibility(false)}>
			GO {prefix === 'private' ? 'PUBLIC' : 'PRIVATE'}
		</btn>
	</div>
	<btn class="uploadS3" on:click={() => swapVisibility(true)}> Move to No-Markdown </btn>
	<div>
		<!-- If you wanna edit contentLink you gotta delete the old one -->
		<!-- <div>
			<label class="metadata-label ">Content URL: </label>
			<input class="description" type="text" bind:value={articleData.contentLink} />
		</div> -->

		<div>
			<label class="metadata-label">Title: </label>
			<input class="description" type="text" bind:value={articleData.title} />
		</div>

		<div>
			<label class="metadata-label">Description: </label>
			<input class="description" type="text" bind:value={articleData.description} />
		</div>

		<div>
			<label class="metadata-label">Image: </label>
			<div class="flex flex-col">
				<input class="description" type="text" bind:value={articleData.image.url} />
				<input class="description" type="text" bind:value={articleData.image.alt} />
			</div>
		</div>
	</div>
	<div class="markdown-editor">
		<div>
			<!-- Markdown Editor -->
			<div class="markdown-editor__panel mr-10 border-2 border-red-800">
				<textarea
					class="markdown-editor__textarea"
					bind:value={markdown}
					rows="3"
					placeholder="Enter Markdown"
				/>
			</div>
		</div>
		<!-- HTML Output -->
		<div class="markdown-output border-2 border-black">
			{#await articleHtml then value}
				<MarkdownResult {articleData}>
					{@html value}
				</MarkdownResult>
			{/await}
		</div>
	</div>
</div>

<style>
	.description {
		/* width: 500px;
		height: 400px; */
		width: 100%;
	}
	.markdown-editor {
		display: flex;

		justify-content: space-between;
		box-sizing: border-box;
	}

	.markdown-editor__panel {
		width: 500px;
		height: 400px;
		box-sizing: inherit;
	}

	.markdown-editor__textarea {
		width: 500px;
		height: 100%;
		margin: 0;

		padding: 1em 2em;
	}

	.markdown-output {
		width: 800px;
		height: 100%;
		overflow-y: scroll;
	}

	.metadata-label {
		margin-right: 4em;
	}

	.uploadS3 {
		padding: 0.1em;
		background-color: greenyellow;
	}

	.swap {
		margin: 0.5em;
	}
</style>
