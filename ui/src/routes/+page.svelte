<script lang="ts">
	import { onMount } from 'svelte';
	import Filter from './filter.svelte';
	import Search from './search.svelte';
	import Sort from './sort.svelte';
	import Job from './job.svelte';
	import type { PageData } from './$types';
	import { PUBLIC_API_URL } from '$env/static/public';

	export let data: PageData;

	$: jobs = data.jobs;

	let q = '';
	let on: string[] = [];
	let job_type: string[] = [];
	let degree_required: boolean | undefined = undefined;
	let minSalary = '';
	let maxSalary = '';
	let sort_by = 'created_at:desc';

	let mounted = false;

	let url = new URL('http://localhost:9000/get-jobs');

	$: updateUrl({ q, on, job_type, degree_required, minSalary, maxSalary, sort_by });

	$: fetchJobs(url);

	function updateUrl({
		q,
		on,
		job_type,
		degree_required,
		minSalary,
		maxSalary,
		sort_by
	}: {
		q: string;
		on: string[];
		job_type: string[];
		degree_required: boolean | undefined;
		minSalary: string;
		maxSalary: string;
		sort_by: string;
	}) {
		if (!mounted) return;

		let newUrl = new URL(`${PUBLIC_API_URL}/get-jobs`);
		if (q) newUrl.searchParams.set('q', q);
		if (on.length > 0) newUrl.searchParams.set('on', on.join(','));
		if (job_type.length > 0) newUrl.searchParams.set('job_type', job_type.join(','));
		if (degree_required === false) newUrl.searchParams.set('degree_required', 'false');
		if (Number(minSalary) > 0) newUrl.searchParams.set('min_salary_usd', minSalary);
		if (Number(maxSalary) > 0) newUrl.searchParams.set('max_salary_usd', maxSalary);
		if (sort_by) newUrl.searchParams.set('sort_by', sort_by);

		url = newUrl;
	}

	async function fetchJobs(url: URL) {
		if (!mounted) return;

		let res = await (await fetch(url)).json();

		jobs = res.data;
	}

	onMount(() => {
		mounted = true;
	});
</script>

<div class="max-w-screen-lg mx-auto px-5 py-3 grid gap-4 text-neutral-700 font-semibold">
	<header>
		<img src="/logo.png" alt="logo" class="flex h-10" />
	</header>

	<Search bind:q bind:on />

	<Filter bind:job_type bind:degree_required bind:minSalary bind:maxSalary />

	<Sort bind:sort_by />

	<div class="border-b border-slate-300" />

	{#each jobs as job}
		<Job {job} />
	{/each}
</div>

<svelte:head>
	<title>Cracked Devs X</title>
</svelte:head>
