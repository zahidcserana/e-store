<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ButtonSolid from '../../../components/Buttons/button-solid.vue'
import ButtonGoBack from '../../../components/Buttons/button-go-back.vue'
import { useCartStore } from '../../../pinia/cartStore.ts'
import { Product } from '../../../api/types.ts'
import ButtonBuy from '../../../components/Buttons/button-buy.vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const cartStore = useCartStore()

const props = defineProps<{
  item: Product
}>()

const activeImage = ref(props.item.images[0])
const showLightbox = ref(false)
const currentIndex = ref(0)

function handleBuyNow(item: Product) {
  cartStore.buyNow(item, router)
}

// Zoom state
const zoom = ref(1)
const offsetX = ref(0)
const offsetY = ref(0)
let isDragging = false
let startX = 0
let startY = 0

// --- Navigation ---
const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.item.images.length
  resetZoom()
  activeImage.value = props.item.images[currentIndex.value]
}

const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.item.images.length) % props.item.images.length
  resetZoom()
  activeImage.value = props.item.images[currentIndex.value]
}

const openLightbox = (image: string) => {
  activeImage.value = image
  currentIndex.value = props.item.images.indexOf(image)
  showLightbox.value = true
  resetZoom()
}

// --- Zoom + Pan ---
const resetZoom = () => {
  zoom.value = 1
  offsetX.value = 0
  offsetY.value = 0
}

const handleWheel = (e: WheelEvent) => {
  if (!showLightbox.value) return
  e.preventDefault()
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  zoom.value = Math.min(Math.max(zoom.value + delta, 1), 4)
}

const handleMouseDown = (e: MouseEvent) => {
  if (zoom.value === 1) return
  isDragging = true
  startX = e.clientX - offsetX.value
  startY = e.clientY - offsetY.value
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging) return
  offsetX.value = e.clientX - startX
  offsetY.value = e.clientY - startY
}

const handleMouseUp = () => {
  isDragging = false
}

// --- Touch pinch zoom ---
let initialDistance = 0
let initialZoom = 1

const getDistance = (touches: TouchList) => {
  const [t1, t2] = [touches[0], touches[1]]
  return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
}

const handleTouchStart = (e: TouchEvent) => {
  if (e.touches.length === 2) {
    initialDistance = getDistance(e.touches)
    initialZoom = zoom.value
  } else if (e.touches.length === 1) {
    startX = e.touches[0].clientX - offsetX.value
    startY = e.touches[0].clientY - offsetY.value
  }
}

const handleTouchMove = (e: TouchEvent) => {
  if (e.touches.length === 2) {
    const newDistance = getDistance(e.touches)
    const scale = newDistance / initialDistance
    zoom.value = Math.min(Math.max(initialZoom * scale, 1), 4)
  } else if (e.touches.length === 1 && zoom.value > 1) {
    offsetX.value = e.touches[0].clientX - startX
    offsetY.value = e.touches[0].clientY - startY
  }
}

// --- Keyboard Controls ---
const handleKey = (e: KeyboardEvent) => {
  if (!showLightbox.value) return
  if (e.key === 'ArrowRight') nextImage()
  else if (e.key === 'ArrowLeft') prevImage()
  else if (e.key === 'Escape') showLightbox.value = false
}

// Mount listeners
onMounted(() => {
  window.addEventListener('keydown', handleKey)
  window.addEventListener('mouseup', handleMouseUp)
  window.addEventListener('mousemove', handleMouseMove)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey)
  window.removeEventListener('mouseup', handleMouseUp)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <ButtonGoBack />

  <section class="flex w-4/5 max-w-6xl flex-col lg:grid lg:grid-cols-2 lg:grid-rows-1">
    <!-- Product Info -->
    <div
      class="flex flex-col items-center pb-6 lg:col-span-1 lg:col-start-2 lg:row-span-full lg:ml-24 lg:items-start lg:justify-center"
    >
      <p
        v-if="props.item.feature_product"
        class="lg:text-md text-sm uppercase tracking-broad text-black"
      >
        new product
      </p>

      <h1
        class="mt-4 text-center text-4xl font-semibold uppercase text-black lg:text-start lg:text-6xl"
      >
        {{ props.item.name }}
      </h1>

      <p class="mt-6 text-center text-black opacity-60 lg:pr-20 lg:text-start">
        <span class="text-lg"><strong>Code:</strong> {{ props.item.sku }}</span>
        <br>
        <span class="text-lg"><strong>Category:</strong> {{ props.item.category }}</span>
      </p>

      <p class="my-8 text-xl font-bold text-black">৳ {{ props.item.price }}</p>

      <div class="flex">
		<ButtonSolid
			@click="cartStore.addToCart(props.item)"
			color="light"
			add="font-bold"
			content="add to cart"
		/>
		&nbsp;
		<ButtonBuy
			@click="handleBuyNow(props.item)"
			color="dark"
			add="font-bold"
			content="by now"
		/>
	  </div>
    </div>

    <!-- Image gallery -->
    <div
      class="order-first overflow-hidden rounded pb-10 lg:order-none lg:col-span-1 lg:col-start-1 lg:row-span-full lg:pb-0"
    >
      <!-- Main image -->
      <img
        :src="activeImage"
        loading="lazy"
        class="w-full aspect-square object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02] cursor-zoom-in"
        alt="Product image"
        @click="openLightbox(activeImage)"
      />

      <!-- Thumbnails -->
      <div class="mt-4 flex justify-center gap-3 flex-wrap">
        <img
          v-for="(image, index) in props.item.images"
          :key="index"
          :src="image"
          loading="lazy"
          class="w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all duration-200"
          :class="{
            'border-k-main opacity-100 scale-105': activeImage === image,
            'border-transparent opacity-60 hover:opacity-100 hover:scale-105': activeImage !== image
          }"
          @click="openLightbox(image)"
          alt="Thumbnail"
        />
      </div>
    </div>
  </section>

  <!-- Lightbox -->
  <dialog
    v-if="showLightbox"
    open
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
    @click.self="showLightbox = false"
    @wheel="handleWheel"
    @mousedown="handleMouseDown"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
  >
    <img
      :src="activeImage"
      :style="{
        transform: `scale(${zoom}) translate(${offsetX / zoom}px, ${offsetY / zoom}px)`,
        cursor: zoom > 1 ? 'grab' : 'zoom-out'
      }"
      class="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-transform duration-150 ease-out select-none"
      alt="Zoomed image"
    />

    <!-- Prev / Next -->
    <button
      @click.stop="prevImage"
      class="absolute left-6 text-white text-4xl font-thin hover:scale-110 transition select-none"
    >
      ‹
    </button>
    <button
      @click.stop="nextImage"
      class="absolute right-6 text-white text-4xl font-thin hover:scale-110 transition select-none"
    >
      ›
    </button>

    <!-- Close -->
    <button
      @click="showLightbox = false"
      class="absolute top-6 right-8 text-white text-3xl font-light hover:scale-110 transition select-none"
      aria-label="Close"
    >
      ✕
    </button>

    <!-- 🔄 Zoom Reset -->
    <button
      v-if="zoom > 1"
      @click.stop="resetZoom"
      class="absolute bottom-6 right-8 text-white text-2xl font-light bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full backdrop-blur-md transition select-none"
      aria-label="Reset Zoom"
    >
      ↺
    </button>
  </dialog>
</template>
