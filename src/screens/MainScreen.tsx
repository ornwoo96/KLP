import React from 'react';
import { View, Text } from 'react-native';

export default function MainScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>메인 화면</Text>
    </View>
  );
}