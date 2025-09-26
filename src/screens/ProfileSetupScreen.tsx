import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { useProfileSetup } from '../hooks/useUser';

function ProfileSetupScreen({ navigation }: any) {
    const [nickname, setNickname] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);

    const { submit, isSubmitting, error } = useProfileSetup({
        onSuccess: () => navigation.replace('Main'),
    });

    const pickImage = async () => {
        const res = await ImagePicker.launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
        const uri = res.assets?.[0]?.uri ?? null;
        setImageUri(uri);
    };

    const canSubmit = !!nickname.trim() && !isSubmitting;

    const handleSave = () => {
        submit({ nickname, localImageUri: imageUri });
    };

    if (error) {
        Alert.alert('프로필 등록 실패', error.message || '잠시 후 다시 시도해주세요.');
    }

    const isDisabled = !nickname.trim();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                    <Text style={{ color: '#aaa' }}>+</Text>
                )}
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="닉네임 입력"
                value={nickname}
                onChangeText={setNickname}
            />

            <TouchableOpacity
                style={[styles.button, canSubmit ? styles.buttonEnabled : styles.buttonDisabled]}
                disabled={!canSubmit}
                onPress={handleSave}
            >
                <Text style={styles.buttonText}>프로필 등록</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ProfileSetupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    imageWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60, // 동그랗게
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', // 이미지가 영역 벗어나지 않게
    },
    image: {
        width: '100%',
        height: '100%',
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 16,
    },
    button: {
        width: '80%',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonEnabled: {
        backgroundColor: '#2979ff',
    },
    buttonDisabled: {
        backgroundColor: '#2979ff',
        opacity: 0.4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});