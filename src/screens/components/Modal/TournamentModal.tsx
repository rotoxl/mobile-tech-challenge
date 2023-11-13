import React, {
  createRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { Tournament } from '../../../features/tournament/tournamentSlice';
import theme from '../../../theme';

import { TournamentDetail } from './TournamentDetail';

export type TournamentModalHandler = {
  open: (tournament: Tournament) => void;
  close: () => void;
};

export const bottomSheetModalRef = createRef<TournamentModalHandler>();

export const TournamentModal = () => {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const internalRef = useRef<BottomSheetModal>(null);

  const modalSnapPoints = useMemo(() => ['65%'], []);

  useImperativeHandle(
    bottomSheetModalRef,
    () => ({
      open: (activeTournament: Tournament) => {
        setTournament(activeTournament);
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
      {tournament ? <TournamentDetail tournament={tournament} /> : <></>}
    </BottomSheetModal>
  );
};
