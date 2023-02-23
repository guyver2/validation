<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let test;

	console.log('Testpreview', test);

	let color = '';
	switch (test.status) {
		case 'ACTIVE':
			color = 'success';
			break;
		case 'INACTIVE':
			color = 'surface';
			break;
		default:
			break;
	}
</script>

{#if test}
	<section class="card p-4 hover:bg-surface-200-700-token">
		<div class="flex flex-row gap-4">
			<h3>{test.name}</h3>
			<span class="badge text-xs variant-ghost-{color}">
				<span>{test.status.toLowerCase()}</span>
			</span>
		</div>
		<p class="text-base">{test.description}</p>
	</section>
{/if}
