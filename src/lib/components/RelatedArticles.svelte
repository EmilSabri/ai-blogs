<script>
	export let articles = [];
</script>

<div>
	<div class="title">Related Articles</div>
	{#each articles as article}
		<div>
			<a href="/articles/{article.contentLink}" data-sveltekit-reload>
				<!-- <img class="test-img" src={article.image?.url} alt={article.image.alt} loading="lazy" /> -->
				<h3>{article.title}</h3>
			</a>
		</div>
	{/each}
</div>

<style>
	.title {
		font-size: 1.25rem;
		line-height: 1.3571;
		font-weight: 700;
		margin-bottom: 0.1667em;

		border-bottom: 1px solid #212121;
	}
</style>
