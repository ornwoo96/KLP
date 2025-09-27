import type { Post } from '../services/postManager';

export type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Main: undefined;
    PostDetail: { post: Post };
    ProfileSetup: undefined;
};