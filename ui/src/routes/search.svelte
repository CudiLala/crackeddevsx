<script lang="ts">
	import Search from '$lib/components/icons/search.svelte';

	let inputFocused = false;

	export let on: string[];

	export let q: string;
</script>

<div
	class="p-1.5 flex gap-2 w-full border-slate-300 border rounded-lg bg-white
  {inputFocused ? 'ring-2' : 'ring-0'} ring-blue-500 transition-all"
>
	<input
		class="grow px-2 font-semibold placeholder:text-neutral-500"
		placeholder="Search for jobs, companies or technologies"
		on:focus={() => (inputFocused = true)}
		on:blur={() => (inputFocused = false)}
		bind:value={q}
	/>
	<button
		class="w-10 h-10 bg-blue-600 shrink-0 rounded text-white p-2 text-4xl items-center flex justify-center"
		on:click={() => (q = '')}
	>
		-
	</button>
</div>

<div class="grid gap-2 text-neutral-600">
	<p>Search from:</p>

	<div class="grid gap-2">
		<div class="flex gap-4 items-center">
			{#if on.length == 0}
				<button class="w-6 h-6 bg-blue-500 text-white border-white border rounded">/</button>
			{:else}
				<button
					class="w-6 h-6 bg-white border-slate-300 border rounded"
					on:click={() => (on = [])}
				/>
			{/if}
			Any
		</div>

		<div class="flex gap-4 items-center">
			{#if on.includes('title')}
				<button
					class="w-6 h-6 bg-blue-500 text-white border-white border rounded"
					on:click={() => (on = on.filter((e) => e != 'title'))}>/</button
				>
			{:else}
				<button
					class="w-6 h-6 bg-white border-slate-300 border rounded"
					on:click={() => (on = [...on, 'title'])}
				/>
			{/if}
			Job title
		</div>

		<div class="flex gap-4 items-center">
			{#if on.includes('company')}
				<button
					class="w-6 h-6 bg-blue-500 text-white border-white border rounded"
					on:click={() => (on = on.filter((e) => e != 'company'))}>/</button
				>
			{:else}
				<button
					class="w-6 h-6 bg-white border-slate-300 border rounded"
					on:click={() => (on = [...on, 'company'])}
				/>
			{/if}
			Company name
		</div>

		<div class="flex gap-4 items-center">
			{#if on.includes('technologies')}
				<button
					class="w-6 h-6 bg-blue-500 text-white border-white border rounded"
					on:click={() => (on = on.filter((e) => e != 'technologies'))}>/</button
				>
			{:else}
				<button
					class="w-6 h-6 bg-white border-slate-300 border rounded"
					on:click={() => (on = [...on, 'technologies'])}
				/>
			{/if}
			Technologies
		</div>
	</div>
</div>
