<script lang="ts">
	let minInputFocused = false;
	let maxInputFocused = false;

	export let job_type: string[];

	export let degree_required: boolean | undefined;

	export let minSalary: string;
	export let maxSalary: string;
</script>

<div
	class="border-slate-300 border rounded-lg bg-white px-5 py-4 flex justify-between items-start gap-4"
>
	<div class="grid gap-3">
		<p class="text-neutral-900">Job Type</p>

		<div class="grid gap-2 text-neutral-600">
			<div class="flex gap-4 items-center">
				{#if job_type.includes('full_time')}
					<button
						class="w-6 h-6 bg-blue-500 text-white border-white border rounded"
						on:click={() => (job_type = job_type.filter((e) => e != 'full_time'))}>/</button
					>
				{:else}
					<button
						class="w-6 h-6 bg-white border-slate-300 border rounded"
						on:click={() => (job_type = [...job_type, 'full_time'])}
					/>
				{/if}
				Full-time
			</div>

			<div class="flex gap-4 items-center">
				{#if job_type.includes('part_time')}
					<button
						class="w-6 h-6 bg-blue-500 text-white border-white border rounded"
						on:click={() => (job_type = job_type.filter((e) => e != 'part_time'))}>/</button
					>
				{:else}
					<button
						class="w-6 h-6 bg-white border-slate-300 border rounded"
						on:click={() => (job_type = [...job_type, 'part_time'])}
					/>
				{/if}
				Part-time
			</div>

			<div class="flex gap-4 items-center">
				{#if job_type.includes('internship')}
					<button
						class="w-6 h-6 bg-blue-500 text-white border-white border rounded"
						on:click={() => (job_type = job_type.filter((e) => e != 'internship'))}>/</button
					>
				{:else}
					<button
						class="w-6 h-6 bg-white border-slate-300 border rounded"
						on:click={() => (job_type = [...job_type, 'internship'])}
					/>
				{/if}
				Internship
			</div>

			<div class="flex gap-4 items-center">
				{#if job_type.includes('freelance')}
					<button
						class="w-6 h-6 bg-blue-500 text-white border-white border rounded"
						on:click={() => (job_type = job_type.filter((e) => e != 'freelance'))}>/</button
					>
				{:else}
					<button
						class="w-6 h-6 bg-white border-slate-300 border rounded"
						on:click={() => (job_type = [...job_type, 'freelance'])}
					/>
				{/if}
				Contract / Freelance
			</div>

			<div class="flex gap-4 items-center">
				{#if job_type.includes('co_founder')}
					<button
						class="w-6 h-6 bg-blue-500 text-white border-white border rounded"
						on:click={() => (job_type = job_type.filter((e) => e != 'co_founder'))}>/</button
					>
				{:else}
					<button
						class="w-6 h-6 bg-white border-slate-300 border rounded"
						on:click={() => (job_type = [...job_type, 'co_founder'])}
					/>
				{/if}
				Co-founder
			</div>
		</div>
	</div>

	<div class="grid gap-3">
		<p class="text-neutral-900">Salary Range</p>

		<div class="flex items-center gap-2 text-neutral-600">
			<div
				class="p-1.5 flex gap-1 w-full border-slate-300 border rounded-lg bg-white items-center
      {minInputFocused ? 'ring-2' : 'ring-0'} ring-blue-500 transition-all"
			>
				<span class="text-sm shrink-0">$</span>
				<input
					class="grow flex w-full px-2 font-semibold text-neutral-700 placeholder:text-neutral-500"
					bind:value={minSalary}
					on:focus={() => (minInputFocused = true)}
					on:blur={() => (minInputFocused = false)}
				/>
			</div>
			Min
		</div>

		<div class="flex items-center gap-2 text-neutral-600">
			<div
				class="p-1.5 flex gap-1 w-full border-slate-300 border rounded-lg bg-white items-center
      {maxInputFocused ? 'ring-2' : 'ring-0'} ring-blue-500 transition-all"
			>
				<span class="text-sm shrink-0">$</span>
				<input
					class="grow flex w-full px-2 font-semibold text-neutral-700 placeholder:text-neutral-500"
					bind:value={maxSalary}
					on:focus={() => (maxInputFocused = true)}
					on:blur={() => (maxInputFocused = false)}
				/>
			</div>
			Max
		</div>
	</div>

	<div class="grid gap-3">
		<p class="text-neutral-900">Options</p>

		<div class="grid gap-2 text-neutral-600">
			<div class="flex gap-4 items-center">
				{#if degree_required === false}
					<button
						class="w-6 h-6 bg-blue-500 text-white border-white border rounded"
						on:click={() => (degree_required = undefined)}>/</button
					>
				{:else}
					<button
						class="w-6 h-6 bg-white border-slate-300 border rounded"
						on:click={() => (degree_required = false)}
					/>
				{/if}
				No degree required
			</div>
		</div>
	</div>
</div>
