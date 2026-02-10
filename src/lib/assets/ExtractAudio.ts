export async function extractMetadataFromUrl(url: string): Promise<void> {
	try {
		const response = await fetch(url);
		const blob = await response.blob();
	} catch (error) {
		console.error('Error fetching audio file:', error);
	}
}

export function extractMetadataFromFile(file: File): void {}
