<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navigation from '../../components/navigation-global.vue'
import CategoryBoxes from '../../components/Category-Box/category-box-container.vue'
import Info from '../../components/info-section.vue'
import Footer from '../../components/footer-global.vue'
import Showbox from './Components/category-show-box.vue'
import { productsApi } from '../../api/productsApi'
import type { Product } from '../../api/types'

// Get route instance
const route = useRoute()

// State
const products = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Fetch products by category
const fetchProducts = async () => {

  loading.value = true
  error.value = null

  try {
    const res = await productsApi.getAll()
    products.value = res.data
  } catch (err: any) {
    console.error('Failed to fetch products:', err)
    error.value = 'Unable to load products.'
  } finally {
    loading.value = false
  }
}

// Initial load
onMounted(fetchProducts)

// Refetch when category changes
watch(() => route.query.category, fetchProducts)
</script>

<template>
  <Navigation color="black" />

  <header class="flex w-full flex-col items-center bg-black lg:rounded-b-lg">
    <div class="my-10 flex w-4/5 max-w-6xl flex-col items-center justify-center lg:my-20">
      <h1 class="text-4xl font-semibold uppercase tracking-wider text-white antialiased">
        {{ route.query.category || 'Products' }}
      </h1>
    </div>
  </header>

  <main class="main-container flex h-full w-screen flex-col items-center bg-white">
    <div v-if="loading" class="py-20 text-gray-500">Loading products...</div>
    <div v-else-if="error" class="py-20 text-red-500">{{ error }}</div>

    <template v-else>
      <div v-if="products.length" class="flex flex-wrap justify-center gap-6 p-8">
        <Showbox
          v-for="product in products"
          :key="product.id"
          :item="product"
          :category="product.sku"
          :data-test="`showbox-${product.sku}-${product.id}`"
        />
      </div>
      <div v-else class="py-20 text-gray-500">No products found in this category.</div>
    </template>

    <CategoryBoxes />
    <Info />
    <Footer />
  </main>
</template>
