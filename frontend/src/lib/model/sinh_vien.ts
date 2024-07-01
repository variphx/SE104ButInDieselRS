import { post_user, type NewUsers } from './users';
import { get_que_quan, type QueQuan } from './que_quan';
import { get_doi_tuong, type DoiTuong } from './doi_tuong';
import { get_chuong_trinh_hoc, type ChuongTrinhHoc } from './chuong_trinh_hoc';
import { hash } from 'argon2';

export interface NewSinhVien {
	ten: string;
	mssv: string;
	ngay_sinh: string;
	gioi_tinh: string;
	id_que_quan: number;
	id_doi_tuong: number;
	id_chuong_trinh_hoc: number;
}

export interface SinhVien {
	id: number;
	ten: string;
	mssv: string;
	ngay_sinh: string;
	gioi_tinh: string;
	que_quan: QueQuan;
	doi_tuong: DoiTuong;
	chuong_trinh_hoc: ChuongTrinhHoc;
}

interface SinhVienRaw extends NewSinhVien {
	id: number;
}

export const get_sinh_vien = async (params: URLSearchParams) => {
	const response = await fetch(`http://localhost:8080/api/sinh-vien/get?${params}`);

	if (!response.ok) {
		throw new Error();
	}

	const data = (await response.json()) as SinhVienRaw;

	const que_quan = await get_que_quan(new URLSearchParams({ id: data.id_que_quan.toString() }));
	const doi_tuong = await get_doi_tuong(new URLSearchParams({ id: data.id_doi_tuong.toString() }));
	const chuong_trinh_hoc = await get_chuong_trinh_hoc(
		new URLSearchParams({ id: data.id_chuong_trinh_hoc.toString() })
	);

	const sinh_vien = {
		id: data.id,
		ten: data.ten,
		mssv: data.mssv,
		ngay_sinh: data.ngay_sinh,
		gioi_tinh: data.gioi_tinh,
		que_quan,
		doi_tuong,
		chuong_trinh_hoc
	} satisfies SinhVien;

	return sinh_vien as SinhVien;
};

export const get_all_sinh_vien = async () => {
	const response = await fetch('http://localhost:8080/api/sinh-vien/all/get');

	if (!response.ok) {
		throw new Error(await response.text());
	}

	const datas = (await response.json()) as SinhVienRaw[];
	const sinh_viens = [] as SinhVien[];

	for (const data of datas) {
		const que_quan = await get_que_quan(new URLSearchParams({ id: data.id_que_quan.toString() }));
		const doi_tuong = await get_doi_tuong(
			new URLSearchParams({ id: data.id_doi_tuong.toString() })
		);
		const chuong_trinh_hoc = await get_chuong_trinh_hoc(
			new URLSearchParams({ id: data.id_chuong_trinh_hoc.toString() })
		);

		const sinh_vien = {
			id: data.id,
			ten: data.ten,
			mssv: data.mssv,
			ngay_sinh: data.ngay_sinh,
			gioi_tinh: data.gioi_tinh,
			que_quan,
			doi_tuong,
			chuong_trinh_hoc
		} satisfies SinhVien;

		sinh_viens.push(sinh_vien);
	}

	return sinh_viens;
};

export const post_sinh_vien = async (value: NewSinhVien) => {
	const response = await fetch('http://localhost:8080/api/sinh-vien/post', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(value)
	});

	if (!response.ok) {
		throw new Error(await response.text());
	}

	const username = value.mssv;
	const hash_pwd = await hash(username);

	await post_user({
		username,
		hash_pwd
	} satisfies NewUsers);
};

export const get_sinh_vien_id_by_mssv = async (params: URLSearchParams) => {
	const response = await fetch(`http://localhost:8080/api/sinh-vien/mssv/get?${params}`);

	if (!response.ok) {
		throw new Error();
	}

	return response.json() as Promise<number>;
};
