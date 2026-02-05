// FORMATTING:
// Example usage from ShowResults.svelte, for future reference use formatLyrics when submitting
//
// function setUserPick(getSynced: boolean, item: any) {
// 	item.plainLyrics = formatLyrics(item?.plainLyrics);
// 	item.syncedLyrics = formatLyrics(item?.syncedLyrics);
// 	userPick = item;
// 	getSyncedLyrics = getSynced;
// }
import {
	getSharedArtist,
	getSharedAlbum,
	getSharedDuration,
	getSharedTrack,
	getSharedLyrics,
	setSharedTrackData
} from './SharedData.svelte';

export function formatSharedData() {
	let track = removeEmptyLines(getSharedTrack());
	let artist = removeEmptyLines(getSharedArtist());
	let album = removeEmptyLines(getSharedAlbum());

	setSharedTrackData({ track, artist, album });
}

export function formatLyrics(lyrics: string): string {
	if (lyrics) {
		return removeEmptyLyrics(removeTimestampSpace(removeSectionMarkers(removeEmptyLines(lyrics))));
	}
	return '';
}

export function validatePayload(payload: {
	trackName: string;
	artistName: string;
	albumName: string;
	duration: number;
	syncedLyrics: string;
}): { valid: boolean; errors: string[] } {
	const errors: string[] = [];

	if (!payload.trackName || payload.trackName.trim() === '') {
		errors.push('Track name is required');
	}

	if (!payload.artistName || payload.artistName.trim() === '') {
		errors.push('Artist name is required');
	}

	if (!payload.albumName || payload.albumName.trim() === '') {
		payload.albumName = payload.trackName;
		// If no albumName given, use trackName. Seems like that's what other's are doing looking on lrclib.net
	}

	if (!payload.duration || payload.duration <= 0) {
		errors.push('Duration must be greater than 0');
	}

	if (!payload.syncedLyrics) {
		errors.push('Lyrics are required');
	} else if (!validateLyrics(payload.syncedLyrics)) {
		errors.push('All lyrics must be synced');
	}

	return {
		valid: errors.length === 0,
		errors
	};
}

export function validateLyrics(lyrics: string): boolean {
	lyrics = formatLyrics(lyrics);
	const lines = lyrics.split('\n');
	const timestampRegex = /^\[\d{2}:\d{2}\.\d{2}\]/;

	return lines.every((line) => {
		return timestampRegex.test(line); // If all lines start with [mm:ss.xx] return true, else false
	});
}

export function convertSyncedToPlainLyrics(lyrics: string): string {
	return lyrics.replace(/\[\d{2}:\d{2}\.\d{2}\]\s*/g, '');
}

// Replace all \n\n... with \n, remove empty lines and remove trailing
function removeEmptyLines(lyrics: string): string {
	return lyrics
		.split('\n') // Split by newline into an array
		.map((line) => line.trim()) // Remove lines with only whitespaces
		.join('\n') // Connect array into one string
		.replace(/\n{2,}/g, '\n') // Replace multiple newlines into just one for consistency
		.trim(); // Remove trailing newline
}

// Remove all empty synced lyrics, example: "[mm:ss.xx] "
function removeEmptyLyrics(lyrics: string): string {
	return lyrics
		.split('\n') // Split by newline into an array
		.filter((line) => !line.match(/^\[\d{2}:\d{2}\.\d{2}\]\s*$/)) // Filter and remove timestamps with empty lyrics and only whitespaces
		.join('\n'); // Connect array into one string
}

// Remove all spaces between ] and first character
function removeTimestampSpace(lyrics: string): string {
	return lyrics.replace(/(\[\d{2}:\d{2}\.\d{2}\])\s*/g, '$1 '); // Replaces all the whitespaces with singular one instead for better readability
	//return lyrics.replace(/(\[\d{2}:\d{2}\.\d{2}\])\s+/g, '$1'); // Only removes white spaces directly after pattern [mm:ss.xx] since some lyrics could have ] char
}

function removeSectionMarkers(lyrics: string): string {
	return lyrics
		.split('\n') // Split string into array of lines
		.filter((line) => !/^\[[^\]]*\]\s*$/.test(line)) // Filter out section markers like [intro], [chorus] etc
		.join('\n'); // Join array back into string
}
