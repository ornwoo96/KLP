import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

const col = firestore().collection('users');

export type UserDoc = {
    uid: string;
    email: string;
    nickname: string;
    profileImageUrl?: string | null;
    createdAt?: FirebaseFirestoreTypes.Timestamp;
    updatedAt?: FirebaseFirestoreTypes.Timestamp;
};

export const UserManager = {
    async create(
        uid: string,
        data: {
            email: string;
            nickname: string;
            profileImageUrl?: string | null
        }) {
        const now = firestore.FieldValue.serverTimestamp();

        await col.doc(uid).set({
            uid,
            email: data.email,
            nickname: data.nickname,
            profileImageUrl: data.profileImageUrl ?? null,
            createdAt: now,
            updatedAt: now,
        },);
    },

    async get(uid: string): Promise<UserDoc | null> {
        const snap = await col.doc(uid).get();
        return snap.exists() ? (snap.data() as UserDoc) : null;
    },

    async updateProfileImageUrl(uid: string, url: string | null) {
        await col.doc(uid).set({
            profileImageUrl: url ?? null,
            updatedAt: firestore.FieldValue.serverTimestamp(),
        },
            { merge: true }
        );
    },

    async uploadAndSetProfileImage(uid: string, localPath: string) {
        const ext = (localPath.match(/\.(\w+)(?:\?|#|$)/)?.[1] ?? 'jpg').toLowerCase();
        const path = `users/${uid}/profile.${ext}`;
        const ref = storage().ref(path);
        await ref.putFile(localPath);
        const url = await ref.getDownloadURL();
        await this.updateProfileImageUrl(uid, url);
        return url;
    },

    onSnapshot(uid: string, cb: (doc: UserDoc | null) => void) {
        return col.doc(uid).onSnapshot(s => cb(s.exists() ? (s.data() as UserDoc) : null));
    },
};