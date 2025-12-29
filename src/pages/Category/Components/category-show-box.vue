<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useCartStore } from '../../../pinia/cartStore.ts'

import ButtonSolid from '../../../components/Buttons/button-solid.vue'
import ButtonQuickAdd from '../../../components/Buttons/button-quick-add.vue'
import { Product } from '../../../api/types.ts'

const cartStore = useCartStore()

const props = defineProps<{
	category: string
	item: Product
}>()

const flip = computed(() => {
	return props.item.id % 2 === 0 ? false : true
})

let show = ref(false)

onMounted(() => {
	show.value = true
})
</script>

<template>
	<div class="mt-16 flex w-4/5 max-w-6xl flex-col items-center gap-10 md:mt-32 md:grid md:w-11/12 md:grid-cols-2 md:grid-rows-1 md:gap-10 lg:w-4/5 lg:gap-20">
		<div
			class="flex flex-col items-center md:col-span-1 md:row-start-1 md:block lg:pb-6"
			:class="flip === true ? 'md:col-start-1' : 'md:col-start-2'"
		>
			<p
				v-if="props.item?.feature_product"
				class="md:text-md text-sm font-light uppercase tracking-broad text-black"
			>
				new product
			</p>
			<h1 class="mt-4 text-center text-4xl font-semibold uppercase text-black md:text-start md:text-5xl lg:text-6xl">
				{{ props.item.name }}
			</h1>
			<p class="mb-10 mt-4 text-center text-black opacity-60 md:pr-20 md:text-start">
				<span class="text-lg"><strong>Code:</strong> {{ props.item.sku }}</span>
				<br>
				<span class="text-lg"><strong>Category:</strong> {{ props.item.category }}</span>
			</p>
			<div class="flex flex-row items-center justify-center gap-4 md:justify-normal">
				<ButtonSolid
					:to="{ name: 'Product', params: { sku: props.item.sku } }"
					color="light"
					add="font-bold"
				/>
				<ButtonQuickAdd
					v-if="cartStore.showQuickAdd"
					@add-to-cart="cartStore.addToCart(props.item)"
					:data-test="`quick-add-${props.item.category}-${props.item.id}`"
				/>
			</div>
		</div>
		<router-link
			:to="{ name: 'Product', params: { sku: props.item.sku } }"
			class="order-first col-span-1 cursor-pointer overflow-hidden rounded active:translate-y-1 md:-order-none"
			:class="flip === true ? 'col-start-2' : 'col-start-1'"
		>
			<img
				v-if="props.item.images.length"
				loading="lazy"
				class="relative aspect-square w-full object-cover"
				:src="props.item.images[0]"
				alt=""
			/>
		</router-link>
	</div>
</template>
