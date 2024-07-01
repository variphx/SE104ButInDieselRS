import { get_all_khoa } from '$lib/model/khoa';
import { post_mon_hoc, type NewMonHoc } from '$lib/model/mon_hoc';
import { get_tham_so } from '$lib/model/tham_so';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const khoas = await get_all_khoa();

	return {
		khoas
	};
};

export const actions = {
	tao: async ({ request }) => {
		const data = await request.formData();

		const ten = data.get('ten')?.toString() as string | undefined;
		const id_khoa_str = data.get('id_khoa')?.toString() as string | undefined;
		const loai = data.get('loai')?.toString() as string | undefined;
		const so_tiet_str = data.get('so_tiet')?.toString() as string | undefined;

		if (!(ten && id_khoa_str && loai && so_tiet_str)) {
			throw new Error();
		}

		const id_khoa = +id_khoa_str;
		const so_tiet = +so_tiet_str;

		const tham_so = await get_tham_so();
		let so_tin_chi = 0;

		if (loai === 'LT') {
			so_tin_chi = so_tiet / tham_so.he_so_tin_chi_lt;
		} else if (loai === 'TH') {
			so_tin_chi = so_tiet / tham_so.gia_tin_chi_th;
		} else {
			throw new Error();
		}

		const value = {
			ten,
			id_khoa,
			loai,
			so_tiet,
			so_tin_chi
		} satisfies NewMonHoc;

		await post_mon_hoc([value] satisfies NewMonHoc[]);
	}
} satisfies Actions;
