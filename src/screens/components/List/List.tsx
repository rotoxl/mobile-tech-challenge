import React, { useCallback, useEffect, useState } from 'react';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { Tournament } from '../../../features/tournament/tournamentSlice';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
} from 'react-native';
import { useAppSelector } from '../../../store/hooks';
import theme, { Spacing } from '../../../theme';
import Button from '../../../components/Button';
import { ListItem } from './ListItem';
import H6 from '../../../components/H6';

type ListProps = {
  refetchData: () => void;
  loadNextPage: () => void;
  onSelectItem: (item: Tournament) => void;
};

const ContainerCenterVertical = styled.View`
  align-items: center;
  padding-horizontal: ${theme.spacing(Spacing.xl)};
  justify-content: center;
  flex: 1;
`;
const SecondaryText = styled.Text`
  ${theme.typography.body};
  color: ${theme.palette.text.secondary};
  padding-bottom: ${theme.spacing(Spacing.l)};
  text-align: center;
`;
const Container = styled.View`
  padding-vertical: ${theme.spacing(Spacing.m)};
`;

export const List = ({
  refetchData,
  loadNextPage,
  onSelectItem: handleSelectItem,
}: ListProps) => {
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);

  const tournaments = useAppSelector((state) => state.tournaments.list);
  const pageNumber = useAppSelector((state) => state.tournaments.page);
  const hasMoreResults = useAppSelector(
    (state) => state.tournaments.hasMoreResults
  );
  const tournamentStatus = useAppSelector((state) => state.tournaments.status);

  const EmptyState = useCallback(
    () => (
      <ContainerCenterVertical>
        <Container>
          <MCIcon
            name="toy-brick-search"
            size={40}
            color={theme.palette.text.secondary}
          />
        </Container>

        <H6>No tournaments</H6>
        <SecondaryText>
          Why dont you try to search for "League of legends"?
        </SecondaryText>
      </ContainerCenterVertical>
    ),
    []
  );
  const LoadingState = useCallback(
    () => (
      <ContainerCenterVertical>
        <ActivityIndicator size="large" />
        <SecondaryText>Loading...</SecondaryText>
      </ContainerCenterVertical>
    ),

    []
  );
  const ErrorState = useCallback(
    () => (
      <ContainerCenterVertical>
        <Container>
          <MCIcon
            name="toy-brick-remove-outline"
            size={40}
            color={theme.palette.text.secondary}
          />
        </Container>
        <SecondaryText>Something went wrong</SecondaryText>
        <Button onPress={refetchData}>Retry</Button>
      </ContainerCenterVertical>
    ),
    [refetchData]
  );

  const handlePressItem = useCallback(
    (item: Tournament) => () => {
      handleSelectItem(item);
    },
    [handleSelectItem]
  );

  const renderTournamentRow = useCallback(
    ({ item, index }: ListRenderItemInfo<Tournament>) => (
      <ListItem
        tournament={item}
        index={index}
        onPress={handlePressItem(item)}
      />
    ),
    [handlePressItem]
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    refetchData();
  }, [refetchData]);

  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore && hasMoreResults) {
      setLoadingMore(true);
      loadNextPage();
    }
  }, [hasMoreResults, isLoadingMore, loadNextPage]);

  useEffect(() => {
    if (tournamentStatus === 'succeeded') {
      setRefreshing(false);
      setLoadingMore(false);
    }
  }, [pageNumber, tournamentStatus]);

  if (isRefreshing || isLoadingMore || tournamentStatus === 'succeeded') {
    if (tournaments.length > 0) {
      return (
        <FlatList<Tournament>
          data={tournaments}
          renderItem={renderTournamentRow}
          keyExtractor={(item) => item.id}
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={theme.palette.attention.light}
            />
          }
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isLoadingMore ? (
              <ActivityIndicator
                size="large"
                color={theme.palette.attention.light}
              />
            ) : (
              <></>
            )
          }
        />
      );
    } else {
      return <EmptyState />;
    }
  } else if (tournamentStatus === 'loading') {
    return <LoadingState />;
  } else if (tournamentStatus === 'failed') {
    return <ErrorState />;
  }
};
