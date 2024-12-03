<script lang="ts">
	import { Dropzone, FFmpeg, FileList } from '$components/home';
	import { Loader } from '$components/shared';
	import { getFFmpegState, setFFmpegState } from '$lib/stores/ffmpeg.svelte';
	import { setFilesState } from '$lib/stores/file.svelte';

	setFilesState();
	setFFmpegState();

	const ffmpegState = getFFmpegState();
</script>

<FFmpeg />

<div class="mb-6 flex flex-col gap-4">
	{#if ffmpegState.loaded}
		<Dropzone />
		<FileList />
	{:else}
		<div class="mx-auto flex max-w-xs flex-col items-center gap-2">
			{#if ffmpegState.error}
				<p class="font-bold text-red-500">{ffmpegState.error}</p>
			{:else}
				<Loader />
			{/if}
		</div>
	{/if}
</div>
