// FORMATTING:
// Example usage from ShowResults.svelte, for future reference use this when submitting
// function setUserPick(getSynced: boolean, item: any) {
// 	item.plainLyrics = formatLyrics(item?.plainLyrics);
// 	item.syncedLyrics = formatLyrics(item?.syncedLyrics);
// 	userPick = item;
// 	getSyncedLyrics = getSynced;
// }

export function formatLyrics(lyrics: string): string{
  return removeTimestampSpace(removeEmptyLyrics(removeEmptyLines(lyrics)));
}

// Replace all \n\n with \n, remove empty lines and remove trailing
function removeEmptyLines(lyrics: string): string {
	return lyrics
		.split('\n') // Split by newline into an array
		.map((line) => line.trim()) // Remove lines with only whitespaces
		.join('\n') // Connect array into one string
		.replace(/\n{2,}/g, '\n') // Replace multiple newlines into just one for consistency
		.trim(); // Remove trailing newling
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
	return lyrics.replace(/(\[\d{2}:\d{2}\.\d{2}\])\s+/g, '$1'); // Only removes white spaces directly after pattern [mm:ss.xx] since some lyrics could have ] char
}
