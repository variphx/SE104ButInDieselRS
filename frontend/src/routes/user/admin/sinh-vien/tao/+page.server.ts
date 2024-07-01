import { get_all_chuong_trinh_hoc } from '$lib/model/chuong_trinh_hoc';
import { get_doi_tuong_all } from '$lib/model/doi_tuong';
import { get_que_quan_all } from '$lib/model/que_quan';
import type { Actions, PageServerLoad } from './$types';
import { post_sinh_vien, type NewSinhVien } from '$lib/model/sinh_vien';

export const load: PageServerLoad = async () => {
	const chuong_trinh_hocs = await get_all_chuong_trinh_hoc();
	const que_quans = await get_que_quan_all();
	const doi_tuongs = await get_doi_tuong_all();

	return {
		chuong_trinh_hocs,
		que_quans,
		doi_tuongs
	};
};

export const actions = {
	tao: async ({ request }) => {
		const data = await request.formData();

		const ten = data.get('ten')?.toString();
		const mssv = data.get('mssv')?.toString();
		const ngay_sinh = data.get('ngay_sinh')?.toString();
		const gioi_tinh = data.get('gioi_tinh')?.toString();
		const id_que_quan = data.get('id_que_quan')?.toString();
		const id_doi_tuong = data.get('id_doi_tuong')?.toString();
		const id_chuong_trinh_hoc = data.get('id_chuong_trinh_hoc')?.toString();

		if (
			!(ten && mssv && ngay_sinh && gioi_tinh && id_que_quan && id_doi_tuong && id_chuong_trinh_hoc)
		) {
			throw new Error();
		}

		await post_sinh_vien({
			ten,
			mssv,
			ngay_sinh,
			gioi_tinh,
			id_que_quan: +id_que_quan,
			id_doi_tuong: +id_doi_tuong,
			id_chuong_trinh_hoc: +id_chuong_trinh_hoc
		} satisfies NewSinhVien);
	}
} satisfies Actions;
