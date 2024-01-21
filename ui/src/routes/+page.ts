import type { PageLoad } from './$types';
import type { job } from './types';

export const load = (async () => {
	const res = await (await fetch('http://localhost:9000/get-jobs?sort_by=created_at:desc')).json();

	return { jobs: res.data as job[] };
}) satisfies PageLoad;
