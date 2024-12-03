import type { FileStatus } from '$lib/types/file';
import type { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { changeFileExtention } from './file';

interface ConversionResult {
	url: string;
	output: string;
}

export default async function convert(
	ffmpeg: FFmpeg,
	inputFile: FileStatus
): Promise<ConversionResult> {
	try {
		const { file, to, file_name, file_type } = inputFile;
		const outputFileName = changeFileExtention(file_name, to);
		const mimeType = file_type.split('/')[0];

		// Write input file to FFmpeg's virtual filesystem
		await ffmpeg.writeFile(file_name, await fetchFile(file));

		// Execute conversion
		await ffmpeg.exec(['-i', file_name, outputFileName]);

		// Read and create converted file
		const outputData = await ffmpeg.readFile(outputFileName);
		const blob = new Blob([outputData], { type: mimeType });
		const url = URL.createObjectURL(blob);

		return { url, output: outputFileName };
	} catch (error) {
		throw new Error(
			`Conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`
		);
	}
}
