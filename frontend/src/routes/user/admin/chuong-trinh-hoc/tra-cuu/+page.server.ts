import { get_all_chuong_trinh_hoc } from '$lib/model/chuong_trinh_hoc';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const chuong_trinh_hocs = await get_all_chuong_trinh_hoc();

	return {
		chuong_trinh_hocs
	};
};
