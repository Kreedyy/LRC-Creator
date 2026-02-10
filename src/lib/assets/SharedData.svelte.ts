export let shared = $state<{
	artist: string;
	track: string;
	album: string;
	duration: number;
	lyrics: string;
	currentTime: number;
}>({
	artist: '',
	track: '',
	album: '',
	duration: 0,
	lyrics: '',
	currentTime: 0
});

// Usage: setSharedTrackData({ artist: "Artist Name", track: "Track Name" });
export function setSharedTrackData({
	artist,
	track,
	album,
	duration,
	lyrics,
	currentTime
}: {
	artist?: string;
	track?: string;
	album?: string;
	duration?: number;
	lyrics?: string;
	currentTime?: number;
} = {}) {
	artist && (shared.artist = artist);
	track && (shared.track = track);
	album && (shared.album = album);
	duration && (shared.duration = duration);
	currentTime && (shared.currentTime = currentTime);
	lyrics && (shared.lyrics = lyrics);
}

// In case you rather use object for these
export function getSharedTrackData(
	...fields: ('artist' | 'track' | 'album' | 'duration' | 'lyrics' | 'currentTime')[]
) {
	if (fields.length === 0) {
		return {
			artist: shared.artist,
			track: shared.track,
			album: shared.album,
			duration: shared.duration,
			lyrics: shared.lyrics,
			currentTime: shared.currentTime
		};
	}

	const result: any = {};
	fields.forEach((field) => {
		result[field] = shared[field];
	});
	return result;
}

export function getSharedArtist(): string {
	return shared.artist;
}
export function getSharedTrack(): string {
	return shared.track;
}
export function getSharedAlbum(): string {
	return shared.album;
}
export function getSharedDuration(): number {
	return shared.duration;
}
export function getSharedLyrics(): string {
	return shared.lyrics;
}
export function getSharedCurrentTime(): number {
	return shared.currentTime;
}
