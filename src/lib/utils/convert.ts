import type { FileStatus } from '$lib/types/file';
import type { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { changeFileExtention } from './file';

export default async function convert(
	ffmpeg: FFmpeg,
	inputFile: FileStatus
): Promise<{ url: string; output: string }> {
	const { file, to, file_name, file_type } = inputFile;
	const output = changeFileExtention(file_name, to);

	// Write the input file to the FFmpeg file system
	ffmpeg.writeFile(file_name, await fetchFile(file));

	// Prepare the FFmpeg command
	const ffmpegCmd = ['-i', file_name, output];

	// Execute the FFmpeg command
	await ffmpeg.exec(ffmpegCmd);

	// Read the output file from the FFmpeg file system
	const data = (await ffmpeg.readFile(output)) as Uint8Array;

	// Create a Blob from the output data
	const blob = new Blob([data], { type: file_type.split('/')[0] });

	// Generate a URL for the Blob
	const url = URL.createObjectURL(blob);

	return { url, output };
}
