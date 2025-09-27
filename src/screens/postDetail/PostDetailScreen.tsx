
import React, { useLayoutEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    Platform,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { useComments } from '../../hooks/usePost';
import DefaultBottomSheet from '../../components/DefaultBottomSheet';
import PostCommentCell, { PostComment } from './PostCommentCell';
import BottomRoundedButton from '../../components/BottomRoundedButton';

type Props = NativeStackScreenProps<RootStackParamList, 'PostDetail'>;

export default function PostDetailScreen({ navigation, route }: Props) {
    const { post } = route.params;
    const [ openPreview, setOpenPreview ] = useState(false);
    const { data: comments, isLoading, refetch } = useComments(post.postId);
    const [ openCreateCommentView, setOpen ] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerTintColor: '#000',
        });
    }, [navigation]);


    const header = useMemo(() => (
        <View style={styles.card}>
            {/* 작성자 헤더 */}
            <View style={styles.header}>
                {post.authorProfileImageUrl ? (
                    <Image source={{ uri: post.authorProfileImageUrl }} style={styles.avatar} />
                ) : (
                    <View style={[styles.avatar, styles.avatarFallback]}>
                        <Text style={styles.avatarInitial}>
                            {(post.authorNickname?.[0] ?? 'U').toUpperCase()}
                        </Text>
                    </View>
                )}
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.authorName} numberOfLines={1}>
                        {post.authorNickname ?? 'Unknown'}
                    </Text>
                    {!!post.createdAt && (
                        <Text style={styles.subMeta}>{post.createdAt.toDate().toLocaleString()}</Text>
                    )}
                </View>
            </View>

            {/* 본문 */}
            <Text style={styles.body}>{post.body}</Text>

            {/* 이미지 (클릭 시 프리뷰) */}
            {!!post.imageUrl && (
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setOpenPreview(true)
                    }>
                    <Image source={{ uri: post.imageUrl }} style={styles.image} />
                </TouchableOpacity>
            )}

            <Text style={styles.sectionTitle}>댓글</Text>
        </View>
    ), [post]);

    // 댓글 아이템
    const renderItem = ({ item }: { item: PostComment }) => (
        <PostCommentCell comment={item} />
    );

    return (
        <View style={styles.wrap}>
            <FlatList
                data={comments ?? []}
                renderItem={renderItem}
                keyExtractor={(c) => c.id}
                ListHeaderComponent={header}
                contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 16 : 64 }}
                refreshing={isLoading}
                onRefresh={refetch}
            />

            <BottomRoundedButton
                placeholder="댓글 달기...😎"
                onPress={() => setOpen(true)}
            />

            <DefaultBottomSheet
                open={openCreateCommentView}
                onClose={() => setOpen(false)}
                snapPoints={['93%']}                
            >
                <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 12 }}>댓글 달기</Text>
                <TouchableOpacity onPress={() => setOpen(false)} style={{ marginTop: 12 }}>
                    <Text>닫기</Text>
                </TouchableOpacity>
            </DefaultBottomSheet>

            {/* 이미지 프리뷰 */}
            <Modal visible={openPreview} transparent animationType="fade" onRequestClose={() => setOpenPreview(false)}>
                <View style={styles.previewBackdrop}>
                    <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpenPreview(false)} />
                    {!!post.imageUrl && (
                        <Image source={{ uri: post.imageUrl }} style={styles.previewImage} resizeMode="contain" />
                    )}
                    <TouchableOpacity onPress={() => setOpenPreview(false)} style={styles.closeBtn}>
                        <Text style={styles.closeBtnText}>✕</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: { flex: 1, backgroundColor: '#fff' },

    // 게시물 카드
    card: { padding: 14, backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#ddd' },
    avatarFallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#2979ff' },
    avatarInitial: { color: '#fff', fontWeight: '700' },
    authorName: { fontSize: 15, fontWeight: '600', color: '#111827', maxWidth: 220 },
    subMeta: { fontSize: 12, color: '#6b7280', marginTop: 2 },
    body: { fontSize: 15, lineHeight: 20, color: '#111827', marginBottom: 10 },
    image: { width: '100%', height: 220, borderRadius: 10, marginTop: 2, marginBottom: 8, backgroundColor: '#ddd' },
    sectionTitle: { marginTop: 8, fontSize: 16, fontWeight: '700' },

    // 프리뷰 모달
    previewBackdrop: {
        flex: 1, backgroundColor: 'rgba(0,0,0,0.92)',
        alignItems: 'center', justifyContent: 'center',
    },
    previewImage: { width: '100%', height: '80%' },
    closeBtn: {
        position: 'absolute', top: 24, right: 16,
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center', justifyContent: 'center',
    },
    closeBtnText: { color: '#fff', fontSize: 20, fontWeight: '700' },
    commentStubBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 10,
        height: 80,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: -2 },
        elevation: 12,
    },
    commentStubInput: {
        flex: 1,
        fontSize: 15,
        color: '#111827',
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 1,
    },
});