import { get_all_chuong_trinh_hoc } from '$lib/model/chuong_trinh_hoc';
import { get_hoc_ky } from '$lib/model/hoc_ky';
import { get_all_mon_hoc } from '$lib/model/mon_hoc';
import { post_mon_hoc_mo, type NewMonHocMo } from '$lib/model/mon_hoc_mo';
import { get_tham_so } from '$lib/model/tham_so';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const mon_hocs = await get_all_mon_hoc();
	const hoc_ky = await get_hoc_ky(
		new URLSearchParams({ id: (await get_tham_so()).id_hoc_ky.toString() })
	);
	const chuong_trinh_hocs = await get_all_chuong_trinh_hoc();

	return {
		mon_hocs,
		hoc_ky,
		chuong_trinh_hocs
	};
};

export const actions = {
	tao: async ({ request }) => {
		const data = await request.formData();

		const id_mon_hoc_str = data.get('id_mon_hoc')?.toString();
		const id_chuong_trinh_hoc_str = data.get('id_chuong_trinh_hoc')?.toString();
		const id_hoc_ky = (
			await get_hoc_ky(new URLSearchParams({ id: (await get_tham_so()).id_hoc_ky.toString() }))
		).id;

		if (!(id_mon_hoc_str && id_chuong_trinh_hoc_str)) {
			throw new Error();
		}

		const id_mon_hoc = +id_mon_hoc_str;
		const id_chuong_trinh_hoc = +id_chuong_trinh_hoc_str;

		await post_mon_hoc_mo({
			id_mon_hoc,
			id_hoc_ky,
			id_chuong_trinh_hoc
		} satisfies NewMonHocMo);
	}
} satisfies Actions;
