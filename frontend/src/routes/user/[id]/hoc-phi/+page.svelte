<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const hoc_phi = data.hoc_phi;
</script>

<div class="flex flex-col items-center justify-center">
	<div class="px-32 py-16 rounded-xl mt-12 bg-surface-50 h3">
		<div class="grid grid-cols-1 gap-4">
			<div class="grid grid-cols-2 gap-4">
				<div class="text-right font-semibold">Họ và tên</div>
				<div class="text-left">
					{hoc_phi.sinh_vien.ten}
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="text-right font-semibold">Mã số sinh viên</div>
				<div class="text-left">
					{hoc_phi.sinh_vien.mssv}
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="text-right font-semibold">Học kỳ</div>
				<div class="text-left">
					Học kỳ {hoc_phi.hoc_ky.ten}, Năm học {hoc_phi.hoc_ky.nam_hoc}
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="text-right font-semibold">Tổng học phí</div>
				<div class="text-left">
					{hoc_phi.tong}
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="text-right font-semibold">Đã thanh toán</div>
				<div class="text-left">
					{hoc_phi.da_thanh_toan}
				</div>
			</div>
		</div>
	</div>
</div>
