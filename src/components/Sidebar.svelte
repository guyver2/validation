<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { AppRail } from '@skeletonlabs/skeleton';
	import 'iconify-icon';
	const storeValue: Writable<number> = writable(1);
</script>

<AppRail selected={storeValue}>
	<svelte:fragment slot="lead">
		<a href="/"><iconify-icon icon="mingcute:home-3-fill" class="text-[60px]" /></a>
	</svelte:fragment>
	<!-- AppRailTiles -->
	<svelte:fragment slot="trail">
		<!-- AppRailTiles -->
	</svelte:fragment>
</AppRail>
