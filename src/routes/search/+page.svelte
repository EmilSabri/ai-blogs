<script>
	// @ts-nocheck

	export let data;
</script>

<h1>
	Search results for {data.search_params}
	{data.didFind ? '' : 'were not found. Showing all articles'}
	{#each data.articles as article}
		<div>
			<a href="/articles/{article.contentLink}">{article.title}</a>
		</div>
	{/each}
</h1>
