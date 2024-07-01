export interface DoiTuong {
	id: string;
	ten: string;
	he_so_hoc_phi: number;
}

export const get_doi_tuong_all = async () => {
	const response = await fetch('http://localhost:8080/api/doi-tuong/all/get');

	if (!response.ok) {
		throw new Error(await response.text());
	}

	return response.json() as Promise<DoiTuong[]>;
};

export const get_doi_tuong = async (params: URLSearchParams) => {
	const response = await fetch(`http://localhost:8080/api/doi-tuong/get?${params}`);

	if (!response.ok) {
		throw new Error();
	}

	return response.json() as Promise<DoiTuong>;
};
