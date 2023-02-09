<script>
	// @ts-nocheck
	import { siteLinks } from '$lib/data';
	import { tick } from 'svelte';

	export let displayMenu = false;
	let headerHeight;

	let links = siteLinks.nav;

	let searchInput;

	async function tickTock() {
		await tick();
		searchInput.focus();
	}

	function linkClick() {
		displayMenu = !displayMenu;
	}
</script>

<div id="header" class="header-container" bind:clientHeight={headerHeight}>
	<!-- Hamburger menu -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="">
		<img
			class="nav-bar-search-icon"
			src="/svg/menu-icon.svg"
			width="25px"
			alt="Navigation menu icon"
			on:click={() => {
				displayMenu = !displayMenu;
			}}
		/>
	</div>
	<!-- Logo of Website (head with clouds surrounding it) -->

	<!-- Name of Website  -->
	<div class="header__web-icon">
		<a
			href="/"
			on:click={() => {
				if (displayMenu) {
					linkClick();
				}
			}}>BrianFog</a
		>
	</div>

	<!-- Search -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<img
		class="search-icon {displayMenu ? 'disableSearch' : ''}"
		src="/svg/search-icon.svg"
		width="25px"
		alt="Search www.BrianFog.com icon"
		on:click={() => {
			displayMenu = !displayMenu;
			tickTock();
		}}
	/>
</div>

<!-- Menu (click === true) -->
<div class="nav-menu" class:displayMenu>
	<div class="search-input-container">
		<img
			class="search-input-icon"
			src="/svg/search-icon.svg"
			width="20px"
			alt="Search www.BrainFog.com icon"
		/>
		<input class="search-input" type="text" placeholder="Search" bind:this={searchInput} />
	</div>
	<ul class="nav-links">
		{#each links as link}
			<li class="nav-link">
				<a href="/{link.link}" on:click={linkClick}>{link.text}</a>
			</li>
		{/each}
	</ul>

	<!-- Todo - Add socials -->
</div>

<style>
	@import url('https://fonts.googleapis.com/css?family=Merriweather+Sans');
	input {
		border: none;
	}
	ul,
	li {
		list-style-type: none;
		padding: 0;
	}

	.header-container {
		font-family: 'Merriweather Sans', 'sans-serif';
		font-size: 1.5rem;
		font-weight: 600;
		line-height: 1.5;

		/* margin: 0.5rem 1rem; */
		/* padding-bottom: 0.5rem; */

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

		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: left;

		padding: 2em;
	}

	.disableSearch {
		visibility: hidden;
	}

	.header__web-icon a {
		text-decoration: none;
		color: black;
	}

	.search-icon {
		/* visibility: hidden; */
	}

	.search-input-container {
		/* display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center; */
		border: 1px solid #212121;
		border-radius: 1em;
		width: 80%;
		/* padding: 0.5em; */
		padding-top: 0.7em;
		padding-left: 1em;
		/* padding-bottom; */
	}

	.search-input-icon {
	}

	.search-input {
		font-size: 1rem;
		font-family: 'Merriweather Sans', 'sans-serif';
		padding: 0.5em;

		/* padding: 0.5em; */
		padding-left: 1em;
		padding-bottom: 0.5em;
		/* margin-top: 2em */
	}

	.search-input:focus {
		outline: none;
		/* font-size: 1rem; */
	}

	.search-input::placeholder {
		/* text-align: center; */
	}

	.nav-links {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: left;
	}

	.nav-link {
		padding: 1em 0;
	}

	.nav-link > a {
		text-decoration: none;
		color: inherit;

		font-size: 1.5rem;
		font-weight: 600;
	}
</style>
