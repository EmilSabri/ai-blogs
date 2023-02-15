<script>
	// @ts-nocheck

	export let headers = [];

	console.log('Table of Contents - ', headers);
</script>

<!-- Todo - Add styling make this look dope -->
<div class="toc">
	<div>Table of Contents</div>
	<div>
		<ol class="ol">
			{#each headers as header}
				<li>
					<a href="#{header.id}">{header.text}</a>
				</li>
			{/each}
		</ol>
	</div>
</div>

<style>
	.toc {
		display: inline-block;
		border: 2px solid #ccc;
		border-radius: 5px;
		padding: 1em;
	}
	.ol {
		/* list-style-type: none; */
		padding-left: 1em;
		width: 100%;
	}

	.ol li {
		margin: 0.5em 0;
	}

	.ol a {
		color: #212121;
	}
</style>
