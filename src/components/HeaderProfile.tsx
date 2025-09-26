import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useUserProfile } from '../hooks/useUser';

type Props = { onPress?: () => void };

function HeaderProfileBase({ onPress }: Props) {
    const firebaseUser = useAuthStore(s => s.user);
    const doc = useUserProfile(firebaseUser?.uid);

    const nickname = doc?.nickname ?? firebaseUser?.displayName ?? 'Guest';
    const uri = doc?.profileImageUrl ?? undefined;

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.wrap}>
            {uri ? (
                <Image source={{ uri }} style={styles.avatar} />
            ) : (
                <View style={[styles.avatar, styles.fallback]}>
                    <Text style={{ color: '#fff', fontWeight: '700' }}>
                        {nickname?.[0]?.toUpperCase() ?? 'U'}
                    </Text>
                </View>
            )}
            <Text numberOfLines={1} style={styles.name}>{nickname}</Text>
        </TouchableOpacity>
    );
}

export const HeaderProfile = memo(HeaderProfileBase);

const styles = StyleSheet.create({
    wrap: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#ddd' },
    fallback: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#2979ff' },
    name: { marginLeft: 8, fontSize: 16, fontWeight: '600', maxWidth: 160 },
});