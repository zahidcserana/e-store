<script setup lang="ts">
import { useAppStore } from '../pinia/appStore';

const appStore = useAppStore()
</script>

<template>
	<section class="mt-20 flex h-full flex-col items-center justify-center md:mt-32 lg:mt-40">
		<div class="flex h-full w-4/5 max-w-6xl flex-col items-center gap-10 md:h-[38rem] md:w-11/12 md:flex-row md:items-start md:justify-between md:gap-32 lg:h-[40rem] lg:w-4/5">
			<div class="flex h-full flex-col items-center justify-center text-center md:w-4/5 md:items-start md:text-start">
				<h3 class="text-3xl font-semibold uppercase text-k-black md:text-3xl">
					{{ appStore.tenant?.moto }} <br class="hidden xl:inline" />
					<span class="text-k-main">best</span> products
				</h3>
				<p class="mt-10 tracking-wide text-black opacity-70 md:mt-6">
					{{ appStore.tenant?.about }}
				</p>
			</div>
			<div class="order-first aspect-square h-full w-full overflow-hidden rounded-md md:order-last md:aspect-auto"> 
				<img
					loading="lazy"
					class="h-full w-full object-cover"
					:src="appStore.tenant?.image"
					alt=""
					srcset=""
				/>
			</div>
		</div>
	</section>
</template>
