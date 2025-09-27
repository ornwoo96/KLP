import React, { useLayoutEffect, useCallback, useState } from 'react';
import {
  View, FlatList, RefreshControl, ActivityIndicator, Alert
} from 'react-native';
import { Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderProfile } from '../../components/HeaderProfile';
import FloatingButton from '../../components/FloatingButton';
import PostCell from './PostCell';
import { usePostsFeed } from '../../hooks/usePost';
import type { RootStackParamList } from '../../navigation/types';
import DefaultBottomSheet from '../../components/DefaultBottomSheet';
import CreatePostSheet from './CreatePostSheet';
import { useLogout } from '../../hooks/useAuth'; 
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

export default function MainScreen({ navigation }: Props) {
  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePostsFeed();

  const posts = data?.pages.flatMap(p => p.items) ?? [];

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const [ openCreatePost, setOpenCreatePost ] = useState(false);

  const logout = useLogout(() => navigation.replace('Login'));

  const confirmLogout = useCallback(() => {
    if (logout.isPending) return;
    Alert.alert(
      '로그아웃 하시겠습니까?',
      '',
      [
        { text: '취소', style: 'cancel' },
        { text: '로그아웃', style: 'destructive', onPress: () => logout.mutate() },
      ],
      { cancelable: true }
    );
  }, [logout.isPending, logout.mutate, navigation]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => <HeaderProfile onPress={confirmLogout} />,
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.postId}
        renderItem={({ item }) =>
          <PostCell
            post={item}
            onPress={() => navigation.push('PostDetail', { post: item })}
          />}
        refreshControl={
          <RefreshControl
            refreshing={isLoading || isRefetching}
            onRefresh={refetch}
          />
        }
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        ListEmptyComponent={
          !isLoading ? (
            <View style={{
              padding: 24,
              alignItems: 'center',
              height: 500,
            }}>
              <Text style={{ color: 'black', fontSize: 16 }}>첫 게시물을 작성해보세요! 🎉</Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={{ paddingVertical: 16 }}>
              <ActivityIndicator />
            </View>
          ) : null
        }
      />

      <FloatingButton onPress={() => setOpenCreatePost(true)} />

      <DefaultBottomSheet
        open={openCreatePost}
        onClose={() => setOpenCreatePost(false)}
        modalProps={{
          keyboardBehavior: 'interactive',
          keyboardBlurBehavior: 'restore',
        }}
      >
        <CreatePostSheet
          onPosted={() => {
            setOpenCreatePost(false);
            refetch();                
          }}
          onClose={() => setOpenCreatePost(false)}
        />
      </DefaultBottomSheet>
    </View>
  );
}