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

	const handler = new DataHandler(data.mon_hocs, { rowsPerPage: 5 });
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
				<ThSort {handler} orderBy="id">Mã môn học</ThSort>
				<ThSort {handler} orderBy="ten">Tên</ThSort>
				<ThSort {handler} orderBy="id_khoa">Khoa</ThSort>
				<ThSort {handler} orderBy="loai">Loại</ThSort>
				<ThSort {handler} orderBy="so_tiet">Số tiết</ThSort>
				<ThSort {handler} orderBy="so_tin_chi">Số tín chỉ</ThSort>
			</tr>
			<tr>
				<ThFilter {handler} filterBy="id" />
				<ThFilter {handler} filterBy="ten" />
				<ThFilter {handler} filterBy="id_khoa" />
				<ThFilter {handler} filterBy="loai" />
				<ThFilter {handler} filterBy="so_tiet" />
				<ThFilter {handler} filterBy="so_tin_chi" />
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr>
					<td>{row.id}</td>
					<td>{row.ten}</td>
					<td>{row.khoa.ten}</td>
					<td>{row.loai}</td>
					<td>{row.so_tiet}</td>
					<td>{row.so_tin_chi}</td>
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
