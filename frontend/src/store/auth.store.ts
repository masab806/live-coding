import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserType } from "../lib/types";

interface AuthStoreState {
  token: string | null;
  user: UserType | null;
  login: (user: UserType, token: string | null) => void;
  logout: () => void;
  isAuthenticated: Boolean | null;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: (userData, token) =>
        set({
          user: userData,
          token,
          isAuthenticated: true
        }),

      logout: () =>
        set({
          user: null,
          token: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);