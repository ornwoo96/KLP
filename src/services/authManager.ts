import auth from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';
import { getAuth, FirebaseAuthTypes, signInWithEmailAndPassword } from '@react-native-firebase/auth';

export type SignupPayload = {
    email: string;
    password: string;
};

export const AuthManager = {
    async signup({ email, password }: SignupPayload) {
        try {
            const app = getApp();
            const cred = await auth(app).createUserWithEmailAndPassword(email, password);
            await cred.user.reload();
            return auth().currentUser as FirebaseAuthTypes.User;
        } catch (e: any) {
            console.log('[signup:error]', e?.code, e?.message, e?.nativeErrorMessage);
            throw e;
        }
    },

    async login(email: string, password: string) {
        const authInstance = getAuth();
        const cred = await signInWithEmailAndPassword(authInstance, email, password);
        return cred.user;
    },

    async logout() {
        await auth().signOut();
    },

    currentUser() {
        return auth().currentUser;
    },

    onAuthStateChanged(cb: (user: FirebaseAuthTypes.User | null) => void) {
        return auth().onAuthStateChanged(cb);
    },
};