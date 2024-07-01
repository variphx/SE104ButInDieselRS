import { get_session } from '$lib/model/session';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const parent_data = await parent();
	const session_id = parent_data.session.id;
	const session = await get_session(new URLSearchParams({ id: session_id }));
	redirect(302, `/user/${session.username}`);
};
