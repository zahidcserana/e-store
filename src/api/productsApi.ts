import apiClient from './apiClient'
import type { PaginatedProducts, Product } from './types'

export const productsApi = {
    getSettings: async () => {
        const { data } = await apiClient.get('')
        return data
    },

    async getByCategory(category: string): Promise<PaginatedProducts> {
        const { data } = await apiClient.get<PaginatedProducts>(
            `/tag_products/${category}`
        )
        return data
    },

    async getAll(): Promise<PaginatedProducts> {
        const { data } = await apiClient.get<PaginatedProducts>('/products')
        return data
    },

    async getById(id: number): Promise<Product> {
        const { data } = await apiClient.get<Product>(`/products/${id}`)
        return data
    },

    async getBySKU(sku: string): Promise<Product> {
        const { data } = await apiClient.get<Product>('/product_search', {
            params: { sku } // ✅ Must be wrapped in params
        })
        return data
    },

    async create(payload: Partial<Product>): Promise<Product> {
        const { data } = await apiClient.post<Product>('/products', payload)
        return data
    },

    async update(id: number, payload: Partial<Product>): Promise<Product> {
        const { data } = await apiClient.put<Product>(`/products/${id}`, payload)
        return data
    },

    async delete(id: number): Promise<{ message: string }> {
        const { data } = await apiClient.delete<{ message: string }>(`/products/${id}`)
        return data
    },
}
