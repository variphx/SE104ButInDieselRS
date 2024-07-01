<script lang="ts">
	import type { PageServerData } from './$types';
	import ChuongTrinhHocCreateForm from './ChuongTrinhHocCreateForm.svelte';

	export let data: PageServerData;
</script>

<div class="flex flex-col items-center">
	<div class="w-2/3 mt-12">
		<ChuongTrinhHocCreateForm {data}></ChuongTrinhHocCreateForm>
	</div>
</div>
