<script setup lang="ts">
import CategoryBox from './category-box.vue'
import { useAppStore } from '../../pinia/appStore'

const appStore = useAppStore()
</script>

<template>
	<div class="mt-16 flex h-full w-full flex-col items-center bg-white lg:mt-32">
		<div class="flex w-4/5 flex-col items-center gap-4 md:h-[17rem] md:w-11/12 md:max-w-6xl md:flex-row md:justify-center md:gap-6 lg:w-4/5">
			<CategoryBox
				v-for="(item, index) in appStore.tags"
				:key="index"
				:src="item.feature_product?.image_url"
				:category="item?.name"
				:imgClass="''"
			/>
		</div>
	</div>
</template>
