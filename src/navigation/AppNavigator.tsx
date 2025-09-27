import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import LoginScreen from '../screens/onboarding/LoginScreen';
import SignupScreen from '../screens/onboarding/SignupScreen';
import MainScreen from '../screens/main/MainScreen';
import PostDetailScreen from '../screens/postDetail/PostDetailScreen';
import ProfileSetupScreen from '../screens/onboarding/ProfileSetupScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SCREENS: {
    name: keyof RootStackParamList;
    component: React.ComponentType<any>;
    options?: Parameters<typeof Stack.Screen>[0]['options'];
}[] = [
        { name: 'Login', component: LoginScreen, options: { headerShown: false } },
        { name: 'Signup', component: SignupScreen, options: { title: '회원가입' } },
        { name: 'Main', component: MainScreen, options: { title: '메인' } },
        { name: 'PostDetail', component: PostDetailScreen, options: { title: '상세' } },
        { name: 'ProfileSetup', component: ProfileSetupScreen, options: { title: '프로필 작성' } },
    ];


export function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login">
            {SCREENS.map(({ name, component, options }) => (
                <Stack.Screen key={name} name={name} component={component} options={options} />
            ))}
        </Stack.Navigator>
    );
};