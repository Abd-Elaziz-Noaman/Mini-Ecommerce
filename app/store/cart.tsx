import { create } from "zustand";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

// type CartStore = {
//   items: Item[];
//   addItems: (item: Item) => void;
//   removeItems: (itemId: number) => void;
// };

const useCartStore = create((set) => ({
  cartItems: [],
  addItem: (item: Item) =>
    set((state: any) => ({ cartItems: [...state.cartItems, item] })),
  removeItem: (itemId: number) =>
    set((state: any) => {
      console.log("🚀 ~ set ~ state:", state);
      return {
        cartItems: state.cartItems.filter((item: Item) => item.id !== itemId),
      };
    }),
}));

export default useCartStore;
