import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  userEmail: string;
  userName: string;
  token: string | null;
  loginWithGoogle: (email: string, name: string, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      userEmail: '',
      userName: '',
      token: null,
      loginWithGoogle: (email, name, token) =>
        set({
          userEmail: email,
          userName: name,
          token: token,
        }),
      logout: () => set({ userEmail: '', userName: '', token: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
