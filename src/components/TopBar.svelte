<script lang="ts">
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import { IconHome } from '@tabler/icons-svelte';
	import { goto } from '$app/navigation';
	import { breadcrumb } from '$lib/store';
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<div
			on:click={() => {
				goto('/');
			}}
			on:keypress={() => {
				goto('/');
			}}
			class="cursor-pointer"
		>
			<IconHome size={60} stroke={1} />
		</div>
	</svelte:fragment>
	<ol class="breadcrumb">
		{#each $breadcrumb as crumb, i}
			<!-- If crumb index is less than the breadcrumb length minus 1 -->
			{#if i < $breadcrumb.length - 1}
				<li class="crumb"><a href={crumb.link}>{crumb.label}</a></li>
				<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			{:else}
				<li class="crumb">{crumb.label}</li>
			{/if}
		{/each}
	</ol>
	<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>
