<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import SoftwarePreview from '../components/home/SoftwarePreview.svelte';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { setCrumbs } from '$lib/store';
	import {
		IconApiApp,
		IconCircleCheck,
		IconCircleX,
		IconAlertTriangle,
		IconX
	} from '@tabler/icons-svelte';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData | undefined;

	setCrumbs();

	let creation = false;
	if (form && !form.success) {
		creation = true;
	}
</script>

<div class="container mx-8 p-8 space-y-8">
	{#if !creation || form?.success}
		<div class="flex place-content-between items-center">
			<div class="flex flex-col">
				<h1>Softwares</h1>
				<p>List of available softwares:</p>
			</div>
			<button
				class="btn bg-primary-500"
				on:click={() => {
					form = undefined;
					creation = true;
				}}
			>
				<span><IconApiApp /></span>
				<span>New Software</span>
			</button>
		</div>
		<hr />
		{#each data.software as sw}
			<div
				class="cursor-pointer"
				on:click={() => {
					goto(`/software/${sw.id}`);
				}}
				on:keypress={() => {
					goto(`/software/${sw.id}`);
				}}
			>
				<SoftwarePreview {sw} />
			</div>
		{/each}
	{:else}
		{#if form && !form.success && !form.seen}
			<center>
				<aside class="alert variant-ghost-error w-1/2" transition:fade|local={{ duration: 200 }}>
					<div class="flex place-content-between w-full">
						<div class="flex items-center gap-4">
							<IconAlertTriangle size={42} />
							<div class="alert-message">
								<h3>Error</h3>
								<p>Invalid input</p>
							</div>
						</div>
						<div class="alert-actions">
							<button
								class="btn variant-ghost aspect-square rounded-full p-2"
								on:click={() => {
									form.seen = true;
								}}
							>
								<IconX size={30} />
							</button>
						</div>
					</div>
				</aside>
			</center>
		{/if}
		<div class="flex place-content-start items-center">
			<h1 class="">New Software</h1>
		</div>
		<hr />
		<div class="card">
			<form method="POST" use:enhance>
				<input
					class="input"
					type="hidden"
					id="ownerId"
					name="ownerId"
					value="cle4p50ek0000fleco8bdnm3v"
				/>
				<!-- Card Body -->
				<div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
					<!-- Column 1 -->
					<div class="space-y-4">
						<label class="label">
							<span>Software name</span>
							<input class="input" type="text" placeholder="name" id="name" name="name" />
						</label>
						<label class="label">
							<span>Description</span>
							<textarea
								class="textarea"
								rows="4"
								placeholder="Software description."
								id="description"
								name="description"
							/>
						</label>
						<div class="flex flex-row gap-4">
							<button type="submit" class="btn bg-primary-500">
								<span><IconCircleCheck /></span>
								<span>Save</span>
							</button>
							<button
								type="button"
								class="btn bg-error-500"
								on:click={() => {
									creation = false;
								}}
							>
								<span><IconCircleX /></span>
								<span>Cancel</span>
							</button>
						</div>
					</div>
					<!-- Column 2 -->
					<div class="space-y-4">
						<fieldset>
							<div class="label">
								<p>Status</p>
								<div class="space-y-2">
									<label class="flex items-center space-x-2">
										<input
											class="radio"
											type="radio"
											checked
											id="status"
											name="status"
											value="ACTIVE"
										/>
										<p>ACTIVE</p>
									</label>
									<label class="flex items-center space-x-2">
										<input class="radio" type="radio" id="status" name="status" value="INACTIVE" />
										<p>INACTIVE</p>
									</label>
								</div>
							</div>
						</fieldset>
					</div>
				</div>
			</form>
		</div>
	{/if}
	<hr />
</div>
