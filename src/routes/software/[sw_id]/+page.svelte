<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import SoftwareInfo from '../../../components/software/SoftwareInfo.svelte';
	import ReleasePreview from '../../../components/software/ReleasePreview.svelte';
	import TestPreview from '../../../components/software/TestPreview.svelte';
	import { goto } from '$app/navigation';
	import { setCrumbs } from '$lib/store';
	import { ModeSW } from '$lib/types';
	import {
		IconVersions,
		IconList,
		IconCircleCheck,
		IconCircleX,
		IconAlertTriangle,
		IconX
	} from '@tabler/icons-svelte';
	import { enhance } from '$app/forms';
	import NewReleaseForm from '../../../components/software/NewReleaseForm.svelte';
	import NewTestForm from '../../../components/software/NewTestForm.svelte';

	export let data: PageData;
	export let form: ActionData | undefined;

	setCrumbs({ name: data.software?.name ?? '', id: data.software?.id ?? '' });
	let tabSet: number = 0;

	let mode = ModeSW.List;
	if (form && !form.success) {
		if (form.type == 'release') {
			mode = ModeSW.NewRelease;
		} else {
			mode = ModeSW.NewTest;
		}
	}
</script>

<div class="container mx-8 p-8 space-y-8">
	{#if mode == ModeSW.List || form?.success}
		<div class="flex place-content-between items-center">
			<h1>{data.software?.name}</h1>
			<div class="flex gap-4">
				<button
					class="btn bg-primary-500"
					on:click={() => {
						form = undefined;
						mode = ModeSW.NewRelease;
					}}
				>
					<span><IconVersions /></span>
					<span>New Release</span>
				</button>
				<button
					class="btn bg-primary-500"
					on:click={() => {
						form = undefined;
						mode = ModeSW.NewTest;
					}}
				>
					<span><IconList /></span>
					<span>New Test</span>
				</button>
			</div>
		</div>
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
					<div class="container mx-0 p-0 space-y-8">
						{#each data.tests as test}
							<div
								class="cursor-pointer"
								on:click={() => {
									goto(`/software/${data.software?.id}/test/${test.id}`);
								}}
								on:keypress={() => {
									goto(`/software/${data.software?.id}/test/${test.id}`);
								}}
							>
								<TestPreview {test} />
							</div>
						{/each}
					</div>
				{:else if tabSet === 2}
					<SoftwareInfo sw={data.software} />
				{/if}
			</svelte:fragment>
		</TabGroup>
	{:else if mode == ModeSW.NewRelease}
		<NewReleaseForm sw={data.software} ownerId={'cle4p50ek0000fleco8bdnm3v'} bind:mode />
	{:else}
		<NewTestForm sw={data.software} ownerId={'cle4p50ek0000fleco8bdnm3v'} bind:mode />
	{/if}
</div>
