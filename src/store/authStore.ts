import { create } from 'zustand';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AuthManager } from '../services/authManager';

type AuthState = {
    user: FirebaseAuthTypes.User | null;
    setUser: (user: FirebaseAuthTypes.User | null) => void;
    initialized: boolean;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    initialized: false,
}));

export function bindAuthListener() {
    const unsub = AuthManager.onAuthStateChanged((user) => {
        useAuthStore.getState().setUser(user);
    });
    return unsub;
}