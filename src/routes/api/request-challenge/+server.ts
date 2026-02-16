import { json, error } from '@sveltejs/kit';

export async function POST({ fetch }) {
	try {
		const challengeResponse = await fetch('https://lrclib.net/api/request-challenge', {
			method: 'POST'
		});

		if (!challengeResponse.ok) {
			throw error(challengeResponse.status, 'Failed to get challenge');
		}

		const challengeData = await challengeResponse.json();
		return json(challengeData);
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		throw error(500, 'Server error: ' + (err as Error).message);
	}
}
