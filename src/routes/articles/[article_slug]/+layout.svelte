<script>
	import { Breadcrumbs } from '$lib/components/index';
</script>

<div class="articles-container">
	<!-- Bread crumbs Yum -->
	<Breadcrumbs />
	<slot />
</div>

<style>
	.articles-container {
		max-width: 750px;
		margin: 0 auto;
	}
</style>
