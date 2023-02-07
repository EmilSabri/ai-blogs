<script>
	import { Breadcrumbs, Header, Footer } from '$lib/components/index';
	let disableScroll = false;
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<!-- Todo - Facebook Open Graph Tags -->

	<!-- Todo - Twitter Cards -->

	<!-- Todo - Pinterest Pins -->
</svelte:head>

<div class="body-container" class:disableScroll>
	<Header bind:displayMenu={disableScroll} />
	<div class="slot-container">
		<slot />
	</div>
	<Footer />
</div>

<style>
	@import url('https://fonts.googleapis.com/css?family=Merriweather+Sans');

	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	.body-container {
		font-family: 'Merriweather Sans', 'sans-serif';
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;

		/* overflow: auto; */
		/* overflow: hidden; */

		/* display: flex;
		flex-direction: column; */
		/* justify-content: space-between;
		overflow: auto; */
		height: 100vh;
	}

	.disableScroll {
		overflow: hidden;
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
