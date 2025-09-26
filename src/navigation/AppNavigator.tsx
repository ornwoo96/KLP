import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MainScreen from '../screens/MainScreen';
import DetailScreen from '../screens/PostDetailScreen';
import PostScreen from '../screens/CreatePostScreen';
import CreatePostScreen from '../screens/CreatePostScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const SCREENS: {
    name: keyof RootStackParamList;
    component: React.ComponentType<any>;
    options?: Parameters<typeof Stack.Screen>[0]['options'];
}[] = [
        { name: 'Login', component: LoginScreen, options: { headerShown: false } },
        { name: 'Signup', component: SignupScreen, options: { title: '회원가입' } },
        { name: 'Main', component: MainScreen, options: { title: '메인' } },
        { name: 'Detail', component: DetailScreen, options: { title: '상세' } },
        { name: 'Post', component: PostScreen, options: { title: '게시물' } },
        { name: 'CreatePost', component: CreatePostScreen, options: { title: '게시물 작성' } },
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