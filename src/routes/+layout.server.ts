import { dev } from '$app/environment';
import type { LayoutServerLoad } from './$types';
import { inject } from "@vercel/analytics";

export const load = (async () => {
    inject({ mode: dev ? 'development' : 'production' });
    return {};
}) satisfies LayoutServerLoad;