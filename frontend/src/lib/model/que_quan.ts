export interface NewQueQuan {
	thanh_pho: string;
	tinh: string;
}

export interface QueQuan extends NewQueQuan {
	id: number;
}

export const get_que_quan_all = async () => {
	const response = await fetch('http://localhost:8080/api/que-quan/all/get');

	if (!response.ok) {
		throw new Error(await response.text());
	}

	return response.json() as Promise<QueQuan[]>;
};

export const get_que_quan = async (params: URLSearchParams) => {
	const response = await fetch(`http://localhost:8080/api/que-quan/get?${params}`);

	if (!response.ok) {
		throw new Error();
	}

	return response.json() as Promise<QueQuan>;
};
