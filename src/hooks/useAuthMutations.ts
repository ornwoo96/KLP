import { useMutation } from '@tanstack/react-query';
import { AuthManager, SignupPayload } from '../services/authManager';
import { useAuthStore } from '../store/authStore';

export function useSignupMutation(onSuccess?: () => void) {
    const setUser = useAuthStore((s) => s.setUser);

    return useMutation({
        mutationFn: (payload: SignupPayload) => AuthManager.signup(payload),
        onSuccess: (user) => {
            setUser(user);
            onSuccess?.();
        },
    });
}

export function useLoginMutation(onSuccess?: () => void) {
    const setUser = useAuthStore((s) => s.setUser);

    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            AuthManager.login(email, password),
        onSuccess: (user) => {
            setUser(user);
            onSuccess?.();
        },
    });
}