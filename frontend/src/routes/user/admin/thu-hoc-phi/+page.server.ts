import { get_user } from '$lib/model/users';
import type { Actions } from './$types';
import { post_hoc_phi_by_dkmh } from '$lib/model/hoc_phi';
import { get_all_dkmhs_by_id_hoc_ky } from '$lib/model/dkmh';
import { verify } from 'argon2';
import { get_tham_so } from '$lib/model/tham_so';

export const actions = {
	lap_phieu_thu: async ({ request }) => {
		const data = await request.formData();

		const password = data.get('password')?.toString();
		const id_hoc_ky = (await get_tham_so()).id_hoc_ky;

		if (!password) {
			throw new Error();
		}

		const user = await get_user('admin');

		if (!(await verify(user.hash_pwd, password))) {
			return { is_success: false };
		}

		const dkmhs = await get_all_dkmhs_by_id_hoc_ky(+id_hoc_ky);

		for (const dkmh of dkmhs) {
			await post_hoc_phi_by_dkmh(dkmh);
		}

		return {
			is_success: false
		};
	}
} satisfies Actions;
