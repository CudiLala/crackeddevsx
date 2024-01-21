<script>
	import PageLoader from '$lib/components/page-loader.svelte';
	import pageLoader from '$lib/stores/page-loader';
	import '../app.css';
</script>

<slot />

<PageLoader active={$pageLoader} />
