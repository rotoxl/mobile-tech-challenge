import React, {
  ReactNode,
  createRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

import theme, { getBreakpointKey, screenWidth } from '../theme';
import { StyleSheet, View } from 'react-native';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

export type TournamentModalHandler = {
  open: (content: ReactNode) => void;
  close: () => void;
};

export const bottomSheetModalRef = createRef<TournamentModalHandler>();

export const TournamentModal = () => {
  const [content, setContent] = useState<ReactNode>(null);
  const internalRef = useRef<BottomSheetModal>(null);

  const modalSnapPoints = useMemo(() => ['65%'], []);

  useImperativeHandle(
    bottomSheetModalRef,
    () => ({
      open: (modalContent: ReactNode) => {
        setContent(modalContent);
        internalRef.current?.present?.();
      },
      close: () => {
        internalRef.current?.close?.();
      },
    }),
    [],
  );

  const screenSize = getBreakpointKey(screenWidth);
  const modalWidth =
    {
      s: screenWidth,
      m: screenWidth,
      l: screenWidth * 0.5,
      xl: screenWidth * 0.5,
      xxl: screenWidth * 0.5,
    }[screenSize] ?? screenWidth;

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        enableTouchThrough={false}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={[
          { backgroundColor: theme.palette.backdrop },
          StyleSheet.absoluteFillObject,
        ]}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={internalRef}
      index={0}
      snapPoints={modalSnapPoints}
      backgroundStyle={{ backgroundColor: theme.palette.background.base }}
      backdropComponent={renderBackdrop}
      style={{
        width: modalWidth,
        marginHorizontal: (screenWidth - modalWidth) / 2,
      }}
    >
      {content ?? <></>}
    </BottomSheetModal>
  );
};
