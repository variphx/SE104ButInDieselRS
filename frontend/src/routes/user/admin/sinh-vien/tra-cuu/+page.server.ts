import { get_all_sinh_vien } from '$lib/model/sinh_vien';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const sinh_viens = await get_all_sinh_vien();

	return {
		sinh_viens
	};
};
