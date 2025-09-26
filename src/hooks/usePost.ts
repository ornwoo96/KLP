import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostManager } from '../services/postManager';

export function useCreatePost(onSuccess?: (postId: string) => void) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: PostManager.create,
    onSuccess: async (postId) => {
      await qc.invalidateQueries({ queryKey: ['posts'] });
      onSuccess?.(postId);
    },
  });
}