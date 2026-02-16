import { convertSyncedToPlainLyrics, validatePayload } from '$lib/assets/FormatLyrics.js';
import { json, type RequestHandler, error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, fetch }) => {
	try {
		const body = await request.json();
		const { publishToken, ...lyricData } = body;

		if (!publishToken) {
			throw error(400, 'Publish token is required');
		}

		const payload = {
			trackName: lyricData.track,
			artistName: lyricData.artist,
			albumName: lyricData.album,
			duration: Number(lyricData.duration),
			plainLyrics: convertSyncedToPlainLyrics(lyricData.lyrics),
			syncedLyrics: lyricData.lyrics
		};

		const validation = validatePayload(payload);
		if (!validation.valid) {
			throw error(400, validation.errors.join(', '));
		}

		const publishResponse = await fetch('https://lrclib.net/api/publish', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Publish-Token': publishToken
			},
			body: JSON.stringify(payload)
		});

		if (publishResponse.status === 201) {
			return json({ success: true });
		}

		const responseText = await publishResponse.text();
		let errorMessage = `Publish failed with status ${publishResponse.status}`;

		if (responseText) {
			try {
				const errorData = JSON.parse(responseText);
				errorMessage = errorData.message || errorData.name || errorMessage;
			} catch {
				errorMessage = responseText;
			}
		}

		throw error(publishResponse.status, errorMessage);
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		throw error(500, 'Server error: ' + (err as Error).message);
	}
};
