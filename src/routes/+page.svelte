<script>
	import SoftwarePreview from '../components/home/SoftwarePreview.svelte';
	import { goto } from '$app/navigation';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="container mx-8 p-8 space-y-8">
	<h1>Softwares</h1>
	<p>List of available softwares:</p>
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
	<hr />
</div>
