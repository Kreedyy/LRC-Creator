import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	response.headers.set(
		'Content-Security-Policy',
		[
			"default-src 'self'",
			"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.youtube.com https://w.soundcloud.com https://static.cloudflareinsights.com",
			"style-src 'self' 'unsafe-inline'",
			"img-src 'self' data: https://i.ytimg.com",
			'frame-src https://www.youtube.com https://w.soundcloud.com',
			"connect-src 'self' https://lrclib.net",
			"font-src 'self'",
			"media-src 'self' blob:",
			"object-src 'none'",
			"base-uri 'self'",
			"form-action 'self'",
			"frame-ancestors 'none'",
			'trusted-types default'
		].join('; ')
	);

	response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

	response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');

	response.headers.set('X-Frame-Options', 'DENY');

	response.headers.set('X-Content-Type-Options', 'nosniff');

	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

	response.headers.set(
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=(), payment=()'
	);

	return response;
};
