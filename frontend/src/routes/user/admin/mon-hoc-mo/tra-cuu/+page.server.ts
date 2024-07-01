import { get_all_mon_hoc_mo } from '$lib/model/mon_hoc_mo';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const mon_hoc_mos = await get_all_mon_hoc_mo();

	return {
		mon_hoc_mos
	};
};
