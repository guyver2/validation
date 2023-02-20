<script lang="ts">
	import type { Software } from '@prisma/client';

	/** @type {import('./$types').PageData} */
	export let sw: Software;
</script>

{#if sw}
	<section class="card p-4">
		<div class="flex flex-row gap-4">
			<div class="grid grid-cols-1">
				<p class="text-slate-600 font-semibold">Id:</p>
				<p class="text-slate-600 font-semibold">Name:</p>
				<p class="text-slate-600 font-semibold">Status:</p>
				<p class="text-slate-600 font-semibold">Description:</p>
				<p class="text-slate-600 font-semibold">Number of releases:</p>
				<p class="text-slate-600 font-semibold">Number of tests:</p>
			</div>
			<div class="grid grid-cols-1">
				<p class="text-slate-600">{sw.id}</p>
				<p>{sw.name}</p>
				<p>{sw.status.toLowerCase()}</p>
				<p>{sw.description}</p>
				<p>{sw.releases.length}</p>
				<p>{sw.tests.length}</p>
			</div>
		</div>
		<!-- <div class="flex flex-row gap-4">
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
		<p class="text-base">{sw.releases.length} release{sw.releases.length > 0 ? 's' : ''}</p> -->
	</section>
{/if}

<style>
	.mygrid {
		grid-template-columns: 1fr 8fr;
	}
</style>
