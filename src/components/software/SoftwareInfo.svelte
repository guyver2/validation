<script lang="ts">
	import type { Software } from '@prisma/client';
	import { modeCurrent } from '@skeletonlabs/skeleton';

	export let sw: Software;
</script>

{#if sw}
	<section class="card p-4 bg-surface-200-700-token">
		<div class="flex flex-row gap-4">
			<div class="grid grid-cols-1">
				<p class="{$modeCurrent ? 'text-slate-600' : 'text-slate-300'} font-semibold">Id:</p>
				<p class="{$modeCurrent ? 'text-slate-600' : 'text-slate-300'} font-semibold">Name:</p>
				<p class="{$modeCurrent ? 'text-slate-600' : 'text-slate-300'} font-semibold">Status:</p>
				<p class="{$modeCurrent ? 'text-slate-600' : 'text-slate-300'} font-semibold">
					Description:
				</p>
				<p class="{$modeCurrent ? 'text-slate-600' : 'text-slate-300'} font-semibold">
					Number of releases:
				</p>
				<p class="{$modeCurrent ? 'text-slate-600' : 'text-slate-300'} font-semibold">
					Number of tests:
				</p>
			</div>
			<div class="grid grid-cols-1">
				<p class={$modeCurrent ? 'text-slate-600' : 'text-slate-300'}>{sw.id}</p>
				<p>{sw.name}</p>
				<p>{sw.status.toLowerCase()}</p>
				<p>{sw.description}</p>
				<p>{sw.releases.length}</p>
				<p>{sw.tests.length}</p>
			</div>
		</div>
	</section>
{/if}
