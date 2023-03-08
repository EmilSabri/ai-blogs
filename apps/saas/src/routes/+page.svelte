<script lang="ts">
	import { NewSiteForm } from '$lib/components';
	import type { NewSite } from 'data';

	export let data;

	async function PostS3(formData: NewSite) {
		const response = await fetch('/api/saas', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(formData) // Stringify json object to s3
		});
	}
</script>

<NewSiteForm {PostS3} />

<style>
</style>
