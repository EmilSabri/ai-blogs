<script>
	import EditArticle from '$lib/components/EditArticle.svelte';

	export let data;
	let articleData = data.metadata;
	let markdown = data.markdown;
</script>

<EditArticle prefix={data.visible} {articleData} {markdown} />

<style>
</style>
