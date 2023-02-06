<script>
	// @ts-nocheck

	export let displayMenu = false;
	let headerHeight;

	console.log(headerHeight);
</script>

<div id="header" class="header-container" bind:clientHeight={headerHeight}>
	<!-- Hamburger menu -->
	<div
		class=""
		on:click={() => {
			displayMenu = !displayMenu;
			console.log(displayMenu);
		}}
	>
		<img src="/svg/menu-icon.svg" width="25px" alt="Navigation menu icon" />
	</div>
	<!-- Logo of Website (head with clouds surrounding it) -->

	<!-- Name of Website  -->
	<div>BrianFog</div>

	<!-- Search -->
	<img src="/svg/search-icon.svg" width="25px" alt="Search www.BrianFog.com icon" />
</div>

<!-- Menu (click === true) -->
<div class="nav-menu" style="" class:displayMenu>
	<div>asdf</div>
	<div>Home</div>
	<div>Articles</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css?family=Merriweather+Sans');
	.header-container {
		font-family: 'Merriweather Sans', 'sans-serif';
		font-size: 1.5rem;
		font-weight: 600;
		line-height: 1.5;

		padding: 0.5rem 1rem;

		display: flex;
		flex-direction: row;
		justify-content: space-between;

		/* border-bottom: 2px solid #212121; */
		border-bottom: 1px solid #212121;
		box-shadow: 0 3px 4px rgba(0, 0, 0, 0.08);
	}

	.nav-menu {
		display: none;
		position: fixed;
		width: 100%;
		height: 100vh;
		max-height: 100vh;

		background-color: white;
	}

	.displayMenu {
		display: block;
		visibility: visible !important;
		opacity: 1;
	}
</style>
