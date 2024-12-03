<script lang="ts">
	import { FFmpeg } from '@ffmpeg/ffmpeg';
	import { getFFmpegState } from '$lib/stores/ffmpeg.svelte';
	import { onMount } from 'svelte';

	const ffmpegState = getFFmpegState();

	async function loadFFmpeg() {
		const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';

		ffmpegState.ffmpeg = new FFmpeg();

		try {
			await ffmpegState.ffmpeg.load({
				coreURL: `${baseURL}/ffmpeg-core.js`,
				wasmURL: `${baseURL}/ffmpeg-core.wasm`
			});
			setTimeout(() => {
				ffmpegState.loaded = true;
			}, 1000);
		} catch (error) {
			ffmpegState.error = 'Failed to load FFmpeg + ' + error;
		}
	}

	onMount(() => {
		loadFFmpeg();
	});
</script>
