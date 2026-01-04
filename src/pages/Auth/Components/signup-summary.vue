<script setup lang="ts">
import { useAuthStore } from '../../../pinia/authStore.ts'
import Privacy from './privacy-summary.vue'
import ButtonSolid from '../../../components/Buttons/button-solid.vue'

const formStore = useAuthStore()
</script>

<template>
	<div
		class="col-span-1 flex h-fit max-h-full w-full flex-col rounded bg-white px-6 py-12 lg:self-start"
		data-test="checkout-summary"
	>
		<h1 class="text-2xl font-bold uppercase text-black">Privacy</h1>
		<div
			class="my-10 flex h-full w-full flex-col gap-5 overflow-x-hidden overflow-y-scroll"
		>
			<Privacy/>
		</div>
		<div class="flex flex-row justify-between">
			<p class="font-semibold tracking-wide text-black text-opacity-60">
				If you have any questions or concerns about our privacy policy, please contact us. 
			</p>
		</div>
		
		<ButtonSolid
			content="submit"
			color="light"
			class="mt-8 self-center font-bold"
			@click="formStore.submit()"
			data-test="checkout-button"
		/>
	</div>
</template>
