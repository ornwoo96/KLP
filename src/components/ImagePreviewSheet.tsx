import React from 'react';
import { Modal, View, Image, StyleSheet, TouchableOpacity, Pressable, Text } from 'react-native';

type Props = {
  visible: boolean;
  uri?: string | null;
  onClose: () => void;
};

export default function ImagePreviewSheet({ visible, uri, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        {!!uri && <Image source={{ uri }} style={styles.image} resizeMode="contain" />}
        <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.8}>
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '100%', height: '80%', backgroundColor: 'transparent' },
  closeBtn: {
    position: 'absolute', top: 24, right: 16,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  closeBtnText: { color: '#fff', fontSize: 20, fontWeight: '700' },
});