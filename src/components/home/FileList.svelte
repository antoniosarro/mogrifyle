<script lang="ts">
	import { getFFmpegState } from '$lib/stores/ffmpeg.svelte';
	import { getFilesState } from '$lib/stores/file.svelte';
	import type { FileStatus } from '$lib/types/file';
	import convert from '$lib/utils/convert';
	import { preventDefault } from '$lib/utils/handler';

	const filesState = getFilesState();
	const ffmpegState = getFFmpegState();

	const fileIcon: Record<string, string> = {
		image: 'mdi:file-image',
		video: 'mdi:file-video',
		audio: 'mdi:file-music'
	};

	const conversionFormats: Record<string, string[]> = {
		image: ['jpg', 'png', 'webp', 'avif'],
		video: ['mp4', 'webm', 'mov'],
		audio: ['mp3', 'wav', 'ogg']
	};

	function convertAll() {
		filesState.files.forEach(async (file) => {
			if (!file.unsupported && !file.is_converted && !file.is_error) {
				ffmpegState.isConverting = true;
				try {
					if (!ffmpegState.ffmpeg) return;
					const { url, output } = await convert(ffmpegState.ffmpeg, file);

					file.is_converted = true;
					file.url = url;
					file.output = output;
				} catch (err) {
					file.is_error = true;
					ffmpegState.isConverting = false;
					console.error('Error converting file:', err);
				}
			}
		});
	}

	function downloadFile(file: FileStatus) {
		if (!file.url || !file.output) return;

		const a = document.createElement('a');
		a.style.display = 'none';
		a.href = file.url;
		a.download = file.output;

		document.body.appendChild(a);
		a.click();

		URL.revokeObjectURL(file.url);
		document.body.removeChild(a);
	}

	function removeFile(fileToRemove: FileStatus) {
		filesState.files = filesState.files.filter((file) => file !== fileToRemove);
	}
</script>

<div class="flex flex-col gap-4">
	{#each filesState.files as file}
		<div
			class="flex items-center justify-between border-b border-gray-500 p-3 dark:border-gray-100"
		>
			<div class="flex flex-1 items-center gap-2">
				{#if conversionFormats[file.fileType]}
					<iconify-icon icon={fileIcon[file.fileType]} class="text-xl text-gray-500 sm:text-2xl"
					></iconify-icon>
				{:else}
					<iconify-icon icon="mdi:file" class="text-xl text-gray-500 sm:text-2xl"></iconify-icon>
				{/if}
				<span
					class="w-32 truncate text-sm font-semibold text-black-400 sm:w-40 sm:text-base dark:text-white-500"
					>{file.fileName}</span
				>
				{#if !ffmpegState.isConverting && !file.is_converted}
					<span class="text-sm text-black-400 sm:text-base dark:text-white-700"
						>{file.fileSize}</span
					>
				{/if}
			</div>
			<div class="flex items-center gap-4">
				{#if !conversionFormats[file.fileType]}
					<span class="text-sm font-semibold text-red-600 sm:text-base">Unsupported file type</span>
				{:else if file.is_error}
					<span class="text-sm font-semibold text-red-600 sm:text-base">Error converting file</span>
				{:else if !file.is_converted}
					<form>
						<select
							value={file.fileExtension}
							class="w-[4.5rem] border-0 border-b-2 border-gray-400 bg-transparent px-1 py-1 text-sm focus:outline-none focus:ring-0 sm:w-[5rem] sm:text-base dark:border-white-800"
						>
							{#each conversionFormats[file.fileType] as format}
								<option
									onclick={preventDefault(() => {
										file.to = format;
									})}
									class="text-sm sm:text-base"
									value={format}>{format.toUpperCase()}</option
								>
							{/each}
						</select>
					</form>
				{/if}
				{#if !ffmpegState.isConverting}
					<div class="flex items-center justify-center gap-4">
						{#if file.is_converted}
							<button
								onclick={preventDefault(() => downloadFile(file))}
								class="flex cursor-pointer items-center gap-2"
							>
								<span class="text-sm font-bold text-accent-500 sm:text-base">Converted</span>
								<iconify-icon icon="mdi:download" class="text-xl text-accent-500 sm:text-2xl"
								></iconify-icon>
							</button>
						{/if}
						<button
							aria-label="Remove file"
							onclick={() => removeFile(file)}
							class="flex text-red-500"
						>
							<iconify-icon icon="mdi:delete" class="text-xl sm:text-2xl"></iconify-icon>
						</button>
					</div>
				{:else if ffmpegState.isConverting && !file.unsupported}
					<iconify-icon
						icon="line-md:loading-twotone-loop"
						noobserver
						class="text-2xl text-accent-500"
					></iconify-icon>
				{/if}
			</div>
		</div>
	{/each}
	{#if filesState.files.length > 0}
		<div class="mt-4 flex justify-end">
			<button
				onclick={preventDefault(convertAll)}
				class="text-white rounded-md bg-accent-500 px-3 py-1.5 font-semibold transition-colors hover:bg-accent-600 sm:text-lg"
			>
				Convert
			</button>
		</div>
	{/if}
</div>
