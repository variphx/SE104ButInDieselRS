<script>
	import { enhance } from '$app/forms';
</script>

<div class="flex flex-col items-center justify-center">
	<div class="w-1/3">
		<form method="POST" action="?/lap_phieu_thu" use:enhance>
			<label class="label">
				<span> Mật khẩu </span>
				<div class="grid grid-cols-[1fr_auto] gap-4">
					<input type="password" class="input" name="password" />
					<button class="btn variant-filled h-fit" type="submit">Lập</button>
				</div>
			</label>
		</form>
	</div>
</div>
