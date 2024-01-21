<script lang="ts">
	import CaretRight from '$lib/components/icons/caret_right.svelte';
	import type { job } from './types';

	export let job: job;
</script>

<div>
	<div class="flex gap-4 tracking-tight items-center py-2 flex-wrap">
		<div class="w-20 h-20 flex rounded-full overflow-hidden">
			<img
				src={job.image_url}
				alt=""
				class="w-full h-full flex bg-gray-200 object-cover object-center"
			/>
		</div>

		<div class="flex flex-col space-y-2.5 items-start">
			<h3 class="">{job.company}</h3>
			<h2 class="font-bold text-xl tracking-tighter text-neutral-800">{job.title}</h2>

			<div class="flex gap-4">
				<div class="flex text-slate-500 text-sm px-2 py-1 rounded-full bg-neutral-200">
					<div>💰 {job.min_salary_usd || '0'} - {job.max_salary_usd || '***'}</div>
				</div>
				<div class="flex text-slate-500 text-sm px-2 py-1 rounded-full bg-neutral-200">
					<div>{job.applications} applications</div>
				</div>
				<div class="flex text-slate-500 text-sm px-2 py-1 rounded-full bg-neutral-200">
					<div>{job.views} views</div>
				</div>
			</div>

			<div class="flex gap-4">
				{#each job.technologies || [] as tech}
					<div class="flex text-slate-600 text-sm px-3 py-1.5 rounded-full bg-slate-200 flex-wrap">
						<div>{tech}</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="h-full grow flex items-center justify-end">
			<a
				class="flex text-slate-100 text-sm px-4 py-2 rounded-full bg-blue-600 gap-2 items-center"
				href={job.url}
				target="_blank"
			>
				<span>Apply Now</span>
				<span class="w-5 h-5 flex">
					<CaretRight />
				</span>
			</a>
		</div>
	</div>
</div>

<div class="border-b border-slate-300" />
