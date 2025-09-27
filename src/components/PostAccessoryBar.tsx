import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View, InputAccessoryView, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  accessoryID?: string;
  canPost: boolean;
  isPending?: boolean;
  onPressPost: () => void;
  visible?: boolean; 
};

export default function PostAccessoryBar({ 
    accessoryID = 'COMMENT_BAR', 
    canPost, 
    isPending, 
    onPressPost,
    visible = true,
}: Props) {
  const insets = useSafeAreaInsets();

  if (!visible) return null; 

  const handlePress = () => {
    if (!canPost || isPending) return;
    Keyboard.dismiss();
    onPressPost();
  };

  if (Platform.OS === 'ios') {
    return (
      <InputAccessoryView nativeID={accessoryID}>
        <View style={[styles.bar, { paddingBottom: insets.bottom || 8 }]}>
          <TouchableOpacity
            style={[styles.postBtn, !canPost && styles.postBtnDisabled]}
            disabled={!canPost || isPending}
            onPress={handlePress}
          >
            <Text style={styles.postBtnText}>{isPending ? '게시 중...' : '게시'}</Text>
          </TouchableOpacity>
        </View>
      </InputAccessoryView>
    );
  }

  // Android
  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <TouchableOpacity
        style={[styles.postBtn, !canPost && styles.postBtnDisabled]}
        disabled={!canPost || isPending}
        onPress={handlePress}
      >
        <Text style={styles.postBtnText}>{isPending ? '게시 중...' : '게시'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 55,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  postBtn: {
    minWidth: 65,
    height: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2979ff',
    paddingHorizontal: 14,
  },
  postBtnDisabled: { opacity: 0.4 },
  postBtnText: { color: '#fff', fontWeight: '700' },
});