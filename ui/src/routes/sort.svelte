<script lang="ts">
	import CaretDown from '$lib/components/icons/caret_down.svelte';

	export let sort_by: string;

	let sortArr = sort_by.split(':');

	$: updateSortBy(sortArr);

	let sortDD = false;
	let orderDD = false;

	function updateSortBy(sortArr: string[]) {
		sort_by = sortArr.join(':');
	}

	let sortMap: { [key: string]: string } = {
		created_at: 'Date posted',
		views: 'Views',
		applications: 'Applications',
		salary: 'Salary',
		desc: 'Descending',
		asc: 'Ascending'
	};
</script>

<div class="flex gap-4">
	<div class="relative z-10">
		<button
			class="border-slate-300 border rounded-lg bg-white px-5 py-2 w-48 flex justify-between gap-4"
			on:click={() => {
				sortDD = !sortDD;
				orderDD = false;
			}}
		>
			<span>{sortMap[sortArr[0]]}</span>
			<span class="flex w-6 h-6"><CaretDown /></span>
		</button>

		{#if sortDD}
			<div
				class="absolute z-10 top-[calc(100%+0.25rem)] text-neutral-600 text-sm shadow border rounded-lg overflow-hidden grid py-1 bg-white"
			>
				<button
					class="border-slate-300 bg-white px-5 py-2 w-48 text-left hover:bg-neutral-200 transition"
					on:click={() => {
						sortArr[0] = 'created_at';
						sortDD = false;
					}}
				>
					Date posted
				</button>

				<button
					class="border-slate-300 bg-white px-5 py-2 w-48 text-left hover:bg-neutral-200 transition"
					on:click={() => {
						sortArr[0] = 'applications';
						sortDD = false;
					}}
				>
					Application
				</button>

				<button
					class="border-slate-300 bg-white px-5 py-2 w-48 text-left hover:bg-neutral-200 transition"
					on:click={() => {
						sortArr[0] = 'views';
						sortDD = false;
					}}
				>
					Views
				</button>

				<button
					class="border-slate-300 bg-white px-5 py-2 w-48 text-left hover:bg-neutral-200 transition"
					on:click={() => {
						sortArr[0] = 'salary';
						sortDD = false;
					}}
				>
					Salary
				</button>
			</div>
		{/if}
	</div>

	<div class="relative z-10">
		<button
			class="border-slate-300 border rounded-lg bg-white px-5 py-2 w-44 flex justify-between gap-4"
			on:click={() => {
				sortDD = false;
				orderDD = !orderDD;
			}}
		>
			<span>{sortMap[sortArr[1]]}</span>
			<span class="flex w-6 h-6"><CaretDown /></span>
		</button>

		{#if orderDD}
			<div
				class="absolute z-10 top-[calc(100%+0.25rem)] text-neutral-600 text-sm shadow border rounded-lg overflow-hidden grid py-1 bg-white"
			>
				<button
					class="border-slate-300 bg-white px-5 py-2 w-44 text-left hover:bg-neutral-200 transition"
					on:click={() => {
						sortArr[1] = 'asc';
						orderDD = false;
					}}
				>
					Ascending
				</button>

				<button
					class="border-slate-300 bg-white px-5 py-2 w-44 text-left hover:bg-neutral-200 transition"
					on:click={() => {
						sortArr[1] = 'desc';
						orderDD = false;
					}}
				>
					Descending
				</button>
			</div>
		{/if}
	</div>
</div>
