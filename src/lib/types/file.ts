export type FileStatus = {
	// Unique identifier
	id: string;
	// File object
	file: File;
	file_name: string;
	file_size: number;
	file_type: string;
	// Parsed file data
	fileName: string;
	fileSize: string;
	fileExtension: string;
	fileType: string;
	unsupported?: boolean;
	// File conversion info
	to: string | null;
	// File conversion status
	is_converted?: boolean;
	is_error?: boolean;
	url?: string;
	output?: string;
};

export const fileIcon: Record<string, string> = {
	image: 'mdi:file-image',
	video: 'mdi:file-video',
	audio: 'mdi:file-music'
};

export const conversionFormats: Record<string, string[]> = {
	image: ['jpg', 'png', 'webp', 'avif'],
	video: ['mp4', 'webm', 'mov'],
	audio: ['mp3', 'wav', 'ogg']
};
