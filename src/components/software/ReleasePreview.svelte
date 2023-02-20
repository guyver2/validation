<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let release;

	let color = '';
	switch (release.status) {
		case 'PENDING':
			color = 'secondary';
			break;
		case 'TESTING':
			color = 'tertiary';
			break;
		case 'VALIDATED':
			color = 'success';
			break;
		case 'FAILING':
			color = 'error';
			break;
		case 'CANCELED':
			color = 'surface';
			break;
		default:
			break;
	}
</script>

{#if release}
	<section class="card p-4">
		<div class="flex flex-row gap-4">
			<h3>Version {release.version}</h3>
			<span class="badge variant-ghost-{color}">
				<span>{release.status.toLowerCase()}</span>
			</span>
		</div>
		<p class="text-base">{release.builds.length} builds{release.builds.length > 0 ? 's' : ''}</p>
		<p class="text-base">
			{release.protocols.length} validation protocols{release.protocols.length > 0 ? 's' : ''}
		</p>
	</section>
{/if}
