import { post_chi_tiet_dkmh, type NewChiTietDKMH } from '$lib/model/chi_tiet_dkmh';
import { get_dkmh_by_id_sinh_vien_and_id_hoc_ky } from '$lib/model/dkmh';
import { get_hoc_ky } from '$lib/model/hoc_ky';
import { get_all_mon_hoc_mo_of_sinh_vien_in_hoc_ky } from '$lib/model/mon_hoc_mo';
import { get_tham_so } from '$lib/model/tham_so';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const data = await parent();

	const id_sinh_vien = data.id_sinh_vien;
	const hoc_ky = await get_hoc_ky(
		new URLSearchParams({ id: (await get_tham_so()).id_hoc_ky.toString() })
	);
	const dkmh = await get_dkmh_by_id_sinh_vien_and_id_hoc_ky(
		new URLSearchParams({
			id_sinh_vien: id_sinh_vien.toString(),
			id_hoc_ky: hoc_ky.id.toString()
		})
	);
	const mon_hoc_mos = await get_all_mon_hoc_mo_of_sinh_vien_in_hoc_ky(
		new URLSearchParams({
			id_sinh_vien: id_sinh_vien.toString(),
			id_hoc_ky: hoc_ky.id.toString()
		})
	);

	return {
		mon_hoc_mos,
		dkmh
	};
};

export const actions = {
	dang_ky: async ({ request }) => {
		const data = await request.formData();

		const id_mon_hoc_mo = data.get('id_mon_hoc_mo')?.toString();
		const id_dkmh = data.get('id_dkmh')?.toString();

		if (!(id_mon_hoc_mo && id_dkmh)) {
			throw new Error();
		}

		const value = {
			id_dkmh: +id_dkmh,
			id_mon_hoc_mo: +id_mon_hoc_mo
		} satisfies NewChiTietDKMH;

		await post_chi_tiet_dkmh(value);
	}
} satisfies Actions;
