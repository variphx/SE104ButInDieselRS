import { get_chuong_trinh_hoc, type ChuongTrinhHoc } from './chuong_trinh_hoc';
import { get_hoc_ky, type HocKy } from './hoc_ky';
import { get_mon_hoc, type MonHoc } from './mon_hoc';

export interface NewMonHocMo {
	id_mon_hoc: number;
	id_hoc_ky: number;
	id_chuong_trinh_hoc: number;
}

export interface MonHocMoRaw extends NewMonHocMo {
	id: number;
}

export interface MonHocMo {
	id: number;
	mon_hoc: MonHoc;
	hoc_ky: HocKy;
	chuong_trinh_hoc: ChuongTrinhHoc;
}

export const get_mon_hoc_mo = async (params: URLSearchParams) => {
	const response = await fetch(`http://localhost:8080/api/mon-hoc-mo/get?${params}`);

	if (!response.ok) {
		throw new Error();
	}

	const data = (await response.json()) as MonHocMoRaw;
	const mon_hoc = await get_mon_hoc(new URLSearchParams({ id: data.id.toString() }));
	const hoc_ky = await get_hoc_ky(new URLSearchParams({ id: data.id_hoc_ky.toString() }));
	const chuong_trinh_hoc = await get_chuong_trinh_hoc(
		new URLSearchParams({ id: data.id_chuong_trinh_hoc.toString() })
	);

	const mon_hoc_mo = {
		id: data.id,
		mon_hoc,
		hoc_ky,
		chuong_trinh_hoc
	} satisfies MonHocMo;

	return mon_hoc_mo as MonHocMo;
};

export const post_mon_hoc_mo = async (value: NewMonHocMo) => {
	const response = await fetch('http://localhost:8080/api/mon-hoc-mo/post', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(value)
	});

	if (!response.ok) {
		throw new Error();
	}
};

export const get_all_mon_hoc_mo = async () => {
	const response = await fetch('http://localhost:8080/api/mon-hoc-mo/all/get');

	if (!response.ok) {
		throw new Error(await response.text());
	}

	const mon_hoc_mos_raw = await response.json();
	const mon_hoc_mos = [] as MonHocMo[];

	for (const mon_hoc_mo of mon_hoc_mos_raw) {
		const mon_hoc = await get_mon_hoc(
			new URLSearchParams({ id: mon_hoc_mo.id_mon_hoc.toString() })
		);
		const hoc_ky = await get_hoc_ky(new URLSearchParams({ id: mon_hoc_mo.id_hoc_ky.toString() }));
		const chuong_trinh_hoc = await get_chuong_trinh_hoc(
			new URLSearchParams({ id: mon_hoc_mo.id_chuong_trinh_hoc.toString() })
		);

		mon_hoc_mos.push({
			id: mon_hoc_mo.id,
			mon_hoc,
			hoc_ky,
			chuong_trinh_hoc
		} satisfies MonHocMo);
	}

	return mon_hoc_mos;
};

export const get_all_mon_hoc_mo_of_sinh_vien_in_hoc_ky = async (params: URLSearchParams) => {
	const response = await fetch(
		`http://localhost:8080/api/mon-hoc-mo/all/sinh-vien-in-hoc-ky/get?${params}`
	);

	if (!response.ok) {
		throw new Error();
	}

	const datas = (await response.json()) as MonHocMoRaw[];
	const mon_hoc_mos = [] as MonHocMo[];

	for (const mon_hoc_mo of datas) {
		const mon_hoc = await get_mon_hoc(
			new URLSearchParams({ id: mon_hoc_mo.id_mon_hoc.toString() })
		);
		const hoc_ky = await get_hoc_ky(new URLSearchParams({ id: mon_hoc_mo.id_hoc_ky.toString() }));
		const chuong_trinh_hoc = await get_chuong_trinh_hoc(
			new URLSearchParams({ id: mon_hoc_mo.id_chuong_trinh_hoc.toString() })
		);

		mon_hoc_mos.push({
			id: mon_hoc_mo.id,
			mon_hoc,
			hoc_ky,
			chuong_trinh_hoc
		} satisfies MonHocMo);
	}

	return mon_hoc_mos;
};
