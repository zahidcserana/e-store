import apiClient from './apiClient'
import type { Order } from './types'

export const ordersApi = {
  async create(payload: Order): Promise<{ message: string; order_id: number }> {
    const { data } = await apiClient.post('/orders', payload)
    return data
  },

  async getAll(): Promise<Order[]> {
    const { data } = await apiClient.get<Order[]>('/orders')
    return data
  },

  async getById(id: number): Promise<Order> {
    const { data } = await apiClient.get<Order>(`/orders/${id}`)
    return data
  },
}
