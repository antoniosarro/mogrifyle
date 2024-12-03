import type { FileStatus } from '$lib/types/file';
import { getContext, setContext } from 'svelte';

export class FilesState {
	files = $state<FileStatus[]>([]);
	constructor() {}
}

const FILES_KEY = Symbol('FILES');

export function setFilesState() {
	return setContext(FILES_KEY, new FilesState());
}

export function getFilesState() {
	return getContext<ReturnType<typeof setFilesState>>(FILES_KEY);
}
