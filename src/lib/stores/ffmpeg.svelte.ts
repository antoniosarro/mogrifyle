import type { FFmpeg } from '@ffmpeg/ffmpeg';
import { getContext, setContext } from 'svelte';

export class FFmpegState {
	ffmpeg: FFmpeg | null = null;
	isConverting = $state<boolean>(false);
	loaded = $state<boolean>(false);
	error = $state<string | null>(null);
	constructor() {}
}

const FFMPEG_KEY = Symbol('FFMPEG');

export function setFFmpegState() {
	return setContext(FFMPEG_KEY, new FFmpegState());
}

export function getFFmpegState() {
	return getContext<ReturnType<typeof setFFmpegState>>(FFMPEG_KEY);
}
