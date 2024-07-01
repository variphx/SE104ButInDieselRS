export interface NewKhoa {
	ten: string;
}

export interface Khoa extends NewKhoa {
	id: number;
}

export const get_khoa = async (params: URLSearchParams) => {
	const response = await fetch(`http://localhost:8080/api/khoa/get?${params}`);

	if (!response.ok) {
		throw new Error();
	}

	return response.json() as Promise<Khoa>;
};

export const get_all_khoa = async () => {
	const response = await fetch('http://localhost:8080/api/khoa/all/get');

	if (!response.ok) {
		throw new Error(await response.text());
	}

	return response.json() as Promise<Khoa[]>;
};
