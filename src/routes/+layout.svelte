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
	<div id="slot-thot" class="slot-container">
		<Header bind:displayMenu={disableScroll} />
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

		max-width: 1250px;

		margin: 0 auto;
		/* padding: 1em; */
	}

	/* Notes
		verywellmind.com
			Home page
			* Max width breakpoint at 1250px
			* General breakpoint at 550px width
			* Specific breakponts for certain componets at 750px, 1000px, 1200px

		thehustle
			Homepage
			* Max width breakpoint at 1250px
			* Specific breakpoints for certain componensts at 480px, 680px, 1000px


			Summary for home pages
			* Smaller screen forces top to bottom layout
			* As the screen gets larger then the layout changes to a left to right layout
				* Ultimately, if something looks too big, then change design to be left to right 


		Articles
			Content
			* max-width 1280 px
			* Responsive layout that works from mobile to desktop

			Components underneath the article might scale differently depending on the screen size, but
			that would be considered not the content. So it should follow a similar rule to the home page notes.
		
	*/
	/*  */
</style>
