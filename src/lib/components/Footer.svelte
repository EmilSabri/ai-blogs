<script>
	let navLinks = ['Brain Fog', 'Supplements', 'Lifestyle Factors', 'User Stories', 'Causes'];
	const socialLinks = [
		{ link: 'https://www.facebook.com', icon: '/facebook.svg', name: 'Facebook' },
		{ link: 'https://www.instagram.com', icon: '/instagram.svg', name: 'Instagram' },
		{ link: 'https://www.twitter.com', icon: '/twitter.svg', name: 'Twitter' },
		// { link: 'https://www.pinterest.com', icon: '/pinterest.svg', name: 'Pinterest' },
		// { link: 'https://www.youtube.com', icon: '/youtube.svg', name: 'YouTube' },
		// { link: 'https://www.linkedin.com', icon: '/linkedin.svg', name: 'LinkedIn' },
		{ link: 'https://www.tiktok.com', icon: '/tiktok.svg', name: 'TikTok' }
	];
</script>

<div class="footer-container">
	<!-- Icon -->
	<div class="footer-icon">Footer? I hardly even know her! (Put Icon + Website name here)</div>

	<!-- Email Capture -->
	<div class="email-form">
		<div>
			Join 100,000+ other like minded healthy individuals getting the weekly mind health update!
		</div>
		<input type="text" placeholder="Your email address" />
	</div>

	<!-- Nav Links -->
	<div class="footerCol">
		<ul class="footerMenu">
			{#each navLinks as link}
				<li class="footerMenuItem">
					<a href={link.replace(' ', '-')}>{link}</a>
				</li>
			{/each}
		</ul>
	</div>

	<!-- Socials -->
	<div class="footerCol">
		<div>
			<div>Follow Us</div>
			<ul class="footerSocials">
				{#each socialLinks as socialLink}
					<li class="footerSocialsItem">
						<a href={socialLink.link}>
							<img src="/svg/{socialLink.icon}" width="22" alt="Instagram Logo" />
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- Privacy Policy -->
	<div class="footerCol">
		<a class="footerPP" href="/privacy-policy">Privacy Policy</a>
	</div>
</div>

<style>
	.ul,
	li {
		list-style: none;
	}
	a {
		text-decoration: none;
		color: #000;
	}
	.footer-container {
		/* width: 100%; */
		/* padding: 0 1em; */
		margin-bottom: 3em;

		border-top: 1px solid #ccc;

		max-width: 1280px;
		padding: 0 1em;
		margin: 0 auto;
		display: flex;
		flex-direction: column;

		background-color: #ab3;
		/* color: #fff; */
	}

	.footer-icon {
		padding: 1em 0;
		border-bottom: 1px solid #ccc;
	}

	.email-form {
		padding: 1em 0;
		border-bottom: 1px solid #ccc;
	}

	.footerCol {
		align-items: center;
		/* margin-bottom: 2em; */
		margin-top: 2em;
		display: flex;
		flex-direction: row;
		justify-content: left;
	}

	.footerMenu {
		margin: -0.5em;
		padding: 0;
		display: flex;
		flex-direction: column;
	}

	.footerMenuItem {
		padding: 0.5em;

		display: flex;
		flex-direction: row;
	}

	.footerSocials {
		margin: 0 -0.75em;
		padding: 0;
		display: flex;
		flex-direction: row;
		/* margin: 0 auto; */
	}

	.footerSocialsItem {
		padding: 0 0.75em;
	}

	.footerPP {
		/*  */
		margin-bottom: 2em;
	}
</style>
