import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  email: string;
  token: string;
}

interface Auth {
  user: User | null;
  setUser: (data: User | null) => void;
}

const useAuthStore = create<any>(
  persist(
    (set, get) => ({
      user: null,
      setUser: (data: any) => set((store: any) => ({ user: data })),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
