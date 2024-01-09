import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  qty: number;
  price: number;
}

interface CartStore {
  cart: CartItem[];
  addCartItem: (item: CartItem) => void;
}

const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addCartItem: (item) => set((store) => ({ cart: [...store.cart, item] })),
}));

export default useCartStore;
