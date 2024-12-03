export function bytesToSize(bytes: number): string {
	const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB'] as const;

	if (!Number.isFinite(bytes) || bytes < 0) return 'Invalid size';
	if (bytes === 0) return '0 Bytes';

	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	const sizeIndex = Math.min(i, sizes.length - 1);
	const size = (bytes / Math.pow(1024, sizeIndex)).toFixed(2);

	const unit = sizeIndex === 0 ? (bytes === 1 ? sizes[0] : `${sizes[0]}s`) : sizes[sizeIndex];

	return `${size} ${unit}`;
}

export function compressFileName(fileName: string): string {
	const MAX_LENGTH = 17;

	if (typeof fileName !== 'string') return '';
	const trimmedName = fileName.trim();
	if (trimmedName.length <= MAX_LENGTH) return trimmedName;

	const parts = trimmedName.split('.');
	const extension = parts.length > 1 ? parts.pop() : '';
	const name = parts.join('.');

	// Calculate how many characters we can keep from the name
	const availableLength = MAX_LENGTH - 3; // accounting for '...'
	const extensionPart = extension ? `.${extension}` : '';
	const nameLength = availableLength - extensionPart.length;

	if (nameLength < 2) return trimmedName; // if we can't compress meaningfully, return original

	const start = Math.ceil(nameLength / 2);
	const end = Math.floor(nameLength / 2);

	return `${name.slice(0, start)}...${name.slice(-end)}${extensionPart}`;
}

export function changeFileExtention(file: string, ext: string | null): string {
	return file.replace(/\.[^.]+$/, ext ? `.${ext}` : '');
}

export function generateId(): string {
	return Math.random().toString(36).substring(2, 12);
}
