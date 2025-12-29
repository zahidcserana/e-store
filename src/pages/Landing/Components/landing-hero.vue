<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import NavigationCategory from '../../../components/navigation-category.vue'

import 'swiper/swiper-bundle.css'


import ButtonSolid from '../../../components/Buttons/button-solid.vue'
import { useAppStore } from '../../../pinia/appStore'

const appStore = useAppStore()

// Reference to the Swiper instance
const swiperRef = ref<any>(null)

const onSwiper = (swiper: any) => {
  swiperRef.value = swiper
}

// Pause autoplay when mouse enters
const handleMouseEnter = () => {
  if (swiperRef.value?.autoplay) swiperRef.value.autoplay.stop()
}

// Resume autoplay when mouse leaves
const handleMouseLeave = () => {
  if (swiperRef.value?.autoplay) swiperRef.value.autoplay.start()
}
</script>

<template>
  <section
    class="w-full overflow-hidden rounded-b-md bg-k-black"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <Swiper
      :modules="[Navigation, Pagination, Autoplay, EffectFade]"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :loop="true"
      effect="fade"
      :pagination="{ clickable: true }"
      navigation
      class="w-full h-[70vh] md:h-[80vh]"
      @swiper="onSwiper"
    >
      <SwiperSlide
        v-for="(banner, index) in appStore.tenant?.banner_image || []"
        :key="index"
      >
        <div class="relative w-full h-full">
          <img
            :src="banner"
            alt="Banner"
            class="object-cover w-full h-full"
          />
          <div
            class="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white"
          >
            <h1 class="text-4xl md:text-6xl font-bold uppercase drop-shadow-lg">
              {{ appStore.tenant?.company }}
            </h1>
            <p class="mt-3 text-lg opacity-90">
              {{ appStore.tenant?.store_tagline || 'Welcome to our store' }}
            </p>

            <ButtonSolid
              to="/all"
              content="Shop Now"
              color="light"
              add="font-bold mt-6"
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
  <NavigationCategory color="k-black"/>
</template>

<style scoped>
:deep(.swiper-pagination-bullet) {
  background: white;
}
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
}
</style>
