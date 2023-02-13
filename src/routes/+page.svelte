<script>
	// @ts-nocheck
	import { Homepage } from '$lib/components';

	export let data;
</script>

<div class="home-wrapper">
	<Homepage {data} />
</div>

<style>
	.home-wrapper {
		margin: 1em;
	}
</style>
