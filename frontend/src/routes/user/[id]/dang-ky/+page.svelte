<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<form method="POST" action="?/dang_ky">
	<input class="hidden" value={data.dkmh.id} name="id_dkmh" />
	<div class="grid grid-cols-1 gap-4">
		<label class="label">
			<span> Môn học mở </span>
			<select class="select" name="id_mon_hoc_mo">
				{#each data.mon_hoc_mos as mon_hoc_mo}
					<option value={mon_hoc_mo.id}>
						{mon_hoc_mo.mon_hoc.ten}
					</option>
				{/each}
			</select>
		</label>

		<div class="flex flex-col items-center">
			<button class="btn variant-filled" type="submit">Đăng ký</button>
		</div>
	</div>
</form>
