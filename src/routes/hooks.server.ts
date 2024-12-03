import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { THEMES, type Theme } from '$lib/constants/theme';

const getCookies: Handle = async ({ event, resolve }) => {
	const theme = event.cookies.get('theme');

	if (theme && isValidTheme(theme)) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace('data-theme=""', `data-theme="${theme}"`);
			}
		});
	}

	return await resolve(event);
};

function isValidTheme(theme: string): theme is Theme {
	return Object.values(THEMES).includes(theme as Theme);
}

export const handle: Handle = sequence(getCookies);
