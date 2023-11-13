import React, { useCallback, useEffect, useState } from 'react';
import Container from '../components/Container';
import H4 from '../components/H4';
import {
  Tournament,
  fetchTournaments,
} from '../features/tournament/tournamentSlice';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { List } from './components/List/List';
import RootContainer from '../components/RootContainer';
import { SearchBox } from './components/SearchBox/SearchBox';
import {
  TournamentModal,
  bottomSheetModalRef,
} from './components/Modal/TournamentModal';

const Tournaments = () => {
  const [query, setQuery] = useState<string>('');
  const dispatch = useAppDispatch();

  const tournamentStatus = useAppSelector((state) => state.tournaments.status);
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
    [dispatch]
  );

  useEffect(() => {
    if (tournamentStatus === 'idle') {
      refetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournamentStatus]);

  const showSheet = useCallback((tournament: Tournament) => {
    bottomSheetModalRef.current?.open(tournament);
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
    </>
  );
};

export default Tournaments;
