import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProductType } from '@/components/ProductGrid'

interface CartItem {
  product: ProductType
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (product: ProductType) => void
  removeItem: (productId: string) => void
  deleteCartProduct: (productId: string) => void
  resetCard: () => void
  getTotalPrice: () => number
  getSubTotalPrice: () => number
  getItemCount: (productId: string) => number
  getGroupedItems: () => CartItem[]
}

export const useCarStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          )
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          } else {
            return { items: [...state.items, { product, quantity: 1 }] }
          }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 })
              }
            } else {
              acc.push(item)
            }
            return acc
          }, [] as CartItem[]),
        })),
      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== productId),
        })),
      resetCard: () => set({ items: [] }),
      getTotalPrice: () => {
        const total = get().items.reduce((acc, item) => {
          return acc + (item.product.price ?? 0) * item.quantity
        }, 0)
        return total
      },
      getSubTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0
          const discount = ((item.product.discount ?? 0) * price) / 100
          const discountedPrice = price + discount
          return total + discountedPrice * item.quantity
        }, 0)
      },
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId)
        return item ? item.quantity : 0
      },
      getGroupedItems: () => get().items,
    }),
    { name: 'cart-store' }
  )
)
