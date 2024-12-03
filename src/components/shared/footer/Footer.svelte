<script lang="ts">
	import 'iconify-icon';

	interface TechStack {
		href: string;
		icon: string;
		label: string;
	}

	const techStack: TechStack[] = [
		{
			href: 'https://kit.svelte.dev',
			icon: 'ri:svelte-fill',
			label: 'Built with SvelteKit'
		},
		{
			href: 'https://www.typescriptlang.org',
			icon: 'teenyicons:typescript-outline',
			label: 'Built with TypeScript'
		},
		{
			href: 'https://tailwindcss.com',
			icon: 'mdi:tailwind',
			label: 'Styled with Tailwind CSS'
		}
	];

	const currentYear = new Date().getFullYear();
</script>

<footer class="text-center text-sm">
	<div class="flex flex-col items-center gap-1">
		<p class="flex items-center gap-2">
			<span class="font-bold">Built with</span>
			<iconify-icon
				icon="bi:heart-fill"
				class="text-accent-500"
				role="img"
				aria-label="love"
				noobserver
			></iconify-icon>
			<span class="font-bold">using</span>
		</p>

		<div class="flex gap-4">
			{#each techStack as { href, icon, label }}
				<a {href} rel="noreferrer noopener" target="_blank" aria-label={label}>
					<iconify-icon
						{icon}
						class="text-xl text-gray-800 dark:text-accent-500"
						role="img"
						noobserver
					></iconify-icon>
				</a>
			{/each}
		</div>

		<p>
			&copy; {currentYear}
			<a href="/" class="font-bold text-accent-500"> Antonio Sarro </a>
		</p>
	</div>
</footer>
