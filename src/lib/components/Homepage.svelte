<script>
	// @ts-nocheck
	import ArticleCard from './ArticleCard.svelte';
	export let data;

	let products = ['B12 Shots', 'Vitamin D', 'Sauna', 'Cold plunges', 'Atheltic Greens'];
	products = [...products, ...products, ...products];
</script>

<div class="homepage">
	<!-- Todo - Add hero above section promoting the quiz funnel and BrianBot -->
	<!-- <div class="hero"></div> -->
	<div class="content-list">
		<!-- Latest Article Section -->
		<!-- TODO - List top performing articles -->
		<div class="trending">
			<h3 class="sectionTitle">Trending</h3>
			<div class="trending__list">
				{#each data.articles as article}
					<ArticleCard {article} />
				{/each}
			</div>
		</div>

		<!-- Fast Relief! -->
		<!-- List of supplements / products to help with brain fog -->
		<!-- Todo - Show recent articles -->
		<!-- Small on the side of the trending section -->
		<!-- <div class="fast-relief">
			<h3 class="sectionTitle">Recent</h3>
			<div class="fast-relief__list">
				{#each products.slice(0, -2) as product}
					<div class="products">
						<div class="products__item">
							<h4>{product}</h4>
							<h3 class="">$10.99</h3>
							<p>
								Feel GREAT again with our B12 shots! Only when you experience the divinity that is
								our {product} will you understand the true meaning of life.
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div> -->
	</div>
</div>

<style>
	* {
		box-sizing: border-box;
	}

	h3,
	h4 {
		margin: 0;
	}

	.homepage {
		font-size: 1rem;
	}

	.content-list {
		/* display: grid;
		grid-template-columns: 1fr;
		gap: 1em 1.25em; */
	}

	.sectionTitle {
		margin-bottom: 1.1429em;
		padding-bottom: 0.2858em;

		font-size: 1rem;
		line-height: 1.7143;
		font-weight: 700;
		letter-spacing: 0.02em;

		border-bottom: 1px solid;
	}

	.trending__list {
		display: grid;
		grid-template-columns: 1fr;
		/* gap: 1em 1.25em; */
	}

	.products {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* align-items: flex-end; */

		margin-bottom: 0.5em;
	}

	.products__item {
		font-size: 1erem;
		/* width: 50%; */
		display: inline-block;
		background-color: lightcoral;
		/* margin: 0.5em 0; */
		padding: 0.5em 0;

		/* padding: 0.5em; */
	}

	.products__item h4 {
		font-size: 1.2rem;
		font-weight: 600;
	}

	.products__item h3 {
		font-size: 1rem;
	}

	.products__item p {
		font-size: 0.8rem;
		/* font-weight: 400; */
	}
	@media (min-width: 680px) {
		.content-list {
			display: grid;
			/* grid-template-columns: 2.1fr 0.9fr; */
			gap: 0em 1em;
			/* gap: 1em 1.25em; */
			/* justify-content: space-between; */
			/* display: grid;
			grid-template-columns: 1fr 1fr; */
		}

		.trending__list {
			/* grid-template-columns: repeat(2, 1fr); */
			grid-template-columns: 1fr 1fr;
			gap: 1em 1em;
		}
	}
</style>
