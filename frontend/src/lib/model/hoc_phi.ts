import { get_all_chi_tiet_dkmh_by_dkmh } from './chi_tiet_dkmh';
import { type DKMH } from './dkmh';
import { get_hoc_ky, type HocKy } from './hoc_ky';
import { get_sinh_vien, type SinhVien } from './sinh_vien';
import { get_tham_so } from './tham_so';

export interface NewHocPhi {
	tong: number;
	da_thanh_toan: number;
	id_hoc_ky: number;
	id_sinh_vien: number;
}

interface HocPhiRaw extends NewHocPhi {
	id: number;
}

export interface HocPhi {
	id: number;
	tong: number;
	da_thanh_toan: number;
	hoc_ky: HocKy;
	sinh_vien: SinhVien;
}

export const get_hoc_phi = async (id_sinh_vien: number, id_hoc_ky: number) => {
	const params = new URLSearchParams({
		id_sinh_vien: id_sinh_vien.toString(),
		id_hoc_ky: id_hoc_ky.toString()
	});

	const response = await fetch(`http://localhost:8080/api/hoc-phi/get?${params}`);

	if (!response.ok) {
		throw new Error(await response.text());
	}

	const data = (await response.json()) as HocPhiRaw;
	const hoc_ky = await get_hoc_ky(new URLSearchParams({ id: data.id_hoc_ky.toString() }));
	const sinh_vien = await get_sinh_vien(new URLSearchParams({ id: data.id_sinh_vien.toString() }));
	const hoc_phi = {
		id: data.id,
		da_thanh_toan: data.da_thanh_toan,
		tong: data.tong,
		sinh_vien,
		hoc_ky
	} satisfies HocPhi;

	return hoc_phi as HocPhi;
};

export const post_hoc_phi_by_dkmh = async (dkmh: DKMH) => {
	const tham_so = await get_tham_so();

	const chi_tiet_dkmhs = await get_all_chi_tiet_dkmh_by_dkmh(
		new URLSearchParams({ id_dkmh: dkmh.id.toString() })
	);
	let hoc_phi = 0;

	for (const chi_tiet_dkmh of chi_tiet_dkmhs) {
		const loai_mon_hoc = chi_tiet_dkmh.mon_hoc_mo.mon_hoc.loai;
		const so_tin_chi = chi_tiet_dkmh.mon_hoc_mo.mon_hoc.so_tin_chi;

		let gia_tin_chi = 0;

		if (loai_mon_hoc === 'LT') {
			gia_tin_chi = tham_so.gia_tin_chi_lt;
		} else if (loai_mon_hoc === 'TH') {
			gia_tin_chi = tham_so.gia_tin_chi_th;
		} else {
			throw new Error();
		}

		const hoc_phi_mon_hoc = so_tin_chi * gia_tin_chi;
		hoc_phi += hoc_phi_mon_hoc;
	}

	const he_so_hoc_phi = dkmh.sinh_vien.doi_tuong.he_so_hoc_phi;
	hoc_phi *= he_so_hoc_phi;

	const response = await fetch('http://localhost:8080/api/hoc-phi/post', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			da_thanh_toan: 0,
			tong: hoc_phi,
			id_hoc_ky: dkmh.hoc_ky.id,
			id_sinh_vien: dkmh.sinh_vien.id
		} satisfies NewHocPhi)
	});

	if (!response.ok) {
		throw new Error();
	}
};
