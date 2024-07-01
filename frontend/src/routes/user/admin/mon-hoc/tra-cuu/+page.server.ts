import { get_all_mon_hoc } from '$lib/model/mon_hoc';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const mon_hocs = await get_all_mon_hoc();

	return {
		mon_hocs
	};
};
