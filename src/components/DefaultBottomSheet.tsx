import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  type BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import { StyleProp, ViewStyle } from 'react-native';

type Props = {
  open: boolean;
  onClose?: () => void;
  snapPoints?: (string | number)[];
  children: ReactNode;
  detached?: boolean;
  bottomInset?: number;
  backgroundStyle?: StyleProp<ViewStyle>;
  modalProps?: Omit<BottomSheetModalProps, 'ref' | 'snapPoints' | 'children'>;
};

export default function DefaultBottomSheet({
  open,
  onClose,
  children,
  snapPoints = ['93%', '93%'],
  detached = true,
  bottomInset = 0,
  backgroundStyle,
  modalProps,
}: Props) {
  const ref = useRef<BottomSheetModal>(null);
  const _snapPoints = useMemo(() => snapPoints, [snapPoints]);

  // open 상태 변화에 따라 present/dismiss
  useEffect(() => {
    if (open) ref.current?.present();
    else ref.current?.dismiss();
  }, [open]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

  const defaultBg: StyleProp<ViewStyle> = useMemo(
    () => [
      {
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: -2 },
        elevation: 24,
      },
      backgroundStyle,
    ],
    [backgroundStyle]
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={_snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={defaultBg}
      detached={detached}
      bottomInset={bottomInset}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      {...modalProps}
      onDismiss={onClose}
    >
      <BottomSheetView style={{ flex: 1 }}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
}