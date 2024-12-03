<script lang="ts">
	import { page } from '$app/stores';
	import { routes } from '$data/routes';

	let currentRoute = $derived($page.url.pathname);
</script>

<nav class="col-start-1 col-end-8 row-start-2">
	<ul class="flex justify-center gap-4">
		{#each routes as { title, path, show }}
			{#if show}
				<li>
					<a
						class="text-lg uppercase {currentRoute === path
							? 'font-bold text-accent-500'
							: 'font-normal'}"
						href={path}>{title}</a
					>
				</li>
			{/if}
		{/each}
	</ul>
</nav>
