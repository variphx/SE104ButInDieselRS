import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { get_session } from '$lib/model/session';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const session_id = cookies.get('session_id');

	if (!session_id) {
		redirect(302, '/login');
	}

	const session = await get_session(
		new URLSearchParams({
			id: session_id
		})
	);

	return {
		session
	};
};
