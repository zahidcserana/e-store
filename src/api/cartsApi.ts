import apiClient from './apiClient'
import type { CartItem } from './types'

export const cartsApi = {
  async get(): Promise<CartItem[]> {
    const { data } = await apiClient.get<CartItem[]>('/cart')
    return data
  },

  async addItem(item: CartItem): Promise<CartItem> {
    const { data } = await apiClient.post<CartItem>('/cart', item)
    return data
  },

  async removeItem(id: number): Promise<{ message: string }> {
    const { data } = await apiClient.delete<{ message: string }>(`/cart/${id}`)
    return data
  },
}
