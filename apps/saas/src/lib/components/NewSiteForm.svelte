<script lang="ts">
	// import '/src/app.css';
	import type { Content, NewSite, Social, Author, Gtag } from 'data';

	export let PostS3: (formData: NewSite) => void;
	const formData = {} as NewSite;
	const content = {} as Content;
	const author = {} as Author;

	let domain = '';
	let siteName = '';
	let logo = '';
	let contentKeywords = ''; // Seperate into list by comma
	let authorName = '';
	let gtagId = '';

	function submitNewSite() {
		formData.domain = domain;
		formData.name = siteName;
		formData.logo = logo;
		formData.content = { keywords: contentKeywords.split(',').map((keyword) => keyword.trim()) };
		formData.authors = [{ name: authorName }];
		formData.gtag = { id: gtagId };

		// Submit to S3
		console.log(formData);
		PostS3(formData);
	}
</script>

<h1>Welcome to AI Blogs SaaS</h1>
<div class="w-full">
	<form on:submit|preventDefault={submitNewSite} class="flex flex-col items-center">
		<input type="text" placeholder="Domain Name + TLD" bind:value={domain} required />
		<input type="text" placeholder="Site Name" bind:value={siteName} required />
		<input type="text" placeholder="Logo" bind:value={logo} required />
		<input type="text" placeholder="Content Keywords" bind:value={contentKeywords} required />
		<input type="text" placeholder="Author Name" bind:value={authorName} required />
		<input type="text" placeholder="Gtag ID : G-FJ2I12391" bind:value={gtagId} required />

		<button type="submit">Submit</button>
	</form>
</div>

<style>
	form input {
		margin: 0.5rem 0;
		border: 1px solid black;
	}
</style>
