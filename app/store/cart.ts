import { create } from "zustand";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

const useCartStore = create((set) => ({
  cartItems: [],
  addItem: (item: Item) =>
    set((state: any) => ({ cartItems: [...state.cartItems, item] })),
  removeItem: (itemId: number) =>
    set((state: any) => ({
      cartItems: state.cartItems.filter((item: Item) => item.id !== itemId),
    })),
  resetCartItems: () => set({ cartItems: [] }),
}));

export default useCartStore;
