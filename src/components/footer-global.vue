<script setup lang="ts">
import facebookIcon from '/public/icons/facebook.svg';
import twitterIcon from '/public/icons/twitter.svg';
import instagramIcon from '/public/icons/instagram.svg';
import { useAppStore } from '../pinia/appStore';

const appStore = useAppStore();
</script>

<template>
  <footer id="footer-div" class="relative mt-20 w-full bg-black text-white md:mt-32 lg:mt-40">
    <!-- Top Gradient Strip -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-32 bg-gradient-to-r from-k-main to-k-accent rounded-full"></div>

    <!-- Main Container -->
    <div class="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:px-4 lg:px-8">
      
      <!-- Logo & Navigation -->
      <div class="flex flex-col items-center justify-between gap-8 md:flex-row md:items-center">
        <router-link
          to="/"
          class="text-4xl font-bold subpixel-antialiased transition-transform duration-300 hover:scale-110 hover:text-k-main md:text-3xl"
        >
          {{ appStore.tenant?.company }}
        </router-link>

        <nav class="flex flex-col items-center gap-4 md:flex-row md:gap-8">
          <router-link
            class="font-semibold uppercase tracking-wider transition-colors duration-300 hover:text-k-main"
            to="/"
          >
            Home
          </router-link>
          <router-link
            v-for="category in appStore.categories"
            :key="category"
            class="font-semibold uppercase tracking-wider transition-colors duration-300 hover:text-k-main"
            :to="{ path: '/products', query: { category } }"
          >
            {{ category }}
          </router-link>
        </nav>
      </div>

      <!-- Contact Info & Socials -->
      <div class="flex flex-col gap-8 md:flex-row md:justify-between">
        <!-- Address -->
        <div class="text-center md:text-left md:w-1/3">
          <span class="block mb-2 text-2xl font-bold text-white">Address:</span>
          <p class="tracking-wide text-white/90">
            {{ appStore.tenant?.address }}, {{ appStore.tenant?.city }}
          </p>
        </div>

        <!-- Phone -->
        <div class="text-center md:text-left md:w-1/3">
          <span class="block mb-2 text-2xl font-bold text-white">Phone:</span>
          <p class="tracking-wide text-white/90">{{ appStore.tenant?.phone }}</p>
        </div>

        <!-- Social Icons -->
        <div class="flex justify-center gap-6 md:justify-end">
          <a
            href="#"
            aria-label="Facebook"
            class="transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <img class="h-6 w-6" :src="facebookIcon" alt="Facebook" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            class="transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <img class="h-6 w-6" :src="twitterIcon" alt="Twitter" />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            class="transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <img class="h-6 w-6" :src="instagramIcon" alt="Instagram" />
          </a>
        </div>
      </div>

      <!-- Divider -->
      <div class="h-px w-full bg-white/20"></div>

      <!-- Copyright -->
     <p class="text-center text-sm font-semibold text-white/60 md:text-left">
		&copy; 
		<a href="https://analyticalj.com/" target="_blank" class="text-k-main hover:underline">AnalyticalJ</a>
		All right reserved.
	</p>
    </div>
  </footer>
</template>
