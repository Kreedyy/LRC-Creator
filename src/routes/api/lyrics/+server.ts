//Add rate limiting and sanitization for submitting to LRCLIB
import { json } from '@sveltejs/kit';

export async function GET({ url, fetch }) {
	const q = url.searchParams.get('q');

	const response = await fetch(`https://lrclib.net/api/search?q=${q}`);
	const data = await response.json();

	return json(data);
}

//POST make sure every line is synced because lrclib requires it. if not return an error, if success then create a plain version without the timestamp since required
