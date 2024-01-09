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
  deleteCartItem: (id: number) => void;
  incrementCartItem: (id: number) => void;
  decrementCartItem: (id: number) => void;
}

const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addCartItem: (item) =>
    set((store) => {
      if (!store.cart.find((c) => c.id == item.id))
        return { cart: [...store.cart, item] };
      else
        return {
          cart: store.cart.map((cartItem) =>
            cartItem.id == item.id
              ? { ...cartItem, qty: cartItem.qty + item.qty }
              : cartItem
          ),
        };
    }),
  deleteCartItem: (id) =>
    set((store) => ({ cart: store.cart.filter((item) => item.id != id) })),
  incrementCartItem: (id) =>
    set((store) => {
      return {
        cart: store.cart.map((cartItem) =>
          cartItem.id == id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        ),
      };
    }),
  decrementCartItem: (id) =>
    set((store) => {
      return {
        cart: store.cart.map((cartItem) =>
          cartItem.id == id ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem
        ),
      };
    }),
}));

export default useCartStore;
