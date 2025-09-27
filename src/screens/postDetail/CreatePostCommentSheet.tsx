import React, { useState } from 'react';
import {
    Platform,
    StyleSheet,
    TextInput,
    View,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import PostAccessoryBar from '../../components/PostAccessoryBar';
import { useAddComment } from '../../hooks/usePost';
import { useAuthStore } from '../../store/authStore';
import { useUserProfile } from '../../hooks/useUser';
import { HeaderProfile } from '../../components/HeaderProfile';

type Props = {
    postId: string;
    onPosted?: () => void;
    onClose?: () => void;
};

export default function CreatePostCommentSheet({ postId, onPosted, onClose }: Props) {
    const insets = useSafeAreaInsets();
    const user = useAuthStore(s => s.user);
    const profile = useUserProfile(user?.uid);

    const [text, setText] = useState('');

    const { mutate: addComment, isPending } = useAddComment(postId, () => {
        onPosted?.();
        onClose?.();
    });

    const canPost = text.trim().length > 0 && !isPending;

    const onPressPost = () => {
        if (!user || !canPost) return;
        addComment({
            authorId: user.uid,
            authorNickname: profile?.nickname ?? 'Unknown',
            authorProfileImageUrl: profile?.profileImageUrl ?? null,
            body: text.trim(),
        });
    };

    return (
        <SafeAreaView style={styles.safe} edges={['left', 'right']}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    style={styles.flex}
                    contentContainerStyle={[
                        styles.content,
                        { paddingBottom: Platform.OS === 'ios' ? 16 : 100 + Math.max(insets.bottom, 8) + 16 },
                    ]}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="handled"
                    scrollEnabled={false}
                >
                    <View style={styles.container}>

                        <HeaderProfile onPress={() => console.log('프로필 화면 이동')} />

                        <TextInput
                            style={styles.bodyInput}
                            value={text}
                            onChangeText={setText}
                            placeholder="어떤 댓글을 남길까요? 🤔"
                            multiline
                            scrollEnabled={false}
                            textAlignVertical="top"
                            {...(Platform.OS === 'ios' ? { inputAccessoryViewID: "MY_BAR" } : {})}
                        />

                    </View>
                </ScrollView>

                <PostAccessoryBar
                    accessoryID={'POST_BAR'}
                    canPost={canPost}
                    isPending={isPending}
                    onPressPost={onPressPost}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        minHeight: 900,
        backgroundColor: '#ffffff',
        paddingBottom: 100
    },
    flex: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 0,
    },
    content: {
        paddingHorizontal: 0,
        paddingTop: 15,
        gap: 12,
    },
    bodyInput: {
        flex: 1,
        marginTop: 10,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 0,
        fontSize: 16,
        minHeight: 45,
    },
});