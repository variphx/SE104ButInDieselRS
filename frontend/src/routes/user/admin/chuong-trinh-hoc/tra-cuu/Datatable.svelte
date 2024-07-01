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

	const handler = new DataHandler(data.chuong_trinh_hocs, { rowsPerPage: 5 });
	const rows = handler.getRows();
</script>

<div class=" overflow-x-auto space-y-4">
	<!-- Header -->
	<header class="flex justify-between gap-4">
		<Search {handler}></Search>
		<RowsPerPage {handler} />
	</header>
	<!-- Table -->
	<table class="table table-hover table-compact w-full table-auto">
		<thead>
			<tr>
				<ThSort {handler} orderBy="id">Mã chương trình học</ThSort>
				<th>
					<div class="flex h-full items-center justify-start gap-x-2">Mã ngành</div>
				</th>
				<th>
					<div class="flex h-full items-center justify-start gap-x-2">Mã học kỳ</div>
				</th>
			</tr>
			<tr>
				<ThFilter {handler} filterBy="id" />
				<ThFilter {handler} filterBy="" />
				<ThFilter {handler} filterBy="" />
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr>
					<td>{row.id}</td>
					<td>{row.nganh.ten}</td>
					<td>Học kỳ {row.hoc_ky.ten}, Năm học {row.hoc_ky.nam_hoc}</td>
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
