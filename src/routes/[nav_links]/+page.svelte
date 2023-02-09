<script>
	// @ts-nocheck
	import { siteLinks } from '$lib/data';
	import { About } from '$lib/components';

	const navLinks = siteLinks.nav.map((link) => link.text);

	export let data;
	// Todo - Create components for urls in nav_links and one for about, contact, pravicy policy, and terms of service
</script>

<h1>Hello from {data.url}</h1>

{#if navLinks.includes(data.url)}
	<!-- NavLink Type Component - Display all posts with the tag {data.url} -->
	<!-- <NavLink tag={data.url} /> -->
{/if}

<!-- Not sure if  -->
{#if data.url === 'about'}
	<!-- About Type Component -->
	<About />
{/if}

{#if data.url === 'contact'}
	<!-- Contact Type Component -->
	<!-- <Contact /> -->
{/if}

{#if data.url === 'privacy-policy'}
	<!-- Privacy Policy Type Component -->
	<!-- <Privacy /> -->
{/if}

{#if data.url === 'terms-of-service'}
	<!-- Terms of Service Type Component -->
	<!-- <Terms of Service /> -->
{/if}
