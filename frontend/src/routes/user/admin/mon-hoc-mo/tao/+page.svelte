<script lang="ts">
	import type { PageServerData } from './$types';
	import MonHocMoCreateForm from './MonHocMoCreateForm.svelte';

	export let data: PageServerData;
</script>

<div class="flex flex-col items-center">
	<div class="w-2/3 mt-12">
		<MonHocMoCreateForm {data}></MonHocMoCreateForm>
	</div>
</div>
