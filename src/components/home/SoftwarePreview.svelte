<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let sw;
</script>

{#if sw}
	<section class="card p-4 hover:bg-surface-200-700-token">
		<div class="flex flex-row gap-4">
			<h3>{sw.name}</h3>
			<span class="badge variant-ghost-{sw.status == 'ACTIVE' ? 'success' : 'warning'}">
				{sw.status.toLowerCase()}
			</span>
		</div>
		<p>{sw.description}</p>
		<p class="text-base">{sw.releases.length} release{sw.releases.length > 0 ? 's' : ''}</p>
	</section>
{/if}
