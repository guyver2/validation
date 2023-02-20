<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let sw;
</script>

{#if sw}
	<section class="card p-4">
		<div class="flex flex-row gap-4">
			<h3>{sw.name}</h3>
			<span class="badge variant-ghost-{sw.status == 'ACTIVE' ? 'success' : 'warning'}">
				<span>{sw.status.toLowerCase()}</span>
				<iconify-icon
					icon={sw.status == 'ACTIVE'
						? 'ic:baseline-check-circle-outline'
						: 'ic:sharp-do-not-disturb'}
					class="text-sm"
				/>
			</span>
		</div>
		<p>{sw.description}</p>
		<p class="text-base">{sw.releases.length} release{sw.releases.length > 0 ? 's' : ''}</p>
	</section>
{/if}
