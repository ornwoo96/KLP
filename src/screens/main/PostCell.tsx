import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import type { Post } from '../../services/postManager';

type Props = {
  post: Post;
  onPress?: (post: Post) => void;   // 셀 전체 터치
};

export default function PostCell({ post, onPress }: Props) {
  const [openPreview, setOpenPreview] = useState(false);

  const handlePressCell = () => onPress?.(post);
  const handleOpenPreview = () => setOpenPreview(true);
  const handleClosePreview = () => setOpenPreview(false);

  return (
    <>
      <Pressable onPress={handlePressCell} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
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
            <Text style={styles.subMeta}>{post.createdAt?.toDate().toLocaleString()}</Text>
           
          </View>
        </View>

        {!!post.imageUrl && (
          <TouchableOpacity activeOpacity={0.8} onPress={handleOpenPreview}>
            <Image source={{ uri: post.imageUrl }} style={styles.image} />
          </TouchableOpacity>
        )}

        <Text style={styles.body}>{post.body}</Text>
      </Pressable>

      <Modal visible={openPreview} transparent animationType="fade" onRequestClose={handleClosePreview}>
        <View style={styles.previewBackdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClosePreview} />
          {!!post.imageUrl && (
            <Image
              source={{ uri: post.imageUrl }}
              style={styles.previewImage}
              resizeMode="contain"
            />
          )}
          <TouchableOpacity onPress={handleClosePreview} style={styles.closeBtn} activeOpacity={0.8}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  pressed: { opacity: 0.85 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: '#ddd' 
  },
  avatarFallback: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#2979ff' 
  },
  avatarInitial: { 
    color: '#fff', 
    fontWeight: '700' 
  },
  authorName: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#111827', 
    maxWidth: 220 
  },
  subMeta: { 
    fontSize: 12, 
    color: '#6b7280', 
    marginTop: 2 
  },
  image: { 
    width: '100%', 
    height: 180, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  body: { 
    fontSize: 15, 
    lineHeight: 20, 
    color: '#111827' 
  },
  previewBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewImage: { 
    width: '100%', 
    height: '80%' 
  },
  closeBtn: {
    position: 'absolute',
    top: 24,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: '700' 
  },
});