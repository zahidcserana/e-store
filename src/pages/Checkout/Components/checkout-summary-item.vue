<script setup lang="ts">
import { Product } from '../../../api/types.ts';

const props = defineProps<{
	cartItem: Product
	itemCount: number
}>()
</script>

<template>
	<div
		v-if="itemCount > 0"
		class="flex h-full w-full flex-row items-center justify-start gap-3"
	>
		<div class="basis-1/4 justify-self-start overflow-hidden rounded-lg">
			<img
				class="aspect-square h-fit w-fit object-cover shadow-md"
				:src="props.cartItem.images[0]"
				alt=""
			/>
		</div>
		<div class="flex basis-2/4 flex-col items-start">
			<p class="text-start text-lg font-bold text-k-black">
				{{ props.cartItem.name }}
			</p>
			<p class="text-md text-start font-bold text-k-black opacity-80">
				৳ {{ props.cartItem.price }}
			</p>
		</div>

		<div
			class="ml-auto justify-self-end text-lg font-bold text-black opacity-50"
		>
			x{{ props.itemCount }}
		</div>
	</div>
</template>
