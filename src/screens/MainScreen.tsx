import React from 'react';
import { View, Text } from 'react-native';
import FloatingButton from '../components/FloatingButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function MainScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>메인 화면</Text>

      <FloatingButton onPress={() => navigation.navigate('CreatePost')} />
    </View>
  );
}