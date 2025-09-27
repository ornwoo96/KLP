import React from 'react';
import { TouchableOpacity, View, TextInput, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  placeholder?: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
};

export default function BottomRoundedButton({ placeholder = '댓글 달기…', onPress, containerStyle }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.bar, containerStyle]}
    >
      <View pointerEvents="none" style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          editable={false}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,     // 여유
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 12,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,      // 상단만 아니라 입력창 자체 라운드
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
});