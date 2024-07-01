import { get_user } from '$lib/model/users';
import { verify } from 'argon2';
import type { Actions } from './$types';
import { get_tham_so } from '$lib/model/tham_so';
import { get_hoc_ky, post_hoc_ky, type NewHocKy } from '$lib/model/hoc_ky';

export const actions = {
	mo_hoc_ky: async ({ request }) => {
		const data = await request.formData();

		const password = data.get('password')?.toString();

		if (!password) {
			throw new Error();
		}

		const user = await get_user('admin');

		if (!(await verify(user.hash_pwd, password))) {
			return { is_success: false };
		}

		const hoc_ky = await get_hoc_ky(
			new URLSearchParams({ id: (await get_tham_so()).id_hoc_ky.toString() })
		);
		let new_hoc_ky: NewHocKy;

		if (hoc_ky.ten === 'Một') {
			new_hoc_ky = {
				ten: 'Hai',
				nam_hoc: hoc_ky.nam_hoc
			};
		} else if (hoc_ky.ten === 'Hai') {
			new_hoc_ky = {
				ten: 'Hè',
				nam_hoc: hoc_ky.nam_hoc
			};
		} else if (hoc_ky.ten === 'Hè') {
			new_hoc_ky = {
				ten: 'Một',
				nam_hoc: hoc_ky.nam_hoc + 1
			};
		} else {
			throw new Error();
		}

		await post_hoc_ky(new_hoc_ky);
	}
} satisfies Actions;
