<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<form method="POST" action="?/tao" use:enhance>
	<label class="label">
		<span> Mã số sinh viên </span>
		<input class="input" type="text" name="mssv" />
	</label>

	<label class="label">
		<span> Họ và tên </span>
		<input class="input" type="text" name="ten" />
	</label>

	<label class="label mt-4">
		<span> Ngày sinh </span>
		<input class="input" type="date" name="ngay_sinh" />
	</label>

	<label class="label mt-4">
		<span> Giới tính </span>
		<select class="select" name="gioi_tinh">
			<option value="Nam">Nam</option>
			<option value="Nữ">Nữ</option>
		</select>
	</label>

	<label class="label mt-4">
		<span> Quê quán </span>
		<select class="select" name="id_que_quan">
			{#each data.que_quans as que_quan}
				<option value={que_quan.id}>
					{que_quan.thanh_pho}, {que_quan.tinh}
				</option>
			{/each}
		</select>
	</label>

	<label class="label mt-4">
		<span> Đối tượng chính sách </span>
		<select class="select" name="id_doi_tuong">
			{#each data.doi_tuongs as doi_tuong}
				<option value={doi_tuong.id}>
					{doi_tuong.ten}
				</option>
			{/each}
		</select>
	</label>

	<label class="label mt-4">
		<span> Chương trình học </span>
		<select class="select" name="id_chuong_trinh_hoc">
			{#each data.chuong_trinh_hocs as chuong_trinh_hoc}
				<option value={chuong_trinh_hoc.id}>
					Ngành {chuong_trinh_hoc.nganh.ten}, Nhập học: Học kỳ {chuong_trinh_hoc.hoc_ky.ten}, Năm
					học {chuong_trinh_hoc.hoc_ky.nam_hoc}
				</option>
			{/each}
		</select>
	</label>

	<div class="flex flex-col items-center mt-4">
		<button type="submit" class="btn variant-filled"> Tạo hồ sơ </button>
	</div>
</form>
