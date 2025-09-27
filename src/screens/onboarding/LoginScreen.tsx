import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { useLogin } from '../../hooks/useAuth';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginMutation = useLogin(() => navigation.replace('Main'));

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

            <TouchableOpacity
                style={[
                    styles.loginBtn,
                    loginMutation.isPending && { opacity: 0.5 },
                ]}
                onPress={handleLogin}
                disabled={loginMutation.isPending} 
            >
                <Text style={styles.loginBtnText}>
                    {loginMutation.isPending ? '로그인 중...' : '로그인'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.signupBtn}
                onPress={handleSignup}
                disabled={loginMutation.isPending} 
            >
                <Text style={styles.signupBtnText}>회원가입</Text>
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
        fontSize: 28,
        marginBottom: 30,
        fontWeight: '700',
    },
    input: {
        height: 40,
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 16,
    },
    loginBtn: {
        width: '80%',                
        height: 40,                 
        borderRadius: 10,            
        backgroundColor: '#2979ff',  
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    loginBtnText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    signupBtn: {
        width: '80%',
        height: 40,
        borderRadius: 10,
        backgroundColor: 'lightgray',     
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    signupBtnText: {
        color: '#fff',             
        fontSize: 15,
        fontWeight: '600',
    },
});

export default LoginScreen;