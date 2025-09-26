import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useSignupMutation } from '../hooks/useAuthMutations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupMutation = useSignupMutation(() => {
        navigation.replace('Main');
    });

    const onSubmit = () => {
        if (!nickname || !email || !password) {
            Alert.alert('알림', '닉네임/이메일/비밀번호를 입력해주세요.');
            return;
        }
        signupMutation.mutate({ nickname, email, password });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>회원가입</Text>

            <TextInput
                style={styles.input} 
                placeholder="닉네임 입력" 
                value={nickname} 
                onChangeText={setNickname} 
            />

            <TextInput 
                style={styles.input} 
                placeholder="이메일 입력" 
                value={email} 
                onChangeText={setEmail} 
                autoCapitalize="none" 
                keyboardType="email-address" 
            />

            <TextInput 
                style={styles.input} 
                placeholder="비밀번호 입력" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
            />

            <Button 
                title={signupMutation.isPending ? '가입 중...' : '가입하기'} 
                onPress={onSubmit} 
            />

            {signupMutation.isError && (
                <Text style={{ color: 'red', marginTop: 8 }}>
                    {(signupMutation.error as any)?.message ?? '회원가입 실패'}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 20, 
        backgroundColor: '#fff' 
    },
    title: { 
        fontSize: 24, 
        marginBottom: 24, 
        fontWeight: '600' 
    },
    input: { 
        width: '80%', 
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 8, 
        paddingHorizontal: 12, 
        paddingVertical: 10, 
        marginBottom: 16 
    },
});