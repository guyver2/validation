<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { AppRail } from '@skeletonlabs/skeleton';
	import { IconHome } from '@tabler/icons-svelte';
	const storeValue: Writable<number> = writable(1);
</script>

<AppRail selected={storeValue}>
	<svelte:fragment slot="lead">
		<a href="/"><IconHome /></a>
	</svelte:fragment>
	<!-- AppRailTiles -->
	<svelte:fragment slot="trail">
		<!-- AppRailTiles -->
	</svelte:fragment>
</AppRail>
