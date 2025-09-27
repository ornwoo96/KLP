import { useMutation, useQueryClient, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { PostManager, Comment } from '../services/postManager';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export function useCreatePost(onSuccess?: (postId: string) => void) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: PostManager.createPost,
    onSuccess: async (postId) => {
      await qc.invalidateQueries({ queryKey: ['posts'] });
      onSuccess?.(postId);
    },
  });
}

type Cursor = FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData> | null;

const PAGE_SIZE = 10;

export function usePostsFeed() {
  return useInfiniteQuery({
    queryKey: ['posts'],
    initialPageParam: null as Cursor,
    queryFn: ({ pageParam }) => PostManager.postlistPage(PAGE_SIZE, pageParam ?? undefined),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}

export function useComments(postId: string) {
  return useQuery<Comment[], Error>({
    queryKey: ['comments', postId],
    queryFn: () => PostManager.commentlist(postId),
  });
}

export function useAddComment(postId: string, onSuccess?: () => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      authorId: string;
      authorNickname?: string;
      authorProfileImageUrl?: string | null;
      body: string;
    }) => PostManager.createComment(postId, payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['comments', postId] });
      onSuccess?.();
    },
  });
}