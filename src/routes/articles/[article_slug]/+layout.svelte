<script>
	import Header from '$lib/components/Header.svelte';
	import { Breadcrumbs } from '$lib/components/index';
</script>

<div class="articles-container">
	<!-- Bread crumbs Yum -->
	<!-- <Header /> -->
	<Breadcrumbs />
	<slot />
</div>

<style>
	.articles-container {
		max-width: 600px;
		margin: 0 auto;
	}
</style>
