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
			ffmpegState.isConverting = true;
			try {
				if (!ffmpegState.ffmpeg) return;
				const { url, output } = await convert(ffmpegState.ffmpeg, file);

				file.is_converted = true;
				file.url = url;
				file.output = output;
			} catch (err) {
				file.is_error = true;
				console.error('Error converting file:', err);
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

<div>
	{#each filesState.files as file}
		<div class="flex items-center justify-between border-b border-gray-100 p-3">
			<div class="flex flex-1 items-center gap-2">
				{#if fileIcon[file.fileType] && conversionFormats[file.fileType]}
					<iconify-icon icon={fileIcon[file.fileType]} class="text-xl text-gray-500"></iconify-icon>
					<span class="w-32 truncate text-sm font-semibold text-white-500">{file.fileName}</span>
					{#if !ffmpegState.isConverting && !file.is_converted}
						<span class="text-sm text-white-700">{file.fileSize}</span>
					{/if}
				{:else}
					<iconify-icon icon="mdi:file" class="text-xl text-gray-500"></iconify-icon>
					<span class="w-32 truncate text-sm font-semibold text-white-500">{file.fileName}</span>
					<span class="text-sm font-semibold text-red-500">Unsupported file type</span>
				{/if}
			</div>
			{#if fileIcon[file.fileType] && conversionFormats[file.fileType]}
				{#if !ffmpegState.isConverting && !file.is_converted}
					<div class="flex items-center justify-center gap-4">
						<form>
							<select
								value={file.fileExtension}
								class="w-[4.5rem] border-0 border-b-2 bg-transparent px-1 py-1 text-sm focus:outline-none focus:ring-0 dark:border-white-800"
							>
								{#each conversionFormats[file.fileType] as format}
									<option
										onclick={preventDefault(() => {
											file.to = format;
										})}
										class="text-sm"
										value={format}>{format.toUpperCase()}</option
									>
								{/each}
							</select>
						</form>
						<button
							aria-label="Remove file"
							onclick={() => removeFile(file)}
							class="flex text-red-500"
						>
							<iconify-icon icon="mdi:delete" class="text-xl"></iconify-icon>
						</button>
					</div>
				{:else if ffmpegState.isConverting}
					<iconify-icon
						icon="line-md:loading-twotone-loop"
						noobserver
						class="text-2xl text-accent-500"
					></iconify-icon>
				{:else if file.is_converted}
					<div class="flex items-center justify-center gap-4">
						<button
							onclick={preventDefault(() => downloadFile(file))}
							class="flex cursor-pointer items-center gap-2"
						>
							<span class="text-sm font-bold text-accent-500">Converted</span>
							<iconify-icon icon="mdi:download" class="text-xl text-accent-500"></iconify-icon>
						</button>
						<button
							aria-label="Remove file"
							onclick={() => removeFile(file)}
							class="flex text-red-500"
						>
							<iconify-icon icon="mdi:delete" class="text-xl"></iconify-icon>
						</button>
					</div>
				{/if}
			{:else}
				<div class="flex items-center justify-center gap-4">
					<button
						aria-label="Remove file"
						onclick={() => removeFile(file)}
						class="flex text-red-500"
					>
						<iconify-icon icon="mdi:delete" class="text-xl"></iconify-icon>
					</button>
				</div>
			{/if}
		</div>
	{/each}

	<div class="mt-4 flex justify-end">
		<button
			onclick={preventDefault(convertAll)}
			class="text-white rounded-md bg-accent-500 px-4 py-2 transition-colors hover:bg-accent-600"
		>
			Convert
		</button>
	</div>
</div>
