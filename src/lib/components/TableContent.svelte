<script>
	// @ts-nocheck

	export let headers = [];

	console.log('Table of Contents - ', headers);
</script>

<div>
	<div>Table of Contents</div>
	<div>
		<ol>
			{#each headers as header}
				<li>
					<a href="#{header.id}">{header.text}</a>
				</li>
			{/each}
		</ol>
	</div>
</div>

<style>
</style>
