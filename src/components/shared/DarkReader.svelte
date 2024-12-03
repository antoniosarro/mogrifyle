<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import 'iconify-icon';

	let isDarkReaderEnabled = false;
	let dismissed = false;
	let observer: MutationObserver;

	function checkDarkReader() {
		isDarkReaderEnabled =
			document.getElementsByClassName('darkreader').length > 0 ||
			document.querySelector('meta[name="darkreader"]') !== null;
	}

	onMount(() => {
		checkDarkReader(); // Initial check

		// Set up mutation observer
		observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.type === 'childList') {
					checkDarkReader();
				}
			}
		});

		// Start observing the document head for changes
		observer.observe(document.head, {
			childList: true,
			subtree: true
		});

		// Check if user has previously dismissed the alert
		const hasDismissed = localStorage.getItem('darkReaderAlertDismissed');
		if (hasDismissed) {
			dismissed = true;
		}
	});

	onDestroy(() => {
		// Clean up observer when component is destroyed
		if (observer) observer.disconnect();
	});

	function dismissAlert() {
		dismissed = true;
		localStorage.setItem('darkReaderAlertDismissed', 'true');
	}
</script>

{#if isDarkReaderEnabled && !dismissed}
	<div
		class="text-black dark:text-white fixed left-0 right-0 top-0 z-50 flex items-center justify-center gap-3 bg-neutral-100 p-3 dark:bg-neutral-800"
	>
		<iconify-icon
			icon="material-symbols:info"
			class="text-xl text-neutral-600 dark:text-neutral-400"
		></iconify-icon>
		<p class="text-sm">Dark Reader detected. Please disable it for the best experience.</p>
		<button
			class="rounded bg-neutral-200 px-2 py-1 text-sm hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600"
			on:click={dismissAlert}
		>
			Dismiss
		</button>
	</div>
{/if}
