import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

type NewPostInput = {
    authorId: string;
    title: string;
    body: string;
    imageLocalPath?: string;
};

export type Post = {
    id: string;
    authorId: string;
    authorProfileImageUrl?: string;
    title: string;
    body: string;
    imageUrl?: string;
    createdAt: FirebaseFirestoreTypes.Timestamp;
    updatedAt?: FirebaseFirestoreTypes.Timestamp;
};

const database = firestore().collection('posts');

const getExt = (p: string) => {
    const m = p.match(/\.(\w+)(?:\?|#|$)/);
    return (m?.[1] ?? 'jpg').toLowerCase();
  };
  

export const PostManager = {
    async create(input: NewPostInput): Promise<string> {
        const docRef = database.doc();
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
            authorId: input.authorId,
            title: input.title,
            body: input.body,
            imageUrls: imageUrl ?? null,
            createdAt: firestore.FieldValue.serverTimestamp(),
        });

        return postId;
    },

    async get(postId: string): Promise<Post | null> {
        const snap = await database.doc(postId).get();
        if (!snap.exists) return null;
        return { id: snap.id, ...(snap.data() as any) } as Post;
    },

    async listPage(limitN: number, cursor?: FirebaseFirestoreTypes.DocumentSnapshot) {
        let q = database.orderBy('createdAt', 'desc').limit(limitN);
        if (cursor) q = q.startAfter(cursor);
        const snap = await q.get();
        const items = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) } as Post));
        const nextCursor = snap.docs.at(-1);
        return { items, nextCursor };
    },
};