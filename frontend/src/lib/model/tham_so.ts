export interface ThamSo {
	id: number;
	gia_tin_chi_lt: number;
	gia_tin_chi_th: number;
	he_so_tin_chi_lt: number;
	he_so_tin_chi_th: number;
	id_hoc_ky: number;
}

export const get_tham_so = async () => {
	const response = await fetch('http://localhost:8080/api/tham-so/get');

	if (!response.ok) {
		throw new Error(await response.text());
	}

	return response.json() as Promise<ThamSo>;
};
