import apiClient from './apiClient'
import type { Customer } from './types'

export const authApi = {
  async create(payload: Customer): Promise<{ message: string; success: boolean }> {
    const { data } = await apiClient.post('/customer-create', payload)
    return data
  },
}
