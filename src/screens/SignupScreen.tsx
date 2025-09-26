import React, { useState } from 'react';
import { 
    View, 
    TextInput, 
    Button, 
    StyleSheet, 
    Text, 
    Alert 
} from 'react-native';
import { useSignup } from '../hooks/useSingup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { CommonActions } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupMutation = useSignup(() => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'ProfileSetup' }],
            })
        );
    });

    const onSubmit = () => {
        if (!email || !password) {
            Alert.alert('알림', '이메일/비밀번호를 입력해주세요.');
            return;
        }
        signupMutation.mutate({ email, password });
    };

    return (
        <View style={styles.container}>
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
        justifyContent: 'flex-start',
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