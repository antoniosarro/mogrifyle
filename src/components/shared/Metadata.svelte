<script lang="ts">
	import { page } from '$app/stores';
	import { routes, type Route } from '$data/routes';
	import { MetaTags } from 'svelte-meta-tags';

	const getRouteMeta = (pathname: string): Route => {
		const route = routes.find((route) => route.url.endsWith(pathname));
		if (!route) {
			// Return default route values if no match found
			return {
				title: 'Page Not Found',
				path: pathname,
				show: false,
				description: '',
				url: '',
				image: '',
				twitter: {
					creator: '',
					handle: '',
					site: '',
					image: '',
					imageAlt: ''
				}
			};
		}
		return route;
	};

	let currentMeta: Route = $derived(getRouteMeta($page.url.pathname));
</script>

<MetaTags
	title={currentMeta.title}
	titleTemplate="%s | Mogrifyle"
	description={currentMeta.description}
	canonical={currentMeta.url}
	openGraph={{
		url: currentMeta.url,
		title: currentMeta.title,
		description: currentMeta.description,
		images: [
			{
				url: currentMeta.image,
				width: 800,
				height: 600,
				alt: 'Og Image Alt'
			}
		],
		siteName: 'Mogrifyle'
	}}
	twitter={{
		creator: currentMeta.twitter?.handle || '@handle',
		site: currentMeta.twitter?.site || '@site',
		cardType: 'summary_large_image',
		title: `${currentMeta.title} | Mogrifyle`,
		description: currentMeta.description,
		image: currentMeta.twitter?.image || currentMeta.image,
		imageAlt: currentMeta.twitter?.imageAlt || 'Twitter image alt'
	}}
/>
