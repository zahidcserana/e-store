import { defineStore } from 'pinia'

interface CartItem {
  id: number
  name: string
  price: number
  qty: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    totalPrice: (state) =>
      state.items.reduce((sum, i) => sum + i.price * i.qty, 0),
  },
  actions: {
    addToCart(product: any, qty = 1) {
      const existing = this.items.find((i) => i.id === product.id)
      if (existing) existing.qty += qty
      else this.items.push({ ...product, qty })
    },
    removeFromCart(id: number) {
      this.items = this.items.filter((i) => i.id !== id)
    },
    clearCart() {
      this.items = []
    },
  },
})
