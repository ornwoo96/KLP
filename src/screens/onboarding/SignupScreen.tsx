import React, { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Text,
    Alert,
    TouchableOpacity
} from 'react-native';
import { useSignup } from '../../hooks/useAuth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
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
        signupMutation.mutate(
            { email, password },
            {
                onError: (e: any) => {
                    Alert.alert('가입 실패', e.message);
                },
            }
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="E-Mail 입력"
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

            <TouchableOpacity
                style={[
                    styles.signupBtn,
                    signupMutation.isPending && { opacity: 0.5 },
                ]}
                onPress={onSubmit}
                disabled={signupMutation.isPending}
            >
                <Text style={styles.signupBtnText}>{signupMutation.isPending ? '가입 중...' : '가입하기'}</Text>
            </TouchableOpacity>
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
        height: 40,
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 16
    },
    signupBtn: {
        width: '80%',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#2979ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    signupBtnText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
});