<script>
	import { Breadcrumbs, Header, Footer } from '$lib/components/index';
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<!-- Todo - Facebook Open Graph Tags -->

	<!-- Todo - Twitter Cards -->

	<!-- Todo - Pinterest Pins -->
</svelte:head>

<div class="body-container">
	<Header />
	<div class="slot-container">
		<slot />
	</div>
	<Footer />
</div>

<style>
	@import url('https://fonts.googleapis.com/css?family=Merriweather+Sans');
	.body-container {
		font-family: 'Merriweather Sans', 'sans-serif';
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
	}
	.slot-container {
		font-family: 'Merriweather Sans', 'sans-serif';
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;

		max-width: 1280px;

		margin: 0 auto;
		padding: 1em;
	}
</style>
