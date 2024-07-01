import { get_all_nganh } from '$lib/model/nganh';
import { get_user } from '$lib/model/users';
import type { Actions, PageServerLoad } from './$types';
import { get_tham_so } from '$lib/model/tham_so';
import { get_hoc_ky } from '$lib/model/hoc_ky';
import { post_chuong_trinh_hocs, type NewChuongTrinhHoc } from '$lib/model/chuong_trinh_hoc';
import { verify } from 'argon2';

export const load: PageServerLoad = async () => {
	const tham_so = await get_tham_so();

	const current_hoc_ky = await get_hoc_ky(
		new URLSearchParams({ id: tham_so.id_hoc_ky.toString() })
	);
	const nganhs = await get_all_nganh();

	return {
		nganhs,
		current_hoc_ky
	};
};

export const actions = {
	tao: async ({ request }) => {
		const data = await request.formData();

		const password = data.get('password')?.valueOf() as string | undefined;

		if (!password) {
			return;
		}

		const user = await get_user('admin');

		if (await verify(user.hash_pwd, password)) {
			const nganhs = await get_all_nganh();
			const tham_so = await get_tham_so();

			const new_chuong_trinh_hocs = [] as NewChuongTrinhHoc[];

			for (const nganh of nganhs) {
				new_chuong_trinh_hocs.push({
					id_nganh: nganh.id,
					id_hoc_ky: tham_so.id_hoc_ky
				} satisfies NewChuongTrinhHoc);
			}

			await post_chuong_trinh_hocs(new_chuong_trinh_hocs);

			return;
		}
	}
} satisfies Actions;
