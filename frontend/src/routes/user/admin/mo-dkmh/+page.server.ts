import { get_tham_so } from '$lib/model/tham_so';
import { get_user } from '$lib/model/users';
import { verify } from 'argon2';
import type { Actions } from './$types';
import { post_all_dkmh_in_hoc_ky } from '$lib/model/dkmh';

export const actions = {
	mo_dkmh: async ({ request }) => {
		const data = await request.formData();

		const password = data.get('password')?.toString();

		if (!password) {
			throw new Error();
		}

		const user = await get_user('admin');

		if (!(await verify(user.hash_pwd, password))) {
			return { is_success: false };
		}

		const id_hoc_ky = (await get_tham_so()).id_hoc_ky;
		await post_all_dkmh_in_hoc_ky(id_hoc_ky);
	}
} satisfies Actions;
