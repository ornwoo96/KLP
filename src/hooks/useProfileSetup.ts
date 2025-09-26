import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { UserManager } from '../services/userManager';

type SubmitPayload = {
    nickname: string;
    localImageUri?: string | null;
};

type Options = {
    onSuccess?: () => void;
};

export function useProfileSetup({ onSuccess }: Options = {}) {
    const user = useAuthStore(s => s.user);

    const mutation = useMutation({
        mutationFn: async ({ nickname, localImageUri }: SubmitPayload) => {
            if (!user) throw new Error('로그인 정보 없음');
            const uid = user.uid;

            // 이미지만 먼저 업로드(선택)
            let url: string | undefined;

            if (localImageUri) {
                url = await UserManager.uploadAndSetProfileImage(uid, localImageUri);
            }

            await UserManager.create(
                uid, {
                    email: user.email ?? '',
                    nickname: nickname.trim(),
                    profileImageUrl: url ?? null,
                }
            );
            return { nickname: nickname.trim(), profileImageUrl: url };
        },
        onSuccess: () => onSuccess?.(),
    });

    return {
        submit: (payload: SubmitPayload) => mutation.mutate(payload),
        isSubmitting: mutation.isPending,
        error: mutation.error as Error | null,
    };
}