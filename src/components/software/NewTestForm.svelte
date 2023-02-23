<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Software } from '@prisma/client';
	import { IconCircleCheck, IconCircleX, IconAlertTriangle, IconX } from '@tabler/icons-svelte';
	import { ModeSW } from '$lib/types';

	export let ownerId: String;
	export let sw: Software;
	export let mode: ModeSW;

	const statuses = ['ACTIVE', 'INACTIVE'];
</script>

<div class="flex place-content-start items-center">
	<h1 class="">New Test for {sw.name}</h1>
</div>
<hr />
<div class="card">
	<form method="POST" use:enhance>
		<input class="input" type="hidden" id="ownerId" name="ownerId" value={ownerId} />
		<input class="input" type="hidden" id="swId" name="swId" value={sw.id} />
		<input class="input" type="hidden" id="type" name="type" value="test" />
		<!-- Card Body -->
		<div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
			<!-- Column 1 -->
			<div class="space-y-4">
				<label class="label">
					<span>Test name</span>
					<input class="input" type="text" placeholder="name" id="name" name="name" />
				</label>
				<label class="label">
					<span>Description</span>
					<textarea
						class="textarea"
						rows="4"
						placeholder="Test description."
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
