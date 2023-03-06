<script>
	// @ts-nocheck
	import { Breadcrumbs, RelatedArticles, Header } from '$lib/components/blog';

	export let data;
</script>

<div class="">
	<!-- Bread crumbs Yum -->
	<!-- <Breadcrumbs /> -->
	<div class="articles-container">
		<slot />
	</div>
	<!-- Internal Links -->
	<RelatedArticles articles={data.relatedArticles} />
</div>

<style>
	.articles-container {
		max-width: 600px;
		margin: 0 auto;
	}
</style>
