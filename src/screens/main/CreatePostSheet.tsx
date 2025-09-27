import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  InputAccessoryView,
} from 'react-native';
import { HeaderProfile } from '../../components/HeaderProfile';
import * as ImagePicker from 'react-native-image-picker';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native';
import { useCreatePost } from '../../hooks/usePost';
import { useAuthStore } from '../../store/authStore';
import { useUserProfile } from '../../hooks/useUser';

type Props = {
  onPosted?: () => void;
  onClose?: () => void;
};

export default function CreatePostSheet({ onPosted, onClose }: Props) {

  const insets = useSafeAreaInsets();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [body, setBody] = useState('');
  const user = useAuthStore(s => s.user);
  const userProfile = useUserProfile(user?.uid);

  const { mutate: createPost, isPending } = useCreatePost(() => {
    onPosted?.();
    onClose?.();
  });


  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    const uri = res.assets?.[0]?.uri ?? null;
    setImageUri(uri);
  };

  const canPost = body.trim().length > 0;

  const onPressPost = () => {
    if (!user) return;
    createPost({
      authorId: user.uid,
      authorNickname: userProfile?.nickname ?? "",
      authorProfileImageUrl: userProfile?.profileImageUrl ?? null,
      body: body.trim(),
      imageLocalPath: imageUri ?? undefined,
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
              value={body}
              onChangeText={setBody}
              placeholder="무엇을 공유할까요?"
              multiline
              scrollEnabled={false}
              textAlignVertical="top"
              {...(Platform.OS === 'ios' ? { inputAccessoryViewID: "MY_BAR" } : {})}
            />

            <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
              <Text style={styles.photoBtnText}>사진 선택</Text>
            </TouchableOpacity>

            {imageUri && (
              <View style={styles.previewWrap}>
                <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="cover" />

                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => setImageUri(null)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.removeBtnText}>×</Text>
                </TouchableOpacity>
              </View>
            )}



          </View>
        </ScrollView>

        {Platform.OS === 'ios' && (
          <InputAccessoryView nativeID="MY_BAR">
            <View style={[styles.accessoryBar, { paddingBottom: insets.bottom || 8 }]}>
              <TouchableOpacity
                style={[styles.postBtn, !canPost && styles.postBtnDisabled]}
                disabled={!canPost}
                onPress={onPressPost}
              >
                <Text style={styles.postBtnText}>{isPending ? '게시 중...' : '게시'}</Text>
              </TouchableOpacity>
            </View>
          </InputAccessoryView>
        )}

        {Platform.OS === 'android' && (
          <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
            <TouchableOpacity
              style={[styles.postBtn, !canPost && styles.postBtnDisabled]}
              disabled={!canPost}
              onPress={onPressPost}
            >
              <Text style={styles.postBtnText}>게시</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    minHeight: 400, 
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
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  photoBtn: {
    marginTop: 0,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f0f3f7',
  },
  photoBtnText: {
    fontWeight: '600',
    color: '#2979ff',
  },
  previewWrap: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  preview: {
    width: 180,
    height: 180,
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
  // iOS 액세서리 바
  accessoryBar: {
    height: 55,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  // Android 하단 바
  bottomBar: {
    height: 55,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 8,
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
  postBtnDisabled: {
    opacity: 0.4,
  },
  postBtnText: {
    color: '#fff',
    fontWeight: '700',
  },
  removeBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 18,
  },
});