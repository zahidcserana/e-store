<script setup lang="ts">
import Navigation from '../../components/navigation-global.vue'
import Footer from '../../components/footer-global.vue'
import Grid from './Components/reseller-grid.vue'

</script>

<template>
	<main class="flex h-full w-screen flex-col items-center bg-k-grey">
		<Navigation color="black" />
		<Grid />
		<Footer />
	</main>
</template>
