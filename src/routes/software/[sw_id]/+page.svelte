<script lang="ts">
	import type { PageData } from './$types';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import SoftwareInfo from '../../../components/software/SoftwareInfo.svelte';
	import ReleasePreview from '../../../components/software/ReleasePreview.svelte';

	import { goto } from '$app/navigation';

	export let data: PageData;
	let tabSet: number = 0;

	console.log(data);
</script>

<div class="container mx-8 p-8 space-y-8">
	<h1>{data.software?.name}</h1>
	<hr />
	<TabGroup>
		<!-- (list of tabs) --->
		<Tab bind:group={tabSet} name="tab2" value={0}>Releases</Tab>
		<Tab bind:group={tabSet} name="tab3" value={1}>Tests</Tab>
		<Tab bind:group={tabSet} name="tab1" value={2}>Infos</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<div class="container mx-0 p-0 space-y-8">
					{#each data.releases as release}
						<div
							class="cursor-pointer"
							on:click={() => {
								goto(`/software/${data.software?.id}/release/${release.id}`);
							}}
							on:keypress={() => {
								goto(`/software/${data.software?.id}/release/${release.id}`);
							}}
						>
							<ReleasePreview {release} />
						</div>
					{/each}
				</div>
			{:else if tabSet === 1}
				(tab panel 2 contents)
			{:else if tabSet === 2}
				<SoftwareInfo sw={data.software} />
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
