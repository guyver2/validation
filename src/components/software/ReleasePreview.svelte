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
	<section class="card p-4 hover:bg-surface-200-700-token">
		<div class="flex flex-row gap-4">
			<h3>Version {release.version}</h3>
			<span class="badge variant-ghost-{color} text-xs">
				{release.status.toLowerCase()}
			</span>
		</div>
		<p class="text-base">{release.builds.length} builds{release.builds.length > 0 ? 's' : ''}</p>
		<p class="text-base">
			{release.protocols.length} validation protocols{release.protocols.length > 0 ? 's' : ''}
		</p>
	</section>
{/if}

<!-- <div class="grid grid-cols-1 gap-4 text-center text-xs font-bold">
	<p>Ghost</p>
	<div><span class="badge variant-ghost-primary">primary</span></div>
	<div><span class="badge variant-ghost-secondary">secondary</span></div>
	<div><span class="badge variant-ghost-tertiary">tertiary</span></div>
	<div><span class="badge variant-ghost-success">success</span></div>
	<div><span class="badge variant-ghost-warning">warning</span></div>
	<div><span class="badge variant-ghost-error">error</span></div>
	<div><span class="badge variant-ghost-surface">surface</span></div>
</div> -->
