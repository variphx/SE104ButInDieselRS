<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<form method="POST" action="?/tao" use:enhance>
	<div class="grid grid-rows-1 gap-4">
		<label class="label">
			<span> Môn học </span>
			<select class="select" name="id_mon_hoc">
				{#each data.mon_hocs as mon_hoc}
					<option value={mon_hoc.id}>
						{mon_hoc.ten}
					</option>
				{/each}
			</select>
		</label>

		<label class="label">
			<span> Học kỳ </span>
			<input
				class="input"
				disabled
				value="Học kỳ {data.hoc_ky.ten}, Năm học {data.hoc_ky.nam_hoc}"
			/>
		</label>

		<label class="label">
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

		<div class="flex flex-col items-center">
			<button class="btn variant-filled" type="submit"> Mở môn học </button>
		</div>
	</div>
</form>
