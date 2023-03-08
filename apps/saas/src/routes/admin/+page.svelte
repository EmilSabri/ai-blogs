<!-- Todo - Redesign the entirety of /admin when creating the user app to modify their articles.
  -->
<script>
	export let data;
</script>

Admin Page
<div class="admin" data-sveltekit-preload-data="tap">
	<div class="articles">
		<div class="list">
			<h1 class="title">Private</h1>
			{#each data.privateArticles as article}
				<a href="/admin/upload/private/{article}">{article}</a>
			{/each}
		</div>

		<div class="list">
			<h1 class="title">Public</h1>
			{#each data.publicArticles as article}
				<a href="/admin/upload/public/{article}">{article}</a>
			{/each}
		</div>
	</div>
</div>

<style>
	.admin {
		background-color: #eee;
	}

	.articles {
		background-color: #fff;
		display: flex;
		flex-direction: row;
	}

	.list {
		width: 50%;
		background-color: #fff;
		display: flex;
		flex-direction: column;
	}

	.title {
		align-items: center;
		justify-content: center;
		justify-items: center;
	}
</style>
