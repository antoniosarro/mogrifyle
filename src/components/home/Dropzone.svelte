<script lang="ts">
	import 'iconify-icon';

	import { getFilesState } from '$lib/stores/file.svelte';
	import { bytesToSize, compressFileName, generateId } from '$lib/utils/file';
	import { preventDefault } from '$lib/utils/handler';
	import { getAcceptedFiles } from '$lib/utils/upload';

	const filesState = getFilesState();

	let input: HTMLInputElement;
	let inputFiles: FileList;
	function handleChange() {
		const acceptedFiles = getAcceptedFiles(inputFiles);
		acceptedFiles.forEach((file) => {
			addFile(file);
		});
	}

	function handleDrop(event: DragEvent) {
		const acceptedFiles = getAcceptedFiles(event.dataTransfer?.files);
		acceptedFiles.forEach((file) => {
			addFile(file);
		});
	}

	function addFile(file: { file: File; isAccepted: boolean }) {
		filesState.files.push({
			// Unique identifier
			id: generateId(),
			// File object
			file: file.file,
			file_name: file.file.name,
			file_size: file.file.size,
			file_type: file.file.type,
			// Parsed file data
			fileName: compressFileName(file.file.name),
			fileSize: bytesToSize(file.file.size),
			fileExtension: file.file.name.split('.').pop() ?? '',
			fileType: file.file.type.split('/')[0],
			unsupported: !file.isAccepted,
			// File conversion info
			to: null
		});
	}

	function keydown(e: KeyboardEvent) {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			input.click();
		}
	}
</script>

<div
	tabindex="0"
	role="button"
	class=" relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-all duration-300 ease-in-out"
	ondrop={preventDefault(handleDrop)}
	onkeydown={keydown}
	onclick={() => input.click()}
>
	<input
		bind:files={inputFiles}
		bind:this={input}
		onchange={preventDefault(handleChange)}
		multiple
		type="file"
		class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
	/>
	<div class="flex items-center justify-center gap-2 text-base font-bold text-white-500">
		<iconify-icon icon="mdi:cloud-upload" width="24"></iconify-icon>
		<span>Drop files here or click to upload</span>
	</div>
</div>
