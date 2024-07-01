export interface NewNganh {
	ten: string;
	id_khoa: number;
}

export interface Nganh extends NewNganh {
	id: number;
}

export const get_nganh = async (params: URLSearchParams) => {
	const response = await fetch(`http://localhost:8080/api/nganh/get?${params}`);

	if (!response.ok) {
		throw new Error(await response.text());
	}

	return response.json() as Promise<Nganh>;
};

export const get_all_nganh = async () => {
	const response = await fetch('http://localhost:8080/api/nganh/all/get');

	if (!response.ok) {
		throw new Error(await response.text());
	}

	return response.json() as Promise<Nganh[]>;
};
