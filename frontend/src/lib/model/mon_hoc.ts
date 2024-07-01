import { get_khoa, type Khoa } from './khoa';

export interface NewMonHoc {
	ten: string;
	id_khoa: number;
	loai: string;
	so_tiet: number;
	so_tin_chi: number;
}

export interface MonHoc {
	id: string;
	ten: string;
	khoa: Khoa;
	loai: string;
	so_tiet: number;
	so_tin_chi: number;
}

export const get_all_mon_hoc = async () => {
	const response = await fetch('http://localhost:8080/api/mon-hoc/all/get');

	if (!response.ok) {
		throw new Error(await response.text());
	}

	const mon_hocs_raw = await response.json();
	const mon_hocs = [] as MonHoc[];

	for (const mon_hoc of mon_hocs_raw) {
		const khoa = await get_khoa(new URLSearchParams({ id: mon_hoc.id.toString() }));

		mon_hocs.push({
			id: mon_hoc.id,
			khoa,
			loai: mon_hoc.loai,
			so_tiet: mon_hoc.so_tiet,
			so_tin_chi: mon_hoc.so_tin_chi,
			ten: mon_hoc.ten
		} satisfies MonHoc);
	}

	return mon_hocs;
};

export const post_mon_hoc = async (values: NewMonHoc[]) => {
	const response = await fetch('http://localhost:8080/api/mon-hoc/post', {
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

export const get_mon_hoc = async (params: URLSearchParams) => {
	const response = await fetch(`http://localhost:8080/api/mon-hoc/get?${params}`);

	if (!response.ok) {
		throw new Error();
	}

	const mon_hoc_raw = await response.json();
	const khoa = await get_khoa(new URLSearchParams({ id: mon_hoc_raw.id.toString() }));

	const mon_hoc = {
		id: mon_hoc_raw.id,
		khoa,
		loai: mon_hoc_raw.loai,
		so_tiet: mon_hoc_raw.so_tiet,
		so_tin_chi: mon_hoc_raw.so_tin_chi,
		ten: mon_hoc_raw.ten
	} satisfies MonHoc;

	return mon_hoc as MonHoc;
};
