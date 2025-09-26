import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useLoginMutation } from '../hooks/useAuthMutations';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginMutation = useLoginMutation(() => navigation.replace('Main'));


    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('알림', '이메일/비밀번호를 입력하세요.');
            return;
        }
        loginMutation.mutate(
            { email, password },
            {
                onError: (e: any) => {
                    Alert.alert('로그인 실패', e.message);
                },
            }
        );
    };

    const handleSignup = () => {
        navigation.navigate('Signup');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>KLP사전과제</Text>

            <TextInput
                style={styles.input}
                placeholder="E-Mail 입력"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="비밀번호 입력"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button
                title="로그인"
                onPress={handleLogin}
            />

            <TouchableOpacity onPress={handleSignup} style={{ marginTop: 16 }}>
                <Text style={{ color: '#2979ff' }}>회원가입</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        fontWeight: '600',
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
});

export default LoginScreen;