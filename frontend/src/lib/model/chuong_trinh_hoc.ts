import { get_hoc_ky, type HocKy } from './hoc_ky';
import { get_nganh, type Nganh } from './nganh';

export interface NewChuongTrinhHoc {
	id_nganh: number;
	id_hoc_ky: number;
}

export interface ChuongTrinhHoc {
	id: number;
	nganh: Nganh;
	hoc_ky: HocKy;
}

export const get_all_chuong_trinh_hoc = async () => {
	const response = await fetch('http://localhost:8080/api/chuong-trinh-hoc/all/get');

	if (!response.ok) {
		throw new Error(await response.text());
	}

	const values = await response.json();

	const chuong_trinh_hocs = [] as ChuongTrinhHoc[];

	for (const value of values) {
		const nganh = await get_nganh(new URLSearchParams({ id: value.id_nganh.toString() }));
		const hoc_ky = await get_hoc_ky(new URLSearchParams({ id: value.id_hoc_ky.toString() }));

		chuong_trinh_hocs.push({
			id: value.id as number,
			nganh,
			hoc_ky
		} satisfies ChuongTrinhHoc);
	}

	return chuong_trinh_hocs as ChuongTrinhHoc[];
};

export const get_chuong_trinh_hoc = async (params: URLSearchParams) => {
	const response = await fetch(`http://localhost:8080/api/chuong-trinh-hoc/get?${params}`);

	if (!response.ok) {
		throw new Error(await response.text());
	}

	const value = await response.json();
	const nganh = await get_nganh(new URLSearchParams({ id: value.id_nganh.toString() }));
	const hoc_ky = await get_hoc_ky(new URLSearchParams({ id: value.id_hoc_ky.toString() }));

	return {
		id: value.id as number,
		nganh,
		hoc_ky
	} satisfies ChuongTrinhHoc;
};

export const post_chuong_trinh_hocs = async (values: NewChuongTrinhHoc[]) => {
	const response = await fetch('http://localhost:8080/api/chuong-trinh-hoc/post', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(values)
	});

	if (!response.ok) {
		throw new Error();
	}
};
