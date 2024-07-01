import { get_hoc_phi } from '$lib/model/hoc_phi';
import { get_tham_so } from '$lib/model/tham_so';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();

	const id_sinh_vien = data.id_sinh_vien;
	const id_hoc_ky = (await get_tham_so()).id_hoc_ky;

	const hoc_phi = await get_hoc_phi(id_sinh_vien, id_hoc_ky);

	return {
		hoc_phi
	};
};
