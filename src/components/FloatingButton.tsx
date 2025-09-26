import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function FloatingButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.fabText}>＋</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 30, 
    right: 30, 
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2979ff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    fontSize: 28,
    color: '#fff',
    lineHeight: 30,
  },
});