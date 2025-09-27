import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

type NewPostInput = {
    authorId: string;
    authorProfileImageUrl?: string | null;
    authorNickname: string;
    body: string;
    imageLocalPath?: string;
};

export type Post = {
    postId: string;
    authorId: string;
    authorProfileImageUrl?: string;
    authorNickname: string;
    body: string;
    imageUrl?: string;
    createdAt: FirebaseFirestoreTypes.Timestamp;
    commentCount: number;
};

export type Comment = {
    id: string;
    postId: string;
    authorId: string;
    authorNickname?: string;
    authorProfileImageUrl?: string | null;
    body: string;
    createdAt: FirebaseFirestoreTypes.Timestamp;
};


const postDatabase = firestore().collection('posts');
const col = (postId: string) =>
    firestore().collection('posts').doc(postId).collection('comments');

const getExt = (p: string) => {
    const m = p.match(/\.(\w+)(?:\?|#|$)/);
    return (m?.[1] ?? 'jpg').toLowerCase();
};


export const PostManager = {
    async createPost(input: NewPostInput): Promise<string> {
        const docRef = postDatabase.doc();
        const postId = docRef.id;

        let imageUrl: string | undefined;

        if (input.imageLocalPath) {
            const ext = getExt(input.imageLocalPath);
            const objectPath = `posts/${postId}/image.${ext}`;
            const ref = storage().ref(objectPath);
            await ref.putFile(input.imageLocalPath);
            imageUrl = await ref.getDownloadURL();
        }

        await docRef.set({
            postId: postId,
            authorId: input.authorId,
            authorProfileImageUrl: input.authorProfileImageUrl ?? null,
            authorNickname: input.authorNickname,
            body: input.body,
            imageUrl: imageUrl ?? null,
            createdAt: firestore.FieldValue.serverTimestamp(),
            commentCount: 0,
        });

        return postId;
    },

    async postlistPage(limitN: number, cursor?: FirebaseFirestoreTypes.DocumentSnapshot) {
        let q = postDatabase.orderBy('createdAt', 'desc').limit(limitN);
        if (cursor) q = q.startAfter(cursor);
        const snap = await q.get();
        const items = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) } as Post));
        const nextCursor = snap.docs.at(-1);
        return { items, nextCursor };
    },

    async createComment(postId: string, data: Omit<Comment, 'id' | 'createdAt' | 'postId'>) {
        const commentRef = await col(postId).add({
            postId,
            ...data,
            createdAt: firestore.FieldValue.serverTimestamp(),
        });

        await postDatabase.doc(postId).update({
            commentCount: firestore.FieldValue.increment(1),
        });

        return commentRef
    },

    async commentlist(postId: string, limitN = 30) {
        const snap = await col(postId)
            .orderBy('createdAt', 'desc')
            .limit(limitN)
            .get();
        const items = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) } as Comment));
        return items.reverse(); // 화면에선 오래된 것부터 보이도록
    },
};