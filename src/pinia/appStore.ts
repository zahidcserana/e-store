// 📄 /pinia/appStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Tenant, Tag, Settings, Product } from '../api/types'
import { productsApi } from '../api/productsApi'

export const useAppStore = defineStore('app', () => {
    const tenant = ref<Tenant>()
    const tags = ref<Tag[]>([])
    const settings = ref<Settings | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    // 🟢 Fetch settings
    async function fetchSettings(force = false) {
        if (!force && tenant.value) return
        try {
            loading.value = true
            const res = await productsApi.getSettings()
            tenant.value = res.tenant
            tags.value = res.tags
            settings.value = res.settings || null
        } catch (err: any) {
            console.error('Failed to fetch settings:', err)
            error.value = err.message || 'Failed to load settings'
        } finally {
            loading.value = false
        }
    }

    // 🟢 Computed properties
    const categories = computed(() => tags.value.map(tag => tag.name))

    const featureProducts = computed<Product[]>(() =>
        tags.value
            .map(tag => tag.feature_product)
            .filter((p): p is Product => p != null)
    )

    const randomFeatureProduct = computed<Product | null>(() => {
        if (featureProducts.value.length === 0) return null
        const randomIndex = Math.floor(Math.random() * featureProducts.value.length)
        return featureProducts.value[randomIndex]
    })

    return {
        tenant,
        tags,
        settings,
        categories,
        featureProducts,
        randomFeatureProduct,
        loading,
        error,
        fetchSettings,
    }
})
