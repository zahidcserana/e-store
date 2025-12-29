<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import ButtonSolid from '../components/Buttons/button-solid.vue'
import { productsApi } from '../api/productsApi.ts';
import { Product } from '../api/types.ts';

const props = defineProps<{
	productCategory: string
	productId: number
}>()

const items = ref<Product[]>([])
const products = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Fetch products by category
const fetchProducts = async () => {
  if (!props.productCategory) return

  loading.value = true
  error.value = null

  try {
    const res = await productsApi.getByCategory(props.productCategory)
	products.value = res.data
	filterProducts()
  } catch (err: any) {
    console.error('Failed to fetch products:', err)
    error.value = 'Unable to load products.'
  } finally {
    loading.value = false
  }
}

// Initial load
onMounted(fetchProducts)

const filterProducts = async () => {
	items.value = products.value.filter(
			(row: Product) => row.id !== props.productId
		)
}

// Refetch when category changes
watch(() => props.productCategory, fetchProducts)
watch(() => props.productId, filterProducts)
</script>

<template>
	<section class="mt-20 flex w-4/5 max-w-6xl flex-col items-center lg:mt-32">
		<h2 class="mb-16 font-Manrope text-3xl font-bold uppercase text-black">
			You may also like
		</h2>
		<div class="flex flex-col items-center gap-12 lg:grid lg:grid-cols-3 lg:grid-rows-1 lg:gap-6">
			<div
				class="flex flex-col items-center justify-between gap-8 lg:gap-10"
				v-for="(item, index) in items"
				:key="index"
			>
				<router-link
					:to="{ name: 'Product', params: { sku: item.sku } }"
					class="overflow-hidden rounded"
				>
					<img class="object-center" :src="item.images[0]" alt="" loading="lazy" />
				</router-link>
				<h3 class="text-center font-Manrope text-2xl font-semibold text-black">
					{{ item.sku }} <br class="hidden lg:inline" />
					<span class="capitalize"> {{ item.name }}</span>
				</h3>
				<ButtonSolid
					:to="{ name: 'Product', params: { sku: item.sku } }"
					color="light"
					content="see product"
					size="small"
				/>
			</div>
		</div>
	</section>
</template>
