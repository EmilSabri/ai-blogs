<script>
	import { siteLinks } from '$lib/data';
	const socialLinks = [
		{ link: 'https://www.facebook.com', icon: '/facebook.svg', name: 'Facebook' },
		{ link: 'https://www.instagram.com', icon: '/instagram.svg', name: 'Instagram' },
		{ link: 'https://www.twitter.com', icon: '/twitter.svg', name: 'Twitter' },
		// { link: 'https://www.pinterest.com', icon: '/pinterest.svg', name: 'Pinterest' },
		// { link: 'https://www.youtube.com', icon: '/youtube.svg', name: 'YouTube' },
		// { link: 'https://www.linkedin.com', icon: '/linkedin.svg', name: 'LinkedIn' },
		{ link: 'https://www.tiktok.com', icon: '/tiktok.svg', name: 'TikTok' }
	];

	export let data;

	let email = '';
	const submitEmail = () => {
		fetch('/api/leads', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				email: email
			})
		});
	};
</script>

<div class="footer-container">
	<div class="footer">
		<!-- Icon -->
		<div class="footer-icon">{data.siteData.name}</div>

		<!-- Email Capture -->
		<!-- Todo - Capture emails into a list -->
		<div class="email-form">
			<div class="email-form__text">
				Join 1,000 other mind conscious people getting the latest updates
			</div>
			<div class="">
				<form class="email-form__wrapper" on:submit|preventDefault={submitEmail}>
					<input
						class="email-form__input"
						type="text"
						placeholder="Your email address"
						bind:value={email}
					/>
					<div class="email-form__btn" on:click={submitEmail}>SIGN UP</div>
				</form>
			</div>
		</div>

		<!-- Nav Links -->
		<div class="footerCol">
			<ul class="footerMenu">
				{#each siteLinks.nav as link}
					<li class="footerMenuItem">
						<a href={'/' + link.link}>{link.text}</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Socials -->
		<div class="footerCol">
			<div>
				<div class="footerSocials-text">Follow Us</div>
				<ul class="footerSocials">
					{#each socialLinks as socialLink}
						<li class="footerSocialsItem">
							<a href={socialLink.link}>
								<img src="/svg{socialLink.icon}" width="22" alt="Instagram Logo" loading="lazy" />
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Privacy Policy -->
		<div class="footerCol">
			<div class="footerPP">
				{#each siteLinks.footer as links}
					<a class="footerPP__item" href={'/' + links.link}>{links.text}</a>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	.ul,
	li {
		list-style: none;
	}
	a {
		text-decoration: none;
		color: white;
	}
	.footer-container {
		background: rgb(78, 134, 131);
		background: linear-gradient(
			160deg,
			rgba(78, 134, 131, 1) 1%,
			rgba(78, 134, 131, 1) 24%,
			rgba(6, 38, 37, 1) 86%
		);

		color: white;
	}
	.footer {
		/* margin-bottom: 3em; */
		max-width: 1280px;
		padding: 0 1em;
		margin: 0 auto;
		display: flex;
		flex-direction: column;

		/* color: #fff; */
	}

	.footer-icon {
		font-size: 1.3rem;
		font-weight: 600;

		padding: 1em 0;
		border-bottom: 1px solid gray;
	}

	.email-form {
		/* width: 100%; */
		padding: 1em 0;
		border-bottom: 1px solid gray;
	}

	.email-form__text {
		font-size: 1.3rem;
	}

	.email-form__wrapper {
		display: flex;
		flex-direction: row;
		/* 
		font-size: 1rem; */

		margin-top: 0.2em;
		border-radius: 1em;
	}

	.email-form__input {
		display: inline-block;
		flex: 1 1 0%;
		font-size: 1rem;
		padding: 0.8em;
		border-top-left-radius: 9px;
		border: 1px solid transparent;
		border-width: 0px;
	}

	.email-form__input::placeholder {
		font-size: 1rem;
	}

	.email-form__btn {
		display: inline-block;

		padding: 0.8em;

		color: #fff;
		background-color: rgb(211, 59, 82);
		border-top-right-radius: 0.5em;
		border-bottom-right-radius: 0.5em;
		border: 1px solid transparent;
		border-width: 0px;
		line-height: 1.15;
	}

	.footerCol {
		align-items: center;
		/* margin-bottom: 2em; */
		margin-top: 2em;
		display: flex;
		flex-direction: row;
		justify-content: left;

		padding-bottom: 1em;
		border-bottom: 1px solid gray;
	}

	.footerMenu {
		margin: -0.5em;
		padding: 0;
		display: flex;
		flex-direction: column;
	}

	.footerMenuItem {
		font-weight: 600;
		padding: 0.5em;
		color: white;
		display: flex;
		flex-direction: row;
	}

	.footerSocials-text {
		font-size: 1.2rem;
		font-weight: 600;
		padding: 0.5em 0;
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
		font-size: 0.8rem;
		/* font-weight: 600; */
		margin-bottom: 2em;

		display: flex;
		flex-direction: row;
	}

	.footerPP__item {
		border-right: 1px solid gray;
		padding: 0 0.5em;
	}

	.footerPP__item:last-child {
		border-right: none;
	}
</style>
