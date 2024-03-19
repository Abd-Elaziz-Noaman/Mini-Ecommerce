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
  items: [],
  addItem: (item: Item) =>
    set((state: any) => ({ items: [...state.items, item] })),
  removeItem: (itemId: number) =>
    set((state: any) => ({
      items: state.items.filter((item: Item) => item.id !== itemId),
    })),
}));

export default useCartStore;
