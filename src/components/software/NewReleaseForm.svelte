<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Software } from '@prisma/client';
	import { IconCircleCheck, IconCircleX, IconAlertTriangle, IconX } from '@tabler/icons-svelte';
	import { ModeSW } from '$lib/types';

	export let ownerId: String;
	export let sw: Software;
	export let mode: ModeSW;

	const statuses = ['PENDING', 'TESTING', 'VALIDATED', 'FAILING', 'CANCELED'];
</script>

<div class="flex place-content-start items-center">
	<h1 class="">New Release for {sw.name}</h1>
</div>
<hr />
<div class="card">
	<form method="POST" use:enhance action="?/newRelease">
		<input class="input" type="hidden" id="ownerId" name="ownerId" value={ownerId} />
		<input class="input" type="hidden" id="swId" name="swId" value={sw.id} />
		<input class="input" type="hidden" id="type" name="type" value="release" />
		<!-- Card Body -->
		<div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
			<!-- Column 1 -->
			<div class="space-y-4">
				<label class="label">
					<span>Release version number</span>
					<input class="input" type="text" placeholder="X.Y.Z" id="version" name="version" />
				</label>
				<label class="label">
					<span>Planned release date</span>
					<input class="input" id="date" name="date" type="date" />
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
							mode = ModeSW.List;
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
							{#each statuses as status, i}
								<label class="flex items-center space-x-2">
									<input
										class="radio"
										type="radio"
										id="status"
										name="status"
										value={status}
										checked={i == 0}
									/>
									<p>{status}</p>
								</label>
							{/each}
						</div>
					</div>
				</fieldset>
			</div>
		</div>
	</form>
</div>
