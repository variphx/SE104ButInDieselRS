<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const chi_tiet_dkmhs = data.chi_tiet_dkmhs;
</script>

<div class="flex flex-col items-center">
	<div class="w-2/3 mt-12">
		<div class="table-container">
			<table class="table table-hover table-compact">
				<thead>
					<tr>
						<th>Mã chi tiết đăng ký</th>
						<th>Tên môn học</th>
						<th>Khoa</th>
						<th>Số tín chỉ</th>
					</tr>
				</thead>
				<tbody>
					{#each chi_tiet_dkmhs as chi_tiet_dkmh}
						<tr>
							<td>
								{chi_tiet_dkmh.id}
							</td>
							<td>
								{chi_tiet_dkmh.mon_hoc_mo.mon_hoc.ten}
							</td>
							<td>
								{chi_tiet_dkmh.mon_hoc_mo.mon_hoc.khoa.ten}
							</td>
							<td>
								{chi_tiet_dkmh.mon_hoc_mo.mon_hoc.so_tin_chi}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
