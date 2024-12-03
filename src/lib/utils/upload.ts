import { acceptedMimes } from '$lib/constants/files';

export const getAcceptedFiles = (
	files: FileList | File[] = []
): {
	file: File;
	isAccepted: boolean;
}[] => {
	const acceptedFiles: {
		file: File;
		isAccepted: boolean;
	}[] = [];

	for (let i = 0; i < files.length; i++) {
		if (isAccepted(files[i])) {
			acceptedFiles.push({
				file: files[i],
				isAccepted: true
			});
		} else {
			acceptedFiles.push({
				file: files[i],
				isAccepted: false
			});
		}
	}

	return acceptedFiles;
};

const isAccepted = (item: DataTransferItem | File): boolean => {
	const type = item instanceof File ? item.type : item.type;
	const fileName = item instanceof File ? item.name : '';

	// Check if the type matches any of our accepted MIME types
	for (const mimeType in acceptedMimes) {
		const [category, subtype] = mimeType.split('/');
		const [itemCategory, itemSubtype] = type.split('/');

		// Check if MIME type matches (e.g., 'image/*' matches 'image/png')
		if (category === itemCategory && (subtype === '*' || subtype === itemSubtype)) {
			// If no extensions specified, accept all files of this MIME type
			if (acceptedMimes[mimeType].length === 0) {
				return true;
			}

			// Check if file extension matches any accepted extensions
			const fileExt = fileName.toLowerCase().slice(fileName.lastIndexOf('.'));
			return acceptedMimes[mimeType].includes(fileExt);
		}
	}

	return false;
};
