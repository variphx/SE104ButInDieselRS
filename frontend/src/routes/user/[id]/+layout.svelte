<script lang="ts">
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import type { LayoutServerData } from './$types';
	import { page } from '$app/stores';

	interface Path {
		name: string;
		url: string;
	}

	export let data: LayoutServerData;
	const username = data.username;

	const paths = [
		{
			name: 'Học phần đã đăng ký',
			url: `/user/${username}/tra-cuu`
		},
		{
			name: 'Đăng ký học phần',
			url: `/user/${username}/dang-ky`
		},
		{
			name: 'Tra cứu học phí',
			url: `/user/${username}/hoc-phi`
		}
	] satisfies Path[];
</script>

<div class="grid grid-cols-[auto_1fr]">
	<AppRail class="h-screen">
		{#each paths as path}
			<AppRailAnchor href={path.url} selected={$page.url.pathname === path.url}>
				{path.name}
			</AppRailAnchor>
		{/each}
	</AppRail>
	<slot></slot>
</div>
