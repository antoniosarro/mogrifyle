<script lang="ts">
	import { darkMode, initDarkMode, toggleDarkMode } from '$lib/stores/dark.svelte';
	import 'iconify-icon';

	$effect(() => {
		initDarkMode();
	});

	const handleChange = (event: Event) => {
		if (event.target instanceof HTMLInputElement) {
			toggleDarkMode();
		}
	};
</script>

<label class="relative col-start-1 row-start-1 flex justify-center text-xl" for="theme-switch">
	<input
		name="theme-switch"
		id="theme-switch"
		type="checkbox"
		class="absolute h-0 w-0 cursor-pointer opacity-0"
		checked={$darkMode}
		onchange={handleChange}
	/>
	{#if $darkMode}
		<iconify-icon noobserver class="animate-slideIn" icon="bi:moon-stars-fill"></iconify-icon>
	{:else}
		<iconify-icon noobserver class="animate-slideIn" icon="bi:sun-fill"></iconify-icon>
	{/if}
</label>
