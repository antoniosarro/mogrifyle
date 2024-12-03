<script lang="ts">
	import '$styles/app.css';
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Footer, Header } from '$components/shared';

	let { children } = $props();

	// Handle page transitions
	const preparePageTransition = () => {
		onNavigate((navigation) => {
			if (!document.startViewTransition) return;

			return new Promise((resolve) => {
				document.startViewTransition(async () => {
					resolve();
					await navigation.complete;
				});
			});
		});
	};

	onMount(preparePageTransition);
</script>

<div class="layout-container">
	<Header />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>

<style lang="postcss">
	.layout-container {
		@apply container mx-auto min-h-screen px-6 py-4;
	}

	main {
		@apply flex-grow;
	}
</style>
