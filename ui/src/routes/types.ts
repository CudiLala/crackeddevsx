export type job = {
	job_id: number;
	title: string;
	company: string;
	min_salary_usd: number | null;
	max_salary_usd: number;
	location_iso: string | null;
	job_type: string;
	degree_required: false;
	description: string;
	url: string;
	created_at: string;
	applications: number | null;
	views: number | null;
	technologies: string[] | null;
	image_url: string | null;
};
