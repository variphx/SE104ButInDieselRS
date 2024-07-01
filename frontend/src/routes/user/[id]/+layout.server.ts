import { get_sinh_vien_id_by_mssv as get_sinh_vien_id_by_mssv } from '$lib/model/sinh_vien';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const data = await parent();

	const session = data.session;

	const id_sinh_vien = await get_sinh_vien_id_by_mssv(
		new URLSearchParams({ mssv: session.username })
	);

	return {
		id_sinh_vien,
		username: session.username
	};
};
