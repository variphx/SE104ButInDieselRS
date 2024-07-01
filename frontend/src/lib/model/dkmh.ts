import { get_hoc_ky, type HocKy } from './hoc_ky';
import { get_sinh_vien, get_all_sinh_vien, type SinhVien } from './sinh_vien';

export interface NewDKMH {
	id_sinh_vien: number;
	id_hoc_ky: number;
}

interface DKMHRaw extends NewDKMH {
	id: number;
}

export interface DKMH {
	id: number;
	sinh_vien: SinhVien;
	hoc_ky: HocKy;
}

export const get_dkmh = async (params: URLSearchParams) => {
	const response = await fetch(`http://localhost:8080/api/dkmh/get?${params}`);

	if (!response.ok) {
		throw new Error();
	}

	const data = (await response.json()) as DKMHRaw;
	const sinh_vien = await get_sinh_vien(new URLSearchParams({ id: data.id_sinh_vien.toString() }));
	const hoc_ky = await get_hoc_ky(new URLSearchParams({ id: data.id_hoc_ky.toString() }));

	const dkmh = {
		id: data.id,
		sinh_vien,
		hoc_ky
	} satisfies DKMH;

	return dkmh as DKMH;
};

export const get_all_dkmhs_by_id_hoc_ky = async (id_hoc_ky: number) => {
	const params = new URLSearchParams({ id_hoc_ky: id_hoc_ky.toString() });
	const response = await fetch(`http://localhost:8080/api/dkmh/all/hoc-ky/get?${params}`);

	if (!response.ok) {
		throw new Error();
	}

	const datas = (await response.json()) as DKMHRaw[];
	const dkmhs = [] as DKMH[];

	for (const data of datas) {
		const sinh_vien = await get_sinh_vien(
			new URLSearchParams({ id: data.id_sinh_vien.toString() })
		);
		const hoc_ky = await get_hoc_ky(new URLSearchParams({ id: data.id_hoc_ky.toString() }));

		const dkmh = {
			id: data.id,
			sinh_vien,
			hoc_ky
		} satisfies DKMH;

		dkmhs.push(dkmh);
	}

	return dkmhs;
};

export const get_dkmh_by_id_sinh_vien_and_id_hoc_ky = async (params: URLSearchParams) => {
	const response = await fetch(`http://localhost:8080/api/dkmh/sinh-vien-and-hoc-ky/get?${params}`);

	if (!response.ok) {
		throw new Error();
	}

	const data = (await response.json()) as DKMHRaw;
	const sinh_vien = await get_sinh_vien(new URLSearchParams({ id: data.id_sinh_vien.toString() }));
	const hoc_ky = await get_hoc_ky(new URLSearchParams({ id: data.id_hoc_ky.toString() }));

	const dkmh = {
		id: data.id,
		sinh_vien,
		hoc_ky
	} satisfies DKMH;

	return dkmh as DKMH;
};

export const post_all_dkmh_in_hoc_ky = async (id_hoc_ky: number) => {
	const sinh_viens = await get_all_sinh_vien();
	const new_dkmhs = [] as NewDKMH[];

	for (const sinh_vien of sinh_viens) {
		const new_dkmh = {
			id_sinh_vien: sinh_vien.id,
			id_hoc_ky
		} satisfies NewDKMH;

		new_dkmhs.push(new_dkmh);
	}

	const response = await fetch('http://localhost:8080/api/dkmh/post', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(new_dkmhs)
	});

	if (!response.ok) {
		throw new Error();
	}
};
