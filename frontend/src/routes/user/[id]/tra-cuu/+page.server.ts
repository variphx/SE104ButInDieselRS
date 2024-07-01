import { get_all_chi_tiet_dkmh_by_dkmh } from '$lib/model/chi_tiet_dkmh';
import { get_dkmh_by_id_sinh_vien_and_id_hoc_ky } from '$lib/model/dkmh';
import { get_tham_so } from '$lib/model/tham_so';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();

	const id_sinh_vien = data.id_sinh_vien;
	const tham_so = await get_tham_so();
	const id_hoc_ky = tham_so.id_hoc_ky;

	const dkmh = await get_dkmh_by_id_sinh_vien_and_id_hoc_ky(
		new URLSearchParams({
			id_sinh_vien: id_sinh_vien.toString(),
			id_hoc_ky: id_hoc_ky.toString()
		})
	);

	const chi_tiet_dkmhs = await get_all_chi_tiet_dkmh_by_dkmh(
		new URLSearchParams({
			id_dkmh: dkmh.id.toString()
		})
	);

	return {
		chi_tiet_dkmhs
	};
};
