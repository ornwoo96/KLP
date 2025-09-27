import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export type PostComment = {
  id: string;
  authorNickname?: string;
  authorProfileImageUrl?: string | null;
  body: string;
  createdAt?: { toDate: () => Date }; // RNFB Timestamp 호환용
};

export default function PostCommentCell({ comment }: { comment: PostComment }) {
  return (
    <View style={styles.row}>
      {comment.authorProfileImageUrl ? (
        <Image source={{ uri: comment.authorProfileImageUrl }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.fallback]}>
          <Text style={styles.initial}>
            {(comment.authorNickname?.[0] ?? 'U').toUpperCase()}
          </Text>
        </View>
      )}

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.name} numberOfLines={1}>
          {comment.authorNickname ?? 'User'}
        </Text>
        <Text style={styles.body}>{comment.body}</Text>
        {!!comment.createdAt && (
          <Text style={styles.time}>{comment.createdAt.toDate().toLocaleString()}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#ddd' },
  fallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#2979ff' },
  initial: { color: '#fff', fontWeight: '700' },
  name: { fontSize: 13, fontWeight: '600', color: '#111827' },
  body: { marginTop: 2, fontSize: 14, color: '#111827' },
  time: { marginTop: 4, fontSize: 11, color: '#6b7280' },
});