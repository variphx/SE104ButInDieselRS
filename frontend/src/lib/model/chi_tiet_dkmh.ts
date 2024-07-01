import { get_dkmh, type DKMH } from './dkmh';
import { get_mon_hoc_mo, type MonHocMo } from './mon_hoc_mo';

export interface NewChiTietDKMH {
	id_dkmh: number;
	id_mon_hoc_mo: number;
}

export interface ChiTietDKMH {
	id: number;
	dkmh: DKMH;
	mon_hoc_mo: MonHocMo;
}

interface ChiTietDKMHRaw extends NewChiTietDKMH {
	id: number;
}

export const get_chi_tiet_dkmh = async (params: URLSearchParams) => {
	const response = await fetch(`http://localhost:8080/api/chi-tiet-dkmh/get?${params}`);

	if (!response.ok) {
		throw new Error();
	}

	const data = (await response.json()) as ChiTietDKMHRaw;
	const dkmh = await get_dkmh(new URLSearchParams({ id: data.id_dkmh.toString() }));
	const mon_hoc_mo = await get_mon_hoc_mo(
		new URLSearchParams({ id: data.id_mon_hoc_mo.toString() })
	);

	const chi_tiet_dkmh = {
		id: data.id,
		dkmh,
		mon_hoc_mo
	} satisfies ChiTietDKMH;

	return chi_tiet_dkmh as ChiTietDKMH;
};

export const get_all_chi_tiet_dkmh_by_dkmh = async (params: URLSearchParams) => {
	const response = await fetch(`http://localhost:8080/api/chi-tiet-dkmh/all/dkmh/get?${params}`);

	if (!response.ok) {
		throw new Error();
	}

	const datas = (await response.json()) as ChiTietDKMHRaw[];
	const chi_tiet_dkmhs = [] as ChiTietDKMH[];

	for (const data of datas) {
		const dkmh = await get_dkmh(new URLSearchParams({ id: data.id_dkmh.toString() }));
		const mon_hoc_mo = await get_mon_hoc_mo(
			new URLSearchParams({ id: data.id_mon_hoc_mo.toString() })
		);

		const chi_tiet_dkmh = {
			id: data.id,
			dkmh,
			mon_hoc_mo
		} satisfies ChiTietDKMH;

		chi_tiet_dkmhs.push(chi_tiet_dkmh);
	}

	return chi_tiet_dkmhs;
};

export const post_chi_tiet_dkmh = async (value: NewChiTietDKMH) => {
	const response = await fetch('http://localhost:8080/api/chi-tiet-dkmh/post', {
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
