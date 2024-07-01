export interface NewHocKy {
	nam_hoc: number;
	ten: string;
}

export interface HocKy extends NewHocKy {
	id: number;
}

export const get_hoc_ky = async (params: URLSearchParams) => {
	const response = await fetch(`http://localhost:8080/api/hoc-ky/get?${params}`);

	if (!response.ok) {
		throw new Error(await response.text());
	}

	return response.json() as Promise<HocKy>;
};

export const get_all_hoc_ky_of_sinh_vien = async (params: URLSearchParams) => {
	const response = await fetch(`http://localhost:8080/api/hoc-ky/all/sinh-vien/get?${params}`);

	if (!response.ok) {
		throw new Error();
	}

	return response.json() as Promise<HocKy[]>;
};

export const post_hoc_ky = async (value: NewHocKy) => {
	const response = await fetch('http://localhost:8080/api/hoc-ky/post', {
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
