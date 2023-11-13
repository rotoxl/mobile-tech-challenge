import React, {
  ReactNode,
  createRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import theme from '../theme';

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
    []
  );

  return (
    <BottomSheetModal
      ref={internalRef}
      index={0}
      snapPoints={modalSnapPoints}
      backgroundStyle={{ backgroundColor: theme.palette.background.base }}
    >
      {content ?? <></>}
    </BottomSheetModal>
  );
};
