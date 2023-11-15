import React, { useCallback, useEffect, useState } from 'react';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { List } from './components/List/List';
import { CreateUpdateTournamentModal } from './components/Modal/CreateUpdateTournamentModal';
import { TournamentDetailModal } from './components/Modal/TournamentDetailModal';
import { SearchBox } from './components/SearchBox/SearchBox';
import Container from '../components/Container';
import FAB from '../components/FAB';
import H4 from '../components/H4';
import { TournamentModal, bottomSheetModalRef } from '../components/Modal';
import RootContainer from '../components/RootContainer';
import {
  Tournament,
  fetchTournaments,
} from '../features/tournament/tournamentSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import theme from '../theme';

const Tournaments = () => {
  const [query, setQuery] = useState<string>('');
  const dispatch = useAppDispatch();

  const tournamentStatus = useAppSelector((state) => {
    return state.tournaments.status;
  });
  const tournamentPage = useAppSelector((state) => state.tournaments.page);

  const refetchData = useCallback(() => {
    dispatch(fetchTournaments({ pageNumber: 1, query }));
  }, [dispatch, query]);

  const loadNextPage = useCallback(() => {
    dispatch(fetchTournaments({ pageNumber: tournamentPage + 1, query }));
  }, [dispatch, query, tournamentPage]);

  const handleFilter = useCallback(
    (value: string) => {
      setQuery(value);
      dispatch(fetchTournaments({ pageNumber: 1, query: value }));
    },
    [dispatch],
  );

  useEffect(() => {
    if (tournamentStatus === 'idle') {
      refetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournamentStatus]);

  const showSheet = useCallback((tournament: Tournament) => {
    bottomSheetModalRef.current?.open(
      <TournamentDetailModal tournament={tournament} />,
    );
  }, []);

  const handleCreateTournament = useCallback(async () => {
    bottomSheetModalRef.current?.open(
      <CreateUpdateTournamentModal operation="create" />,
    );
  }, []);

  return (
    <>
      <RootContainer>
        <Container>
          <H4>Faceit Tournaments</H4>
          <SearchBox onChange={handleFilter} />
          <List
            refetchData={refetchData}
            loadNextPage={loadNextPage}
            onSelectItem={showSheet}
          />
        </Container>
      </RootContainer>
      <TournamentModal />

      <FAB onPress={handleCreateTournament}>
        <MCIcon name="plus" size={30} color={theme.palette.text.primary} />
      </FAB>
    </>
  );
};

export default Tournaments;
