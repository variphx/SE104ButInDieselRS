<script lang="ts">
	import { DataHandler } from '@vincjo/datatables';
	import type { PageServerData } from './$types';
	import Search from '$lib/datatables/client/Search.svelte';
	import RowsPerPage from '$lib/datatables/client/RowsPerPage.svelte';
	import ThSort from '$lib/datatables/client/ThSort.svelte';
	import ThFilter from '$lib/datatables/client/ThFilter.svelte';
	import RowCount from '$lib/datatables/client/RowCount.svelte';
	import Pagination from '$lib/datatables/client/Pagination.svelte';

	export let data: PageServerData;

	const handler = new DataHandler(data.sinh_viens, { rowsPerPage: 5 });
	const rows = handler.getRows();
</script>

<div class=" overflow-x-auto space-y-4">
	<!-- Header -->
	<header class="flex justify-between gap-4">
		<Search {handler} />
		<RowsPerPage {handler} />
	</header>
	<!-- Table -->
	<table class="table table-hover table-compact w-full table-auto">
		<thead>
			<tr>
				<ThSort {handler} orderBy="mssv">MSSV</ThSort>
				<ThSort {handler} orderBy="ten">Họ và tên</ThSort>
				<ThSort {handler} orderBy="id_gioi_tinh">Giới tính</ThSort>
				<ThSort {handler} orderBy="ngay_sinh">Ngày sinh</ThSort>
				<ThSort {handler} orderBy="que_quan.id">Quê quán</ThSort>
				<ThSort {handler} orderBy="doi_tuong.id">Đối tượng</ThSort>
				<ThSort {handler} orderBy="chuong_trinh_hoc.id">Chương trình học</ThSort>
			</tr>
			<tr>
				<ThFilter {handler} filterBy="mssv" />
				<ThFilter {handler} filterBy="ten" />
				<ThFilter {handler} filterBy="id_gioi_tinh" />
				<ThFilter {handler} filterBy="ngay_sinh" />
				<ThFilter {handler} filterBy="que_quan.id" />
				<ThFilter {handler} filterBy="doi_tuong.id" />
				<ThFilter {handler} filterBy="chuong_trinh_hoc.id" />
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr>
					<td>{row.mssv}</td>
					<td>{row.ten}</td>
					<td>{row.gioi_tinh}</td>
					<td>{row.ngay_sinh}</td>
					<td>Thành phố {row.que_quan.thanh_pho}, Tỉnh {row.que_quan.tinh}</td>
					<td>{row.doi_tuong.ten}</td>
					<td>{row.chuong_trinh_hoc.nganh.ten}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<!-- Footer -->
	<footer class="flex justify-between">
		<RowCount {handler} />
		<Pagination {handler} />
	</footer>
</div>
